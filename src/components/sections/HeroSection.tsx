import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollIndicator } from '../ScrollIndicator';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const glow = glowRef.current;
    const button = buttonRef.current;

    if (!section || !title || !subtitle || !glow || !button) return;

    // Set initial states
    gsap.set([title, subtitle, button], { opacity: 0, y: 60 });
    gsap.set(glow, { scale: 0, opacity: 0 });
    
    // Create entrance animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none reset",
        once: true
      }
    });

    // Animate glow first
    tl.to(glow, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out"
    })
    
    // Then title characters
    .to(title.querySelectorAll('.char'), {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: "back.out(1.7)"
    }, "-=0.8")
    
    // Subtitle
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    
    // Button
    .to(button, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");

  }, []);

  const titleText = "PROJECT ELARION";
  const subtitle = "THE FUTURE OF CREATIVE INTELLIGENCE";

  const scrollToNext = () => {
    document.querySelector('#dynamic')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-4 scroll-mt-4"
    >
      {/* Background glow effect */}
      <div 
        ref={glowRef}
        className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)'
        }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full grid-bg" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Main title */}
        <div ref={titleRef} className="mb-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-tech font-black tracking-wider">
            {titleText.split('').map((char, index) => (
              <span
                key={index}
                className="char inline-block"
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)',
                  transform: 'translateY(60px) rotateX(-90deg)',
                  opacity: 0
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Description */}
        <div ref={subtitleRef} className="mb-12 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm md:text-base font-body font-light tracking-[0.15em] text-white/60 uppercase mb-6">
            {subtitle}
          </p>
          <p className="text-sm sm:text-base md:text-lg font-body text-white/80 leading-relaxed">
            Where innovation meets artistry. Experience the convergence of advanced technology 
            and creative vision through our revolutionary platform that transforms ideas into reality.
          </p>
        </div>

        {/* CTA Button */}
        <button 
          ref={buttonRef}
          className="btn-sci-fi"
          onClick={scrollToNext}
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            Enter The Grid
          </motion.span>
        </button>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/4 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 border border-white/20 rotate-45"
          animate={{ rotate: [45, 405], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-4 sm:right-10 w-10 h-10 sm:w-16 sm:h-16 border border-white/30"
          animate={{ rotate: [0, 360], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <ScrollIndicator />
    </section>
  );
};