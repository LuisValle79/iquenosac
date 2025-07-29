import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface Advisor {
  id: number;
  name: string;
  position: string;
  image_url: string;
  whatsapp: string;
  specialties: string[];
}

const Advisors: React.FC = () => {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);

  useEffect(() => {
    const fetchAdvisors = async () => {
      const { data, error } = await supabase
        .from('advisors')
        .select('id, name, image_url, whatsapp, specialties, position')
        .eq('deleted', false)
        .order('id', { ascending: true });

      if (data && !error) {
        // Procesa las especialidades como en panel.html
        const advisorsWithUrls = data.map(advisor => {
          let specialties = Array.isArray(advisor.specialties) ? advisor.specialties : [];
          if (typeof advisor.specialties === 'string') {
            try {
              specialties = JSON.parse(advisor.specialties);
              if (!Array.isArray(specialties)) specialties = [];
            } catch (e) {
              console.error('Error parsing specialties:', e, 'Raw data:', advisor.specialties);
              specialties = [];
            }
          }
          return {
            ...advisor,
            image_url: advisor.image_url || 'https://via.placeholder.com/350', // Fallback si no hay imagen
            specialties,
          };
        });

        setAdvisors(advisorsWithUrls);
        console.log('Fetched advisors with specialties:', advisorsWithUrls); // Depuración
      } else if (error) {
        console.error('Error fetching advisors:', error);
      }
    };

    fetchAdvisors();
  }, []);

  const handleWhatsAppClick = (phone: string) => {
    window.open(`https://wa.me/51${phone}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1400px] mx-auto px-4 py-8">
      {advisors.map((advisor) => (
        <div
          key={advisor.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col md:flex-row h-full group cursor-pointer"
        >
          {/* Image Section */}
          <div className="relative md:w-2/5 overflow-hidden">
            <img
              src={advisor.image_url}
              alt={advisor.name}
              className="w-full h-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/350'; // Fallback si la imagen falla
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white text-xl font-bold">{advisor.name}</h3>
              <p className="text-gray-200 text-sm">{advisor.position || 'Sin cargo'}</p> {/* Cargo debajo del nombre en la superposición */}
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-3/5 p-6 flex flex-col justify-between bg-gradient-to-br from-white to-gray-50">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{advisor.name}</h3> {/* Nombre */}
              <p className="text-md text-gray-600 mb-4">{advisor.position || 'Sin cargo'}</p> {/* Cargo debajo del nombre */}
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Especialidades:</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {advisor.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1.5 rounded-full font-medium transition-all duration-300 hover:bg-indigo-200 hover:scale-105 hover:shadow-md"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleWhatsAppClick(advisor.whatsapp)}
              className="w-full bg-green-500 text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center text-base font-medium shadow-md hover:shadow-xl hover:bg-green-600 hover:scale-[1.02] active:scale-95"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Contactar por WhatsApp
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Advisors;