import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor } from '@/components/CustomCursor';
import { FloatingShapes } from '@/components/FloatingShapes';
import { HeroSection } from '@/components/sections/HeroSection';
import { DynamicSection } from '@/components/sections/DynamicSection';
import { BeyondSection } from '@/components/sections/BeyondSection';
import { IntellectualSection } from '@/components/sections/IntellectualSection';
import { JoinSection } from '@/components/sections/JoinSection';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Global parallax for floating shapes (subtle)
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Subtle parallax for floating shapes
        gsap.to(".floating-shape", {
          y: progress * 100,
          rotation: progress * 90,
          duration: 0.3,
          ease: "none"
        });
      }
    });

    // Refresh ScrollTrigger after setup
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Floating Background Shapes */}
      <FloatingShapes />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <DynamicSection />
        <BeyondSection />
        <IntellectualSection />
        <JoinSection />
      </main>
    </div>
  );
};

export default Index;
