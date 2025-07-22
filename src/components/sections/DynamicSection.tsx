import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const DynamicSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !content || !cards) return;

    // Set initial states
    gsap.set([title, content], { opacity: 0, y: 60 });
    gsap.set(cards.children, { opacity: 0, y: 80, scale: 0.8 });

    // Scroll-triggered entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "top 25%",
        toggleActions: "play none none reset",
        once: true
      }
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    })
    .to(content, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .to(cards.children, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.7)"
    }, "-=0.4");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  const features = [
    { title: "CORE", description: "Advanced neural processing engine" },
    { title: "MATRIX", description: "Real-time data transformation" },
    { title: "FLUX", description: "Dynamic content generation" },
    { title: "NEXUS", description: "Seamless system integration" }
  ];

  return (
    <section 
      ref={sectionRef}
      id="dynamic" 
      className="min-h-screen bg-white text-black relative overflow-hidden pt-24 scroll-mt-4"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(45deg, #000 1px, transparent 1px),
                             linear-gradient(-45deg, #000 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
          animate={{ 
            backgroundPosition: ['0px 0px', '20px 20px'] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          
          {/* Left content */}
          <div>
            <h2 
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tech font-black mb-8 leading-tight"
            >
              DYNAMIC
              <br />
              <span className="text-black/60">EVOLUTION</span>
            </h2>
            
            <div ref={contentRef} className="space-y-8">
              <p className="text-base sm:text-lg font-body text-black/80 leading-relaxed max-w-md">
                Experience AI computational intelligence that evolves in real-time, 
                adapting to your creative vision with unprecedented precision and fluidity.
              </p>
              
              <p className="text-sm sm:text-base font-body text-black/60 leading-relaxed max-w-md">
                Our revolutionary framework processes complex data patterns and 
                transforms them into actionable insights through advanced algorithms.
              </p>

              <motion.button 
                className="px-6 md:px-8 py-3 md:py-4 bg-black text-white font-tech text-xs md:text-sm tracking-wider uppercase hover:bg-black/80 transition-colors relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">EXPLORE MATRIX</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </div>
          </div>

          {/* Right content - Feature cards */}
          <div ref={cardsRef} className="grid grid-cols-2 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="aspect-square border-2 border-black/20 p-4 md:p-6 flex flex-col justify-between hover:border-black/60 transition-all duration-500 group cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
              >
                <div className="text-xs font-tech text-black/40 uppercase tracking-widest">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-tech font-bold mb-2 group-hover:text-black/80 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm font-body text-black/60">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};