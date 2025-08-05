import React from 'react';
import { X } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-tractor-700">{sparePart.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-tractor-600 transition-colors duration-300">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-6">
          <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden shadow-md flex items-center justify-center">
            <img
              src={sparePart.image_url || 'https://via.placeholder.com/300'}
              alt={sparePart.name}
              className="max-h-full max-w-full object-contain p-4"
              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300')}
            />
          </div>
          <h3 className="text-lg font-bold text-tractor-700 mt-4 mb-2">Descripción:</h3>
          <p className="text-gray-600 mb-4">{sparePart.description}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-bold text-tractor-700 mb-2">Especificaciones</h3>
          <ul className="list-disc pl-5 text-gray-600">
            {sparePart.specifications.map((spec, index) => (
              <li key={index} className="mb-1">
                <span className="font-medium">{spec.label}:</span> {spec.value}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-tractor-700 mb-2">Características</h3>
          <ul className="list-disc pl-5 text-gray-600">
            {sparePart.features.map((feature, index) => (
              <li key={index} className="mb-1">{feature}</li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-tractor-200 text-white px-4 py-2 rounded-lg hover:bg-tractor-300 transition-colors duration-300 font-semibold"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SparePartModal;