"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { processImage, wordsToTopWords } from "../utils/api";
import { TopWord } from "../types";
import ErrorMessage from "./components/ErrorMessage";
import HowItWorks from "./components/HowItWorks";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [topWords, setTopWords] = useState<TopWord[]>([]);
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  // Effect to handle fade-in animation after showOutput is set to true
  useEffect(() => {
    if (showOutput) {
      // Small delay to ensure DOM has updated before starting the animation
      const timer = setTimeout(() => {
        setFadeIn(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setFadeIn(false);
    }
  }, [showOutput]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const data = await processImage(file);
      const wordsWithScores = wordsToTopWords(data.words);
      setTopWords(wordsWithScores);
      setShowOutput(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process image");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = (): void => {
    // First fade out the results
    setFadeIn(false);

    // Then reset form after animation completes
    setTimeout(() => {
      setFile(null);
      setPreview(null);
      setTopWords([]);
      setShowOutput(false);
    }, 300); // Match this duration with the CSS transition time
  };

  return (
    <main className="min-h-screen bg-black">
      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-wider mb-3">
            <span className="text-blue-300">A picture</span> is worth a thousand
            words
          </h1>
          <p className="text-lg text-bold text-blue-300/80 max-w-xl mx-auto">
            Are there hidden messages in pictures?
          </p>
        </header>

        {!showOutput ? (
          <div className="max-w-2xl mx-auto opacity-100 transition-opacity duration-300 ease-in-out">
            <div className="bg-blue rounded-lg p-6 shadow-xl ">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div
                  className="border border-blue-900/40 rounded-lg h-96 flex items-center justify-center cursor-pointer overflow-hidden bg-black"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  {preview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mt-3 text-sm text-blue-300">
                        Select an image or drag and drop
                      </p>
                    </div>
                  )}
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={!file || loading}
                    className={`
                      px-6 py-2 rounded-md text-sm font-medium transition-all duration-300
                      ${
                        file && !loading
                          ? "bg-blue-900/70 hover:bg-blue-800/70 shadow-md cursor-pointer"
                          : "bg-blue-950/50 text-blue-300/70 cursor-not-allowed"
                      }
                    `}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      <span className="text-blue-300 text-bold text-lg">
                        What does it say?
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div
            className={`max-w-5xl mx-auto max-h-5xl transition-all duration-300 ease-in-out ${
              fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="rounded-lg p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
                <div className="md:col-span-3">
                  <div className="rounded-lg overflow-hidden bg-black shadow-inner">
                    <div className="relative w-full h-96">
                      {preview && (
                        <Image
                          src={preview}
                          alt="Original image"
                          fill
                          className="object-contain"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-medium mb-3 text-blue-300 pl-4">
                    Extracted Words
                  </h3>
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 h-96 overflow-auto shadow-inner border border-blue-900/20">
                    <div className="grid grid-cols-3 gap-4 p-2">
                      {topWords.map((word, idx) => (
                        <div
                          key={idx}
                          className="relative flex items-center justify-center"
                          style={{
                            opacity: fadeIn ? 1 : 0,
                            transform: fadeIn
                              ? "translateY(0)"
                              : "translateY(10px)",
                            transitionDelay: `${idx * 30}ms`,
                            transitionProperty: "opacity, transform",
                            transitionDuration: "400ms",
                            transitionTimingFunction:
                              "cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          <span
                            className="w-full text-center px-4 py-2 rounded-lg bg-blue-900/20 text-blue-300 shadow-lg border border-blue-900/40 transition-all hover:translate-y-[-2px] hover:shadow-blue-900/20"
                            style={{
                              fontSize: `${Math.max(
                                14,
                                Math.min(28, 14 + word.score * 18)
                              )}px`,
                              fontWeight: word.score > 0.7 ? 500 : 400,
                              letterSpacing:
                                word.score > 0.6 ? "0.025em" : "normal",
                            }}
                          >
                            {word.word}
                          </span>
                          {word.score > 0.7 && (
                            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-blue-500/30 rounded-full blur-sm opacity-70"></span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 rounded-md text-sm hover:bg-blue-950 transition-all duration-300 font-bold cursor-pointer"
                >
                  <span className="text-lg">Process Another Image</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Include the HowItWorks component */}
      <HowItWorks />
    </main>
  );
}
