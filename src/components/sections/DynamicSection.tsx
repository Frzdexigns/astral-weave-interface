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

    // Pin the section
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    // Title animation
    gsap.fromTo(title, 
      { opacity: 0, y: 100, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Content stagger animation
    gsap.fromTo(content.children,
      { opacity: 0, x: -100, rotationY: -30 },
      {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: content,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards entrance with complex morphing
    gsap.fromTo(cards.children,
      { opacity: 0, scale: 0.3, rotation: 180, y: 200 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: cards,
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
      className="min-h-screen bg-white text-black relative overflow-hidden"
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
            <motion.h2 
              ref={titleRef}
              className="text-5xl md:text-7xl font-tech font-black mb-8 leading-tight"
            >
              DYNAMIC
              <br />
              <span className="text-black/60">EVOLUTION</span>
            </motion.h2>
            
            <div ref={contentRef} className="space-y-8">
              <p className="text-lg font-body text-black/80 leading-relaxed max-w-md">
                Experience AI computational intelligence that evolves in real-time, 
                adapting to your creative vision with unprecedented precision and fluidity.
              </p>
              
              <p className="text-base font-body text-black/60 leading-relaxed max-w-md">
                Our revolutionary framework processes complex data patterns and 
                transforms them into actionable insights through advanced algorithms.
              </p>

              <motion.button 
                className="px-8 py-4 bg-black text-white font-tech text-sm tracking-wider uppercase hover:bg-black/80 transition-colors relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-hover="true"
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
          <div ref={cardsRef} className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="aspect-square border-2 border-black/20 p-6 flex flex-col justify-between hover:border-black/60 transition-all duration-500 group cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                data-hover="true"
              >
                <div className="text-xs font-tech text-black/40 uppercase tracking-widest">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-2xl font-tech font-bold mb-2 group-hover:text-black/80 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-body text-black/60">
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