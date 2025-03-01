use actix_multipart::Multipart;
use actix_web::{web, App, Error, HttpResponse, HttpServer};
use futures::{StreamExt, TryStreamExt};
use image::{DynamicImage, GrayImage};
use rand::seq::SliceRandom;
use serde::Serialize;
use std::collections::{HashMap, HashSet};
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use std::sync::Mutex;

fn get_english_letter_frequencies() -> Vec<char> {
    vec![
        'e', 'a', 'r', 'i', 'o', 't', 'n', 's', 'l', 'c', 'u', 'd', 'p', 'm', 'h', 'g', 'b', 'f',
        'y', 'w', 'k', 'v', 'x', 'z', 'j', 'q',
    ]
}

fn create_histogram(gray_img: &GrayImage) -> [u32; 256] {
    let mut histogram = [0u32; 256];
    for pixel in gray_img.pixels() {
        let intensity = pixel.0[0] as usize;
        histogram[intensity] += 1;
    }
    histogram
}

fn to_letter_matrix_uniform(gray_img: &GrayImage) -> Vec<Vec<char>> {
    let width = gray_img.width() as usize;
    let height = gray_img.height() as usize;
    let mut letter_matrix = vec![vec!['_'; width]; height];
    let mut letter_frequencies = get_english_letter_frequencies();
    let mut rng = rand::thread_rng();
    letter_frequencies.shuffle(&mut rng);

    let bin_size = 256.0 / 26.0;
    let mut bins: Vec<(u8, u8)> = Vec::new();

    for i in 0..26 {
        let start = (i as f64 * bin_size) as u8;
        let end = ((i + 1) as f64 * bin_size - 1.0).min(255.0) as u8;
        bins.push((start, end));
    }

    // Sort bins by pixel count
    let histogram = create_histogram(gray_img);
    let mut bin_counts: Vec<(usize, u32)> = bins
        .iter()
        .enumerate()
        .map(|(idx, &(start, end))| {
            let count: u32 = (start..=end).map(|i| histogram[i as usize]).sum();
            (idx, count)
        })
        .collect();

    bin_counts.sort_by(|a, b| b.1.cmp(&a.1));

    let mut value_to_letter = HashMap::new();

    for (i, (bin_idx, _)) in bin_counts.iter().enumerate() {
        let (start, end) = bins[*bin_idx];
        let letter = letter_frequencies[i];

        for val in start..=end {
            value_to_letter.insert(val, letter);
        }
    }

    for y in 0..height {
        for x in 0..width {
            let pixel = gray_img.get_pixel(x as u32, y as u32);
            let intensity = pixel.0[0];

            if let Some(&letter) = value_to_letter.get(&intensity) {
                letter_matrix[y][x] = letter;
            }
        }
    }

    letter_matrix
}

fn flatten_letter_matrix_with_limit(
    letter_matrix: &Vec<Vec<char>>,
    max_consecutive: usize,
) -> String {
    let mut result = String::with_capacity(letter_matrix.len() * letter_matrix[0].len());
    let mut current_letter = '_';
    let mut count = 0;

    for row in letter_matrix {
        for &ch in row {
            if ch == current_letter {
                count += 1;
                if count <= max_consecutive {
                    result.push(ch);
                }
            } else {
                current_letter = ch;
                count = 1;
                result.push(ch);
            }
        }
    }

    result
}

fn load_dictionary<P: AsRef<Path>>(path: P, max_length: usize) -> io::Result<HashSet<String>> {
    let file = File::open(path)?;
    let reader = io::BufReader::new(file);

    let words: HashSet<String> = reader
        .lines()
        .filter_map(Result::ok)
        .filter(|word| word.len() <= max_length)
        .map(|word| word.to_lowercase())
        .collect();

    Ok(words)
}

