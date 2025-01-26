import { Volume2, VolumeX, Play, Star, BookOpen } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function CoachingSection() {
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

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

    const elements = [contentRef.current, videoRef.current];
    elements.forEach((el) => {
      if (el) {
        el.classList.add('entrance-hidden');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-white overflow-hidden">
      <div className="absolute inset-0 flex">
        {/* Left Section */}
        <div ref={contentRef} className="relative w-[35%] p-[5%] entrance-slide-left">
          <div className="relative">
            {/* Book Cover */}
            <div className="relative bg-[#40E0D0] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="aspect-[4/3] relative"> {/* Changed from aspect-[3/4] to aspect-[4/3] */}
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
                  alt="Book Cover"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-xl font-light tracking-[0.2em] text-black/80 mb-2"> {/* Reduced margin */}
                    ALEX Y REBE
                  </p>
                  <h2 className="text-6xl font-black italic text-black mb-4 tracking-tight"> {/* Reduced margin */}
                    EL CAMINO
                  </h2>
                  <p className="text-2xl font-light tracking-wide text-black/90 mb-4"> {/* Reduced margin */}
                    HACIA TU MEJOR VERSIÓN
                  </p>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-black" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="mt-6 space-y-4"> {/* Reduced margins and spacing */}
              <div className="grid grid-cols-2 gap-4"> {/* Reduced gap */}
                <div className="bg-gray-50 p-3 rounded-xl text-center"> {/* Reduced padding */}
                  <p className="text-3xl font-bold text-gray-900 mb-1">200+</p>
                  <p className="text-gray-600 text-sm">Páginas de Sabiduría</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl text-center"> {/* Reduced padding */}
                  <p className="text-3xl font-bold text-gray-900 mb-1">12</p>
                  <p className="text-gray-600 text-sm">Capítulos Prácticos</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl"> {/* Reduced padding */}
                <div className="flex items-center gap-3 mb-3"> {/* Reduced gap and margin */}
                  <BookOpen className="w-6 h-6 text-[#40E0D0]" />
                  <h3 className="text-lg font-semibold text-gray-900">Lo que aprenderás</h3>
                </div>
                <ul className="space-y-2"> {/* Reduced spacing */}
                  <li className="flex items-center gap-2 text-gray-700 text-sm">
                    <div className="w-1.5 h-1.5 bg-[#40E0D0] rounded-full" />
                    Redescubrir el sentido de tu vida
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 text-sm">
                    <div className="w-1.5 h-1.5 bg-[#40E0D0] rounded-full" />
                    Aceptar los retos como oportunidades para crecer
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 text-sm">
                    <div className="w-1.5 h-1.5 bg-[#40E0D0] rounded-full" />
                    Vivir con gratitud, propósito y fe. Sin esperar a que una tragedia nos despierte
                  </li>
                </ul>
              </div>

              <button className="w-full bg-[#40E0D0] text-black py-3 px-6 rounded-xl font-semibold tracking-wide hover:bg-[#3BC9BA] transition-colors duration-300 transform hover:scale-105">
                RESERVA TU COPIA
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div ref={videoRef} className="relative w-[65%] p-[5%] entrance-slide-right">
          {/* Title Text */}
          <div className="mb-12">
            <h2 className="text-7xl font-bold text-gray-900 leading-tight">
              El Despertar De Un Nuevo Comienzo
            </h2>
          </div>

          {/* Video Container */}
          <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/20" />
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            >
              <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/30">
                <Play className="w-10 h-10 text-white fill-current" />
              </button>
            </div>

            {/* Sound Toggle Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-6 right-6 bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}