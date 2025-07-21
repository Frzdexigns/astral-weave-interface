import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollIndicator } from '../ScrollIndicator';
import DotGrid from '../DotGrid';

export const HeroSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Animate title characters
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      tl.fromTo(chars, 
        { y: 100, opacity: 0, rotationX: -90 },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)"
        }
      );
    }

    // Animate subtitle
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3"
      );
    }

    // Animate glow effect
    if (glowRef.current) {
      tl.fromTo(glowRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.3)" },
        "-=0.5"
      );
    }
  }, []);

  const titleText = "PROJECT ELARION";
  const subtitle = "THE FUTURE OF CREATIVE INTELLIGENCE";

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background glow effect */}
      <div 
        ref={glowRef}
        className="absolute inset-0 z-0"
      />

      {/* DotGrid Background */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={2}
          gap={30}
          baseColor="rgba(255, 255, 255, 0.1)"
          activeColor="rgba(255, 255, 255, 0.8)"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4">
        {/* Main title */}
        <div ref={titleRef} className="mb-6">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-tech font-black tracking-wider">
            {titleText.split('').map((char, index) => (
              <motion.span
                key={index}
                className="char inline-block"
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)',
                }}
                whileHover={{
                  scale: 1.1,
                  textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)',
                }}
                transition={{ duration: 0.2 }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Description */}
        <motion.div
          ref={subtitleRef}
          className="mb-12 max-w-2xl mx-auto"
        >
          <p className="text-sm md:text-base font-body font-light tracking-[0.15em] text-white/60 uppercase mb-6">
            {subtitle}
          </p>
          <p className="text-base md:text-lg font-body text-white/80 leading-relaxed">
            Where innovation meets artistry. Experience the convergence of advanced technology 
            and creative vision through our revolutionary platform that transforms ideas into reality.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
        >
          <button 
            className="btn-sci-fi"
            data-hover="true"
            onClick={() => document.querySelector('#dynamic')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Enter The Grid
          </button>
        </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 border border-white/20 rotate-45 z-20"
        animate={{ rotate: [45, 405], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-16 h-16 border border-white/30 z-20"
        animate={{ rotate: [0, 360], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-20">
        <ScrollIndicator />
      </div>
    </section>
  );
};