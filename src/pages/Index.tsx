import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor } from '@/components/CustomCursor';
import { FloatingShapes } from '@/components/FloatingShapes';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ContactSection } from '@/components/sections/ContactSection';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Smooth scrolling setup
    gsap.registerPlugin(ScrollTrigger);
    
    // Global scroll-triggered animations
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Parallax effect for floating shapes
        const progress = self.progress;
        gsap.to(".floating-shape", {
          y: progress * 100,
          rotation: progress * 360,
          duration: 0.3,
          ease: "none"
        });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Floating Background Shapes */}
      <FloatingShapes />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/40 font-tech text-xs">
            © 2024 NEURAL_INTERFACE. ALL_RIGHTS_RESERVED. SYSTEM_VERSION_2.1.7
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
