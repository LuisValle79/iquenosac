import React from 'react';
import { Play, X } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: 'Encamadora Integral - FSI Implementos agricolas El Iqueño SAC.- Perú',
    description: 'Encamadora Integral para formar camas agrícolas uniformes en cultivos como papa y camote. Optimiza la preparación del terreno, mejorando la siembra y el riego. Fabricada por FSI Implementos Agrícolas El Iqueño SAC – calidad y eficiencia peruana.',
    thumbnail: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/488051985_122103155348831227_6711556660959515627_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=G--GCPLQlbsQ7kNvwFAk7vF&_nc_oc=AdmHCWrUlEpFfrO6iqKu4vuJkRQbiXgpd3XZJndCYyfSlfNFvcVrcZZrdOdMFSaFoOqbx1qoUwtKh-dVKRUvGqx2&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=7YuFpq89D3ib3_XQ8BZW-Q&oh=00_AfH-cAWJVR-rEYrBHLYNedS4UqrztyYqLAiTSB_L9r7suw&oe=68148D0E',
    videoUrl: 'https://www.youtube.com/embed/Df9nYUyeqKQ'
  },
  {
    id: 2,
    title: 'Picadora / Desbrozadora de hoja de papa y/o Camote con cadena (nueva) - FSI SAC-EL IQUEÑO - PERÚ',
    description: 'Ideal para la limpieza de cultivo, elimina residuos vegetales con rapidez y presicion, mejorando el manejo de terreno. Diseñada por FSI SAC – EL IQUEÑO, calidad peruana para el trabajo agrícola eficiente.',
    thumbnail: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/487506282_122103155252831227_5352684416294867912_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=xmhXtHiOshgQ7kNvwHEqYTU&_nc_oc=AdkS3Jgd2y8aQGn5oi2tiwdbuxvRQRhoyjyuV95Wm9pqynebUciS7JpxuE4dVWNV08lrRZpPzPMow_3ugL8te4Lk&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=j1NE4BUoWFyF0YVoMUEjzQ&oh=00_AfFemXYjJaNu9skoPPSMLtSMoltiSp7n8YJcISWkfuSU_A&oe=6814928E',
    videoUrl: 'https://www.youtube.com/embed/bEw1sz8uqBA'
  },
  {
    id: 3,
    title: 'Cosechadora de papa y camote - FSI SAC EL IQUEÑO- PERÚ',
    description: 'Cosechadora especializada para papa y camote, ideal para agilizar tu cosecha. Extrae los tubérculos sin dañarlos y los separa eficientemente del suelo. Aumenta tu productividad y reduce el trabajo manual en el campo.',
    thumbnail: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/487446927_122103155084831227_7733712358589050231_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=cKHCdqtIGn8Q7kNvwHUXHdj&_nc_oc=AdneJ1mZHGl6w8-25dRi3a6wrpPj74GObsKeUu58wGW-eXZWuUmf38tH0IQI1HWdUypv8hYzWz6dKucCmjBuEnWn&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=AIcHB5_PQZZKGoAiWm3XBw&oh=00_AfFfV1U5ioEJZWc0o9-BBkMjt4CML88GVYczgX9Ypk9E3A&oe=68148C6F',
    videoUrl: 'https://www.youtube.com/embed/TQa2QJd5V6Q'
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