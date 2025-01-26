import { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getUpcomingEvents } from '../services/calendarService';
import { CalendarEvent } from '../types/event';

export function Conferencias() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const eventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const upcomingEvents = await getUpcomingEvents();
        setEvents(upcomingEvents);
      } catch (err) {
        setError('Error al cargar los eventos. Por favor, intenta más tarde.');
      } finally {
        setLoading(false);
      }
    }

    loadEvents();

    // Add delay for video animation
    const timer = setTimeout(() => {
      setVideoVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const scrollToEvents = () => {
    eventsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando eventos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">{error}</div>
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
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/conferenciasBG.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Photo Overlay - Absolute Right and Bottom */}
        <div 
          className="absolute bottom-0 right-16 w-[600px] h-[900px] animate-slide-in-right"
          style={{
            animation: 'slideInRight 1s ease-out forwards',
            opacity: 0,
            transform: 'translateX(100px)'
          }}
        >
          <img
            src="https://i.postimg.cc/ZqTx8dtT/rebe1.png"
            alt="Rebe"
            className="w-full h-full object-contain object-bottom"
          />
        </div>

        {/* Hero Content - Positioned at absolute left */}
        <div className="absolute bottom-0 left-0">
          <div className="space-y-6 p-12 md:p-24">
            {/* Category Tag */}
            <div className="text-white/80 tracking-widest text-sm font-medium uppercase">
              • CONFERENCIAS
            </div>
            
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-[1.1] max-w-10xl">
              Nuestras Conferencias
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl">
              Conecta, involúcrate y evoluciona intencionalmente.
            </p>
            
            {/* CTA Button */}
            <div className="pt-4">
              <button 
                onClick={scrollToEvents}
                className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                CALENDARIO
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div ref={eventsRef} className="container mx-auto px-4 py-32">
        <div className="max-w-6xl mx-auto space-y-8">
          {events.map((event) => (
            <div 
              key={event.id}
              className="group relative overflow-hidden rounded-3xl bg-[#1a1a1a] transition-all duration-500 hover:bg-[#222]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="relative aspect-video lg:aspect-auto">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                      {event.isVirtual ? 'VIRTUAL & PRESENCIAL' : 'PRESENCIAL'}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                      {event.title}
                    </h3>
                    <p className="text-xl text-white/80 mb-8">
                      {event.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="flex items-center gap-3 text-white/80">
                        <Calendar className="w-6 h-6" />
                        <div>
                          <p className="text-sm uppercase tracking-wider text-white/60">FECHA</p>
                          <p>{format(event.startDate, 'dd MMM yyyy', { locale: es })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-white/80">
                        <MapPin className="w-6 h-6" />
                        <div>
                          <p className="text-sm uppercase tracking-wider text-white/60">LUGAR</p>
                          <p>{event.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-white/80">
                        <Clock className="w-6 h-6" />
                        <div>
                          <p className="text-sm uppercase tracking-wider text-white/60">ZONA HORARIA</p>
                          <p>{event.timezone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="bg-white text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-gray-100 transform hover:scale-105 text-lg">
                    Más información
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}