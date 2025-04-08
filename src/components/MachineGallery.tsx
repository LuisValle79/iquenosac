import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import ProductModal from './ProductModal';
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';

const products = [
  {
    id: 1,
    name: 'Subsoldador de 02 Brazos',
    description: 'Arados de disco resistentes para trabajo pesado, ideales para preparación de suelos. Fabricados con materiales de alta calidad y diseñados para una larga vida útil. Perfectos para todo tipo de terrenos y condiciones de trabajo.',
    image: 'https://scontent.flim2-2.fna.fbcdn.net/v/t39.30808-6/487377468_122102381798831227_6113909114682004611_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGcOJCm6EDuGBBlg2AnjUhXcaIih3riqghxoiKHeuKqCIAMM0-CHlDTVJmNpDj0zey6dlIMG-bVWr9KYGo1JFtl&_nc_ohc=yew0s9NVWsAQ7kNvwGEoapx&_nc_oc=Admi9wmlLR73RGN5M9uti8AUytC4jZwj2EK-5-qYXS4EZF1URw1O6mOT85281WZnfjpHxGjGvAvaAm9ahNOSHWhX&_nc_zt=23&_nc_ht=scontent.flim2-2.fna&_nc_gid=nbDDg4sqwE273AUqn3DC3A&oh=00_AfG_p-2L9a2iAuHHYH7YJ4ipE1WTot6CGAJaicrONTA4Yw&oe=67FA3E29',
    price: 12500,
    specifications: [
      { label: 'Material', value: 'Acero reforzado' },
      { label: 'Número de discos', value: '4 discos' },
      { label: 'Diámetro de disco', value: '28 pulgadas' },
      { label: 'Profundidad de trabajo', value: 'Hasta 30 cm' }
    ],
    features: [
      'Sistema de ajuste de profundidad',
      'Discos intercambiables',
      'Estructura reforzada',
      'Rodamientos sellados',
      'Tratamiento térmico en discos'
    ],
    dimensions: {
      width: 420,
      height: 150,
      depth: 180,
      weight: 450
    }
  },
  {
    id: 2,
    name: 'Rastras',
    description: 'Rastras de diferentes tamaños para nivelación y preparación de terrenos agrícolas. Diseñadas para un trabajo eficiente y uniforme. Ideal para la preparación final del terreno antes de la siembra.',
    image: 'https://http2.mlstatic.com/rastra-de-levante-pony-12-discos-kelly-agricola-arado-D_NQ_NP_600011-MLM20466437432_102015-F.jpg',
    price: 8900,
    specifications: [
      { label: 'Material', value: 'Acero al carbono' },
      { label: 'Número de púas', value: '32 púas' },
      { label: 'Ancho de trabajo', value: '3 metros' },
      { label: 'Tipo', value: 'Dientes flexibles' }
    ],
    features: [
      'Púas ajustables individualmente',
      'Marco reforzado',
      'Sistema de nivelación automática',
      'Ruedas de transporte',
      'Acabado anticorrosivo'
    ],
    dimensions: {
      width: 300,
      height: 120,
      depth: 150,
      weight: 380
    }
  },
  {
    id: 3,
    name: 'Surcadores',
    description: 'Surcadores precisos para la creación de surcos uniformes en diversos tipos de cultivos. Equipados con sistema de ajuste de profundidad y ancho. Perfectos para la preparación de terrenos para siembra.',
    image: 'https://www.agromaquinaria.es/empresas/155/productos/1_Aperos_Agricolas_Guerra_1456664456.jpg',
    price: 6500,
    specifications: [
      { label: 'Material', value: 'Acero templado' },
      { label: 'Número de surcos', value: '3 surcos' },
      { label: 'Ancho ajustable', value: '45-75 cm' },
      { label: 'Sistema', value: 'Hidráulico' }
    ],
    features: [
      'Ajuste de profundidad variable',
      'Puntas intercambiables',
      'Sistema de seguridad',
      'Marcadores hidráulicos',
      'Estructura modular'
    ],
    dimensions: {
      width: 180,
      height: 140,
      depth: 160,
      weight: 320
    }
  },
  {
    id: 4,
    name: 'Cultivadoras',
    description: 'Cultivadoras robustas para el mantenimiento eficiente de cultivos en desarrollo. Diseñadas para un trabajo preciso y cuidadoso. Ideal para el mantenimiento entre hileras y control de malezas.',
    image: 'https://www.deere.com.mx/assets/images/region-3/products/tillage-equipment/cultivators/cultivador_mx10_campo2_large_c9a1e90b29a2f7810416fe5e80303f2dda0bb855.jpg',
    price: 9800,
    specifications: [
      { label: 'Material', value: 'Acero inoxidable' },
      { label: 'Ancho de trabajo', value: '2.5 metros' },
      { label: 'Profundidad máxima', value: '15 cm' },
      { label: 'Velocidad de trabajo', value: '8-12 km/h' }
    ],
    features: [
      'Brazos flexibles',
      'Puntas reversibles',
      'Protección contra piedras',
      'Ajuste centralizado',
      'Sistema de plegado hidráulico'
    ],
    dimensions: {
      width: 250,
      height: 130,
      depth: 170,
      weight: 420
    }
  },
  {
    id: 5,
    name: 'Sembradoras',
    description: 'Sembradoras de precisión para una distribución óptima de semillas. Control preciso de profundidad y espaciamiento. Perfecta para diversos tipos de semillas y condiciones de siembra.',
    image: 'https://www.deere.com.mx/assets/images/region-3/products/planting-seeding/sembradora-1035-landing.png',
    price: 15800,
    specifications: [
      { label: 'Material', value: 'Acero y polímeros' },
      { label: 'Capacidad', value: '40 litros' },
      { label: 'Hileras', value: '4 hileras' },
      { label: 'Sistema', value: 'Neumático' }
    ],
    features: [
      'Monitor de siembra',
      'Dosificador de precisión',
      'Tolva de gran capacidad',
      'Marcadores de hilera',
      'Sistema de fertilización'
    ],
    dimensions: {
      width: 480,
      height: 260,
      depth: 200,
      weight: 580
    }
  },
  {
    id: 6,
    name: 'Fumigadoras',
    description: 'Sistemas de fumigación de alta precisión para protección de cultivos. Control electrónico de flujo y presión. Ideal para la aplicación precisa de agroquímicos y fertilizantes líquidos.',
    image: 'https://th.bing.com/th/id/OIP.sW4q_rZKLiMfxz4Z0XW9kAHaEw?rs=1&pid=ImgDetMain',
    price: 18500,
    specifications: [
      { label: 'Material', value: 'Polietileno HD' },
      { label: 'Capacidad', value: '600 litros' },
      { label: 'Ancho de trabajo', value: '12 metros' },
      { label: 'Bomba', value: 'Diafragma' }
    ],
    features: [
      'Control electrónico',
      'Boquillas antigoteo',
      'Filtros autolimpiantes',
      'Agitador hidráulico',
      'GPS opcional'
    ],
    dimensions: {
      width: 320,
      height: 180,
      depth: 220,
      weight: 480
    }
  }
];

