import { useState, useEffect } from 'react';

export function Contacto() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando formulario...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/contactoBG.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Photo Overlay - Absolute Right and Bottom */}
        <div 
          className="absolute bottom-0 left-0 w-[600px] h-[900px] animate-slide-in-left"
          style={{
            animation: 'slideInLeft 1s ease-out forwards',
            opacity: 0,
            transform: 'translateX(100px)'
          }}
        >
          <img
            src="https://i.postimg.cc/02jJ929W/DSC3339-Photoroom-2.png"
            alt="Rebe"
            className="w-full h-full object-contain object-bottom"
          />
        </div>

        {/* Content - Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center space-y-6">
            {/* Category Tag */}
            <div className="text-white/80 tracking-widest text-sm font-medium uppercase">
              • FORMULARIO
            </div>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl">
              Llena este formulario para reservar nuestros servicios!
            </p>
            
            {/* CTA Button */}
            <div className="pt-4">
              <a 
                href="https://forms.gle/9hH6F1vaU4W6VmuF7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Reservar ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}