import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    url: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/488701882_122102567036831227_5810811552030735017_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=618840U2CSoQ7kNvwH9r9ji&_nc_oc=AdkeE-15u55bcmRjJL2Por0sbiIGMaq0pA4LGeTR4u8QmiYWRWJyAjc9mCZLouTbJhoycLtIaQLgRxPTyjnct6jl&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=2AokxqK5cgAXgNYFNpH-Rg&oh=00_AfFoxYnFvuwP7ZEgXqKNau-VaLpfJRvXlizQjMjHOH-eTA&oe=6814AD7D',
    title: 'Implementos Agrícolas de Alta Calidad'
  },
  {
    url: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/489809519_122102566970831227_6636887066957775758_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=aeF-Jbq08g8Q7kNvwEu_Kd7&_nc_oc=AdkowZGBsEiA825qcTWuThJO2xpcxVuoOHn5Qdy6Uare8PXocCLytrH_ytNUmyUHddBIxjY1efIzn0p3VwnLEzZd&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=oICWjUQ8mEh5Bqd6U2zq_Q&oh=00_AfEXw_AHJXxsO1DIFS2jtg4cdM3pTIR1N5EA7aQb9nq-ew&oe=681481C2',
    title: 'Maquinaria de Última Generación'
  },
  {
    url: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/489436319_122102566976831227_6977553803374826236_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=KFzFdUBueesQ7kNvwGdLByv&_nc_oc=AdklqEKcJlgKvZ-QC8tJBOCDXW8vYWlcjTQhn0IPChpv4mTkVF9sILQHo7MrsO5kO27WLiagsY49t5TbJ18IqWsG&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=khDw8Wv5TfO6F13_PCaa2g&oh=00_AfHGI-jc_VdybztaJ1oDXbkxiXo1JG5HY-VZGNBlYSLYvg&oe=68148884',
    title: 'Soluciones para el Campo'
  },
  {
    url: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/488928785_122102567072831227_6074464536442912843_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=hrqXi5Gdc8oQ7kNvwEPDUbW&_nc_oc=AdkxFQGWjv1bNjtdMrPIucOVeG0seKyzgUXWs2GG7K8IATa3wSwBnYoWy8yYUliV1u0ZISTecENTBaV_yR3EgyQf&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=st4ypOBr5L4bTIzqdPY5bw&oh=00_AfHnjvEZQwbzqNxjjNQFFbZIM01MsUimiuQfzGBa_ejDhQ&oe=68149A23',
    title: 'Experiencia y Calidad'
  }
];

const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
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
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
              style={{ 
                backgroundImage: `url(${image.url})`,
                backgroundPosition: 'center center',
                transform: 'scale(1.02)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
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
              Especialistas en maquinaria agrícola y soluciones para el campo desde hace más de 20 años
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
