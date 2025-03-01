### Thousand Words

A picture is worth a thousand words.

#### How it works

1. Upload an image
2. Convert the image to grayscale
3. Convert the grayscale image to a string of letters
4. Use an algorithm to get valid words from the string
5. Return the words

Using sliding window, we extract all substrings that make a word in the string.

I also tried to get the strings that are a subsequence of the original string using dynamic programming, but it returned almost every single word in the dictionary. This might have something to do with the fact that for a large image, the string is too long and hence almost every single word in the dictionary is a subsequence of it.

Made with Rust and Next.js. (Weird combination, I know.)
