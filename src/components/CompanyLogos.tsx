import { useEffect, useRef } from 'react';

const logos = [
  // Local logos
  {
    name: "UCR",
    url: "/logos/ucr.png",
    width: 48,
    height: 48
  },
  {
    name: "HP",
    url: "/logos/hp.png",
    width: 48,
    height: 48
  },
  {
    name: "Boston Scientific",
    url: "/logos/boston.svg",
    width: 160,
    height: 48
  },
  {
    name: "Grupo Bimbo",
    url: "/logos/bimbo.png",
    width: 140,
    height: 48
  },
  {
    name: "Baxter",
    url: "/logos/baxter.png",
    width: 140,
    height: 48
  },
  {
    name: "BAC Credomatic",
    url: "/logos/bac.png",
    width: 160,
    height: 48
  },
  {
    name: "Avianca",
    url: "/logos/avianca.png",
    width: 200,
    height: 60
  },
  {
    name: "American Airlines",
    url: "/logos/americanair.png",
    width: 200,
    height: 60
  },
  // Remote logos that still work
  {
    name: "AFZ",
    url: "/logos/afz.png",
    width: 120,
    height: 48
  },
  {
    name: "Pepsi",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Pepsi_logo_2014.svg",
    width: 120,
    height: 48
  },
  {
    name: "Coca-Cola",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
    width: 140,
    height: 48
  },
  {
    name: "Hyundai",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg",
    width: 140,
    height: 48
  },
  {
    name: "Maersk",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Maersk_Group_Logo.svg",
    width: 140,
    height: 48
  },
  {
    name: "Tigo",
    url: "/logos/tigo.png",
    width: 100,
    height: 48
  },
  {
    name: "P&G",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/85/Procter_%26_Gamble_logo.svg",
    width: 140,
    height: 48
  },
  {
    name: "DHL",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/ac/DHL_Logo.svg",
    width: 120,
    height: 48
  },
  {
    name: "Deloitte",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",
    width: 140,
    height: 48
  }
];

// Double the logos array for seamless scrolling
const doubledLogos = [...logos, ...logos];

export function CompanyLogos() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('entrance-visible');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      containerRef.current.classList.add('entrance-hidden');
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="bg-white py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-4">
            • NUESTROS CLIENTES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Empresas que confían en nosotros
          </h2>
        </div>

        {/* Logos Container */}
        <div className="relative overflow-hidden">
          <div className="relative h-[100px]">
            <div 
              className="flex absolute top-0 left-0 animate-scroll"
              style={{
                gap: '12px',
                width: `${doubledLogos.length * 212}px` // 200px width + 12px gap
              }}
            >
              {doubledLogos.map((logo, index) => (
                <div 
                  key={index}
                  className="flex-none w-[200px] h-[100px] flex items-center justify-center bg-white rounded-2xl"
                >
                  <img
                    src={logo.url}
                    alt={`${logo.name} logo`}
                    width={logo.width}
                    height={logo.height}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain p-4"
                    style={{
                      width: 'auto',
                      height: '100%'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}