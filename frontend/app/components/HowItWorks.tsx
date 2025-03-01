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
            <p className="text-blue-100/80 text-med text-center">
              Uploaded image
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
            <p className="text-blue-100/80 text-med">
              Convert to grayscale, where each pixel has a value from 0 (black)
              to 1 (white)
            </p>
          </div>

          {/* Step 3: Pixel to Letter Mapping */}
          <div className="bg-black p-6 rounded-lg shadow-lg border border-blue-900/20 transition-all hover:transform hover:translate-y-[-4px]">
            <h3 className="text-xl text-blue-300 mb-4 font-medium">
              Step 3: Pixel to Letter Mapping
            </h3>
            <div className="aspect-square bg-black rounded-lg overflow-hidden relative mb-4 p-3 border border-blue-900/40">
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
                  const letter = String.fromCharCode(97 + i);
                  const rangeStart = (i / 26).toFixed(2);
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center text-xs bg-blue-900/20 rounded p-1"
                    >
                      <span className="text-blue-300 font-bold">{letter}</span>
                      <span className="text-blue-100/60">{rangeStart}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="text-blue-100/80 text-med">
              Divide the grayscale range (0-1) into 26 equal bins and randomly
              assign a letter to each bin
            </p>
          </div>

          {/* Step 4: Generate String */}
          <div className="bg-black p-6 rounded-lg shadow-lg border border-blue-900/20 transition-all hover:transform hover:translate-y-[-4px] md:col-span-1">
            <h3 className="text-xl text-blue-300 mb-4 font-medium">
              Step 4: Generate String
            </h3>
            <div className="aspect-square bg-black rounded-lg overflow-hidden relative mb-4 p-3 border border-blue-900/40">
              <div className="h-full overflow-auto text-blue-300/90 text-xs leading-relaxed whitespace-pre">
                {/* Multiline block of mapped text that fits better */}
                <p>abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrst</p>
                <p>zyxwvutsrqponmlkjihgfedcbazyxwvutsrqponmlkjihg</p>
                <p>qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklz</p>
                <p>mnbvcxzlkjhgfdsapoiuytrewqmnbvcxzlkjhgfdsapoiu</p>
                <p>abcmnopqrstuvwxydefghijklzabcmnopqrstuvwxydefg</p>
                <p>zyxmlkjihgfedcbawvutsrqponzyxmlkjihgfedcbawvut</p>
                <p>qazwsxedcrfvtgbyhnujmikolpqazwsxedcrfvtgbyhnuj</p>
                <p>plokimjunhybgtvfrcdexswzaqplokimjunhybgtvfrcdex</p>
                <p>aeiouybcdfghjklmnpqrstvwxzaeiouybcdfghjklmnpqrs</p>
                <p>zxwvtsrqpnmlkjhgfdcbyuoieazxwvtsrqpnmlkjhgfdcby</p>
                <p>abcdefzyxwvumlkjitsrqponghabcdefzyxwvumlkjitsrq</p>
                <p>zyxwvuabcdefmlkjitsrqponghazyxwvuabcdefmlkjitsr</p>
                <p>qwertymnbvcxasdfghuioplkjzqwertymnbvcxasdfghuio</p>
                <p>mnbvcxqwertyasdfghuioplkjzmnbvcxqwertyasdfghuio</p>
              </div>
            </div>
            <p className="text-blue-100/80 text-med">
              The mapping generates a long string of letters from all pixels in
              the image
            </p>
          </div>

          {/* Step 5: Word Extraction */}
          <div className="bg-black p-6 rounded-lg shadow-lg border border-blue-900/20 transition-all hover:transform hover:translate-y-[-4px] md:col-span-1">
            <h3 className="text-xl text-blue-300 mb-4 font-medium">
              Step 5: Word Extraction
            </h3>
            <div className="aspect-square bg-black rounded-lg overflow-hidden relative mb-4 p-3 border border-blue-900/40">
              <div className="flex flex-col h-full justify-center space-y-2">
                <div className="flex items-center">
                  <div className="w-16 h-8 bg-blue-900/20 rounded flex items-center justify-center text-blue-300 border border-blue-900/40">
                    butterfly
                  </div>
                  <div className="h-1 bg-blue-500/30 flex-grow mx-2"></div>
                  <div className="text-blue-100 text-sm">9</div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-8 bg-blue-900/20 rounded flex items-center justify-center text-blue-300 border border-blue-900/40">
                    mountain
                  </div>
                  <div className="h-1 bg-blue-500/30 flex-grow mx-2"></div>
                  <div className="text-blue-100 text-sm">8</div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-8 bg-blue-900/20 rounded flex items-center justify-center text-blue-300 border border-blue-900/40">
                    forest
                  </div>
                  <div className="h-1 bg-blue-500/30 flex-grow mx-2"></div>
                  <div className="text-blue-100 text-sm">6</div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-8 bg-blue-900/20 rounded flex items-center justify-center text-blue-300 border border-blue-900/40">
                    blue
                  </div>
                  <div className="h-1 bg-blue-500/30 flex-grow mx-2"></div>
                  <div className="text-blue-100 text-sm">4</div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-8 bg-blue-900/20 rounded flex items-center justify-center text-blue-300 border border-blue-900/40">
                    sky
                  </div>
                  <div className="h-1 bg-blue-500/30 flex-grow mx-2"></div>
                  <div className="text-blue-100 text-sm">3</div>
                </div>
              </div>
            </div>
            <p className="text-blue-100/80 text-med">
              Run an algorithm to get all substrings that make a word in this
              long string
            </p>
          </div>
          {/* Step 6: Signature */}
          <div className="bg-black p-6 rounded-lg shadow-lg border border-blue-900/20 transition-all hover:transform hover:translate-y-[-4px] md:col-span-1">
            <h3 className="text-xl text-blue-300 mb-4 font-medium">
              Step 6: Output
            </h3>
            <p className="text-blue-100/80 text-med">
              This creates a unique &quot;signature&quot; of words for each
              image.
            </p>
            <p className="text-blue-100/80 text-med ">
              The random seed is generated from the current date, so it is
              different every day
            </p>
            <p className="text-blue-100/80 text-med">
              Meaning, if your image means something different every day :D
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-blue-100/80 max-w-2xl mx-auto">
            Thanks to{" "}
            <a
              href="https://sarthakmangla.com"
              target="_blank"
              className="underline"
            >
              Sarthak Mangla
            </a>{" "}
            for the idea
          </p>
        </div>
      </div>
    </div>
  );
}
