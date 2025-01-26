import { useState, useEffect } from 'react';
import { navigationItems } from '../constants/navigation';
import { Phone, Mail } from 'lucide-react';

interface NavigationProps {
  onNavigate: (page: string) => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <a 
              href="/" 
              onClick={(e) => handleNavigation(e, 'home')}
              className="h-12"
            >
              <img 
                src="/Logo_Alex_Rebe.png" 
                alt="Alex & Rebe Logo" 
                className="h-full w-auto"
              />
            </a>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center gap-8">
              <a 
                href="https://wa.me/50672521125" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>(506) 7252-1125</span>
              </a>
              <a 
                href="mailto:info@creere.net"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>info@creere.net</span>
              </a>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-12">
              {navigationItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.page)}
                  className="text-white/80 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
                >
                  {item.title}
                </a>
              ))}
              
              {/* CTA Button */}
              <a 
                href="https://forms.gle/9hH6F1vaU4W6VmuF7"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Empezar ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}