import { Play } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const videos = [
  {
    id: 1,
    title: "Conferencia Liderazgo 2024",
    thumbnail: "https://i.postimg.cc/pLwyBWQT/carrusel11.jpg",
    videoUrl: "https://player.vimeo.com/video/1049490122?h=4b32300ad4"
  },
  {
    id: 2,
    title: "Workshop Empresarial",
    thumbnail: "https://i.postimg.cc/d1v1z5xc/carrusel22.jpg",
    videoUrl: "https://player.vimeo.com/video/1049487633?h=da5a3626d0"
  },
  {
    id: 3,
    title: "Transformación Personal",
    thumbnail: "https://i.postimg.cc/90Qffr2x/carrusel33.jpg",
    videoUrl: "https://player.vimeo.com/video/1049487787?h=8365b1b73e"
  },
  {
    id: 4,
    title: "Mentoría Grupal",
    thumbnail: "https://i.postimg.cc/TPn17zQc/carrusel44.jpg",
    videoUrl: "https://player.vimeo.com/video/1049488890?h=fd9dea828f"
  },
  {
    id: 5,
    title: "Evento Corporativo",
    thumbnail: "https://i.postimg.cc/ydPdB0Mg/carrusel55.jpg",
    videoUrl: "https://player.vimeo.com/video/1049489795?h=f1760128bb"
  }
];

// Double the videos array for seamless scrolling
const doubledVideos = [...videos, ...videos];

export function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

    const elements = [headerRef.current, gridRef.current];
    elements.forEach((el) => {
      if (el) {
        el.classList.add('entrance-hidden');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Find the selected video object based on the ID
  const selectedVideoData = selectedVideo ? videos.find(v => v.id === selectedVideo) : null;

  return (
    <section ref={sectionRef} className="relative py-32 bg-black">
      <div ref={headerRef} className="container mx-auto px-4 mb-16 entrance-fade-up">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Nuestros Momentos
        </h2>
        <p className="text-xl text-white/80 text-center mb-16">
          Explora nuestras conferencias y eventos más destacados
        </p>
      </div>

      <div ref={gridRef} className="relative overflow-hidden entrance-scale-in">
        <div className="relative h-[600px]">
          <div 
            className="flex absolute top-0 left-0 animate-scroll"
            style={{
              gap: '12px',
              width: `${doubledVideos.length * 412}px` // 400px width + 12px gap
            }}
          >
            {doubledVideos.map((video, index) => (
              <div
                key={`${video.id}-${index}`}
                className="flex-none w-[400px] aspect-[9/16] relative group cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => setSelectedVideo(video.id)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold text-lg transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && selectedVideoData && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-6xl aspect-video">
            <iframe
              src={selectedVideoData.videoUrl}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedVideo(null)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}