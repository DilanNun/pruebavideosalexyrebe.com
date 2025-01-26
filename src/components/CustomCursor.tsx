import { useState, useEffect } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <>
      <div 
        className="fixed w-4 h-4 pointer-events-none z-50 transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
        }}
      >
        <div className={`absolute inset-0 bg-blue-500/20 rounded-full transition-transform duration-300 ${
          isPointer ? 'scale-150' : 'scale-100'
        }`} />
      </div>
      <div 
        className="fixed w-2 h-2 pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
        }}
      >
        <div className={`absolute inset-0 bg-blue-500 rounded-full transition-transform duration-300 ${
          isPointer ? 'scale-0' : 'scale-100'
        }`} />
      </div>
    </>
  );
}