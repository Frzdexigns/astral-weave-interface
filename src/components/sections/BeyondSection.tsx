import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap, Target, Layers } from 'lucide-react';

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

    // Set initial states
    gsap.set([title, description], { opacity: 0, y: 60 });
    gsap.set(cards.children, { opacity: 0, y: 100, scale: 0.8 });
    gsap.set(navigation, { opacity: 0, y: 40 });

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
    .to(description, {
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
    }, "-=0.4")
    .to(navigation, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  const collections = [
    {
      icon: Zap,
      title: "CREATIVE TOOLS",
      subtitle: "Design Evolution",
      description: "Revolutionary creative suite powered by AI-driven design algorithms"
    },
    {
      icon: Target,
      title: "NEURAL SYSTEMS", 
      subtitle: "Cognitive Framework",
      description: "Advanced neural processing for complex pattern recognition and learning"
    },
    {
      icon: Layers,
      title: "AI SYSTEMS",
      subtitle: "Intelligence Layer", 
      description: "Next-generation artificial intelligence with autonomous decision-making"
    },
    {
      icon: Zap,
      title: "GEOMETRICS",
      subtitle: "Spatial Computing",
      description: "Multidimensional geometric processing for immersive experiences"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="beyond" 
      className="min-h-screen bg-black text-white relative overflow-hidden pt-24 scroll-mt-4"
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
          <h2 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tech font-black mb-8 glow-text-lg"
          >
            BEYOND
            <br />
            <span className="text-white/60">COLLECTION</span>
          </h2>
          
          <p 
            ref={descriptionRef}
            className="text-base sm:text-lg font-body text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            Discover the next level of creative tools and solutions. A revolutionary collection 
            for next-generation AI systems, machine consciousness, and intelligent systems built 
            for the future.
          </p>
        </div>

        {/* Collection grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {collections.map((item, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              whileHover={{ y: -5 }}
            >
              <div className="aspect-square bg-white/5 border border-white/20 p-6 md:p-8 flex flex-col justify-between hover:border-white/40 hover:bg-white/10 transition-all duration-500 relative overflow-hidden">
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
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 mb-4 text-white/80" />
                  <h3 className="text-lg md:text-xl font-tech font-bold mb-2 group-hover:glow-text transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm font-body text-white/60 mb-4">
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