import React, { useState, useEffect } from 'react';
import { Eye, Search, Package, Star } from 'lucide-react';
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

const SparePartsGallery: React.FC<SparePartsGalleryProps> = ({ }) => {
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [selectedSparePart, setSelectedSparePart] = useState<SparePart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const filteredSpareParts = searchTerm.trim() === ''
    ? spareParts
    : spareParts.filter(sparePart =>
        sparePart.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sparePart.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleViewDetails = (sparePart: SparePart) => {
    setSelectedSparePart(sparePart);
  };

  const handleWhatsAppClick = (sparePartName: string) => {
    const message = encodeURIComponent(`Hola, me gustaría solicitar una cotización para el repuesto: ${sparePartName}`);
    window.open(`https://wa.me/51958840599?text=${message}`, '_blank');
  };

  // Variantes de animación mejoradas
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        delay: index * 0.08, 
        duration: 0.6, 
        ease: [0.43, 0.13, 0.23, 0.96] 
      },
    }),
    hover: {
      scale: 1.03,
      y: -8,
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-tractor-200 border-t-machinery-200 mb-4"></div>
        <p className="text-tractor-600 text-lg font-medium">Cargando repuestos de calidad...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <Package className="h-16 w-16 text-red-400 mx-auto mb-4" />
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Barra de búsqueda mejorada */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-tractor-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Busca repuestos por nombre o descripción..."
            className="w-full pl-12 pr-4 py-4 text-tractor-700 bg-white border-2 border-tractor-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-tractor-200/50 focus:border-tractor-400 transition-all duration-300 placeholder-tractor-400 text-base font-medium"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="bg-tractor-100 text-tractor-600 px-3 py-1 rounded-lg text-sm font-medium">
              {filteredSpareParts.length} repuestos
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid de repuestos mejorado */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {filteredSpareParts.length > 0 ? (
          filteredSpareParts.map((sparePart, index) => (
            <motion.div
              key={sparePart.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-tractor-200 transition-all duration-500"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              {/* Imagen del repuesto mejorada */}
              <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <img
                  src={sparePart.image_url || 'https://via.placeholder.com/400x400/f3f4f6/6b7280?text=Repuesto'}
                  alt={sparePart.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x400/f3f4f6/6b7280?text=Repuesto')}
                />
                
                {/* Overlay con acciones */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <button
                      onClick={() => handleViewDetails(sparePart)}
                      className="flex-1 bg-white/95 backdrop-blur-sm text-tractor-700 px-4 py-2.5 rounded-xl font-semibold hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center text-sm"
                    >
                      <Eye className="h-4 w-4 mr-2" /> Ver Detalles
                    </button>
                  </div>
                </div>

                {/* Badge de calidad */}
                <div className="absolute top-4 left-4">
                  <div className="bg-machinery-200 text-tractor-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Calidad
                  </div>
                </div>
              </div>

              {/* Contenido de la card mejorado */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-tractor-600 transition-colors duration-300">
                    {sparePart.name}
                  </h3>
                  
                  {/* Especificación destacada */}
                  <div className="bg-tractor-50 text-tractor-700 text-sm px-3 py-2 rounded-lg inline-flex items-center font-medium border border-tractor-100">
                    <Package className="h-4 w-4 mr-2" />
                    {sparePart.specifications[0]?.value || 'Repuesto Original'}
                  </div>
                </div>

                {/* Descripción */}
                {sparePart.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {sparePart.description}
                  </p>
                )}

                {/* Botón de acción - Solo Cotizar */}
                <button
                  onClick={() => handleWhatsAppClick(sparePart.name)}
                  className="w-full bg-green-500 text-white px-4 py-3 rounded-xl hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center font-semibold text-sm group/btn"
                >
                  <FaWhatsapp className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                  Cotizar
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            className="col-span-full text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Package className="h-16 w-16 text-tractor-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-tractor-600 mb-2">No se encontraron repuestos</h3>
            <p className="text-tractor-500">Intenta con otros términos de búsqueda</p>
          </motion.div>
        )}
      </motion.div>

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