import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Database, Cpu, Network } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const IntellectualSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const grid = gridRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !description || !grid || !cards) return;

    // Pin the section
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    // Title animation with 3D effect
    gsap.fromTo(title,
      { 
        opacity: 0, 
        rotationX: -90, 
        transformOrigin: "center bottom",
        z: -500
      },
      {
        opacity: 1,
        rotationX: 0,
        z: 0,
        duration: 1.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Description reveal
    gsap.fromTo(description,
      { opacity: 0, y: 100, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        delay: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: description,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Grid background animation
    gsap.fromTo(grid,
      { opacity: 0, scale: 1.5, rotation: 45 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards morphing entrance
    gsap.fromTo(cards.children,
      { 
        opacity: 0, 
        scale: 0.1, 
        rotation: 720,
        transformOrigin: "center center",
        filter: "blur(50px)"
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        filter: "blur(0px)",
        duration: 2,
        stagger: {
          grid: [1, 3],
          from: "center",
          amount: 1.2
        },
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
          trigger: cards,
          start: "top 65%",
          end: "bottom 35%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const properties = [
    {
      icon: Shield,
      title: "SECURE CORE",
      subtitle: "Advanced Protection",
      description: "Military-grade encryption with quantum-resistant algorithms for ultimate security."
    },
    {
      icon: Database,
      subtitle: "Creative AI",
      title: "CREATIVE.AI",
      description: "Generative AI models that adapt and learn from creative workflows and patterns."
    },
    {
      icon: Cpu,
      title: "QUANTUM NETS",
      subtitle: "Neural Processing",
      description: "Quantum-enhanced neural networks for unprecedented computational capabilities."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="intellectual" 
      className="min-h-screen bg-gray-50 text-black relative overflow-hidden"
    >
      {/* Animated grid background */}
      <div 
        ref={gridRef}
        className="absolute inset-0 opacity-10"
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #000 1px, transparent 1px),
              linear-gradient(0deg, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #000 1px, transparent 1px),
              linear-gradient(-45deg, #000 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '80px 80px']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-black/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            ref={titleRef}
            className="text-5xl md:text-7xl font-tech font-black mb-8"
          >
            INTELLECTUAL
            <br />
            <span className="text-black/50">PROPERTY</span>
          </motion.h2>
          
          <motion.p 
            ref={descriptionRef}
            className="text-lg font-body text-black/70 max-w-3xl mx-auto leading-relaxed"
          >
            Cutting-edge neural core designed to revolutionize AI systems. Our proprietary algorithms 
            redefine artificial intelligence, machine consciousness, and computational creativity with 
            unprecedented levels of sophistication.
          </motion.p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left side - Properties cards */}
          <div ref={cardsRef} className="lg:col-span-8 space-y-8">
            {properties.map((property, index) => (
              <motion.div
                key={index}
                className="group flex items-start space-x-6 p-8 bg-white/50 border border-black/10 hover:border-black/30 hover:bg-white/80 transition-all duration-500 cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.1)"
                }}
                data-hover="true"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 border-2 border-black/20 flex items-center justify-center group-hover:border-black/60 transition-colors relative">
                    <property.icon className="w-6 h-6 text-black/60 group-hover:text-black transition-colors" />
                    <motion.div
                      className="absolute inset-0 border-2 border-black/20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.5, 0.2]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="text-xs font-tech text-black/40 uppercase tracking-widest mb-2">
                    {property.subtitle}
                  </div>
                  <h3 className="text-2xl font-tech font-bold mb-4 group-hover:text-black/80 transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-base font-body text-black/60 leading-relaxed max-w-md">
                    {property.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <motion.div
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -20 }}
                  whileHover={{ x: 0 }}
                >
                  <div className="w-8 h-8 border border-black/30 flex items-center justify-center">
                    <div className="w-3 h-3 border-t border-r border-black/60 transform rotate-45" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Right side - Visualization */}
          <div className="lg:col-span-4">
            <motion.div
              className="aspect-square border-2 border-black/20 p-8 relative overflow-hidden bg-white/30"
              animate={{
                borderColor: ["rgba(0,0,0,0.2)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.2)"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Central element */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-black rounded-full"
                style={{ x: '-50%', y: '-50%' }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Orbiting elements */}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-black/60 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    rotate: [0, 360],
                    x: [0, Math.cos(i * 60 * Math.PI / 180) * 80],
                    y: [0, Math.sin(i * 60 * Math.PI / 180) * 80],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-black/30" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-black/30" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-black/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-black/30" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};