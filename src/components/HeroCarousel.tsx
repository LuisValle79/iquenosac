import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    url: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/489436319_122102566976831227_6977553803374826236_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ELAf6-Hx8SoQ7kNvwEpnwHM&_nc_oc=Adkwif-I5i9ziRJoNTfpTmOKyPq9gOkctZwb0xIlkPCSrpSjd_gdaRlVvg3kasFPU0pmD8zLW21QsU9QasVWrO6v&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=yipd4Bf4Z6LsTs1QJiMSIA&oh=00_AfEjftWIjs7dg7SoH-Mgr7nbiAo6Hi7oxxzT4Zy9gyzboA&oe=67FA9B04',
    title: 'Implementos Agrícolas de Alta Calidad'
  },
  {
    url: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/488928785_122102567072831227_6074464536442912843_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=BLjp62YAmyoQ7kNvwExCkr7&_nc_oc=AdkL7WcNvZXW7Ot_SJYQBUnzhodRf4WBoohO_UMMiU8NtILVJ4FD_xamtTXHymVsn_Sdb6tL24pdd1r-5pdtrx-j&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=5wWOZv0axDHqivL50FeiRQ&oh=00_AfErVtT4O7usiRIoecyh_tsRp12oKbAugGgd470dA_SZHQ&oe=67FAACA3',
    title: 'Maquinaria de Última Generación'
  },
  {
    url: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/488701882_122102567036831227_5810811552030735017_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=L2FeMdxkAtQQ7kNvwFE4s-b&_nc_oc=Adl8eNMIDmv0FSd7v0TmELHILJAtr7dIDYOjevj6X_tFKl0eRwO2_rhp4-gALYD83psRqlO3NFxaEamNhDWzEtJ9&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=FuuTgkNCM3j9CunDzY-g8Q&oh=00_AfGbR9gEha8RL57cpBFTa348K3C1rErdnR3rxx7X-lutzw&oe=67FA87BD',
    title: 'Soluciones para el Campo'
  },
  {
    url: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/489809519_122102566970831227_6636887066957775758_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=P1IiEJW5Yj4Q7kNvwGGOg5R&_nc_oc=Adl5VyckH5e9s1z6czuRb0ulGXsjTlru3cSFMhj5MI__3NRZbEE2t9YkU1C6hoorkBAXoalIUExPNd2WG_NdMs3-&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=SKUwTOppbjfhbifZ8y8TvA&oh=00_AfFk5ro-ltSBTuk5udXuLQrxp1juaor6_2skeu1NWsebxw&oe=67FA9442',
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
    <div className="relative h-[90vh] overflow-hidden">
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
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image.url})` }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
        ))}
      </div>

      {/* Contenido */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 transition-opacity duration-500">
              {images[currentIndex].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Especialistas en maquinaria agrícola y soluciones para el campo desde hace más de 20 años
            </p>
            <div className="flex gap-4">
              <a 
                href="#contacto"
                className="bg-machinery-200 text-tractor-400 px-8 py-3 rounded-lg font-semibold hover:bg-machinery-300 transition duration-300 inline-flex items-center"
              >
                Contáctanos
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#maquinarias"
                className="bg-tractor-200 text-white px-8 py-3 rounded-lg font-semibold hover:bg-tractor-300 transition duration-300 inline-flex items-center"
              >
                Ver Productos
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="https://www.implementosagricolasfsi.com/images/catalogo.pdf"
                className="bg-machinery-200 text-tractor-400 px-8 py-3 rounded-lg font-semibold hover:bg-machinery-300 transition duration-300 inline-flex items-center"
              >
                Ver Catálogo de Productos
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Controles del carrusel */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={goToPrevious}
          className="bg-black bg-opacity-50 text-white p-2 m-4 rounded-full hover:bg-opacity-75 transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
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
