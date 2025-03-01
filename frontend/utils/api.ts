// File: utils/api.ts
import { WordResponse } from "../types";

export async function processImage(file: File): Promise<WordResponse> {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("/process", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}

/**
 * Formats the letter string for display by adding line breaks
 */
export function formatLetterString(
  str: string,
  charsPerLine: number = 50
): string[] {
  const result: string[] = [];

  for (let i = 0; i < str.length; i += charsPerLine) {
    result.push(str.slice(i, i + charsPerLine));
  }

  return result;
}

export function wordsToTopWords(
  words: string[],
  maxWords: number = 10
): { word: string; score: number }[] {
  return words.slice(0, maxWords).map((word, index) => ({
    word,
    score: Math.max(0.95 - index * 0.03, 0.5),
  }));
}
