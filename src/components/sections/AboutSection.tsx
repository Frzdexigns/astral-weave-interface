import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;

    if (!section || !title || !content || !stats) return;

    // Title animation
    gsap.fromTo(title, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Content animation
    gsap.fromTo(content.children,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: content,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Stats animation
    gsap.fromTo(stats.children,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: stats,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const stats = [
    { number: "05+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "System Uptime" }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen flex items-center py-20 relative"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full grid-bg" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content */}
          <div>
            <motion.h2 
              ref={titleRef}
              className="text-4xl md:text-6xl font-tech font-bold mb-8 glow-text"
            >
              SYSTEM_OVERRIDE
            </motion.h2>
            
            <div ref={contentRef} className="space-y-6">
              <p className="text-lg font-body text-white/80 leading-relaxed">
                Interfacing between the digital realm and human consciousness. 
                Specialized in creating immersive experiences that bridge the gap 
                between reality and virtual environments.
              </p>
              
              <p className="text-lg font-body text-white/80 leading-relaxed">
                My neural pathways are optimized for full-stack development, 
                AR/VR implementation, and quantum computing interfaces. 
                Every project is a new dimension waiting to be explored.
              </p>

              <div className="flex space-x-4 mt-8">
                <button className="btn-sci-fi" data-hover="true">
                  Download Neural Map
                </button>
                <button className="btn-sci-fi" data-hover="true">
                  View Archives
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <div ref={statsRef} className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 border border-white/20 glow-border hover:glow-border-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  data-hover="true"
                >
                  <div className="text-3xl md:text-4xl font-tech font-bold mb-2 glow-text">
                    {stat.number}
                  </div>
                  <div className="text-sm font-body text-white/60 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative circuit lines */}
            <div className="mt-12 relative">
              <svg className="w-full h-32 opacity-30" viewBox="0 0 400 100">
                <path
                  d="M 0 50 L 100 50 L 120 30 L 140 30 L 160 50 L 260 50 L 280 70 L 300 70 L 320 50 L 400 50"
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                  className="animate-pulse"
                />
                <circle cx="120" cy="30" r="3" fill="white" className="animate-glow-pulse" />
                <circle cx="280" cy="70" r="3" fill="white" className="animate-glow-pulse" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};