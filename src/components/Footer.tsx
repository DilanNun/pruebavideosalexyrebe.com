import { Facebook, Instagram, Linkedin, Mail, ChevronRight } from 'lucide-react';

const footerLinks = {
  mainLinks: [
    {
      title: "Sobre Nosotros",
      links: [
        { text: "Conferencias", href: "/conferencias", page: 'conferencias' },
        { text: "Mentorías", href: "/mentorias", page: 'mentorias' },
        { text: "Nosotros", href: "/nosotros", page: 'nosotros' },
        { text: "Contacto", href: "/contacto", page: 'contacto' },
        { text: "Empieza Ahora", href: "https://forms.gle/9hH6F1vaU4W6VmuF7" }
      ]
    },
    {
      title: "Recursos",
      links: [
        { text: "Documentales", href: "https://forms.gle/9hH6F1vaU4W6VmuF7" },
        { text: "Podcast", href: "https://forms.gle/9hH6F1vaU4W6VmuF7" },
        { text: "Blog", href: "https://forms.gle/9hH6F1vaU4W6VmuF7" },
        { text: "Recursos Gratuitos", href: "https://forms.gle/9hH6F1vaU4W6VmuF7" },
        { text: "Tienda", href: "https://forms.gle/9hH6F1vaU4W6VmuF7" }
      ]
    },
    {
      title: "Comunidad",
      links: [
        { text: "Instagram", href: "https://www.instagram.com/alexy_rebe/" },
        { text: "Facebook", href: "https://www.facebook.com/profile.php?id=100063522498163" },
        { text: "WhatsApp", href: "https://wa.me/50672521125" }
      ]
    }
  ],
  supportSections: [
    {
      title: "Atención al Cliente",
      description: "Contáctanos para preguntas sobre productos, coaching o eventos.",
      icon: ChevronRight,
      href: "https://forms.gle/9hH6F1vaU4W6VmuF7"
    },
    {
      title: "Consultas de Medios",
      description: "Alex & Rebe cuenta con un departamento de medios dedicado. Los miembros de la prensa son bienvenidos a contactarnos.",
      icon: ChevronRight,
      href: "https://forms.gle/9hH6F1vaU4W6VmuF7"
    }
  ]
};

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, page?: string) => {
    if (!page) return;
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerLinks.mainLinks.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href}
                        onClick={(e) => link.page ? handleNavigation(e, link.page) : undefined}
                        target={!link.page ? "_blank" : undefined}
                        rel={!link.page ? "noopener noreferrer" : undefined}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Support Sections */}
          <div className="lg:col-span-4 space-y-8">
            {footerLinks.supportSections.map((section, index) => (
              <div key={index} className="group">
                <a 
                  href={section.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block space-y-2 group-hover:translate-x-2 transition-transform duration-300"
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                    <section.icon className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {section.description}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">© 2024 Alex & Rebe</span>
              <div className="flex gap-4">
                <a 
                  href="https://forms.gle/9hH6F1vaU4W6VmuF7"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Términos
                </a>
                <a 
                  href="https://forms.gle/9hH6F1vaU4W6VmuF7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacidad
                </a>
              </div>
            </div>
            
            <div className="flex gap-6">
              <a 
                href="https://www.facebook.com/profile.php?id=100063522498163"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/alexy_rebe/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://forms.gle/9hH6F1vaU4W6VmuF7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:info@creere.net"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}