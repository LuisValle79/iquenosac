import React from 'react';
import { X } from 'lucide-react';
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
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <motion.div
        className="bg-white rounded-xl p-6 w-full max-w-xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
          <h2 className="text-2xl font-bold text-tractor-700">{sparePart.name}</h2>
          <motion.button
            onClick={onClose}
            className="text-gray-500 hover:text-tractor-600 transition-colors duration-300 rounded-full p-1 hover:bg-gray-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-6 w-6" />
          </motion.button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-tractor-200 scrollbar-track-gray-100">
          <div className="mb-6">
            <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden shadow-md flex items-center justify-center border border-gray-200">
              <img
                src={sparePart.image_url || 'https://via.placeholder.com/300'}
                alt={sparePart.name}
                className="max-h-full max-w-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300')}
              />
            </div>
            <h3 className="text-lg font-semibold text-tractor-700 mt-6 mb-2 bg-gradient-to-r from-tractor-50 to-white p-2 rounded-t-lg">
              Descripción:
            </h3>
            <p className="text-gray-600 mb-4 p-2 bg-white rounded-b-lg shadow-sm">{sparePart.description}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-tractor-700 mt-6 mb-2 bg-gradient-to-r from-tractor-50 to-white p-2 rounded-t-lg">
              Especificaciones
            </h3>
            <ul className="list-disc pl-5 text-gray-600 p-2 bg-white rounded-b-lg shadow-sm">
              {sparePart.specifications.map((spec, index) => (
                <li key={index} className="mb-2">
                  <span className="font-medium text-tractor-700">{spec.label}:</span> {spec.value}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-tractor-700 mt-6 mb-2 bg-gradient-to-r from-tractor-50 to-white p-2 rounded-t-lg">
              Características
            </h3>
            <ul className="list-disc pl-5 text-gray-600 p-2 bg-white rounded-b-lg shadow-sm">
              {sparePart.features.map((feature, index) => (
                <li key={index} className="mb-2">{feature}</li>
              ))}
            </ul>
          </div>
        </div>
        <motion.button
          onClick={onClose}
          className="mt-6 w-full bg-tractor-200 text-white px-4 py-2 rounded-lg hover:bg-tractor-300 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cerrar
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SparePartModal;