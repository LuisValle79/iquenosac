import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import SparePartModal from './SparePartModal';
import { supabase } from '../../lib/supabaseClient';

interface SparePart {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: string;
  specifications: { label: string; value: string }[];
  features: string[];
}

interface SparePartsGalleryProps {
  searchQuery: string;
}

const SparePartsGallery: React.FC<SparePartsGalleryProps> = ({ searchQuery }) => {
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [selectedSparePart, setSelectedSparePart] = useState<SparePart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from('spare_parts')
          .select('id, name, description, image_url, price, specifications, features')
          .order('id', { ascending: false });

        if (error) throw new Error(`Error al cargar repuestos: ${error.message}`);

        const parsed = data.map((item: any) => ({
          ...item,
          specifications: parseJsonField(item.specifications, []),
          features: parseJsonField(item.features, []),
        }));
        setSpareParts(parsed);
      } catch (err: any) {
        console.error('Error al cargar repuestos:', err);
        setError('No se pudieron cargar los repuestos. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    fetchSpareParts();
  }, []);

  const parseJsonField = (field: any, defaultValue: any) => {
    if (!field) return defaultValue;
    if (typeof field === 'string') {
      try {
        return JSON.parse(field) || defaultValue;
      } catch (e) {
        console.error(`Error parsing JSON field:`, e, field);
        return defaultValue;
      }
    }
    return field;
  };

  const filteredSpareParts = spareParts.filter(sparePart =>
    sparePart.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sparePart.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (sparePart: SparePart) => {
    setSelectedSparePart(sparePart);
  };

  const handleWhatsAppClick = (sparePartName: string) => {
    const message = encodeURIComponent(`Hola, me gustaría solicitar una cotización para el repuesto: ${sparePartName}`);
    window.open(`https://wa.me/51963792905?text=${message}`, '_blank');
  };

  if (loading) return <div className="text-center py-10 text-tractor-600">Cargando repuestos...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredSpareParts.length > 0 ? (
          filteredSpareParts.map((sparePart) => (
            <motion.div
              key={sparePart.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-48 w-full">
                <img
                  src={sparePart.image_url || 'https://via.placeholder.com/300'}
                  alt={sparePart.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300')}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleViewDetails(sparePart)}
                    className="bg-white/90 text-tractor-600 px-4 py-2 rounded-lg font-semibold hover:bg-white transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    <Eye className="h-5 w-5 mr-2 inline" /> Ver Detalles
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{sparePart.name}</h3>
                
                                  <div className="bg-tractor-50 text-tractor-600 text-sm px-3 py-1 rounded-full inline-block mb-3">
                    {sparePart.specifications[0]?.value || 'Sin especificaciones'}
                  </div>
                <p className="text-tractor-600 font-medium mb-4">Precio: S/. {sparePart.price}</p>
                <button
                  onClick={() => handleWhatsAppClick(sparePart.name)}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  <FaWhatsapp className="h-5 w-5 mr-2 inline" /> Cotizar
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-tractor-700 col-span-full">No se encontraron repuestos.</p>
        )}
      </div>
      {selectedSparePart && (
        <SparePartModal
          sparePart={selectedSparePart}
          onClose={() => setSelectedSparePart(null)}
        />
      )}
    </>
  );
};

export default SparePartsGallery;