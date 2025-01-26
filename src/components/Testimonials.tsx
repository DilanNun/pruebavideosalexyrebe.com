import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../constants/testimonials';
import { values } from '../constants/values';

export function Testimonials() {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newPage = direction === 'next' 
      ? (currentPage + 1) % totalPages
      : (currentPage - 1 + totalPages) % totalPages;
    
    setCurrentPage(newPage);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getCurrentTestimonials = () => {
    const start = currentPage * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  };

  return (
    <section ref={testimonialsRef} className="min-h-screen flex flex-col justify-center py-32">
      {/* Values Section */}
      <div className="container mx-auto px-4 mb-32">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
          Nuestros Valores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="animate-on-scroll opacity-0 flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                  <Icon className="w-10 h-10 text-gray-800 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
          TESTIMONIOS
        </h2>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentTestimonials().map((testimonial, index) => (
              <div
                key={`${currentPage}-${index}`}
                className="group animate-on-scroll opacity-0 bg-white shadow-lg rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 hover:bg-gradient-to-b hover:from-white hover:to-gray-50"
                style={{
                  animation: 'fadeIn 0.5s ease-out forwards',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex items-center mb-6 transition-transform duration-500 group-hover:translate-y-[-4px]">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-100 transition-transform duration-500 group-hover:scale-110 group-hover:border-gray-200"
                    />
                    <div className="absolute inset-0 rounded-full transition-transform duration-500 group-hover:shadow-lg" />
                  </div>
                  <div className="transition-transform duration-500 group-hover:translate-y-[-2px]">
                    <h3 className="text-gray-800 font-semibold text-lg group-hover:text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600 group-hover:text-gray-700">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed transition-all duration-500 group-hover:text-gray-900">
                  {testimonial.content}
                </p>
                <div className="h-1 w-0 bg-gradient-to-r from-gray-200 to-gray-300 mt-6 transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => handlePageChange('prev')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => handlePageChange('next')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Page Indicators */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating && index !== currentPage) {
                    setIsAnimating(true);
                    setCurrentPage(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPage 
                    ? 'bg-gray-800 w-4' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}