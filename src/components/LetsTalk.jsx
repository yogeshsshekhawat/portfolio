import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LetsTalk() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const buttonRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for left column contents
      gsap.fromTo(leftColRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Entrance animation for form fields
      gsap.fromTo(rightColRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button animation
  const handleMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill in all fields.');
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey || accessKey === 'your_access_key_here' || accessKey.trim() === '') {
      setStatus('Error: Please configure VITE_WEB3FORMS_ACCESS_KEY in your .env file.');
      return;
    }

    setStatus('Sending...');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus('Message sent successfully! Thank you.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('Failed to send message. Please check your connection.');
    }
  };

  return (
    <section
      id="lets-talk"
      ref={containerRef}
      className="py-24 px-6 md:px-12  border-black/10 max-w-7xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start gap-16">

        {/* Left Side: General Info & Contact details */}
        <div ref={leftColRef} className="w-full lg:w-1/2 flex flex-col space-y-10">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-black/30 uppercase mb-2">Get In Touch</h2>
            <h3 className="text-5xl md:text-6xl font-black uppercase text-[#121212] tracking-tighter font-outfit leading-none">
              Let's build <br />something <br />
              <span className="text-outline-black text-black/15 font-light">exceptional</span> <br />
              together
            </h3>
          </div>

          <div className="flex flex-col space-y-6">
            <div>
              <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest font-outfit">Email me at</p>
              <a
                href="mailto:yogeshshekhawat117@gmail.com"
                className="text-sm md:text-lg font-black text-[#121212] hover:text-black/60 transition-colors uppercase tracking-wider font-outfit mt-1 inline-block"
              >
                yogeshshekhawat117@gmail.com ↗
              </a>
            </div>

            <div>
              <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest font-outfit">Current Location</p>
              <p className="text-sm font-bold text-black/75 uppercase tracking-wider font-outfit mt-1">
                Indore, Madhya Pradesh, India
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="w-full lg:w-1/2">
          <form ref={rightColRef} onSubmit={handleSubmit} className="flex flex-col space-y-8 w-full">

            {/* Name Input */}
            <div className="flex flex-col relative group">
              <label
                htmlFor="name"
                className="text-[10px] font-bold text-black group-focus-within:text-black uppercase tracking-widest font-outfit transition-colors"
              >
                01 / What is your name?
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="bg-transparent border-b border-black/10 focus:border-black py-4 text-sm tracking-wide text-black placeholder-black/25 focus:outline-none transition-all duration-300 w-full"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col relative group">
              <label
                htmlFor="email"
                className="text-[10px] font-bold text-black group-focus-within:text-black uppercase tracking-widest font-outfit transition-colors"
              >
                02 / What is your email address?
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="bg-transparent border-b border-black/10 focus:border-black py-4 text-sm tracking-wide text-black placeholder-black/25 focus:outline-none transition-all duration-300 w-full"
              />
            </div>

            {/* Message Input */}
            <div className="flex flex-col relative group">
              <label
                htmlFor="message"
                className="text-[10px] font-bold text-black group-focus-within:text-black uppercase tracking-widest font-outfit transition-colors"
              >
                03 / Tell me about your project or message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi Yogesh, I'm looking to build a new portfolio web experience..."
                className="bg-transparent border-b border-black/10 focus:border-black py-4 text-sm tracking-wide text-black placeholder-black/25 focus:outline-none resize-none transition-all duration-300 w-full"
              />
            </div>

            {/* Status Feedback */}
            {status && (
              <p className={`text-xs font-bold tracking-wider font-outfit uppercase ${status.includes('success') ? 'text-emerald-600' : status.includes('Sending') ? 'text-black/60' : 'text-rose-600'
                }`}>
                {status}
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-4 flex justify-start">
              <button
                ref={buttonRef}
                type="submit"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="px-8 py-4 rounded-full border border-black/15 bg-[#121212] text-white hover:bg-neutral-800 transition-colors duration-300 text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center gap-2 shadow-sm font-outfit"
              >
                Send Message <ArrowUpRight size={16} />
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
