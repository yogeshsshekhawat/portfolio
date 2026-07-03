import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About Me', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#lets-talk' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 bg-[#f3f3f3]/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-sm font-black tracking-[0.15em] hover:opacity-70 transition-opacity font-outfit"
        >
          59 6(f + 7+ 5) 73 68
        </a>

        {/* Desktop Navigation Capsule */}
        <nav className="hidden md:flex items-center space-x-2 bg-white/40 border border-black/5 rounded-full p-1.5 shadow-sm">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-black/60 hover:text-black hover:bg-white transition-all duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Socials & Menu Toggle */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-3 text-black/70">
            <a href="https://github.com/yogeshsshekhawat" target="_blank" rel="noreferrer" className="hover:text-black transition-colors p-1.5 rounded-full hover:bg-white" aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href="https://www.fiverr.com/yogesh__singh_?public_mode=true" target="_blank" rel="noreferrer" className="hover:text-black transition-colors p-1.5 rounded-full hover:bg-white" aria-label="Fiverr">
              <FiverrIcon size={16} />
            </a>
            <a href="https://www.linkedin.com/in/yogesh-shekhawat-a1a66128b" target="_blank" rel="noreferrer" className="hover:text-black transition-colors p-1.5 rounded-full hover:bg-white" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href="https://www.instagram.com/yogesh__shekhawat_" target="_blank" rel="noreferrer" className="hover:text-black transition-colors p-1.5 rounded-full hover:bg-white" aria-label="Instagram">
              <Instagram size={16} />
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full bg-white border border-black/5 text-black hover:bg-black hover:text-white transition-colors duration-300 md:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-full left-0 w-full bg-[#f3f3f3] border-b border-black/10 py-6 px-8 flex flex-col space-y-4 md:hidden shadow-lg"
          >
            {navItems.map((item, index) => (
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-black/70 hover:text-black py-2 border-b border-black/5"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
              className="flex space-x-4 pt-2 text-black/60"
            >
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-black" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://fiverr.com" target="_blank" rel="noreferrer" className="hover:text-black" aria-label="Fiverr">
                <FiverrIcon size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-black" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
