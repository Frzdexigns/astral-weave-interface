import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Shield, Zap, Globe, Code, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

    // Title animation
    gsap.fromTo(title,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards staggered animation
    gsap.fromTo(cards.children,
      { opacity: 0, y: 80, rotationX: -30 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
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
    {
      icon: Brain,
      title: "Neural Networks",
      description: "Advanced AI algorithms that learn and adapt to user behavior patterns in real-time.",
      tech: "TensorFlow / PyTorch"
    },
    {
      icon: Globe,
      title: "Quantum Interface",
      description: "Seamless integration between quantum computing systems and traditional architectures.",
      tech: "Qiskit / Cirq"
    },
    {
      icon: Zap,
      title: "Lightning Protocol",
      description: "Ultra-fast data transmission with zero-latency processing for critical applications.",
      tech: "WebAssembly / Rust"
    },
    {
      icon: Shield,
      title: "Encryption Matrix",
      description: "Military-grade security protocols protecting sensitive data across all network layers.",
      tech: "AES-256 / RSA"
    },
    {
      icon: Code,
      title: "Code Genesis",
      description: "Automated code generation and optimization using advanced machine learning models.",
      tech: "GPT-4 / Copilot"
    },
    {
      icon: Cpu,
      title: "Core Fusion",
      description: "Multi-threaded processing engine capable of handling complex computational tasks.",
      tech: "WebGL / CUDA"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="min-h-screen py-20 relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full grid-bg" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-tech font-bold text-center mb-16 glow-text"
        >
          SYSTEM_CAPABILITIES
        </motion.h2>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative p-6 border border-white/20 bg-black/50 backdrop-blur-sm hover:border-white/40 transition-all duration-500"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 30px rgba(255,255,255,0.1)"
              }}
              data-hover="true"
            >
              {/* Card background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="relative mb-4">
                <feature.icon className="w-8 h-8 text-white/80 group-hover:text-white transition-colors duration-300" />
                <div className="absolute inset-0 w-8 h-8 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-tech font-bold mb-3 text-white group-hover:glow-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 font-body mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="text-xs font-tech text-white/50 uppercase tracking-wider">
                  {feature.tech}
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-20 text-center">
          <motion.div
            className="inline-block text-white/30 font-tech text-sm"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            // SYSTEM_STATUS: FULLY_OPERATIONAL //
          </motion.div>
        </div>
      </div>
    </section>
  );
};