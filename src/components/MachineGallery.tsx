import React, { useState } from 'react';
import { Eye, Download } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';
import ProductModal from './ProductModal';
import imagen1 from '../assets/desgranadora_maiz.jpg';
import imagen2 from '../assets/encamadora_integral.jpg';
import imagen3 from '../assets/hoyadora_agricola.jpg';
import imagen4 from '../assets/lampon_agricola.jpg';
import imagen5 from '../assets/molino_cascaracoco_600x600.jpg';
import imagen6 from '../assets/picadoraestacionaria_chala4tn.jpg';
import imagen7 from '../assets/subsolador_01brazo.jpg';
import imagen8 from '../assets/subsolador_02brazo.jpg';
import imagen9 from '../assets/abonadora_hidraulica.jpg';
import imagen10 from '../assets/cosechadora_cebolla.jpg';
import imagen11 from '../assets/Desbrozadoradehojapapayocamote.jpg';
import imagen12 from '../assets/cultivadora_brazosrigidos6.jpg';
import imagen13 from '../assets/MINICULTIVADORA-DE-BRAZOS-RIGIDOS.jpg';
import imagen14 from '../assets/picadoraestacionaria_chala2tna4tn.jpg';









const products = [
  {
    id: 1,
    name: 'DESGRANADORA DE MAIZ DURO',
    pdfPage: 15, // Número de página en el PDF
    description: 'Desgranadora de maíz duro de alta eficiencia y durabilidad',
    image: imagen1,
    specifications: [
      { label: 'Material', value: 'Acero estructural' },
      { label: 'Producción', value: '14 a 16Tn/hr' },
      { label: 'Potencia requerida', value: '70 HP' },
      { label: 'Peso', value: '350 kg' }
    ],
    features: [
      'Material en acero estructural',
      'Enganche tres puntos categoría II',
      'Cardán accionada para toma de fuerza de tractor',
      'Piñones y cadena para trasmisión del sistema',
      'Tambor interior de desgrane',
      'Tolva para ingreso de mazorcas',
      'Ductos de salida de granos y coronta'
    ],
    dimensions: {
      width: 120,
      height: 150,
      depth: 200,
      weight: 350
    }
  },
  {
    id: 2,
    name: 'ENCAMADORA INTEGRAL',
    pdfPage: 19,
    description: 'Formador de cama, tira cinta de riego y coloca el plástico para el encamado, todo en un solo paso',
    image: imagen2,
    specifications: [
      { label: 'Material', value: 'Acero estructural y tubular' },
      { label: 'Potencia requerida', value: '100 HP' },
      { label: 'Peso aproximado', value: '600 kg' }
    ],
    features: [
      'Formador de cama, tira cinta de riego y coloca el plástico para el encamado, todo en un solo paso',
      'Chasis en acero estructural y tubular',
      'Enganche tres puntos, categoría II',
      'Formador de cama',
      'Ancho de cama según necesidad',
      'Diskillers, con sus respectivas carteras y discos',
      'Rodillos portarollos de plástico',
      'Rodillos alineadores para cinta de riego',
      'Llantas lisas pisa plástico para sellado de la cama',
      'Diskillers para tapar plástico',
      '2 vertederas'
    ],
    dimensions: {
      width: 180,
      height: 120,
      depth: 160,
      weight: 600
    }
  },
  {
    id: 3,
    name: 'HOYADORA AGRICOLA',
    pdfPage: 13,
    description: 'Hoyadora de enganche de tres puntos accionada con chasis en acero tubular rectangular',
    image: imagen3,
    specifications: [
      { label: 'Modelo', value: 'Acero tubular rectangular' },
      { label: 'Broca', value: 'Ø6" A Ø8"' },
      { label: 'Potencia requerida', value: '70 HP' },
      { label: 'Peso', value: '180 kg' }
    ],
    features: [
      'Hoyadora de enganche de tres puntos accionada con chasis en acero tubular rectangular',
      'Caja reductora',
      'Embrague para caja reductora',
      'Cardán con protección accionado con la toma de fuerza del tractor',
      'Barreno de perforación reforzado',
      'Juego de cuchillas aceradas'
    ],
    dimensions: {
      width: 100,
      height: 170,
      depth: 170,
      weight: 180
    }
  },
  {
    id: 4,
    name: 'LAMPON AGRICOLA DE LEVANTE',
    pdfPage: 17,
    description: 'Fabricado en plancha y perfiles de acero estructural',
    image: imagen4,
    specifications: [
      { label: 'Material', value: 'Acero estructural' },
      { label: 'Potencia requerida', value: '100 HP' },
      { label: 'Peso aproximado', value: '450 kg' },
      { label: 'Ancho de trabajo', value: '3.00 m' }
    ],
    features: [
      'Fabricado en plancha y perfiles de acero estructural',
      'Cuchilla en acero antidesgaste',
      'Castillo de enganche 3 puntos',
      'Ancho de trabajo: 3.00m',
      'Profundidad: 10cm',
      'Altura de trabajo: 50cm'
    ],
    dimensions: {
      width: 300,
      height: 50,
      depth: 10,
      weight: 450
    }
  },
  {
    id: 5,
    name: 'MOLINO O PULVERIZADOR DE CASCARA DE COCO',
    pdfPage: 16,
    description: 'Trituradora y Molienda de coco seco',
    image: imagen5,
    specifications: [
      { label: 'Material', value: 'Chasis en acero estructural' },
      { label: 'Capacidad', value: '500 kg/h' },
      { label: 'Potencia', value: '10 HP (x2)' },
      { label: 'Sistema', value: 'Doble cajón' }
    ],
    features: [
      'Chasis en acero estructural',
      'Tolva de ingreso de 50cmx50cm de coco seco',
      'Ejes de trituración y pulverización',
      '48 martillos acerados para trituración',
      'Zarandas con agujeros de Ø1", Ø3/4"',
      'Motor trifásico de 10HP para trituración',
      '48 martillos acerados para pulverización',
      'Zaranda con agujeros de Ø3mm, 2mm',
      'Motor trifásico de 10HP para pulverización',
      'Ventilador de succión de polvillo (2 paletas)',
      'Ciclón con caída para 2 salidas del polvillo de pulverización',
      '4 Poleas y fajas en "V"',
      'Chumaceras de pared',
      'Tablero para control de encendido y apagado'
    ],
    dimensions: {
      width: 200,
      height: 250,
      depth: 150,
      weight: 600
    }
  },
  {
    id: 6,
    name: 'PICADORA ESTACIONARIA DE CHALA',
    pdfPage: 12,
    description: 'Picadora ideal para cortar caña, pasto, malezas, y todo tipo de forrajes',
    image: imagen6,
    specifications: [
      { label: 'Modelo', value: 'Chasis en acero estructural' },
      { label: 'Número de cuchillas', value: '3' },
      { label: 'Capacidad de producción', value: '3 TN a 5 TN / Hora' },
      { label: 'Potencia requerida', value: '20 HP' },
      { label: 'Peso aproximado', value: '650 kg' }
    ],
    features: [
      'Chasis en acero estructural',
      'Tolva de alimentación manual y salida por ducto cuello de cisne',
      'Poleas, fajas y chumacera de pie',
      'Piñones de accionamiento y cadena de transmisión',
      'Caja accionada a motor eléctrico trifásico',
      'Cuchillas anti abrasivos y rodillos jaladores'
    ],
    dimensions: {
      width: 120,
      height: 180,
      depth: 200,
      weight: 650
    }
  },
  {
    id: 7,
    name: 'SUBSOLADOR DE 01 BRAZO',
    pdfPage: 9,
    description: 'Chasis tubular en perfil rectangular',
    image: imagen7,
    specifications: [
      { label: 'Modelo', value: 'SUBFSI 1' },
      { label: 'Potencia requerida', value: '50 a 60 HP' },
      { label: 'Peso aproximado', value: '150 kg' },
      { label: 'Profundidad de trabajo', value: '70 cm' }
    ],
    features: [
      'Chasis tubular en perfil rectangular',
      'Brazo curvo en acero anti-abrasivo',
      'Puntas desmontables intercambiables',
      'Fácil regulación',
      'Repuestos disponibles: Cuchilla para subsolador, Ping de enganche, Brazo con cartera'
    ],
    dimensions: {
      width: 60,
      height: 130,
      depth: 70,
      weight: 150
    }
  },
  {
    id: 8,
    name: 'SUBSOLADOR DE 02 BRAZOS',
    pdfPage: 9,
    description: 'Chasis tubular en perfil rectangular',
    image: imagen8,
    specifications: [
      { label: 'Modelo', value: 'SUBFSI 2' },
      { label: 'Potencia requerida', value: '80 a 90 HP' },
      { label: 'Peso aproximado', value: '330 kg' },
      { label: 'Profundidad de trabajo', value: '70 cm' },
      { label: 'Distancia entre brazos', value: '60 a 1.60 cm' }
    ],
    features: [
      'Chasis tubular en perfil rectangular',
      'Brazos curvos en acero anti-abrasivo',
      'Puntas desmontables intercambiables',
      'Fácil regulación',
      'Repuestos disponibles: Cuchilla para subsolador, Ping de enganche, Brazo con cartera'
    ],
    dimensions: {
      width: 160,
      height: 130,
      depth: 70,
      weight: 330
    }
  },
  {
    id: 9,
    name: 'ABONADORA HIDRAULICA',
    pdfPage: 18,
    description: 'Maquina totalmente desmontable, de fácil regulación, distanciamiento y altura de los brazos',
    image: imagen9,
    specifications: [
      { label: 'Material', value: 'Chasis en aceros estructural' },
      { label: 'Potencia requerida', value: '100 HP' },
      { label: 'Peso aproximado', value: '600 kg' },
      { label: 'Capacidad por tolva', value: '120 kg c/u' }
    ],
    features: [
      'Chasis en aceros estructural',
      'Accionamiento con motor hidráulico y válvula de control',
      'Mangueras de alta presión hidráulicos',
      'Castillo de enganche de tres puntos categoría II',
      '3 Tolvas de acero estructural para abono',
      'Doble barras cuadradas de 2 1/2" x 3.20m',
      '6 Brazos rectos acero',
      '3 Brazos curvos acero',
      '6 cajones y 3 puntas cincel',
      'Carteras con perno de grado, regulables, para los brazos',
      'Mangueras corrugadas adosable a los brazos rígidos',
      'Repuestos disponibles: Brazos rectos, Brazos curvos, Puntas cincel'
    ],
    dimensions: {
      width: 320,
      height: 150,
      depth: 150,
      weight: 600
    }
  },
  {
    id: 10,
    name: 'COSECHADORA DE CEBOLLA',
    pdfPage: 14,
    description: 'Implemento especializado para la cosecha eficiente de cebollas',
    image: imagen10,
    specifications: [
      { label: 'Material', value: 'Chasis fabricado en acero estructural reforzado' },
      { label: 'Potencia requerida', value: '70 HP' },
      { label: 'Peso aproximado', value: '350 kg' },
      { label: 'Ancho de trabajo', value: '1.80 mt' }
    ],
    features: [
      'Chasis fabricado en acero estructural reforzado',
      'De enganche tres puntos, categoría II',
      'Caja central de engranaje y piñones',
      'Barra cuadrada en acero 1045',
      'Cardán con protección de seguridad',
      'Ruedas de corte con regulador de profundidad',
      'Punta cincel en cada brazo',
      'Ancho de trabajo: 1.80mt',
      'Dimensiones: 1.90 mt largo x 0.90 mt ancho x 1.30mt alto',
      'Repuestos disponibles: Rueda de corte, Barra cuadrada acerada'
    ],
    dimensions: {
      width: 90,
      height: 130,
      depth: 190,
      weight: 350
    }
  },
  {
    id: 11,
    name: 'DESBROZADORA DE HOJA DE PAPA Y/O CAMOTE CON BOMBIN HIDRAULICO',
    pdfPage: 11,
    description: 'Accionada por la tomafuerza del tractor, ideal para limpieza del terreno antes de la cosecha de papa/camote',
    image: imagen11,
    specifications: [
      { label: 'Modelo', value: 'PPBFSI 1' },
      { label: 'Número de martillos', value: '34' },
      { label: 'Ancho de trabajo', value: '1.80 mt' },
      { label: 'Potencia requerida', value: '80 a 90 HP' },
      { label: 'Peso aproximado', value: '650 kg' }
    ],
    features: [
      'Accionada por la tomafuerza del tractor',
      'Chasis reforzado en acero estructural',
      'Sistema de arrastre de tiro',
      'Asistido con sistema hidráulico',
      'Medidas de la máquina: 2.30 mt ancho x 2.50 mt largo x 1.10mt alto',
      'Repuestos disponibles: Martillos con corbata larga, Martillos con corbata corta'
    ],
    dimensions: {
      width: 230,
      height: 110,
      depth: 250,
      weight: 650
    }
  },
  {
    id: 12,
    name: 'CULTIVADORA DE BRAZOS RIGIDOS',
    pdfPage: 6,
    description: 'Barra cuadrada acerada',
    image: imagen12,
    specifications: [
      { label: 'Modelo', value: 'CULFSI 1' },
      { label: 'N° de brazos rectos', value: '6' },
      { label: 'N° de brazos curvos', value: '6' },
      { label: 'Potencia requerida', value: '50 A 65 HP' },
      { label: 'Peso aproximado', value: '400 KG' }
    ],
    features: [
      'Barra cuadrada acerada',
      'Equipo totalmente desmontable',
      'Carteras con pernos oscilantes',
      'Fácil regulación, distanciamiento y altura de los brazos',
      'Castillo de enganche de tres puntos',
      'Uñas desmontables y reversibles',
      'Dimensiones de barra: 2 ½ x 2 ½ x 3mt',
      'Profundidad de trabajo: 25 cm',
      'Repuestos disponibles: Brazo recto, Brazo curvo, Punta cincel, Punta V o flecha'
    ],
    dimensions: {
      width: 300,
      height: 120,
      depth: 150,
      weight: 400
    }
  },
  {
    id: 13,
    name: 'MINICULTIVADORA DE BRAZOS RIGIDOS',
    pdfPage: 7,
    description: 'Barra cuadrada',
    image: imagen13,
    specifications: [
      { label: 'Modelo', value: 'SURFSI 2' },
      { label: 'N° de brazos rectos', value: '4' },
      { label: 'Potencia requerida', value: '16 HP A 20 HP' },
      { label: 'Peso aproximado', value: '100 kg' },
      { label: 'Dimensiones de barra', value: '2" x 2" x 1mt' }
    ],
    features: [
      'Barra cuadrada',
      'Equipo totalmente desmontable',
      'Carteras con pernos oscilantes',
      'Fácil regulación, distanciamiento y altura de los brazos',
      'Castillo de enganche de tres puntos',
      'Puntas V desmontables y reversibles',
      'Dimensiones: 70cm alto x 50 cm ancho x 1 mt largo',
      'Profundidad de trabajo: 10 cm a 15 cm',
      'Repuestos disponibles: Cajón, Punta cincel, Punta V o flechas'
    ],
    dimensions: {
      width: 50,
      height: 70,
      depth: 100,
      weight: 100
    }
  },
  {
    id: 14,
    name: 'PICADORA ESTACIONARIA DE CHALA',
    pdfPage: 12,
    description: 'Picadora ideal para cortar caña, pasto, malezas, y todo tipo de forrajes',
    image: imagen14,
    specifications: [
      { label: 'Modelo', value: 'PCHFSI 1' },
      { label: 'N° de cuchillas', value: '8' },
      { label: 'Capacidad de producción', value: '2 TN a 4 TN / Hora' },
      { label: 'Potencia requerida', value: '10 HP' },
      { label: 'Peso aproximado', value: '180 kg' }
    ],
    features: [
      'Chasis en acero estructural',
      'Tolva de alimentación manual y salida por ducto cuello de cisne',
      'Poleas, fajas y chumacera de pie',
      'Piñones de accionamiento y cadena de transmisión',
      'Caja accionada a motor eléctrico trifásico',
      'Medidas de la máquina: 0.80 mt ancho x 2 mt largo x 1.80mt alto',
      'Repuestos disponibles: Cuchillas anti abrasivos y rodillos jaladores'
    ],
    dimensions: {
      width: 80,
      height: 180,
      depth: 200,
      weight: 180
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

  const handleWhatsAppClick = (productName: string) => {
    const message = encodeURIComponent(`Hola, me gustaría solicitar una cotización para el producto: ${productName}`);
    window.open(`https://wa.me/51958840599?text=${message}`, '_blank');
  };

  return (
    <>
      <SocialIcons />
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">


        {/* Asegurar que las cards se distribuyan bien en todas las pantallas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative h-[300px] p-4 flex items-center justify-center bg-gray-50">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white/90 backdrop-blur-sm text-tractor-400 px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-all duration-300 group"
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
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="p-2 text-tractor-400 hover:text-tractor-600 
                             transition-colors hover:bg-gray-100 rounded-full"
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
