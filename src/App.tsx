import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { MainGrid } from './components/MainGrid';
import { Testimonials } from './components/Testimonials';
import { AboutUs } from './components/AboutUs';
import { CoachingSection } from './components/CoachingSection';
import { VideoGallery } from './components/VideoGallery';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Conferencias } from './pages/Conferencias';
import { Mentorias } from './pages/Mentorias';
import { Nosotros } from './pages/Nosotros';
import { Contacto } from './pages/Contacto';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const aboutUsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!aboutUsRef.current) return;

      const aboutUsRect = aboutUsRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const triggerPoint = windowHeight * 0.7;
      const transitionDistance = windowHeight * 0.5;
      
      let progress = 0;
      if (aboutUsRect.top < triggerPoint) {
        progress = Math.min(
          (triggerPoint - aboutUsRect.top) / transitionDistance,
          1
        );
      }

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 600);
  };

  const interpolateColor = (progress: number) => {
    const value = Math.round(255 * (1 - progress));
    return `rgb(${value}, ${value}, ${value})`;
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-500 ease-out relative"
      style={{ 
        backgroundColor: interpolateColor(scrollProgress)
      }}
    >
      <CustomCursor />
      
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute inset-0 bg-lines transition-opacity duration-500 ease-out ${
          scrollProgress > 0 ? 'opacity-0' : 'opacity-100'
        }`} />
        <div className={`absolute inset-0 bg-lines-dark transition-opacity duration-500 ease-out ${
          scrollProgress > 0 ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>

      <Navigation onNavigate={handleNavigate} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          {currentPage === 'home' ? (
            <>
              <MainGrid onNavigate={handleNavigate} />
              <Testimonials />
              <div ref={aboutUsRef}>
                <AboutUs />
              </div>
              <CoachingSection />
              <VideoGallery />
              <CallToAction />
            </>
          ) : currentPage === 'conferencias' ? (
            <Conferencias />
          ) : currentPage === 'mentorias' ? (
            <Mentorias />
          ) : currentPage === 'nosotros' ? (
            <Nosotros />
          ) : currentPage === 'contacto' ? (
            <Contacto />
          ) : null}
        </motion.div>
      </AnimatePresence>
      
      <Footer onNavigate={handleNavigate} />

      {/* Page Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
            className="fixed inset-0 bg-black origin-bottom z-50"
          />
        )}
      </AnimatePresence>
    </div>
  );
}