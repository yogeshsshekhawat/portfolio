import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Briefcase, Cpu, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const gridItemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text slide-up & fade-in
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Word-by-word scroll reveal animation
      const wordElements = descRef.current.querySelectorAll('.reveal-word');
      gsap.fromTo(wordElements,
        { opacity: 0, color: '#ffffff' },
        {
          opacity: 1,
          color: '#000000',
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: true,
          }
        }
      );

      // 2. Grid metrics anim
      gsap.fromTo(gridItemsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !gridItemsRef.current.includes(el)) {
      gridItemsRef.current.push(el);
    }
  };

  const aboutText = "Hi! I'm a software developer and B.Tech student based in India. I bridge the gap between intuitive design and robust backend engineering. I work as a freelancer delivering high-quality web solutions, and I'm an active DSA solver constantly honing my problem-solving skills. Whether I'm implementing AI integrations, perfecting a modern user interface, or writing efficient C++ logic, I love turning complex problems into elegant software.";
  const words = aboutText.split(' ');

  const metrics = [
    { value: '10+', label: 'Projects Built', icon: Briefcase },
    { value: '100+', label: 'DSA Problems Solved', icon: Cpu },
    { value: '5+', label: 'Years of Coding', icon: Code }
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 px-6 md:px-12 border-black/5 relative max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">

        {/* Left Side: Description (with word by word reveal) */}
        <div ref={descRef} className="w-full h-auto">
          <p className="text-[clamp(15px,1.8vw,32px)] font-bold tracking-wider leading-relaxed pt-2 text-black font-light">
            {words.map((word, idx) => (
              <span
                key={idx}
                className="reveal-word inline-block mr-1.5"
                style={{ opacity: 0, color: '#ffffff' }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Right Side: "ABOUT" Title with Arrow Icon */}
        <div ref={headingRef} className="flex items-center justify-end gap-4 space-x-4  ">
          {/* <h2 className="text-[3vw] md:text-[3vw] font-black uppercase leading-none tracking-tighter text-[#121212] font-outfit">
            About
          </h2> */}
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-300 shadow-sm cursor-pointer transform -rotate-45">
            <ArrowUpRight size={28} />
          </div>
        </div>

      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              ref={addToRefs}
              className="relative group p-8 md:p-10 flex flex-col justify-between items-start rounded-2xl border border-black/5 bg-white/40 backdrop-blur-md shadow-sm hover:shadow-xl hover:border-black/20 hover:-translate-y-2 transition-all duration-500 cursor-default overflow-hidden"
            >
              {/* Background decorative glow on hover */}
              <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-black/5 blur-2xl group-hover:bg-black/10 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
              
              {/* Top Row: Icon and Number Tag */}
              <div className="flex justify-between items-center w-full mb-8 z-10">
                <div className="p-3 rounded-xl bg-white border border-black/[0.06] text-black/60 shadow-sm group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-500">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs font-bold text-black/20 tracking-wider">
                  {`0${idx + 1}`}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="z-10 mt-auto">
                <span className="block text-5xl md:text-6xl font-black text-[#121212] tracking-tighter font-outfit mb-2 group-hover:scale-[1.03] transition-transform duration-300">
                  {metric.value}
                </span>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-black/40 group-hover:text-black/80 transition-colors duration-300">
                  {metric.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
