
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      src: "/lovable-uploads/24803038-86a9-447e-838b-df46ff328267.png",
      alt: "Classic white muscle car with garage and trailer in background",
      title: "Premium Vehicle Transport"
    },
    {
      src: "/lovable-uploads/b6e12579-8844-4452-8c2a-b7048fd6d6fe.png",
      alt: "Yellow Camaro with Exotic Hauls trailer",
      title: "Enclosed Transport Service"
    },
    {
      src: "/lovable-uploads/06ac5453-d2af-4fdb-8a8e-c702e845a19b.png",
      alt: "Red Chevelle SS on road",
      title: "Classic Car Transport"
    },
    {
      src: "/lovable-uploads/4f4d99da-f728-4d31-998c-556a2aed909c.png",
      alt: "Car restoration project in garage",
      title: "Project Vehicle Transport"
    },
    {
      src: "/lovable-uploads/9bc603e1-82eb-4d5a-8035-ef6cb4701266.png",
      alt: "Beige classic car with transport trailer",
      title: "Door-to-Door Service"
    },
    {
      src: "/lovable-uploads/627bc006-413c-431f-85d3-62e06439bdd1.png",
      alt: "Yellow Chevrolet SSR in driveway",
      title: "Specialty Vehicle Transport"
    },
    {
      src: "/lovable-uploads/a4488eb7-2e97-46ad-9921-ac5e291b8fea.png",
      alt: "Gray Nissan GT-R with sport modifications",
      title: "High-Performance Vehicle Transport"
    },
    {
      src: "/lovable-uploads/ad2311cc-3c3a-4ace-a999-ec5a2179ee0c.png",
      alt: "Ford Super Duty with Exotic Hauls trailer",
      title: "Professional Transport Equipment"
    },
    {
      src: "/lovable-uploads/16da9ec3-d4bb-4988-ad70-e8bf8fb0e5d1.png",
      alt: "Exotic Hauls enclosed trailer",
      title: "State-of-the-Art Enclosed Trailers"
    },
    {
      src: "/lovable-uploads/0ec65096-63ea-46db-afcc-52ca593c270e.png",
      alt: "Brown Lincoln Continental Town Car",
      title: "Luxury Vehicle Transport"
    },
    {
      src: "/lovable-uploads/3ff36979-decd-4301-9dbf-90d3384a9dd7.png",
      alt: "Classic Cutlass in enclosed trailer with professional tie-downs",
      title: "Secure Classic Car Transport"
    },
    {
      src: "/lovable-uploads/671a0d00-61bc-4adf-b38f-935dfcf7927f.png",
      alt: "Classic Lincoln Continental with Exotic Hauls trailer",
      title: "Premium Classic Vehicle Service"
    },
    {
      src: "/lovable-uploads/1428e2d0-b837-46ff-8788-e61f28ae7dfc.png",
      alt: "Ford Super Duty with Exotic Hauls trailer and vintage race car",
      title: "Professional Racing Vehicle Transport"
    },
    {
      src: "/lovable-uploads/6d603409-1a90-4f95-bdd8-614bcf277458.png",
      alt: "Vintage race car #75 in garage facility",
      title: "Historic Racing Car Transport"
    },
    {
      src: "/lovable-uploads/1aa3cad8-7e05-43e7-a430-292db73cd633.png",
      alt: "Blue Dodge Viper with white stripes in enclosed trailer",
      title: "Supercar Transport Service"
    },
    {
      src: "/lovable-uploads/39e4a890-c6e0-4aa2-a23a-e1b9c2e2eff6.png",
      alt: "Black classic Chevrolet pickup truck in garage",
      title: "Classic Truck Transport"
    },
    {
      src: "/lovable-uploads/df48a8be-113f-431b-9cf6-9eea3451fe55.png",
      alt: "Blue vintage race car #99 Daytona in enclosed trailer",
      title: "Vintage Racing Vehicle Transport"
    },
    {
      src: "/lovable-uploads/6a2e4fb4-34fa-469d-b760-fc70224cb71b.png",
      alt: "Blue Dodge Viper GTS with white stripes at dealership",
      title: "Exotic Sports Car Transport"
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Work Gallery
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
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
