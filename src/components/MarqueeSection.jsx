import React from 'react';

export default function MarqueeSection() {
  const line1Items = Array(6).fill("YOGESH SHEKHAWAT");
  const line2Items = Array(4).fill(["DEVELOPER", "FREELANCER", "DSA SOLVER", "CREATIVE CODER"]).flat();

  return (
    <section className="relative w-full    py-10  overflow-hidden z-20">
      {/* Rotated Container */}
      <div className="flex flex-col gap-6 md:gap-10 -rotate-3 scale-105 origin-center py-4 ">

        {/* Row 1: Scrolls Left */}
        <div className="w-full overflow-hidden flex">
          <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] cursor-pointer">
            {/* Track 1 */}
            <div className="flex items-center whitespace-nowrap text-4xl md:text-7xl lg:text-8xl font-black font-outfit tracking-tighter uppercase select-none">
              {line1Items.map((text, idx) => (
                <React.Fragment key={idx}>
                  <span className={idx % 2 === 0 ? "text-black font-light" : "text-outline-black font-light"}>
                    {text}
                  </span>
                  <span className="text-[2vw] mx-6 md:mx-10">⚫</span>
                </React.Fragment>
              ))}
            </div>
            {/* Track 1 Duplicate */}
            <div className="flex items-center whitespace-nowrap text-4xl md:text-7xl lg:text-8xl font-black font-outfit tracking-tighter uppercase select-none">
              {line1Items.map((text, idx) => (
                <React.Fragment key={`dup-${idx}`}>
                  <span className={idx % 2 === 0 ? "text-black font-light" : "text-outline-black font-light"}>
                    {text}
                  </span>
                  <span className="text-[2vw] mx-6 md:mx-10">⚫</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Scrolls Right */}
        <div className="w-full overflow-hidden flex">
          <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused] cursor-pointer">
            {/* Track 2 */}
            <div className="flex items-center whitespace-nowrap text-4xl md:text-7xl lg:text-8xl font-black font-outfit tracking-tighter uppercase select-none">
              {line2Items.map((text, idx) => (
                <React.Fragment key={idx}>
                  <span className={idx % 2 === 0 ? "text-outline-black font-light" : "text-[blue] font-light"}>
                    {text}
                  </span>
                  <span className="text-[4vw] mx-6 md:mx-10">🧑🏻‍💻</span>
                </React.Fragment>
              ))}
            </div>
            {/* Track 2 Duplicate */}
            <div className="flex items-center whitespace-nowrap text-4xl md:text-7xl lg:text-8xl font-black font-outfit tracking-tighter uppercase select-none">
              {line2Items.map((text, idx) => (
                <React.Fragment key={`dup-${idx}`}>
                  <span className={idx % 2 === 0 ? "text-outline-black font-light" : "text-[blue] font-light"}>
                    {text}
                  </span>
                  <span className="text-[4vw] mx-6 md:mx-10">🧑🏻‍💻</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
