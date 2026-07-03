import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import MarqueeSection from './components/MarqueeSection';
import FeaturedProjects from './components/FeaturedProjects';
import Technologies from './components/Technologies';
import Services from './components/Services';
import LetsTalk from './components/LetsTalk';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const cursorRef = useRef(null);
  const mainRef = useRef(null);
  const pathRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only add custom cursor follow on hover-capable devices (desktop)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      return;
    }

    const cursor = cursorRef.current;

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Expand cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-pointer');

    const onMouseEnter = () => {
      gsap.to(cursor, {
        scale: 2.2,
        backgroundColor: 'rgba(18, 18, 18, 0.05)',
        borderColor: 'rgba(18, 18, 18, 0.3)',
        duration: 0.3
      });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(18, 18, 18, 0.15)',
        duration: 0.3
      });
    };

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // Get the length of the dynamic weaving line
    const pathLength = path.getTotalLength();

    // Set initial dash attributes to hide the path
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    // Link the drawing of the line to scroll progress
    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: mainRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2
      }
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f3f3f3] bg-dotted text-[#121212] overflow-x-hidden selection:bg-[#121212] selection:text-white font-sans">
      {/* Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Custom follower cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-black/15 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-difference hidden md:block bg-transparent"
      />

      {/* Navigation Header */}
      <Header />

      {/* Content Sections */}
      <main ref={mainRef} className="relative z-10 w-full">
        {/* Scroll-Linked SVG Weaving Line */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="none"
          viewBox="0 0 100 1000"
        >
          <path
            ref={pathRef}
            d="M 15 0 C 15 150 85 100 85 250 C 85 400 15 350 15 500 C 15 650 85 600 85 750 C 85 900 50 950 50 1000"
            fill="none"
            stroke="rgba(18, 18, 18, 0.25)"
            strokeWidth="1.5"
          />
        </svg>

        <Hero />
        <MarqueeSection />
        <About />

        <FeaturedProjects />
        <Technologies />
        <Services />
        <LetsTalk />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
