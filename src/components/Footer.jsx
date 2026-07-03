import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Instagram } from 'lucide-react';

function FiverrIcon({ size = 16, className = "" }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Fiverr</title>
      <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.505 0-1.425.966-2.508 2.539-2.508 1.62 0 2.372 1.025 2.372 2.39h-.002v.487zm-1.572-.741c-.01-.468-.273-.78-.79-.78-.497 0-.819.302-.878.78h1.668zm-5.077-2.261h1.56l-1.93 4.874H6.883l-1.93-4.874h1.57l1.102 3.197 1.085-3.197zm-5.698 1.258V9.3h-1.56v1.341H.302v1.171h1.01v2.361c0 1.268.683 1.921 1.921 1.921.41 0 .741-.058.986-.146v-1.19a1.69 1.69 0 0 1-.507.078c-.537 0-.79-.273-.79-.819v-2.205h1.297z" />
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

function StaggeredLink({ href, text, target, rel, icon: Icon }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="group relative inline-flex items-center gap-2 overflow-hidden h-[18px]"
    >
      {Icon && (
        <Icon size={12} className="text-white/40 group-hover:text-white transition-colors duration-300" />
      )}
      <span className="inline-flex">
        {text.split("").map((char, idx) => (
          <span
            key={idx}
            className="relative inline-block overflow-hidden h-[18px]"
          >
            <span
              className="flex flex-col transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2"
              style={{ transitionDelay: `${idx * 20}ms` }}
            >
              <span className="h-[18px] flex items-center transition-colors duration-300">
                {char === " " ? "\u00A0" : char}
              </span>
              <span className="h-[18px] flex items-center text-white">
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          </span>
        ))}
      </span>
    </a>
  );
}

export default function Footer() {
  const footerRef = useRef(null);
  const thankYouRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text slide-up with ScrollTrigger
      gsap.fromTo(thankYouRef.current,
        { scale: 0.9, opacity: 0.5, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const socials = [
    { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/yogesh-shekhawat-a1a66128b', icon: Linkedin },
    { name: 'GITHUB', url: 'https://github.com/yogeshsshekhawat', icon: Github },
    { name: 'INSTAGRAM', url: 'https://www.instagram.com/yogesh__shekhawat_', icon: Instagram },
    { name: 'FIVERR', url: 'https://www.fiverr.com/yogesh__singh_?public_mode=true', icon: FiverrIcon },
  ];
  const bottomPills = ['INSTAGRAM', 'DRIBBBLE', 'LINKEDIN', 'CONTACT ME'];

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="bg-[#0e0e0e] text-white px-6 pt-8 pb-12 md:pb-8 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between items-center min-h-[450px]">

        {/* Top Row: Brand & statement on left, sitemap & socials on right */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 pb-12 border-b border-white/10">

          {/* Top Left: Brand/Logo & Statement */}
          <div className="flex flex-col space-y-4 max-w-sm">
            <span className="text-white font-black text-lg tracking-[0.15em] font-outfit">✦ YOGESH SHEKHAWAT</span>
            <p className="text-xs font-semibold text-white/50 leading-relaxed uppercase tracking-wider">
              A creative full-stack developer crafting immersive web experiences, robust system architectures, and performant user interfaces with absolute precision.
            </p>
          </div>

          {/* Top Right: Sitemap Navigation & Socials */}
          <div className="flex flex-row gap-16 md:gap-28">

            {/* Sitemap/Navigation column */}
            <div className="flex flex-col space-y-4">
              {/* <span className="text-white/30 text-[9px] font-black uppercase tracking-[0.25em] font-outfit">Sitemap</span> */}
              <div className="flex flex-col space-y-2 text-white/50 text-[10px] font-extrabold tracking-[0.2em] font-outfit uppercase">
                {['HOME', 'ABOUT', 'SERVICES', 'PROJECTS', 'CONTACT'].map((item, idx) => {
                  const href = `#${item === 'ABOUT' ? 'about' : item === 'PROJECTS' ? 'projects' : item.toLowerCase()}`;
                  return (
                    <StaggeredLink
                      key={idx}
                      href={href}
                      text={item}
                    />
                  );
                })}
              </div>
            </div>

            {/* Socials column */}
            <div className="flex flex-col space-y-4">
              {/* <span className="text-white/30 text-[9px] font-black uppercase tracking-[0.25em] font-outfit">Socials</span> */}
              <div className="flex flex-col space-y-2 text-white/50 text-[10px] font-extrabold tracking-[0.2em] font-outfit uppercase">
                {socials.map((s, idx) => (
                  <StaggeredLink
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    text={s.name}
                    icon={s.icon}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Central Giant "THANK YOU" Rolling Text on Hover (Staggered letter-by-letter) */}
        <div
          ref={thankYouRef}
          className="my-20 text-center select-none w-full group cursor-pointer"
        >
          <div className="inline-flex justify-center items-center w-full py-2">
            {"THANK YOU".split("").map((char, idx) => (
              <span
                key={idx}
                className="relative inline-block overflow-hidden h-[12vw] md:h-[10vw]"
              >
                <span
                  className="flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2"
                  style={{ transitionDelay: `${idx * 30}ms` }}
                >
                  <span className="text-[12vw] md:text-[10vw] font-black tracking-tighter leading-none font-outfit uppercase text-outline-white">
                    {char === " " ? "\u00A0" : char}
                  </span>
                  <span className="text-[12vw] md:text-[10vw] font-black tracking-tighter leading-none font-outfit uppercase text-white">
                    {char === " " ? "\u00A0" : char}
                  </span>
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        {/* <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10 mt-12">
          <p className="text-[10px] font-bold tracking-widest text-white/40 font-outfit uppercase">
            © YOGESH SHEKHAWAT 2026. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] font-bold tracking-widest text-white/20 font-outfit uppercase">
            DESIGN BY SAHL DOMDYA
          </p>
        </div> */}

      </div>
    </footer>
  );
}
