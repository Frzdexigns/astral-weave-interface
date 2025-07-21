import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  type: 'circle' | 'square' | 'triangle';
  opacity: number;
}

export const FloatingShapes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<Shape[]>([]);

  useEffect(() => {
    const shapes: Shape[] = [];
    for (let i = 0; i < 20; i++) {
      shapes.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * 360,
        type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as any,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
    shapesRef.current = shapes;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      shapesRef.current.forEach((shape, index) => {
        const element = containerRef.current?.children[index] as HTMLElement;
        if (!element) return;

        const dx = mouseX - shape.x;
        const dy = mouseY - shape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          const moveX = -dx * force * 0.1;
          const moveY = -dy * force * 0.1;
          
          element.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${shape.rotation + force * 90}deg)`;
        } else {
          element.style.transform = `translate(0px, 0px) rotate(${shape.rotation}deg)`;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderShape = (shape: Shape) => {
    const baseClasses = "absolute transition-transform duration-300 ease-out";
    
    switch (shape.type) {
      case 'circle':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} rounded-full border border-white/20`}
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              opacity: shape.opacity,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        );
      case 'square':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} border border-white/20`}
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              opacity: shape.opacity,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        );
      case 'triangle':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} border-l-transparent border-r-transparent border-b-white/20`}
            style={{
              left: shape.x,
              top: shape.y,
              width: 0,
              height: 0,
              borderLeftWidth: shape.size / 2,
              borderRightWidth: shape.size / 2,
              borderBottomWidth: shape.size,
              opacity: shape.opacity,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {shapesRef.current.map(renderShape)}
    </div>
  );
};