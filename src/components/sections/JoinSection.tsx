import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const JoinSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const form = formRef.current;
    const stats = statsRef.current;

    if (!section || !title || !description || !form || !stats) return;

    // Pin the section
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    // Title dramatic entrance
    gsap.fromTo(title,
      { 
        opacity: 0, 
        scale: 0.3, 
        rotationY: 180,
        transformOrigin: "center center"
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Description slide up
    gsap.fromTo(description,
      { opacity: 0, y: 100, skewX: 10 },
      {
        opacity: 1,
        y: 0,
        skewX: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: description,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Form morphing entrance
    gsap.fromTo(form,
      { 
        opacity: 0, 
        scale: 0.5, 
        rotation: 180,
        filter: "blur(20px)"
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        filter: "blur(0px)",
        duration: 1.5,
        delay: 0.8,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: form,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Stats counter animation
    gsap.fromTo(stats.children,
      { opacity: 0, scale: 0, rotation: 360 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: stats,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Email submitted:', email);
    setEmail('');
    alert('Welcome to the movement!');
  };

  const stats = [
    { number: "2024", label: "Started" },
    { number: "∞", label: "Possibilities" },
    { number: "01.2025", label: "Next Phase" }
  ];

  return (
    <section 
      ref={sectionRef}
      id="join" 
      className="min-h-screen bg-black text-white relative overflow-hidden flex items-center"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0">
        <svg className="w-full h-full">
          <motion.line
            x1="0" y1="50%" x2="100%" y2="50%"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1="50%" y1="0" x2="50%" y2="100%"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Title */}
          <motion.h2 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-tech font-black mb-8 glow-text-lg"
          >
            JOIN THE
            <br />
            <span className="text-white/60">MOVEMENT</span>
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            ref={descriptionRef}
            className="text-lg md:text-xl font-body text-white/70 mb-16 leading-relaxed max-w-2xl mx-auto"
          >
            We Do for creating quality. Come early.
          </motion.p>

          {/* Email form */}
          <form ref={formRef} onSubmit={handleSubmit} className="mb-16">
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/60 focus:outline-none font-body backdrop-blur-sm"
                whileFocus={{ scale: 1.02 }}
                data-hover="true"
              />
              <motion.button
                type="submit"
                className="px-8 py-4 bg-white text-black font-tech text-sm tracking-wider uppercase hover:bg-white/90 transition-colors relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-hover="true"
              >
                <span className="relative z-10">Join Movement</span>
                <motion.div
                  className="absolute inset-0 bg-black/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </div>
          </form>

          {/* Stats */}
          <div ref={statsRef} className="flex justify-center space-x-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group cursor-default"
                whileHover={{ scale: 1.1 }}
                data-hover="true"
              >
                <div className="text-2xl md:text-3xl font-tech font-bold mb-2 glow-text group-hover:text-white transition-colors">
                  {stat.number}
                </div>
                <div className="text-sm font-body text-white/50 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Status indicator */}
          <div className="mt-16">
            <motion.div
              className="inline-flex items-center space-x-3 text-white/40 font-tech text-xs uppercase tracking-widest"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>TRANSMISSION_ACTIVE // READY_TO_CONNECT</span>
            </motion.div>
          </div>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/20" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/20" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/20" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/20" />
      </div>
    </section>
  );
};