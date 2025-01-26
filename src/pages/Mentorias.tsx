import { useState, useEffect } from 'react';
import { Car, Users2, Sprout, Handshake, DollarSign, Target } from 'lucide-react';
import { CompanyLogos } from '../components/CompanyLogos';

const carouselImages = [
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
];

const benefits = [
  {
    icon: Car,
    title: "Understand your roadblocks",
    description: "Dive deep into the limiting beliefs that keep you from experiencing the exponential growth you want."
  },
  {
    icon: Users2,
    title: "Lead more effectively",
    description: "Build a roadmap for success and become a master of execution in any setting with tools from Tony's Ultimate Success Formula."
  },
  {
    icon: Sprout,
    title: "Thrive in hard times",
    description: "Develop strategies for overcoming any hurdle you encounter, including changing economic and market conditions."
  },
  {
    icon: Handshake,
    title: "Recruit and retain top talent",
    description: "Learn how to create a growth culture, foster employee leadership and retain your high-performers."
  },
  {
    icon: DollarSign,
    title: "Increase revenue",
    description: "Learn how to optimize costs, customer experience, culture and market factors to add massive value to your bottom line."
  },
  {
    icon: Target,
    title: "Stay on track",
    description: "With regular sessions you'll have the accountability you need to see consistent change in the right direction."
  }
];

export function Mentorias() {
  const [loading, setLoading] = useState(true);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Add delay for video animation
    const videoTimer = setTimeout(() => {
      setVideoVisible(true);
    }, 500);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(videoTimer);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando programas...</div>
      </div>
    );
  }

  // Create two sets of images for seamless looping
  const doubleImages = [...carouselImages, ...carouselImages];

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
            <source src="/mentoriasBG.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Photo Overlay - Absolute Right and Bottom */}
        <div 
          className="absolute bottom-0 right-12 w-[500px] h-[800px] animate-slide-in-right"
          style={{
            animation: 'slideInRight 1s ease-out forwards',
            opacity: 0,
            transform: 'translateX(100px)'
          }}
        >
          <img
            src="https://i.postimg.cc/fbBjBRDY/alex1.png"
            alt="Alex"
            className="w-full h-full object-contain object-bottom"
          />
        </div>

        {/* Hero Content - Bottom Left */}
        <div className="absolute inset-0 flex items-end">
          <div className="space-y-6 p-12 md:p-24 pb-32">
            {/* Category Tag */}
            <div className="text-white/80 tracking-widest text-sm font-medium uppercase">
              • MENTORÍAS
            </div>
            
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl">
              Nuestras Mentorías
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl">
              Lleva tu empresa a nuevos horizontes
            </p>
            
            {/* CTA Button */}
            <div className="pt-4">
              <button 
                className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Agenda una mentoría
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Business Success Section */}
      <div className="bg-white py-32">
        <div className="container mx-auto px-12 md:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                With the one-on-one support of a Business Coach
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                You'll set clear goals, map action plans, break through limiting beliefs, and identify opportunities and strategies for creating geometric business growth.
              </p>
              <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Schedule your free session
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                alt="Business coaching session"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="bg-white overflow-hidden">
        <div className="relative h-[400px]">
          <div 
            className="flex absolute top-0 left-0 animate-scroll"
            style={{
              gap: '12px',
              width: `${doubleImages.length * 312}px` // 300px width + 12px gap
            }}
          >
            {doubleImages.map((image, index) => (
              <div
                key={index}
                className="flex-none w-[300px] h-[400px] overflow-hidden rounded-2xl shadow-lg"
              >
                <img
                  src={image}
                  alt={`Carousel image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitive Edge Section */}
      <div className="bg-white py-32">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-4">
              • BENEFICIOS
            </div>
            <h2 className="text-6xl md:text-7xl font-bold text-gray-900">
              Lidera con claridad y propósito
            </h2>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Company Logos Section */}
      <CompanyLogos />
    </div>
  );
}