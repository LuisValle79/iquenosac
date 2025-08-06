import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import ProductModal from './ProductModal';
import { supabase } from '../../lib/supabaseClient';

interface MachineProduct {
  id: number;
  name: string;
  description: string;
  image_url: string;
  pdf_url?: string;
  specifications: { label: string; value: string }[];
  features: string[];
  dimensions: { width: number; height: number; depth: number; weight: number };
}

interface MachineGalleryProps {
  searchQuery: string;
}

const MachineGallery: React.FC<MachineGalleryProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<MachineProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MachineProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para el término de búsqueda

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from('machine_products')
          .select('id, name, description, image_url, pdf_url, specifications, features, dimensions, deleted')
          .eq('deleted', false)
          .order('id', { ascending: false });

        if (error) {
          throw new Error(`Error al cargar productos: ${error.message}`);
        }

        // Parsear los campos JSON con manejo de errores
        const parsed = data.map((item: any) => ({
          ...item,
          specifications: parseJsonField(item.specifications, []),
          features: parseJsonField(item.features, []),
          dimensions: parseJsonField(item.dimensions, { width: 0, height: 0, depth: 0, weight: 0 }),
        }));
        setProducts(parsed);
      } catch (err: any) {
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Función auxiliar para parsear campos JSON con valor por defecto
  const parseJsonField = (field: any, defaultValue: any) => {
    if (!field) return defaultValue;
    if (typeof field === 'string') {
      try {
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) || typeof parsed === 'object' ? parsed : defaultValue;
      } catch (e) {
        console.error(`Error parsing JSON field:`, e, field);
        return defaultValue;
      }
    }
    return field;
  };

  // Filtrar productos con coincidencias parciales o mostrar todos si searchTerm está vacío
  const filteredProducts = searchTerm.trim() === ''
    ? products
    : products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleWhatsAppClick = (productName: string) => {
    const message = encodeURIComponent(`Hola, me gustaría solicitar una cotización para el producto: ${productName}`);
    window.open(`https://wa.me/51958840599?text=${message}`, '_blank');
  };

  const handleViewDetails = (product: MachineProduct) => {
    console.log('Abriendo modal para producto:', product.name); // Depuración
    setSelectedProduct(product);
  };

  if (loading) {
    return <div className="text-center py-10">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <>
      {/* Íconos sociales flotantes verticales */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        <a href="https://wa.me/51958840599" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="text-green-500 h-8 w-8 hover:scale-110 transition-transform" />
        </a>
        <a href="https://www.facebook.com/implementosagricolas.lima" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-blue-600 h-8 w-8 hover:scale-110 transition-transform" />
        </a>
        <a href="https://www.instagram.com/fsi.implementos.agricolas/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-pink-500 h-8 w-8 hover:scale-110 transition-transform" />
        </a>
        <a href="https://www.tiktok.com/@www.fsi.com" target="_blank" rel="noopener noreferrer">
          <FaTiktok className="text-black h-6 w-6 hover:scale-110 transition-transform" />
        </a>
        <a href="https://www.youtube.com/@fsisaceliqueno" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="text-red-600 h-7 w-7 hover:scale-110 transition-transform" />
        </a>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Buscador en tiempo real */}
        <div className="mb-8">
          <div className="relative w-full max-w-2xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Busca un producto por nombre..."
              className="w-full px-4 py-2 pl-10 text-tractor-600 bg-tractor-50 border border-tractor-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-tractor-600 focus:border-transparent transition-all duration-300 placeholder-tractor-400 text-sm md:text-base"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tractor-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112 5.5a7.5 7.5 0 014.65 13.65z"></path>
              </svg>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative h-[300px] p-4 flex items-center justify-center bg-gray-50">
                  <img 
                    src={product.image_url || 'https://via.placeholder.com/300'} 
                    alt={product.name}
                    className="w-full h-full object-cover absolute inset-0"
                    onError={(e) => {
                      console.error('Error loading image for:', product.name);
                      e.currentTarget.src = 'https://via.placeholder.com/300';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => handleViewDetails(product)}
                      className="bg-white/90 backdrop-blur-sm text-tractor-400 px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-all duration-300 group"
                    >
                      <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Ver Detalles</span>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                    {product.name || 'Sin nombre'}
                  </h3>
                  <div className="bg-tractor-50 text-tractor-600 text-sm px-3 py-1 rounded-full inline-block mb-3">
                    {product.specifications[0]?.value || 'Sin especificaciones'}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <button 
                      onClick={() => handleWhatsAppClick(product.name)}
                      className="flex-1 bg-green-500 text-white px-4 py-2.5 rounded-lg 
                               hover:bg-green-600 active:scale-95 
                               transition-all duration-300 transform
                               flex items-center justify-center gap-2
                               shadow-md hover:shadow-xl
                               group"
                    >
                      <FaWhatsapp className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                      <span className="font-medium group-hover:translate-x-1 transition-transform">
                        Cotizar
                      </span>
                    </button>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-tractor-700 col-span-full">No se encontraron productos.</p>
          )}
        </div>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => {
              console.log('Cerrando modal'); // Depuración
              setSelectedProduct(null);
            }}
          />
        )}
      </div>
    </>
  );
};

export default MachineGallery;