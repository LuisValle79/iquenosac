import React from 'react';
import { X, Download, Check } from 'lucide-react';

interface ProductModalProps {
  product: any;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownloadFicha = () => {
    // Abre el PDF directamente en la página específica y configura la impresión
    const pdfWindow = window.open(
      `https://www.implementosagricolasfsi.com/images/catalogo.pdf#page=${product.pdfPage}`,
      '_blank'
    );
    
    if (pdfWindow) {
      pdfWindow.onload = () => {
        pdfWindow.document.title = `Ficha Técnica - ${product.name}`;
        pdfWindow.print();
      };
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 pr-12 mb-6">{product.name}</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[400px] rounded-lg object-cover shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              </div>
              <button
                onClick={handleDownloadFicha}
                className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-xl"
              >
                <Download className="h-5 w-5" />
                <span>Descargar Ficha Técnica</span>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Características:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Especificaciones:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.specifications.map((spec: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">{spec.label}</div>
                      <div className="font-medium">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Dimensiones:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Dimensiones (AxAxL)</div>
                    <div className="font-medium">
                      {product.dimensions.width}cm x {product.dimensions.height}cm x {product.dimensions.depth}cm
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Peso</div>
                    <div className="font-medium">{product.dimensions.weight} kg</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;