const SocialIcons: React.FC = () => (
  <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
    <a href="https://wa.me/958840599" target="_blank" rel="noopener noreferrer">
      <FaWhatsapp className="text-green-500 text-3xl hover:text-green-600 transition-colors" />
    </a>
    <a href="https://web.facebook.com/implementosagricolas.lima" target="_blank" rel="noopener noreferrer">
      <FaFacebook className="text-blue-600 text-3xl hover:text-blue-700 transition-colors" />
    </a>
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
      <FaInstagram className="text-pink-500 text-3xl hover:text-pink-600 transition-colors" />
    </a>
  </div>
);

const MachineGallery: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  return (
    <>
      <SocialIcons />
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">
          Nuestras Maquinarias
        </h2>

        {/* Asegurar que las cards se distribuyan bien en todas las pantallas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4">
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white/90 backdrop-blur-sm text-tractor-400 w-full py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-all duration-300 group"
                  >
                    <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Ver Detalles</span>
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                  {product.name}
                </h3>
                
                <div className="bg-tractor-50 text-tractor-600 text-sm px-3 py-1 rounded-full inline-block mb-3">
                  {product.specifications[0].value}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-tractor-500">
                    S/. {product.price.toLocaleString()}
                  </span>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="text-tractor-400 hover:text-tractor-600 transition-colors"
                  >
                    <Eye className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default MachineGallery;
