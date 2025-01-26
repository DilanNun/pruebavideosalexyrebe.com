import { navigationItems } from '../constants/navigation';
import { useState, useEffect } from 'react';

interface MainGridProps {
  onNavigate: (page: string) => void;
}

export function MainGrid({ onNavigate }: MainGridProps) {
  const [videoVisible, setVideoVisible] = useState(false);
  const [photosVisible, setPhotosVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    // Sequence the animations
    const videoTimer = setTimeout(() => {
      setVideoVisible(true);
    }, 500);

    const photosTimer = setTimeout(() => {
      setPhotosVisible(true);
    }, 1000);

    const gridTimer = setTimeout(() => {
      setGridVisible(true);
    }, 1500);

    return () => {
      clearTimeout(videoTimer);
      clearTimeout(photosTimer);
      clearTimeout(gridTimer);
    };
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <section className="min-h-screen relative px-6 flex items-center justify-center bg-black">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/logoreveal-alexyrebe.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Photo Overlay - Absolute Right and Bottom */}
      <div 
        className="absolute bottom-0 left-12 w-[500px] h-[800px]"
        style={{
          opacity: photosVisible ? 1 : 0,
          transform: `translateX(${photosVisible ? '0' : '-100px'})`,
          transition: 'opacity 1s ease-out, transform 1s ease-out'
        }}
      >
        <img
          src="https://i.postimg.cc/fbBjBRDY/alex1.png"
          alt="Alex"
          className="w-full h-full object-contain object-bottom"
        />
      </div>

      {/* Photo Overlay - Absolute Left and Bottom */}
      <div 
        className="absolute bottom-0 right-12 w-[700px] h-[800px]"
        style={{
          opacity: photosVisible ? 1 : 0,
          transform: `translateX(${photosVisible ? '0' : '100px'})`,
          transition: 'opacity 1s ease-out, transform 1s ease-out'
        }}
      >
        <img
          src="https://i.postimg.cc/6QRY1Vjn/rebe2.png"
          alt="Rebe"
          className="w-full h-full object-contain object-bottom"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        {/* Navigation Grid - Centered */}
        <div className="flex justify-center px-4 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 lg:gap-24 w-full max-w-7xl">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isNotLast = index < navigationItems.length - 1;
              
              return (
                <div 
                  key={index} 
                  className={`flex flex-col items-center text-center group relative animate-float cursor-pointer transition-all duration-500 hover:opacity-100 ${
                    gridVisible ? 'opacity-30 translate-y-0' : 'opacity-0 translate-y-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 0.0}s`
                  }}
                  onClick={(e) => handleNavigation(e as any, item.page)}
                >
                  {/* Separator Dot (only show between items) */}
                  {isNotLast && (
                    <div className="hidden lg:block absolute -right-12 top-1/2 w-2 h-2 bg-white/30 rounded-full transform -translate-y-1/2" />
                  )}
                  
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/90 flex items-center justify-center mb-6 z-10 relative transition-transform duration-500 group-hover:scale-110">
                    <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-gray-800 transition-transform duration-500 group-hover:rotate-12" />
                  </div>
                  <div className="w-full -mt-7 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                    <div className="relative overflow-hidden rounded-t-full">
                      <div className="pb-[150%] relative">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm shadow-lg transition-all duration-500 group-hover:shadow-2xl">
                          <img 
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 text-white">
                      <h3 className="text-2xl lg:text-3xl font-bold mb-2 transform transition-all duration-500 group-hover:translate-y-[-4px]">
                        {item.title}
                      </h3>
                      <p className="text-white/80 mb-4 transform transition-all duration-500 delay-75 group-hover:translate-y-[-2px] group-hover:text-white">
                        {item.subtitle}
                      </p>
                      <a 
                        href={item.href}
                        onClick={(e) => handleNavigation(e, item.page)}
                        className="inline-block text-white font-semibold uppercase text-sm tracking-wider pb-1 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:left-0 after:bottom-0 after:transition-all after:duration-150 hover:after:w-full"
                      >
                        Descubrir más
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}