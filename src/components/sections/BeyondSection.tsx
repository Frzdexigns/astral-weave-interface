import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BeyondSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const cards = cardsRef.current;
    const navigation = navigationRef.current;

    if (!section || !title || !description || !cards || !navigation) return;

    // Pin the section
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    // Title reveal with morphing effect
    gsap.fromTo(title,
      { 
        opacity: 0, 
        scale: 0.5, 
        rotationX: -90,
        transformOrigin: "center bottom"
      },
      {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Description slide in
    gsap.fromTo(description,
      { opacity: 0, y: 50, skewY: 5 },
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: description,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards complex entrance
    gsap.fromTo(cards.children,
      { 
        opacity: 0, 
        scale: 0.2, 
        rotation: -180, 
        y: 300,
        filter: "blur(20px)"
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        y: 0,
        filter: "blur(0px)",
        duration: 1.5,
        stagger: {
          grid: [2, 2],
          from: "center",
          amount: 0.8
        },
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cards,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Navigation dots animation
    gsap.fromTo(navigation.children,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: navigation,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const collections = [
    {
      title: "CREATIVE TOOLS",
      subtitle: "Design Evolution",
      description: "Revolutionary creative suite powered by AI-driven design algorithms"
    },
    {
      title: "NEURAL SYSTEMS",
      subtitle: "Cognitive Framework",
      description: "Advanced neural processing for complex pattern recognition and learning"
    },
    {
      title: "AI SYSTEMS",
      subtitle: "Intelligence Layer",
      description: "Next-generation artificial intelligence with autonomous decision-making"
    },
    {
      title: "GEOMETRICS",
      subtitle: "Spatial Computing",
      description: "Multidimensional geometric processing for immersive experiences"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="beyond" 
      className="min-h-screen bg-black text-white relative overflow-hidden"
    >
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full grid-bg" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            ref={titleRef}
            className="text-5xl md:text-7xl font-tech font-black mb-8 glow-text-lg"
          >
            BEYOND
            <br />
            <span className="text-white/60">COLLECTION</span>
          </motion.h2>
          
          <motion.p 
            ref={descriptionRef}
            className="text-lg font-body text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            Discover the next level of creative tools and solutions. A revolutionary collection 
            for next-generation AI systems, machine consciousness, and intelligent systems built 
            for the future.
          </motion.p>
        </div>

        {/* Collection grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {collections.map((item, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              whileHover={{ y: -10 }}
              data-hover="true"
            >
              <div className="aspect-square bg-white/5 border border-white/20 p-8 flex flex-col justify-between hover:border-white/40 hover:bg-white/10 transition-all duration-500 relative overflow-hidden">
                {/* Background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                
                {/* Number */}
                <div className="text-xs font-tech text-white/40 uppercase tracking-widest relative z-10">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-tech font-bold mb-2 group-hover:glow-text transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm font-body text-white/60 mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-xs font-body text-white/50 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation dots */}
        <div ref={navigationRef} className="flex justify-center space-x-4">
          {[0, 1, 2, 3].map((dot) => (
            <motion.div
              key={dot}
              className="w-2 h-2 bg-white/30 rounded-full cursor-pointer hover:bg-white/60 transition-colors"
              whileHover={{ scale: 1.5 }}
              data-hover="true"
            />
          ))}
        </div>

        {/* Bottom status */}
        <div className="text-center mt-16">
          <motion.div
            className="inline-block text-white/30 font-tech text-xs uppercase tracking-widest"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            // COLLECTION_STATUS: EXPANDING //
          </motion.div>
        </div>
      </div>
    </section>
  );
};