import { Star, Heart, Lightbulb, Users, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('entrance-visible');
            const floatingElements = entry.target.querySelectorAll('.should-float');
            floatingElements.forEach((el) => {
              el.classList.add('animate-float');
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px'
      }
    );

    const elements = [
      titleRef.current,
      contentRef.current,
      statsRef.current,
      philosophyRef.current
    ];

    elements.forEach((el) => {
      if (el) {
        el.classList.add('entrance-hidden');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-32 relative">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div ref={titleRef} className="relative mb-32 overflow-hidden">
          <h2 className="text-[100px] md:text-[180px] font-bold text-[#40E0D0] text-center leading-none select-none should-float opacity-20">
            QUIENES
          </h2>
          <h2 className="text-[100px] md:text-[180px] font-bold text-[#40E0D0] text-center leading-none -mt-8 select-none should-float opacity-20">
            SOMOS
          </h2>
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-4xl md:text-5xl font-bold text-white should-float">
              Todo Es Posible Para El Que Cree
            </h3>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          {/* Main Content */}
          <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative group aspect-[4/5]">
              <div className="w-full h-full rounded-2xl overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                >
                  <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl transition-opacity duration-700 group-hover:opacity-70" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl" />
                
                {/* Sound Toggle Button */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="group">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20">
                  <Users className="w-12 h-12 text-[#40E0D0] transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 transition-transform duration-500 group-hover:translate-x-2">
                Transformando vidas a través de la palabra
              </h3>
              <p className="text-white/80 text-lg leading-relaxed mb-8 transition-all duration-500 group-hover:text-white group-hover:translate-x-2">
                Desarrollamos conferencias y charlas generativas; somos seres integrales por lo cual, el mensaje estará encausado en potenciar nuestra mente, cuerpo y espíritu. Muchas de las respuestas ya las tenemos, únicamente debemos ordenar ideas, encausar nuestra intención y descubrir todos los recursos que tenemos a disposición para trascender y alcanzar nuestros objetivos.
              </p>
              <p className="text-white/80 text-lg leading-relaxed transition-all duration-500 group-hover:text-white group-hover:translate-x-2">
                El tipo de conversaciones que todos los equipos necesitan están marcados por la compasión, la información clave y el respeto por el conocimiento, la intuición y la experiencia del colectivo.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              { icon: Star, number: "200+", label: "Conferencias Impartidas"},
              { icon: Heart, number: "10K+", label: "Vidas Impactadas" },
              { icon: Lightbulb, number: "4+", label: "Años de Experiencia" }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm shadow-lg transition-all duration-500 hover:scale-105 hover:bg-white/10 should-float"
                  style={{
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  <Icon className="w-12 h-12 text-[#40E0D0] mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                  <span className="text-4xl font-bold text-white mb-2 transition-transform duration-500 group-hover:translate-y-[-4px]">{stat.number}</span>
                  <span className="text-white/80 transition-all duration-500 group-hover:text-white">{stat.label}</span>
                </div>
              );
            })}
          </div>

          {/* Mission Statement */}
          <div ref={philosophyRef} className="text-center max-w-4xl mx-auto group">
            <h3 className="text-3xl font-bold text-white mb-6 transition-transform duration-500 group-hover:scale-105">
              Nuestra Filosofía
            </h3>
            <p className="text-white/80 text-lg leading-relaxed italic transition-all duration-500 group-hover:text-white relative">
              "Creemos en el poder transformador de las palabras y en la capacidad innata de cada persona para alcanzar su máximo potencial. Nuestra misión es ser el puente que conecta los sueños con la acción, inspirando a otros a dar el primer paso hacia su mejor versión."
              <span className="absolute -inset-x-4 -inset-y-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 bg-white/5 rounded-lg -z-10" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}