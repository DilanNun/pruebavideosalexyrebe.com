import { useState, useEffect } from 'react';

export function Nosotros() {
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
        <div className="text-white text-xl">Cargando historia...</div>
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
            <source src="/nosotrosBG.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Photo Overlay - Absolute Right and Bottom */}
        <div className="absolute bottom-0 right-16 w-[1200px] h-[1300px]">
          <img
            src="https://i.postimg.cc/W1p7rZPs/nosotros.png"
            alt="Alex"
            className="w-full h-full object-contain object-bottom"
          />
        </div>

        {/* Hero Content - Positioned at absolute left */}
        <div className="absolute bottom-0 left-0">
          <div className="space-y-6 p-12 md:p-24">
            {/* Category Tag */}
            <div className="text-white/80 tracking-widest text-sm font-medium uppercase">
              • NOSOTROS
            </div>
            
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-[1.1] max-w-10xl">
              Nuestra Historia
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl">
              Descubre el camino que nos llevó a transformar vidas a través de la palabra.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white">
        {/* Opening Quote */}
        <div className="py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Una vida extraordinaria es aquella vivida en tus propios términos, llena de significado e impacto increíble.
            </h2>
          </div>
        </div>

        {/* Story Sections */}
        <div className="max-w-7xl mx-auto px-4">
          {/* Section 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">El inicio de una historia más grande</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Como muchos grandes sueños, el nuestro comenzó desde la adversidad. Crecimos en familias trabajadoras donde el éxito no era un regalo, sino una meta por la cual luchar cada día. Esta experiencia nos enseñó el valor del esfuerzo y la perseverancia.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://i.postimg.cc/XYdjtHZN/historia1.jpg"
                alt="El inicio"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">
            <div className="relative order-2 lg:order-1">
              <img
                src="https://i.postimg.cc/XYVdvCwb/alexyrebe3.jpg"
                alt="El secreto"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900">El secreto está en dar</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Lo que descubrimos en nuestro viaje es que el verdadero significado de la vida se encuentra en lo que damos a los demás. Cada conferencia, cada mentoría, cada momento compartido se convirtió en una oportunidad para impactar vidas positivamente.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Una vida dedicada a un propósito mayor</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Hoy, nuestro deseo innato de retribuir es lo que nos impulsa a continuar. Dedicamos más de 14 horas al día a empoderar a miles de personas para que alcancen su mejor versión. Es la fuerza motriz detrás de nuestro trabajo para combatir desafíos globales e implementar cambios positivos en comunidades de todo el país.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://i.postimg.cc/nLfzzb8Q/DSC0110.jpg"
                alt="Nuestro propósito"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}