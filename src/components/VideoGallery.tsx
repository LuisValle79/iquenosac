import React from 'react';
import { Play, X } from 'lucide-react';
import image1 from '../assets/encamadora_integral.jpg';
import image2 from '../assets/Desbrozadoradehojapapayocamote.jpg';
import image3 from '../assets/Cosechadora-de-papasycamote-nueva-presentacion.jpg';
import image4 from '../assets/picadoraestacionaria_chala4tn.jpg';
import image5 from '../assets/abonadora_hidraulica.jpg';

const videos = [
  {
    id: 1,
    title: 'Encamadora Integral - FSI Implementos agricolas El Iqueño SAC.- Perú',
    description: 'Encamadora Integral para formar camas agrícolas uniformes en cultivos como papa y camote. Optimiza la preparación del terreno, mejorando la siembra y el riego. Fabricada por FSI Implementos Agrícolas El Iqueño SAC – calidad y eficiencia peruana.',
    thumbnail: image1,
    videoUrl: 'https://www.youtube.com/embed/Df9nYUyeqKQ'
  },
  {
    id: 2,
    title: 'Picadora / Desbrozadora de hoja de papa y/o Camote con cadena (nueva) - FSI SAC-EL IQUEÑO - PERÚ',
    description: 'Ideal para la limpieza de cultivo, elimina residuos vegetales con rapidez y presicion, mejorando el manejo de terreno. Diseñada por FSI SAC – EL IQUEÑO, calidad peruana para el trabajo agrícola eficiente.',
    thumbnail: image2,
    videoUrl: 'https://www.youtube.com/embed/bEw1sz8uqBA'
  },
  {
    id: 3,
    title: 'Cosechadora de papa y camote - FSI SAC EL IQUEÑO- PERÚ',
    description: 'Cosechadora especializada para papa y camote, ideal para agilizar tu cosecha. Extrae los tubérculos sin dañarlos y los separa eficientemente del suelo. Aumenta tu productividad y reduce el trabajo manual en el campo.',
    thumbnail: image3,
    videoUrl: 'https://www.youtube.com/embed/TQa2QJd5V6Q'
  },
  {
    id: 4,
    title: 'Picadora de chala - FSI SAC EL IQUEÑO- PERÚ',
    description: 'La picadora de chala es una máquina diseñada para triturar residuos agrícolas como la chala de maíz, facilitando su uso como alimento para ganado o compostaje. Su estructura robusta y eficiencia de corte optimizan el trabajo en el campo.',
    thumbnail: image4,
    videoUrl: 'https://www.youtube.com/embed/16TeUur6h4I?si=_TASIpou40ueYkJX'
  },
  {
    id: 5,
    title: 'Cultivadora-Abonadora con sistema hidráulico - FSI SAC EL IQUEÑO- PERÚ',
    description: 'Herramienta agrícola versátil que permite remover la tierra y aplicar abono simultáneamente. Gracias a su sistema hidráulico, ofrece mayor precisión y facilidad de uso. Es ideal para mejorar la fertilidad del suelo y optimizar el cultivo. Diseñada para aumentar la eficiencia y reducir el esfuerzo en labores agrícolas.',
    thumbnail: image5,
    videoUrl: 'https://www.youtube.com/embed/wxxXzlx5HpM?si=FYv2xYeAT59y6_hm'
    
  }
];

const VideoGallery: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = React.useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-8">
        {videos.map(video => (
          <div 
            key={video.id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => setSelectedVideo(video.id)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-40"
              >
                <Play className="h-12 w-12 text-white" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {video.title}
              </h3>
              <p className="text-gray-600">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  {videos.find(v => v.id === selectedVideo)?.title}
                </h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={videos.find(v => v.id === selectedVideo)?.videoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;