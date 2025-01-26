import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('entrance-visible');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (contentRef.current) {
      contentRef.current.classList.add('entrance-hidden');
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="relative h-[90vh]">
        <div className="absolute inset-0">
          <div className="relative w-full h-full overflow-hidden">
            <img
              src="https://i.postimg.cc/Kz0qk51S/calltoaction.jpg"
              alt="Inspirational background"
              className="absolute w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={contentRef} className="container mx-auto px-4 text-center entrance-fade-up">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            ¿Listos para vivir una vida extraordinaria?
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            Anímate!
          </p>
          <a
            href="#start"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
          >
            Empieza ahora
            <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}