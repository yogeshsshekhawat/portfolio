import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Services() {
  const [bgStyles, setBgStyles] = useState({});
  const timeoutsRef = useRef({});

  useEffect(() => {
    return () => {
      // Clean up all active timeouts on unmount
      Object.values(timeoutsRef.current).forEach(clearTimeout);
    };
  }, []);

  const services = [
    {
      num: '01',
      title: 'FULL STACK DEVELOPMENT (mern)'
    },
    {
      num: '02',
      title: 'Creative Frontend Animation & 3D Experiences'
    },
    // {
    //   num: '03',
    //   title: 'REST/GRAPHQL API DESIGN'
    // },
    // {
    //   num: '04',
    //   title: 'FRONTEND PERFORMANCE'
    // },
    {
      num: '03',
      title: 'AWS Cloud Infrastructure & Hosting Deployment'
    }
  ];

  const handleMouseEnter = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;
    const direction = y < height / 2 ? 'top' : 'bottom';

    if (timeoutsRef.current[index]) {
      clearTimeout(timeoutsRef.current[index]);
    }

    // 1. Immediately position offscreen without transition
    setBgStyles((prev) => ({
      ...prev,
      [index]: {
        transform: direction === 'top' ? 'translateY(-100%)' : 'translateY(100%)',
        transition: 'none'
      }
    }));

    // 2. Animate to center in the next tick
    timeoutsRef.current[index] = setTimeout(() => {
      setBgStyles((prev) => ({
        ...prev,
        [index]: {
          transform: 'translateY(0)',
          transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)'
        }
      }));
    }, 20);
  };

  const handleMouseLeave = (e, index) => {
    if (timeoutsRef.current[index]) {
      clearTimeout(timeoutsRef.current[index]);
      delete timeoutsRef.current[index];
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;
    const direction = y < height / 2 ? 'top' : 'bottom';

    // Animate out to the exit direction
    setBgStyles((prev) => ({
      ...prev,
      [index]: {
        transform: direction === 'top' ? 'translateY(-100%)' : 'translateY(100%)',
        transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }));
  };

  return (
    <section
      id="services"
      className="py-24 px-6 md:px-12 border-black/5 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between mb-16 gap-6 md:gap-0">

        {/* Left: Heading */}
        <div className="w-full md:w-1/2">
          <h2 className="text-sm font-bold tracking-widest text-black/30 uppercase mb-2">Our Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase text-[#121212] tracking-tighter font-outfit leading-none">
            The Services i Provide
          </h3>
        </div>

        {/* Right: Subtitle statement */}
        <div className="w-full md:w-1/2 text-left md:text-right">
          <p className="text-xs font-bold uppercase tracking-wider text-black/60 leading-relaxed md:max-w-md ml-0 md:ml-auto">
            Delivering end-to-end web solutions—combining premium UI/UX design and scalable full-stack architecture to help businesses grow.
          </p>
        </div>

      </div>

      {/* Services List */}
      <div className="flex flex-col border-t border-black/10 mt-8">
        {services.map((service, index) => (
          <div
            key={index}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
            onMouseLeave={(e) => handleMouseLeave(e, index)}
            className="group relative w-full border-b border-black/10 py-8 px-6 md:px-10 overflow-hidden cursor-pointer select-none"
          >
            {/* Dynamic Background slide-up/down layer */}
            <div
              className="absolute inset-0 bg-[#121212] z-0 pointer-events-none"
              style={bgStyles[index] || { transform: 'translateY(100%)', transition: 'none' }}
            />

            {/* Row Content */}
            <div className="relative z-10 flex items-center justify-between pointer-events-none">
              <div className="flex items-center space-x-6 md:space-x-8 transform group-hover:translate-x-3 transition-transform duration-500 ease-in-out">
                <span className="text-xs font-black tracking-widest font-outfit text-black/30 group-hover:text-white/40 transition-colors duration-500 ease-in-out">
                  {service.num}
                </span>
                <span className="text-sm md:text-base lg:text-lg font-black uppercase tracking-widest font-outfit text-[#121212] group-hover:text-white transition-colors duration-500 ease-in-out">
                  {service.title}
                </span>
              </div>

              {/* Arrow Icon */}
              <div className="flex items-center  justify-center  ">
                <ArrowRight
                  size={20}
                  className=" text-black/40 group-hover:text-white transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
