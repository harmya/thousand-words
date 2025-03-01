import Image from "next/image";
import dog from "../images/dog.png";

export default function HowItWorks() {
  return (
    <div
      id="how-it-works"
      className="bg-black py-16 mt-16 border-t border-blue-900/20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-center font-light tracking-wider mb-12 text-blue-300">
          How Does It Work?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Step 1: Original Image */}
          <div className="bg-black p-6 rounded-lg shadow-lg border border-blue-900/20 transition-all hover:transform hover:translate-y-[-4px]">
            <h3 className="text-xl text-blue-300 mb-4 font-medium">
              Step 1: Original Image
            </h3>
            <div className="aspect-square bg-black rounded-lg overflow-hidden relative mb-4 border border-blue-900/40">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={dog}
                  alt="Example Image"
                  width={290}
                  height={290}
                  className="object-cover"
                />
              </div>
            </div>
            <p className="text-blue-100/80 text-sm">
              We start with your uploaded image - this could be any photo or
              graphic.
            </p>
          </div>

          {/* Step 2: Grayscale Conversion */}
          <div className="bg-black p-6 rounded-lg shadow-lg border border-blue-900/20 transition-all hover:transform hover:translate-y-[-4px]">
            <h3 className="text-xl text-blue-300 mb-4 font-medium">
              Step 2: Grayscale Conversion
            </h3>
            <div className="aspect-square bg-black rounded-lg overflow-hidden relative mb-4 border border-blue-900/40">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={dog}
                  alt="Grayscale Image"
                  width={300}
                  height={300}
                  className="object-cover grayscale"
                />
              </div>
            </div>
            <p className="text-blue-100/80 text-sm">
              The image is converted to grayscale, where each pixel has a value
              from 0 (black) to 1 (white).
            </p>
          </div>

          {/* Step 3: Pixel to Letter Mapping */}
          <div className="bg-black p-6 rounded-lg shadow-lg border border-blue-900/20 transition-all hover:transform hover:translate-y-[-4px]">
            <h3 className="text-xl text-blue-300 mb-4 font-medium">
              Step 3: Pixel to Letter Mapping
            </h3>
            <div className="aspect-square bg-black rounded-lg overflow-hidden relative mb-4 p-3 border border-blue-900/40">
              <div className="flex flex-col h-96  justify-center gap-2">
                <div className="text-blue-100/80 text-xs text-center mb-2">
                  Dividing grayscale range (0-1) into 26 equal bins:
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-300/80 text-xs">0.0</span>
                  <div className="h-2 flex-grow mx-1 bg-gradient-to-r from-black to-blue-100"></div>
                  <span className="text-blue-300/80 text-xs">1.0</span>
                </div>
                <div className="grid grid-cols-7 gap-1 mt-2">
                  {Array.from({ length: 26 }).map((_, i) => {
                    const letter = String.fromCharCode(97 + i); // a-z
                    const rangeStart = (i / 26).toFixed(2);
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center text-xs bg-blue-900/20 rounded p-1"
                      >
                        <span className="text-blue-300 font-bold">
                          {letter}
                        </span>
                        <span className="text-blue-100/60">{rangeStart}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="text-blue-100/80 text-xs text-center mt-4">
                  Example mappings:
                </div>
                <div className="flex justify-between">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-black rounded-full border border-blue-900/40 flex items-center justify-center">
                      <span className="text-xs text-blue-100/90">0.05</span>
                    </div>
                    <span className="text-blue-300 text-xs mt-1 block">
                      → a
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-black rounded-full border border-blue-900/40 flex items-center justify-center">
                      <span className="text-xs text-blue-100/90">0.42</span>
                    </div>
                    <span className="text-blue-300 text-xs mt-1 block">
                      → k
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-black rounded-full border border-blue-900/40 flex items-center justify-center">
                      <span className="text-xs text-blue-100/90">0.89</span>
                    </div>
                    <span className="text-blue-300 text-xs mt-1 block">
                      → w
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-blue-100/80 text-sm">
              Pixel values are mapped to letters (a-z) by dividing the 0-1 range
              into 26 equal bins.
            </p>
          </div>

          {/* Step 4: Generate String */}
          <div className="bg-black p-6 rounded-lg shadow-lg border border-blue-900/20 transition-all hover:transform hover:translate-y-[-4px]">
            <h3 className="text-xl text-blue-300 mb-4 font-medium">
              Step 4: Generate String
            </h3>
            <div className="aspect-square bg-black rounded-lg overflow-hidden relative mb-4 p-3 border border-blue-900/40">
              <div className="h-full overflow-hidden text-blue-300/70 text-xs flex flex-wrap">
                {/* Use fixed string to avoid hydration mismatch with random values */}
                {"abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"
                  .split("")
                  .map((letter, i) => (
                    <span key={i}>{letter}</span>
                  ))}
              </div>
            </div>
            <p className="text-blue-100/80 text-sm">
              The mapping generates a long string of letters from all pixels in
              the image.
            </p>
          </div>

          {/* Step 5: Word Extraction */}
          <div className="bg-black p-6 rounded-lg shadow-lg border border-blue-900/20 transition-all hover:transform hover:translate-y-[-4px]">
            <h3 className="text-xl text-blue-300 mb-4 font-medium">
              Step 5: Word Extraction
            </h3>
            <div className="aspect-square bg-black rounded-lg overflow-hidden relative mb-4 p-3 border border-blue-900/40">
              <div className="flex flex-col h-full justify-center space-y-2">
                <div className="text-blue-100/80 text-xs mb-2">
                  Words ordered by length and occurrence frequency:
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-8 bg-blue-900/20 rounded flex items-center justify-center text-blue-300 border border-blue-900/40">
                    butterfly
                  </div>
                  <div className="h-1 bg-blue-500/30 flex-grow mx-2"></div>
                  <div className="text-blue-100 text-sm">0.92</div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-8 bg-blue-900/20 rounded flex items-center justify-center text-blue-300 border border-blue-900/40">
                    mountain
                  </div>
                  <div className="h-1 bg-blue-500/30 flex-grow mx-2"></div>
                  <div className="text-blue-100 text-sm">0.84</div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-8 bg-blue-900/20 rounded flex items-center justify-center text-blue-300 border border-blue-900/40">
                    forest
                  </div>
                  <div className="h-1 bg-blue-500/30 flex-grow mx-2"></div>
                  <div className="text-blue-100 text-sm">0.76</div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-8 bg-blue-900/20 rounded flex items-center justify-center text-blue-300 border border-blue-900/40">
                    tree
                  </div>
                  <div className="h-1 bg-blue-500/30 flex-grow mx-2"></div>
                  <div className="text-blue-100 text-sm">0.68</div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-8 bg-blue-900/20 rounded flex items-center justify-center text-blue-300 border border-blue-900/40">
                    sky
                  </div>
                  <div className="h-1 bg-blue-500/30 flex-grow mx-2"></div>
                  <div className="text-blue-100 text-sm">0.54</div>
                </div>
              </div>
            </div>
            <p className="text-blue-100/80 text-sm">
              An algorithm detects English words in the string and scores them
              by length and frequency.
            </p>
          </div>

          {/* Step 6: Visualization */}
          <div className="bg-black p-6 rounded-lg shadow-lg border border-blue-900/20 transition-all hover:transform hover:translate-y-[-4px]">
            <h3 className="text-xl text-blue-300 mb-4 font-medium">
              Step 6: Visualization
            </h3>
            <div className="aspect-square bg-black rounded-lg overflow-hidden relative mb-4 border border-blue-900/40">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-3 p-3 w-full">
                  {[
                    { word: "butterfly", size: 22, weight: 500 },
                    { word: "mountain", size: 20, weight: 500 },
                    { word: "forest", size: 18, weight: 500 },
                    { word: "tree", size: 16, weight: 400 },
                    { word: "sky", size: 14, weight: 400 },
                    { word: "sun", size: 12, weight: 400 },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="text-center px-2 py-1 rounded-lg bg-blue-900/20 text-blue-300 border border-blue-900/40 flex items-center justify-center"
                      style={{
                        fontSize: item.size,
                        fontWeight: item.weight,
                      }}
                    >
                      {item.word}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-blue-100/80 text-sm">
              The words are displayed in a grid with font size reflecting their
              importance score.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-blue-100/80 max-w-2xl mx-auto">
            This technique creates a unique &quot;signature&quot; of words for
            each image. While not scientifically rigorous, it&apos;s a creative
            way to &quot;read&quot; the hidden textual patterns in visual
            content.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-6 text-sm px-4 py-2 rounded-md bg-blue-900/30 text-blue-100 hover:bg-blue-900/50 transition-all"
          >
            Try It Yourself
          </button>
        </div>
      </div>
    </div>
  );
}
