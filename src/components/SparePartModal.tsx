import React from 'react';
import { X, Package, Star, CheckCircle, Info, Wrench } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface SparePart {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: string;
  specifications: { label: string; value: string }[];
  features: string[];
}

interface SparePartModalProps {
  sparePart: SparePart;
  onClose: () => void;
}

const SparePartModal: React.FC<SparePartModalProps> = ({ sparePart, onClose }) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hola, me gustaría solicitar una cotización para el repuesto: ${sparePart.name}`);
    window.open(`https://wa.me/51958840599?text=${message}`, '_blank');
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-sm sm:max-w-4xl shadow-2xl overflow-hidden border border-gray-100 max-h-[95vh] sm:max-h-[90vh]"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del Modal - Responsive */}
        <div className="bg-tractor-200 text-white p-4 sm:p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex items-center space-x-2 sm:space-x-4 flex-1 pr-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 flex-shrink-0">
                <Package className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-2xl font-bold mb-1 line-clamp-2">{sparePart.name}</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="bg-machinery-200 text-tractor-700 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center">
                    <Star className="h-2 w-2 sm:h-3 sm:w-3 mr-1 fill-current" />
                    Repuesto Original
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                    Disponible
                  </div>
                </div>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 transition-all duration-300 flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>
          </div>
        </div>

        {/* Contenido Principal - Mobile First */}
        <div className="max-h-[calc(95vh-200px)] sm:max-h-[70vh] overflow-y-auto">
          <div className="block sm:grid sm:grid-cols-2 gap-4 sm:gap-8 p-4 sm:p-8">
            {/* Imagen del Repuesto - Mobile Optimized */}
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-0">
              <motion.div 
                className="relative bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-square flex items-center justify-center p-4 sm:p-8">
                  <img
                    src={sparePart.image_url || 'https://via.placeholder.com/500x500/f3f4f6/6b7280?text=Repuesto'}
                    alt={sparePart.name}
                    className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-500"
                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/500x500/f3f4f6/6b7280?text=Repuesto')}
                  />
                </div>
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                  <div className="bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center">
                    <CheckCircle className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                    En Stock
                  </div>
                </div>
              </motion.div>

              {/* Botón de WhatsApp Destacado - Mobile */}
              <motion.button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" />
                <span>Solicitar Cotización</span>
              </motion.button>
            </div>

            {/* Información del Repuesto - Mobile Optimized */}
            <div className="space-y-4 sm:space-y-6">
              {/* Descripción */}
              <motion.div 
                className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <div className="bg-blue-500 rounded-full p-1.5 sm:p-2">
                    <Info className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">Descripción</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {sparePart.description || 'Repuesto de alta calidad diseñado para garantizar el óptimo funcionamiento de su maquinaria agrícola.'}
                </p>
              </motion.div>

              {/* Especificaciones */}
              {sparePart.specifications && sparePart.specifications.length > 0 && (
                <motion.div 
                  className="bg-tractor-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-tractor-200"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <div className="bg-tractor-500 rounded-full p-1.5 sm:p-2">
                      <Wrench className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">Especificaciones</h3>
                  </div>
                  <div className="grid gap-2 sm:gap-3">
                    {sparePart.specifications.map((spec, index) => (
                      <motion.div 
                        key={index}
                        className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <span className="font-semibold text-tractor-700 text-sm sm:text-base">{spec.label}</span>
                        <span className="text-gray-600 font-medium text-sm sm:text-base">{spec.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Características */}
              {sparePart.features && sparePart.features.length > 0 && (
                <motion.div 
                  className="bg-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <div className="bg-green-500 rounded-full p-1.5 sm:p-2">
                      <CheckCircle className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">Características</h3>
                  </div>
                  <div className="grid gap-2 sm:gap-3">
                    {sparePart.features.map((feature, index) => (
                      <motion.div 
                        key={index}
                        className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 flex items-start space-x-2 sm:space-x-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Footer del Modal - Mobile Optimized */}
        <div className="bg-gray-50 px-4 py-3 sm:px-8 sm:py-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm text-gray-600">¿Necesitas más información?</p>
              <p className="text-xs sm:text-sm font-semibold text-tractor-600">Contáctanos para asesoría personalizada</p>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <motion.button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 sm:px-6 sm:py-3 bg-gray-200 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cerrar
              </motion.button>
              <motion.button
                onClick={handleWhatsAppClick}
                className="flex-1 sm:flex-none px-4 py-2 sm:px-6 sm:py-3 bg-green-500 text-white rounded-lg sm:rounded-xl hover:bg-green-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Cotizar</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SparePartModal;