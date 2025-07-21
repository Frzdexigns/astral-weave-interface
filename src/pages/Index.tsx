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
    // Enable smooth scrolling and snap points
    gsap.registerPlugin(ScrollTrigger);
    
    // Create scroll snap effect
    const sections = gsap.utils.toArray('.snap-section');
    
    // Global parallax effects
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Parallax for floating shapes
        gsap.to(".floating-shape", {
          y: progress * 200,
          rotation: progress * 180,
          duration: 0.3,
          ease: "none"
        });
        
        // Background movement
        gsap.to(".parallax-bg", {
          backgroundPosition: `0px ${progress * 500}px`,
          duration: 0.3,
          ease: "none"
        });
      }
    });

    // Advanced section transitions
    sections.forEach((section: any, index) => {
      const isEven = index % 2 === 0;
      
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const element = section as HTMLElement;
          
          // Apply different effects based on section type
          if (element.classList.contains('hero-section')) {
            gsap.to(element, {
              y: progress * -100,
              opacity: 1 - progress * 0.5,
              duration: 0.3,
              ease: "none"
            });
          } else if (element.classList.contains('dynamic-section')) {
            gsap.to(element.querySelector('.content'), {
              x: isEven ? progress * 50 : progress * -50,
              duration: 0.3,
              ease: "none"
            });
          }
        }
      });
    });

    // Create scroll-triggered animations for enhanced UX
    ScrollTrigger.batch('.animate-on-scroll', {
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          { opacity: 0, y: 100, scale: 0.8 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 1.5,
            stagger: 0.15,
            ease: "back.out(1.7)"
          }
        );
      },
      onLeave: (elements) => {
        gsap.to(elements, {
          opacity: 0.3,
          scale: 0.95,
          duration: 0.5
        });
      },
      onEnterBack: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          scale: 1,
          duration: 0.5
        });
      }
    });

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
      
      {/* Main Content with Snap Sections */}
      <main className="relative z-10">
        <div className="snap-section hero-section">
          <HeroSection />
        </div>
        <div className="snap-section dynamic-section">
          <DynamicSection />
        </div>
        <div className="snap-section beyond-section">
          <BeyondSection />
        </div>
        <div className="snap-section intellectual-section">
          <IntellectualSection />
        </div>
        <div className="snap-section join-section">
          <JoinSection />
        </div>
      </main>
    </div>
  );
};

export default Index;
