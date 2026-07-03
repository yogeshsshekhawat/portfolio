import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import cloudImg from '../assets/project-cloud.png';
import chatImg from '../assets/project-chat.png';
import furnitureImg from '../assets/project-furniture.png';
import solarImg from '../assets/project-solar.png';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const projects = [
    {
      id: 1,
      title: 'CLOUD VAULT',
      subtitle: 'SECURE FILES STORAGE & BACKUP PLATFORM',
      description: 'A next-generation secure cloud storage solution utilizing end-to-end encryption. Built for high performance, zero-knowledge security, and seamless sharing.',
      category: 'CLOUD',
      image: cloudImg,
      tag: 'WEB APP',
      techs: ['React', 'Node.js', 'AWS', 'Tailwind']
    },
    {
      id: 2,
      title: 'CHAT APP',
      subtitle: 'REAL-TIME CHAT & COLLABORATION UTILITY',
      description: 'A blazing fast real-time chat application with workspace channels, direct messages, and media sharing. Built using WebSocket for instant communication.',
      category: 'CHAT',
      image: chatImg,
      tag: 'SPA WEB',
      techs: ['React', 'Socket.io', 'Express', 'MongoDB']
    },
    // {
    //   id: 3,
    //   title: 'COZY DWELLINGS',
    //   subtitle: 'FURNITURE E-COMMERCE & DESIGN PLATFORM',
    //   description: 'An immersive digital shopping experience featuring interactive 3D product previews and customized interior design matching algorithms.',
    //   category: 'DESIGN',
    //   image: furnitureImg,
    //   tag: 'E-COMMERCE',
    //   techs: ['Next.js', 'Three.js', 'Stripe', 'Tailwind']
    // },
    // {
    //   id: 4,
    //   title: 'SOLARIS ENERGY',
    //   subtitle: 'RENEWABLE ENERGY ANALYTICS DASHBOARD',
    //   description: 'Real-time monitoring and analytics tool for solar array efficiency and output modeling. Helps operators optimize grid feedback and battery storage.',
    //   category: 'ANALYTICS',
    //   image: solarImg,
    //   tag: 'DASHBOARD',
    //   techs: ['Vite', 'D3.js', 'TypeScript', 'Tailwind']
    // }
  ];

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Set initial offscreen positions for stackable cards (indexes 1+)
      gsap.set(cards.slice(1), { yPercent: 150 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * (cards.length - 1) * 0.95}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const label = `card-${index}`;

        // Slide the current card up
        tl.to(card, {
          yPercent: 0,
          ease: 'none',
        }, label);

        // Scale down, dim, and translate up the previous cards to form the stack
        for (let j = 0; j < index; j++) {
          const factor = index - j;
          tl.to(cards[j], {
            scale: 1 - factor * 0.035,
            yPercent: -factor * 3.5,
            opacity: 1 - factor * 0.15,
            ease: 'none',
          }, label);
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="w-full min-h-screen border-black/5 flex items-center justify-center py-20 md:py-16 overflow-visible md:overflow-hidden"
    >
      <div className="w-full max-w-7xl px-4 md:px-12 flex flex-col h-auto md:h-[80vh] justify-between gap-8">
        {/* Header Row */}
        <div>
          <h2 className="text-xs md:text-sm font-bold tracking-widest text-black/30 uppercase mb-1">Portfolio Works</h2>
          <h3 className="text-3xl md:text-5xl font-black uppercase text-[#121212] tracking-tighter font-outfit">
            Featured Projects
          </h3>
        </div>

        {/* Projects Stack Container */}
        <div className="relative md:flex-1 w-full mt-8 flex flex-col md:block gap-12 min-h-fit md:min-h-[500px]">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{
                zIndex: (index + 1) * 10,
              }}
              className="relative md:absolute md:inset-0 w-full h-auto md:h-full group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-md flex flex-col md:flex-row transform-gpu origin-top"
            >
              {/* Left Panel: Content */}
              <div className="w-full md:w-[45%] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between gap-6 h-auto md:h-full">
                <div className="space-y-2 md:space-y-4">
                  <span className="text-[10px] md:text-xs font-black tracking-widest text-black/40 uppercase block">
                    {project.tag}
                  </span>
                  <h4 className="text-xl md:text-3xl lg:text-4xl font-black uppercase text-[#121212] tracking-tight font-outfit leading-none">
                    {project.title}
                  </h4>
                  <p className="text-[11px] md:text-xs font-bold text-black/70 uppercase tracking-wide">
                    {project.subtitle}
                  </p>
                  <p className="text-xs md:text-sm font-medium text-black/50 leading-relaxed max-w-md block">
                    {project.description}
                  </p>
                </div>

                <div className="mt-3 md:mt-6 space-y-3 md:space-y-6">
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1 md:gap-1.5">
                    {project.techs.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] md:text-[10px] font-bold tracking-wider px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-black/5 bg-neutral-50 text-black/60 uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project Button */}
                  <button className="flex items-center gap-2 group/btn border border-black/15 hover:border-black bg-white hover:bg-[#121212] hover:text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 w-fit">
                    <span>View Project</span>
                    <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Right Panel: Image */}
              <div className="w-full md:w-[55%] h-[220px] sm:h-[300px] md:h-full bg-neutral-100 overflow-hidden relative border-t md:border-t-0 md:border-l border-black/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover filter grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/5 opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
