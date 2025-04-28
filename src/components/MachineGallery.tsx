import React, { useState } from 'react';
import { Eye, Download } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';
import ProductModal from './ProductModal';

const products = [
  {
    id: 1,
    name: 'DESGRANADORA DE MAIZ DURO',
    pdfPage: 15, // Número de página en el PDF
    description: 'Desgranadora de maíz duro de alta eficiencia y durabilidad',
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/489013356_122103155324831227_2354194773628880683_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=dQdsrYowygEQ7kNvwG8ZD36&_nc_oc=AdnHVrKrpFVnxE9TNbbUL87AjEk_vISoH-oWBqPBpn46rSnqGE_ZntwXdtEMfNkDH0xwvkyS7lm5PMJmH7VPRNz-&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=VGndueRVgImPGrbWZwYQbg&oh=00_AfGH7Nqj5_IavSpWzeBEXq78f8GisFPMr_zztex_-yNkZg&oe=6814AE1E',
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
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/488051985_122103155348831227_6711556660959515627_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=G--GCPLQlbsQ7kNvwFAk7vF&_nc_oc=AdmHCWrUlEpFfrO6iqKu4vuJkRQbiXgpd3XZJndCYyfSlfNFvcVrcZZrdOdMFSaFoOqbx1qoUwtKh-dVKRUvGqx2&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=7WBuKFdHxtdz8X6pX2xVWQ&oh=00_AfHBU47xa5dwv5YQf04UHdvMoxuC7HlvuLx0AYlnFWENPg&oe=68148D0E',
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
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/489324627_122103155384831227_7514139557586655521_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=HbD7mU1_Kl0Q7kNvwHUMHxz&_nc_oc=AdlaYZYN1DL9RlfYist7dRfuyTo72Pmp-1RRZeysC8Q2TpjUthIPMqC89SAufSVylfvukKAd8_iJuaaHus1zxbv9&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=Wv_DHbtyxKLzVJsfbVr8SQ&oh=00_AfHO_1pNas6SkVfRiPtdX-admbtriPtmihkCVt87XFQCrA&oe=68148EC8',
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
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/489010635_122103155492831227_6350700261603390397_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=6DNSujwmy6sQ7kNvwGSY4Eq&_nc_oc=AdklQHabpxINS7gLeL-VCsOwQE5T8yY-A2K9BoI4t1Vsnu0ERPyMeeDbLneBIiY1XkU3Xq_iHGR7rYunKQCAtV2D&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=gflih7ivIlTMs8KGN7-o9w&oh=00_AfF-XuPajHCRQdpOvbD5C93ZCh3ei2gEu7VcaxDLlcDEyw&oe=68147FBC',
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
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/489242408_122103155696831227_1148421799491206191_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=zVTe-PbpxboQ7kNvwFLOuRP&_nc_oc=AdnXfP7XLdIPQ4wtmtS1aAyTy9cpSpGvYBfCQXWMTfWH7Ug6hbLWHIlivlgNkbXAgpUXrM9S9Hh0Fjn5XMzNDaQQ&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=9BOCo2maPYtrLcob9l03xw&oh=00_AfHxIU93QRIuNwBkUuiRDFsH97XWM4fS8Jyy0t6NkXz2kg&oe=68147F72',
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
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/487946241_122103155756831227_5681658864394553289_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=z7ogutbXa-0Q7kNvwHYUOU_&_nc_oc=AdnsxJ2v_qS25kJPLMx3HX9kQC7sNuGWrNwL5m6qErl6sBg6A91BgqMaz0BHsAeh_GpEiF5rqC1XkoPd6P-hbWEU&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=ZITahsuj8zILXGH0tM33VA&oh=00_AfF4W37VnP1sDtU4l_Vds_EDGOqo2jJwL-ZwysemQuSaQg&oe=68149E36',
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
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/487409737_122103155810831227_7809231410058834053_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=JbTvB6HGUV8Q7kNvwHCpidm&_nc_oc=AdkToCqCjYvu3TML4uRdO6E-tYaixN-Xbgk4fRIsJTUAotpKD-zTW7RRCujtOAp1ujxodZnB-kAPGrxALFB2pB7T&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=BI67wOrn9c0v5todsqu6oQ&oh=00_AfG8CIAbdYZo8NKD2QIY8a6pS_pF-WGYNxI0Dy1bWMDJoQ&oe=68149125',
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
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/489918841_122103155852831227_737699414038752538_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=jjcY7biv9GEQ7kNvwEiBQGE&_nc_oc=AdngoLUj3skkKfoN0xsijT-S-k0Y3LutirtieRFbtkrMXGSXVaaAvEo_jB8lucNCqefsen4ln4DKGSC9fdQ22S4j&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=YtPP2dTWJVtM-kAPs4jLng&oh=00_AfHNT-vDDIKhlpNSDlyExRewig7RM7-CWzv8ulT6yypFMg&oe=6814899B',
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
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/489056889_122103154946831227_7944924792639532019_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=xgVNAbW55WIQ7kNvwFztKZZ&_nc_oc=AdmssxDcnyIF2aLYDTAl4kEI5zYHcqqO2WXB1UHVqSbvATqgIVyTjrYykzArSElMVJsVfnggKPbiJpwZ-A6FRH-7&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=UD3i_TyKJMMMMOToZtLh1Q&oh=00_AfEY2nd7rrFwNnk5lb38yklALEWuC4IdzbXklZ-qsmT0fw&oe=6814933B',
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
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/487339104_122103154940831227_4575428801035848165_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=WcyGlrGKKQ4Q7kNvwE5MU9t&_nc_oc=AdmpolaDWrIXr6bn7Jg0OQ6J6RwlJduowibum6-9osnSkE92mS0X_H9GNb29Ue8VbfgzZTN-AItYT2jL8i4W0s0Q&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=rjUJVU7dwlT5VXmlPQye0A&oh=00_AfFBE-UJMqdi7k2b_CzEz3bUydAZz5pI0FT7teadlRKtdg&oe=6814974D',
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
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/487506282_122103155252831227_5352684416294867912_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=xmhXtHiOshgQ7kNvwHEqYTU&_nc_oc=AdkS3Jgd2y8aQGn5oi2tiwdbuxvRQRhoyjyuV95Wm9pqynebUciS7JpxuE4dVWNV08lrRZpPzPMow_3ugL8te4Lk&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=mgakUQV--bppgu66iS54sQ&oh=00_AfEKml0TVgYqY8sJuT-_w4oJ_oT-OCwrFtlLzYqZxQE30w&oe=6814928E',
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
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/490197169_122103155180831227_529548861521303807_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=U5tLI7LgOVMQ7kNvwFG-kYo&_nc_oc=AdnYTkCY2k_i9Hz5jWUqTF8oqbq9s5GejCbcTsSTvJwtHcbq5hc6cnQ3v1zISxjNuBvSdIxcg0p1j1QZNVNYYf-3&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=AO57sk7jgjVFVXQp1K84oQ&oh=00_AfGHIPvOWEBw8s3fJfW-olo9JI0oMfSjr6Fv-427VNqruA&oe=68147D18',
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
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/489452628_122103155570831227_603104918005495207_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=fBCfJ738x6AQ7kNvwGcFf_N&_nc_oc=Adl6auh9tLhoU8IFNf8XQrGE_KEEXbFWVNRLxY74IUzCNPsTM8w2aCMO6LWWfn_JH3LJ1u9NZOoGyKxpFgSGUUg0&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=wI1_MTd7AWYsqUPXaMkVBg&oh=00_AfGmZwhRP--iZXj011PQIy-fSR0PydBT0iudXI8bVhok0Q&oe=68149070',
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
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/489061194_122103155726831227_7816023746256053124_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=TCDa1THcbfoQ7kNvwH10_7D&_nc_oc=Admkj_Qps1giKZnsMH6akpi5aJkrBWjY8CR0mfcSDWmG3OQ20SvngQ6lj1hluGOjG7asWNRnhHbfidRMnPtbkzOd&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=NA-2y0oFrKELiUG4lRUJ-Q&oh=00_AfF9UihTF-4KOOniy64C-K0-kimUvtJ6T9veKP0grPM4NA&oe=6814A1A4',
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
