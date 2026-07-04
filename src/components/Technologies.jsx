import React, { useRef, useState, useEffect } from 'react';
import { Engine, World, Bodies, Runner, Mouse, MouseConstraint, Body, Events } from 'matter-js';

export default function Technologies() {
  const containerRef = useRef(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const [inView, setInView] = useState(false);

  const techStack = [
    { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', bg: '#e2fcfc' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', bg: '#fef9c3' },
    { name: 'React.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', bg: '#ecfeff' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', bg: '#f0fdf4' },
    { name: 'Express.js', logo: 'https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg', bg: '#fafafa' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', bg: '#f0fdf4' },
    { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', bg: '#fdf2f8' },
    { name: 'Gemini API', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdEJ1JA9-UMF5g2uSGSLCLaevBpEdN1eR0O4GtA6PQZ4ZS6kuEiETVC2Lr&s=10', bg: '#f5f3ff' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', bg: '#fff1f2' },
    { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', bg: '#f4f4f5' },
    { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', bg: '#fff7ed' },
    { name: 'AWS', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIhqwgrLngRphet0Cwgip0h381HcQCSDNr27Ei_B7YnYxaDvhAw2YIPQzh&s=10', bg: '#fff7ed' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', bg: '#f0f9ff' },
    { name: 'Tailwind CSS', logo: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg', bg: '#ecfeff' },
    { name: 'GSAP', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXGH29QWyCYaaR9pnOSAg7eYdN5vQIuUUu_DhtpEfsfA&s=10', bg: '#f7fee7' },
    { name: 'Framer Motion', logo: 'https://images.seeklogo.com/logo-png/44/2/framer-motion-logo-png_seeklogo-446185.png', bg: '#fafafa' },
    { name: 'Three.js', logo: 'https://img.icons8.com/nolan/512w/three-js.png', bg: '#f4f4f5' },
    { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', bg: '#fef2f2' },
    { name: 'Material UI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg', bg: '#f0f9ff' }
  ];

  // Viewport entry observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Physics Initialization
  useEffect(() => {
    if (!inView) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Create Matter.js Engine
    const engine = Engine.create({
      gravity: { y: 0.9, scale: 0.001 }
    });
    const world = engine.world;

    // Create boundaries (walls & floor positioned just outside visible viewport)
    const boundaryOptions = { isStatic: true, render: { visible: false } };
    const floor = Bodies.rectangle(width / 2, height + 30, width * 2, 60, boundaryOptions);
    // Make walls taller to funnel all 19 falling badges from above
    const leftWall = Bodies.rectangle(-30, height / 2 - 1000, 60, height + 2500, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 30, height / 2 - 1000, 60, height + 2500, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -2000, width * 2, 60, boundaryOptions);

    World.add(world, [floor, leftWall, rightWall, ceiling]);

    // Create physical bodies for each technology badge
    const badgeElements = container.querySelectorAll('.tech-badge');
    const badgeBodies = [];

    badgeElements.forEach((el, idx) => {
      const bWidth = el.offsetWidth;
      const bHeight = el.offsetHeight;

      // Waterfall spawn sequence: scattered horizontally, stacked above viewport
      const startX = Math.random() * (width - bWidth - 40) + bWidth / 2 + 20;
      const startY = -60 - idx * 60;

      // Circular physics body matching coin element boundaries
      const radius = bWidth / 2;
      const body = Bodies.circle(startX, startY, radius, {
        restitution: 0.65,               // highly elastic bounce
        friction: 0.05,                  // lower slide friction
        frictionAir: 0.03,               // natural glide deceleration
        angularDamping: 0.05,            // roll deceleration
      });

      badgeBodies.push({ body, el, w: bWidth, h: bHeight });
      World.add(world, body);
    });

    // Add Mouse drag control
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.15,
        render: { visible: false }
      }
    });

    // Prevent dragging from intercepting standard page scrolling
    const mouseElement = mouseConstraint.mouse.element;
    mouseElement.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseElement.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
    mouseElement.removeEventListener("wheel", mouseConstraint.mouse.mousewheel);

    // Remove Matter.js default touch event listeners to allow page scrolling
    mouseElement.removeEventListener('touchstart', mouseConstraint.mouse.mousedown);
    mouseElement.removeEventListener('touchmove', mouseConstraint.mouse.mousemove);
    mouseElement.removeEventListener('touchend', mouseConstraint.mouse.mouseup);

    let isDraggingBadge = false;

    const handleTouchStart = (event) => {
      const target = event.target;
      const isBadge = target.closest('.tech-badge');
      if (isBadge) {
        isDraggingBadge = true;
        mouseConstraint.mouse.mousedown(event);
      }
    };

    const handleTouchMove = (event) => {
      if (isDraggingBadge) {
        if (event.cancelable) {
          event.preventDefault();
        }
        mouseConstraint.mouse.mousemove(event);
      }
    };

    const handleTouchEnd = (event) => {
      if (isDraggingBadge) {
        mouseConstraint.mouse.mouseup(event);
        isDraggingBadge = false;
      }
    };

    mouseElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    mouseElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    mouseElement.addEventListener('touchend', handleTouchEnd, { passive: false });

    World.add(world, mouseConstraint);

    // Run Engine & Runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Tick update listener
    Events.on(engine, 'afterUpdate', () => {
      const { x: mx, y: my } = mousePosRef.current;
      const mouseActive = mx >= 0 && my >= 0;

      badgeBodies.forEach(({ body, el, w, h }) => {
        // Apply magnetic cursor forces if mouse is in range
        if (mouseActive) {
          const dx = body.position.x - mx;
          const dy = body.position.y - my;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            const forceMagnitude = (110 - distance) * 0.00018;
            const angle = Math.atan2(dy, dx);
            Body.applyForce(body, body.position, {
              x: Math.cos(angle) * forceMagnitude,
              y: Math.sin(angle) * forceMagnitude
            });
          }
        }

        // Apply physics coordinates to HTML transform (hardware accelerated)
        const x = body.position.x - w / 2;
        const y = body.position.y - h / 2;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
      });
    });

    // Boundaries resize sync
    const handleResize = () => {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;

      Body.setPosition(floor, { x: newWidth / 2, y: newHeight + 30 });
      Body.setPosition(leftWall, { x: -30, y: newHeight / 2 - 1000 });
      Body.setPosition(rightWall, { x: newWidth + 30, y: newHeight / 2 - 1000 });
    };

    window.addEventListener('resize', handleResize);

    // Garbage collection
    return () => {
      window.removeEventListener('resize', handleResize);
      
      mouseElement.removeEventListener('touchstart', handleTouchStart);
      mouseElement.removeEventListener('touchmove', handleTouchMove);
      mouseElement.removeEventListener('touchend', handleTouchEnd);
      
      Runner.stop(runner);
      World.clear(world);
      Engine.clear(engine);
    };
  }, [inView]);

  // Track cursor position inside container
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: -1000, y: -1000 };
  };

  return (
    <section
      id="tech"
      className="py-24 px-6 md:px-12   max-w-7xl mx-auto"
    >
      <div className="flex justify-center mb-12">
        <h3 className="text-4xl md:text-5xl font-black uppercase text-[#121212] tracking-tighter font-outfit leading-none">
          Skills & Tools
        </h3>
      </div>

      {/* Physics Sandbox Box */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-[280px] md:h-[450px] relative border-black/10 rounded-[2.5rem] overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="absolute tech-badge w-16 h-16 md:w-28 md:h-28 rounded-full flex items-center justify-center tech-badge-metallic cursor-grab active:cursor-grabbing"
            style={{
              left: 0,
              top: 0,
              opacity: inView ? 1 : 0,
              backgroundColor: tech.bg,
              backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.28) 0%, rgba(0, 0, 0, 0.05) 100%)',
              touchAction: 'none'
            }}
          >
            <img
              src={tech.logo}
              alt={tech.name}
              className="w-[60%] h-[60%] object-contain select-none pointer-events-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
