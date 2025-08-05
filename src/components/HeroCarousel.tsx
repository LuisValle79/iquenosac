import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import portada1 from '../assets/portada1.jpg';
import portada2 from '../assets/portada2.jpg';
import portada3 from '../assets/portada3.jpg';
import portada4 from "../assets/Abonadora-Fertilizadora-Hidraulica.jpg";



const images = [
  { url: portada1, title: 'Implementos Agrícolas de Alta Calidad' },
  { url: portada2, title: 'Maquinaria de Última Generación' },
  { url: portada3, title: 'Soluciones para el Campo' },
  { url: portada4, title: 'Experiencia y Calidad' }
];

const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    goToSlide(newIndex);
  };

  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      {/* Imágenes del carrusel */}
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${image.url})`,
                backgroundPosition: 'center center',
                transform: 'scale(1.02)'
              }}
            />
            <div className="absolute inset-0 " />
          </div>
        ))}
      </div>

      {/* Contenido */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-white max-w-2xl mx-auto text-center sm:text-left sm:mx-0 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 transition-opacity duration-500">
              {images[currentIndex].title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8">
              Especialistas en maquinaria agrícola y soluciones para el campo desde hace más de 30 años
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 items-center max-w-[280px] sm:max-w-none mx-auto sm:mx-0">
              <a 
                href="#contacto"
                className="w-full sm:w-auto bg-machinery-200 text-tractor-400 px-4 sm:px-6 py-3 sm:py-2.5 rounded-lg font-semibold hover:bg-machinery-300 transition duration-300 inline-flex items-center justify-center text-sm sm:text-base hover:scale-105"
              >
                <span>Contáctanos</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="#maquinarias"
                className="w-full sm:w-auto bg-tractor-200 text-white px-4 sm:px-6 py-3 sm:py-2.5 rounded-lg font-semibold hover:bg-tractor-300 transition duration-300 inline-flex items-center justify-center text-sm sm:text-base hover:scale-105"
              >
                <span>Ver Productos</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="https://www.implementosagricolasfsi.com/images/catalogo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-machinery-200 text-tractor-400 px-4 sm:px-6 py-3 sm:py-2.5 rounded-lg font-semibold hover:bg-machinery-300 transition duration-300 inline-flex items-center justify-center text-sm sm:text-base hover:scale-105"
              >
                <span>Abrir Catálogo</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Controles del carrusel */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={goToPrevious}
          className="bg-black bg-opacity-50 text-white p-1 sm:p-2 m-2 sm:m-4 rounded-full hover:bg-opacity-75 transition-all"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={goToNext}
          className="bg-black bg-opacity-50 text-white p-2 m-4 rounded-full hover:bg-opacity-75 transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
