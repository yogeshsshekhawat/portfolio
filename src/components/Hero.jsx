import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';
import profileImg from '../assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [time, setTime] = useState('');
  const heroRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const imgContainerRef = useRef(null);
  const imgRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(title1Ref.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.2 }
      );

      tl.fromTo(title2Ref.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          onComplete: () => {
            if (title1Ref.current && title2Ref.current) {
              title1Ref.current.parentElement.style.overflow = 'visible';
              title2Ref.current.parentElement.style.overflow = 'visible';
            }
          }
        },
        '-=0.9'
      );

      tl.fromTo(imgContainerRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: 'power3.out' },
        '-=1.1'
      );

      tl.fromTo([leftColRef.current.children, rightColRef.current.children],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, stagger: 0.1 },
        '-=0.8'
      );

      // 2. Continuous bobbing animation for arrow
      gsap.to(arrowRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'power1.inOut'
      });

      // 3. ScrollTrigger Parallax Animations
      // Parallax scroll for the main face image
      gsap.to(imgRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

    }, heroRef);

    // Live clock logic
    const updateClock = () => {
      const now = new Date();
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  // Magnetic effect on Arrow button
  const handleMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (e) => {
    const btn = e.currentTarget;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen pt-28  px-6 md:px-12 flex flex-col justify-between max-w-7xl mx-auto overflow-hidden"
    >
      {/* Giant Typography Header */}
      <div className="w-full text-center relative z-10 select-none">
        <h1 className="overflow-hidden leading-[0.9]">
          <span
            ref={title1Ref}
            className="block text-[8vw] font-light uppercase tracking-tighter text-outline-black text-black/10"
          >
            Explore My
          </span>
        </h1>
        <h1 className="overflow-hidden leading-[0.9]">
          <span
            ref={title2Ref}
            className="block text-[11vw] font-light uppercase tracking-tighter text-outline-black text-black/10"
          >
            Portfolio
          </span>
        </h1>
      </div>

      {/* Main Grid: Left Column, Spacer, Right Column */}
      <div className="flex min-h-fit md:h-[90vh] flex-col md:flex-row justify-between items-center gap-8 mt-6 md:-mt-6 relative z-30 w-full">

        {/* Left Column: Metadata + Scroll Indicator */}
        <div
          ref={leftColRef}
          className="w-full h-auto md:h-[70vh] flex flex-col justify-center gap-12 md:gap-20 md:w-1/4 items-center md:items-start space-y-8 text-center md:text-left order-2 md:order-1 md:-translate-y-24"
        >
          <div className="">
            <div>
              <p className="text-xs font-bold tracking-widest text-black/30 uppercase font-outfit"> Software Developer </p>
              <p className="text-xs font-bold tracking-widest text-black/30 uppercase font-outfit">& Freelancer </p>
            </div>

            <a
              href="#about"
              ref={arrowRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full mt-5 border border-black/10 hidden md:flex items-center justify-center text-black/60 hover:bg-black hover:text-white hover:border-black transition-colors duration-300 shadow-sm bg-white/50 cursor-pointer"
            >
              <ArrowDownRight className="w-5 h-5 md:w-7 md:h-7" />
            </a>
          </div>

          {/* Availability & Location Ticker */}
          <div className="flex flex-col space-y-4 pt-6 border-black/5 w-full max-w-[200px] text-center md:text-left">
            <div>
              <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest font-outfit">Based in</p>
              <p className="text-xs font-black text-black/75 uppercase tracking-wider font-outfit mt-1">
                indore, India
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest font-outfit">Local Time</p>
              <p className="text-xs font-semibold text-black/75 font-mono tracking-wider mt-1">
                {time || '00:00:00 AM'}
              </p>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-2 pt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 font-outfit">
                Available for work
              </span>
            </div>
          </div>
        </div>

        {/* Center Spacer: Makes space for absolute image */}

        {/* Floating Center Transparent Portrait (ABOVE the text) */}
        <div
          ref={imgContainerRef}
          className="relative md:absolute left-auto md:left-1/2 top-0 md:top-5 translate-x-0 md:-translate-x-1/2 w-[95vw] max-w-[420px] md:max-w-none md:w-[90vw] z-20 pointer-events-none flex justify-center items-end overflow-visible order-1 md:order-none"
        >
          <img
            ref={imgRef}
            src={profileImg}
            alt="Profile img "
            className="h-full w-full object-contain filter grayscale contrast-[1.12]"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
            }}
          />
        </div>

        {/* Right Column: Statement + Discipline Menu */}
        <div
          ref={rightColRef}
          className="w-full md:w-1/4 flex gap-12 md:gap-40 flex-col items-center md:items-end space-y-10 text-center md:text-right order-3"
        >
          <p className="text-xs font-semibold text-black/60 leading-relaxed uppercase tracking-wider max-w-[200px]">
            I am passionate about creating software that stands out from the crowd.
          </p>

          <div className="flex flex-col space-y-2 w-full max-w-[220px]">
            {['FRONTEND DEV', 'BACKEND DEV', 'MERN STACK', 'DSA', 'DEVOPS'].map((skill, index) => (
              <div
                key={index}
                className="group py-2 border-b border-black/5 flex justify-between md:justify-end items-center cursor-pointer hover:border-black/30 transition-colors"
              >
                <span className="text-[10px] text-black/30 group-hover:text-black/80 font-bold tracking-widest mr-4 font-outfit">
                  {`0${index + 1}`}
                </span>
                <span className="text-xs font-bold tracking-widest text-black/75 group-hover:text-black group-hover:translate-x-[-4px] transition-transform duration-300">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>



      {/* Decorative Minimal Grid lines */}
      {/* <div className="absolute inset-0 border-x border-black/[0.02] max-w-7xl mx-auto pointer-events-none"></div> */}
    </section>
  );
}