fn find_substring_words_fixed_max(
    text: &str,
    dictionary: &HashSet<String>,
    max_word_len: usize,
) -> Vec<String> {
    let min_len = dictionary.iter().map(|s| s.len()).min().unwrap_or(0);

    if min_len == 0 {
        return Vec::new();
    }

    let mut found_words = HashSet::new();

    for window_size in min_len..=max_word_len.min(text.len()) {
        for i in 0..=(text.len() - window_size) {
            if let Some(substring) = text.get(i..(i + window_size)) {
                if dictionary.contains(substring) {
                    found_words.insert(substring.to_string());
                }
            }
        }
    }

    found_words.into_iter().collect()
}

// Now returning both the words and the letter string
fn extract_words_and_letters_from_image(
    img: &DynamicImage,
    dictionary: &HashSet<String>,
    max_word_length: usize,
    max_consecutive_letters: usize,
) -> Result<(Vec<String>, String), Box<dyn std::error::Error>> {
    let gray_img = img.to_luma8();

    // Convert image to letter matrix and flatten it
    let letter_matrix = to_letter_matrix_uniform(&gray_img);
    let letter_string = flatten_letter_matrix_with_limit(&letter_matrix, max_consecutive_letters);

    // Find words
    let words = find_substring_words_fixed_max(&letter_string, &dictionary, max_word_length);

    let mut sorted_words = words;
    sorted_words.sort_by(|a, b| b.len().cmp(&a.len()));
    let top_words = sorted_words.into_iter().take(10).collect();

    Ok((top_words, letter_string))
}

struct AppState {
    dictionary: Mutex<HashSet<String>>,
}

#[derive(Serialize)]
struct WordResponse {
    words: Vec<String>,
    letter_string: String,
}

async fn process_image(
    mut payload: Multipart,
    data: web::Data<AppState>,
) -> Result<HttpResponse, Error> {
    //
    let mut image_bytes = Vec::new();

    while let Ok(Some(mut field)) = payload.try_next().await {
        if let Some(content_disposition) = field.content_disposition() {
            if content_disposition.get_name().unwrap_or("") == "image" {
                // Read the file content
                while let Some(chunk) = field.next().await {
                    let data = chunk?;
                    image_bytes.extend_from_slice(&data);
                }
            }
        }
    }

    if image_bytes.is_empty() {
        return Ok(HttpResponse::BadRequest().body("No image provided"));
    }

    // Load the image from memory
    let img = match image::load_from_memory(&image_bytes) {
        Ok(img) => img,
        Err(e) => return Ok(HttpResponse::BadRequest().body(format!("Invalid image: {}", e))),
    };

    // Process the image
    let dictionary = data.dictionary.lock().unwrap();

    match extract_words_and_letters_from_image(&img, &dictionary, 10, 2) {
        Ok((words, letter_string)) => {
            let response = WordResponse {
                words,
                letter_string,
            };
            Ok(HttpResponse::Ok().json(response))
        }
        Err(e) => Ok(HttpResponse::InternalServerError().body(format!("Error: {}", e))),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Load dictionary at server startup
    let dictionary_path =
        std::env::var("DICTIONARY_PATH").unwrap_or_else(|_| "../assets/dict.txt".to_string());
    let max_word_length = 10;

    println!("Loading dictionary from {}", dictionary_path);
    let dictionary = match load_dictionary(&dictionary_path, max_word_length) {
        Ok(dict) => {
            println!("Dictionary loaded with {} words", dict.len());
            dict
        }
        Err(e) => {
            eprintln!("Error loading dictionary: {}", e);
            return Err(io::Error::new(
                io::ErrorKind::Other,
                "Failed to load dictionary",
            ));
        }
    };

    let app_state = web::Data::new(AppState {
        dictionary: Mutex::new(dictionary),
    });

    let host = std::env::var("HOST").unwrap_or_else(|_| "127.0.0.1".to_string());
    let port = std::env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let address = format!("{}:{}", host, port);

    println!("Starting server at {}", address);

    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .route("/process", web::post().to(process_image))
    })
    .bind(address)?
    .run()
    .await
}
