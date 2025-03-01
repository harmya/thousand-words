"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bitString, setBitString] = useState("");
  const [topWords, setTopWords] = useState([]);
  const [showOutput, setShowOutput] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    // Convert image to bit string (simulated)
    setTimeout(() => {
      // This is where you'd normally call your API to process the image
      // For demo purposes, we're generating random output
      const simulatedBitString = generateRandomBitString(1000);
      const simulatedWords = generateRandomWords();

      setBitString(simulatedBitString);
      setTopWords(simulatedWords);
      setLoading(false);
      setShowOutput(true);
    }, 2500);
  };

  // Helper function to generate a random bit string for demo
  const generateRandomBitString = (length) => {
    return Array.from({ length }, () => Math.round(Math.random())).join("");
  };

  // Helper function to generate random words for demo
  const generateRandomWords = () => {
    const words = [
      { word: "ethereal", score: 0.95 },
      { word: "luminous", score: 0.92 },
      { word: "serenity", score: 0.89 },
      { word: "whisper", score: 0.85 },
      { word: "cascade", score: 0.82 },
      { word: "velvet", score: 0.79 },
      { word: "gossamer", score: 0.77 },
      { word: "shimmer", score: 0.75 },
      { word: "tranquil", score: 0.72 },
      { word: "radiance", score: 0.7 },
    ];
    return words;
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setBitString("");
    setTopWords([]);
    setShowOutput(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-thin tracking-wide mb-4">
            Image to Words
          </h1>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            Transform your images into a dream-like sequence of words through
            our innovative bit-to-letter algorithm
          </p>
        </header>

        {!showOutput ? (
          <div className="max-w-3xl mx-auto">
            <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div
                  className="border-2 border-dashed border-purple-300/50 rounded-2xl h-64 flex items-center justify-center cursor-pointer overflow-hidden"
                  onClick={() => document.getElementById("file-upload").click()}
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
                        className="h-16 w-16 mx-auto text-purple-300"
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
                      <p className="mt-4">
                        Drag an image here or click to browse
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
                      px-8 py-3 rounded-full text-lg font-medium transition-all duration-300
                      ${
                        file && !loading
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
                          : "bg-gray-500 cursor-not-allowed"
                      }
                    `}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      "Transform Image"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="relative w-full h-64 mb-4 rounded-xl overflow-hidden">
                    <Image
                      src={preview}
                      alt="Original image"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-medium mb-4">Top Words</h3>
                    <ul className="space-y-3">
                      {topWords.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-lg">{item.word}</span>
                          <div className="w-32 bg-white/20 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full"
                              style={{ width: `${item.score * 100}%` }}
                            ></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-medium mb-4">
                    Bit String Output
                  </h3>
                  <div className="backdrop-blur-md bg-black/30 rounded-xl p-4 max-h-96 overflow-auto font-mono text-xs text-green-300 shadow-inner">
                    {bitString.split("").map((bit, index) => (
                      <span
                        key={index}
                        className={`${
                          bit === "1" ? "text-green-300" : "text-green-500/70"
                        } ${
                          index % 50 === 0 && index !== 0 ? "block mt-1" : ""
                        }`}
                      >
                        {bit}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-medium mb-4">Letter Mapping</h3>
                    <div className="backdrop-blur-md bg-black/30 rounded-xl p-4 max-h-40 overflow-auto font-mono text-xs text-purple-300 shadow-inner">
                      {bitString
                        .split("")
                        .slice(0, 200)
                        .map((bit, index) => (
                          <span
                            key={index}
                            className={`${
                              index % 50 === 0 && index !== 0
                                ? "block mt-1"
                                : ""
                            }`}
                          >
                            {String.fromCharCode(
                              97 + parseInt(bit) * (index % 26)
                            )}
                          </span>
                        ))}
                      <span className="text-gray-400"> ... and more</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <button
                  onClick={resetForm}
                  className="px-6 py-2 border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Process Another Image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
