import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  display_order: number;
}

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setGalleryImages(data || []);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        // Fallback to default images if database fails
        setGalleryImages([
          {
            id: "1",
            src: "/lovable-uploads/33b7de37-764e-4fe0-a795-a35f62436f20.png",
            alt: "Classic white Cadillac convertible",
            title: "Luxury Classic Transport",
            display_order: 1
          },
          {
            id: "2",
            src: "/lovable-uploads/1a788d6c-87e0-477a-a9da-0ad87527560a.png",
            alt: "Red Ferrari at Exotic Hauls facility",
            title: "Professional Ferrari Service",
            display_order: 2
          },
          {
            id: "3",
            src: "/lovable-uploads/b7edde2c-6c3a-480f-a00d-3643e91db773.png",
            alt: "Red Ferrari sports car front view",
            title: "Exotic Car Expertise",
            display_order: 3
          },
          {
            id: "4",
            src: "/lovable-uploads/75cb4a20-57af-422f-8715-c03722bfecb6.png",
            alt: "Red Ferrari sports car with Exotic Hauls facility",
            title: "Professional Exotic Car Service",
            display_order: 4
          }
        ]);
      }
    };

    fetchGalleryImages();
  }, []);

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
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
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
          ))}
        </div>
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
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <h3 className="text-white text-xl font-semibold mb-2">
                {galleryImages[selectedImage].title}
              </h3>
              <p className="text-slate-300">
                {galleryImages[selectedImage].alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;