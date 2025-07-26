
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      src: "/lovable-uploads/33b7de37-764e-4fe0-a795-a35f62436f20.png",
      alt: "Classic white Cadillac convertible with white wall tires",
      title: "Vintage Cadillac Transport"
    },
    {
      src: "/lovable-uploads/1a788d6c-87e0-477a-a9da-0ad87527560a.png",
      alt: "Red Ferrari sports car with Exotic Hauls trailer",
      title: "Ferrari Transport Service"
    },
    {
      src: "/lovable-uploads/b7edde2c-6c3a-480f-a00d-3643e91db773.png",
      alt: "Red Ferrari secured in enclosed trailer",
      title: "Secure Exotic Car Transport"
    },
    {
      src: "/lovable-uploads/75cb4a20-57af-422f-8715-c03722bfecb6.png",
      alt: "Red Ferrari sports car with Exotic Hauls facility",
      title: "Professional Exotic Car Service"
    }
  ];

  const openModal = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Our Work Gallery
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See our professional vehicle transport services in action. From classic muscle cars to modern supercars, 
            we handle every vehicle with the utmost care and precision.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div
                  className="group relative overflow-hidden rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  onClick={() => openModal(index)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-2">{image.title}</h3>
                      <p className="text-slate-300 text-sm">{image.alt}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-slate-700/80 border-slate-600 text-white hover:bg-slate-600/80" />
          <CarouselNext className="hidden md:flex -right-4 bg-slate-700/80 border-slate-600 text-white hover:bg-slate-600/80" />
        </Carousel>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-slate-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={() => navigateImage('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-slate-300 transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={() => navigateImage('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-slate-300 transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-6xl max-h-[90vh] flex flex-col items-center">
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <h3 className="text-white text-xl font-semibold mb-2">
                {images[selectedImage].title}
              </h3>
              <p className="text-slate-300">
                {images[selectedImage].alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
