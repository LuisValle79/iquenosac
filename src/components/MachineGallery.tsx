import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import ProductModal from './ProductModal';
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';

const products = [
  {
    id: 1,
    name: 'DESGRANADORA DE MAIZ',
    description: 'Arados de disco resistentes para trabajo pesado, ideales para preparación de suelos. Fabricados con materiales de alta calidad y diseñados para una larga vida útil. Perfectos para todo tipo de terrenos y condiciones de trabajo.',
    image: 'https://scontent.flim2-3.fna.fbcdn.net/v/t39.30808-6/488922608_122102443868831227_7943670213214466950_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF3DnbUwBut9k7PwDN3Xido4aw81WkY343hrDzVaRjfjT3xXSDThsxTzWPsQTfiZ1JYszuDlsmXBkjWfXwMUBrN&_nc_ohc=lRB0GaLP1fgQ7kNvwFxLkuX&_nc_oc=Adl8wgKgv4YD6l7H9NduPpuyBMbOSMbX2xe4DtdvRbu4sA2F3rS6R7wJLFHitqSQLky5-FXZRiGIwjfTIbVdfSEN&_nc_zt=23&_nc_ht=scontent.flim2-3.fna&_nc_gid=9T3amAQbTzWu7DfFHCVmgQ&oh=00_AfHh-tc6irdVrADlPZQ3oJxZ7EXkYeXvIL4hI9gNJE2APA&oe=67FA7E7D',
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
    name: 'ENCAMADORA INTEGRAL',
    description: 'Rastras de diferentes tamaños para nivelación y preparación de terrenos agrícolas. Diseñadas para un trabajo eficiente y uniforme. Ideal para la preparación final del terreno antes de la siembra.',
    image: 'https://scontent.flim2-2.fna.fbcdn.net/v/t39.30808-6/489830102_122102443190831227_1046293446552378403_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEqwoKMc71Powo9vmBVu1Fu-0JZ00Mp4sL7QlnTQyniwpTK-EvCCcL5v8C8SCRsme4fCfYuCgpNCNKb1fniIt7l&_nc_ohc=gRn3T-5DpeUQ7kNvwES7v3z&_nc_oc=Adml_3oAWcHpEppWrB6Ws64qKg89pz_-cT4PdRtFapzwDN8n6Zu71kVcYU_iJXXYpujLKEqXC_qHrBcPncZl41Es&_nc_zt=23&_nc_ht=scontent.flim2-2.fna&_nc_gid=wHx00EEI9cU8GOwadRgkDA&oh=00_AfGZ0dtC6ru7ZFGculZgyARggpQX48Xdyw084Yb-vO1Tzg&oe=67FA7D61',
    price: 12500,
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
    name: 'HOYADORA AGRICOLA',
    description: 'Surcadores precisos para la creación de surcos uniformes en diversos tipos de cultivos. Equipados con sistema de ajuste de profundidad y ancho. Perfectos para la preparación de terrenos para siembra.',
    image: 'https://scontent.flim2-2.fna.fbcdn.net/v/t39.30808-6/488073098_122102444000831227_117219057768802430_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFJJfI5oN-xXcsgxuF9mKpwUJe3GQe24pNQl7cZB7bikzMlmJruT9aDYkwfM4YmluruMxCLot075FQX2yYOo3z0&_nc_ohc=DSrZgN3v-vQQ7kNvwHtPxs4&_nc_oc=AdlVRFD1qIpclDE9dgVdP28XnVFu7Pg6Wm8ocWIkpF5n3x4C7FGxxEgN76TAdIwB1CqRj39Rlh-7Lnvq342cKSPp&_nc_zt=23&_nc_ht=scontent.flim2-2.fna&_nc_gid=pIoYD823x5EoQazXWcWymw&oh=00_AfEYGR_oOO5CfPVWmsYoM21Sfwl3rTO97vkE5Wqm0IGPvQ&oe=67FA70F2',
    price: 12500,
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
    name: 'LAMPOM AGRICOLA',
    description: 'Cultivadoras robustas para el mantenimiento eficiente de cultivos en desarrollo. Diseñadas para un trabajo preciso y cuidadoso. Ideal para el mantenimiento entre hileras y control de malezas.',
    image: 'https://scontent.flim2-4.fna.fbcdn.net/v/t39.30808-6/489912847_122102443286831227_3502748612383997116_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGHXjC2vspM6e7WNsW9NaKkI8EbEB0zCmgjwRsQHTMKaKCfoV4c574VOW9wj0-ga9sMeII3oyFUp24QGTQASsZy&_nc_ohc=B_paFNsKaE0Q7kNvwF00QFM&_nc_oc=Adk7mr4KJgTb21WHxnPi_-3gqvoxHde_aSYUrs0Wpm0uTlz-N7SUQJRJz2gVXzQH6W_6lkXJo6XqH25p1UZ9TcEh&_nc_zt=23&_nc_ht=scontent.flim2-4.fna&_nc_gid=YG1zaDKLb1NDILIGR3Os1g&oh=00_AfFUh-ogG9KleG7E653Frf3w-NXiN-dyBuWW5avrXDW72g&oe=67FA7B2F',
    price: 12500,
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
    name: 'MOLINO CASCARA DE COCO',
    description: 'Sembradoras de precisión para una distribución óptima de semillas. Control preciso de profundidad y espaciamiento. Perfecta para diversos tipos de semillas y condiciones de siembra.',
    image: 'https://scontent.flim2-2.fna.fbcdn.net/v/t39.30808-6/487395403_122102444150831227_9046317392557785449_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGbu0rNGeXSBX7beilhfG2nYqTgH49mEa5ipOAfj2YRrl4T20NO7iqZYla6MF1lBZldGPgDvSPX1w60k5kUN3m7&_nc_ohc=iHpYe2jJnewQ7kNvwHOlX5b&_nc_oc=AdlkX40e6Pw6VuHzG63o8e0vLCgExzHtFJpGm1OlnyRdMlczP8CpvoaFYr5JCqSdT0sFTjEtnWG4BWYz0lVPIO5i&_nc_zt=23&_nc_ht=scontent.flim2-2.fna&_nc_gid=Rs1nGCceRmoD8mTkzyqL0Q&oh=00_AfHgPVEUJEoC5e_N7nxYnnfeRi9fbCCL9QkrWHXWjAyGVg&oe=67FA5FA5',
    price: 12500,
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
    name: 'PICADORA ESTACIONARIA DE CHALA DE 3TN A 5TN',
    description: 'Sembradoras de precisión para una distribución óptima de semillas. Control preciso de profundidad y espaciamiento. Perfecta para diversos tipos de semillas y condiciones de siembra.',
    image: 'https://scontent.flim2-5.fna.fbcdn.net/v/t39.30808-6/488711835_122102444792831227_4960225129085983232_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEDWB9MybbKCXdJxqNauNUVirYM_PsQjUCKtgz8-xCNQNjQbGnDcweuE3xgrx7BkQWF6G0mKI-C4XAc9QkkO3A3&_nc_ohc=Br42D76KpeEQ7kNvwH8w7JU&_nc_oc=Adl7eYCGxYVfHRiXrd9tj-pMbjfFsNkEvacnHA4VQGeSQG9akIJitJpKIgwQcOwPMrJtymJEKPfEabx1HKSbUoJs&_nc_zt=23&_nc_ht=scontent.flim2-5.fna&_nc_gid=Yd2yVmVZSyBmzOmwraaynw&oh=00_AfH6bTTs5NHGBs37Gok_eMpkD2dcyMYdKakPw96QrklPgQ&oe=67FA65D3',
    price: 12500,
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
    id: 7,
    name: 'SUBSOLADOR DE 1 BRAZO',
    description: 'Sembradoras de precisión para una distribución óptima de semillas. Control preciso de profundidad y espaciamiento. Perfecta para diversos tipos de semillas y condiciones de siembra.',
    image: 'https://scontent.fpio2-1.fna.fbcdn.net/v/t39.30808-6/487335490_122102444600831227_6560893869768537570_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ro667L9GxS4Q7kNvwGlE85h&_nc_oc=Adknps4IbNSjjmFoO48ns_-3pN5eftuC5RPAVLaagY54p-Yvkak450RebmuoYPKxru8&_nc_zt=23&_nc_ht=scontent.fpio2-1.fna&_nc_gid=_Ry3yZsWQz1XpU2yL3om7w&oh=00_AfGY_zexc1vCzU53p_4QQ0Ve-0irg8kTXY9qE_2Xww7dSQ&oe=67FA9302' ,
    price: 12500,
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
    id: 8,
    name: 'SUBSOLADOR DE 2 BRAZOS',
    description: 'Sembradoras de precisión para una distribución óptima de semillas. Control preciso de profundidad y espaciamiento. Perfecta para diversos tipos de semillas y condiciones de siembra.',
    image: 'https://scontent.fpio2-1.fna.fbcdn.net/v/t39.30808-6/489928854_122102443544831227_2236852374744574888_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YWgVeRzGciMQ7kNvwGJNaeY&_nc_oc=Adkvj042ZMJHg_Pssl51Q5kFil3DdXBp4-U7xP-DBZO7YLre6KZB9YbhzaMpu_LcoEs&_nc_zt=23&_nc_ht=scontent.fpio2-1.fna&_nc_gid=MlwUX8ERSlffTGGJ1zia9g&oh=00_AfH1okbT3cCt6WJJXJqECemxNVC0snQbT8h87IH7n1nx9Q&oe=67FAA5CE',
    price: 12500,
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
    id: 9,
    name: 'ABONADORA HIDRAULICA',
    description: 'Sembradoras de precisión para una distribución óptima de semillas. Control preciso de profundidad y espaciamiento. Perfecta para diversos tipos de semillas y condiciones de siembra.',
    image: 'https://scontent.fpio2-1.fna.fbcdn.net/v/t39.30808-6/489802307_122102443634831227_6972899930090269082_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=t86J3VGOxv4Q7kNvwHTnNp6&_nc_oc=AdkdrI8KQvKYJ8A39kZzJBnq9Ah-a4IA_3jmS43jtYd02iFEqlSPoa56yHr0YWPYpwQ&_nc_zt=23&_nc_ht=scontent.fpio2-1.fna&_nc_gid=oKhTSWhwfGH9cWFJYgU5wQ&oh=00_AfEF2aKlZfFWmcnDSMOqwMXMgiizKOKfc_NkWL5fPPJPEQ&oe=67FAA5A0',
    price: 12500,
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
    id: 10,
    name: 'COSECHADORA DE CEBOLLA',
    description: 'Sembradoras de precisión para una distribución óptima de semillas. Control preciso de profundidad y espaciamiento. Perfecta para diversos tipos de semillas y condiciones de siembra.',
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/489146402_122102445122831227_8377947133314494710_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=RFVXBZ8PDMQQ7kNvwHTdZlc&_nc_oc=AdlWzT8ZhlumiipeYRGy63KPtHyrI4Rk4X1YdPC3mkShcQONb6RTxeajCdDez9cmql1ey3x7t12lxQ_7ec6V_QYW&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=QZsC8bh1Ak-S8nOELd0MSg&oh=00_AfETIZlcdHBdsIq4YvdBFMyCkjsP_QHQPoFGhMrWXjA-bA&oe=67FA9DF8',
    price: 12500,
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
    id: 11,
    name: 'DESBROZADORA DE HOJA DE PAPA',
    description: 'Sembradoras de precisión para una distribución óptima de semillas. Control preciso de profundidad y espaciamiento. Perfecta para diversos tipos de semillas y condiciones de siembra.',
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/488709762_122102443682831227_787159347487268731_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=r1WhisfqbK8Q7kNvwHM5xiO&_nc_oc=AdnOEKG8bZmtpSqUGTfRSvUTfvXsdZRDTFv-NdplHOhP808mNHyTh2mvM2eH7x1zZmuvs1OwKdfxF6XyERQOx0Dm&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=KlqKjVt53bPHVWfAw0NM2w&oh=00_AfGQTmJN4CKUGHdWunaKfAHIKqRh_g7ynh1dyYxauOR64g&oe=67FA9E8D',
    price: 12500,
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
    id: 12,
    name: 'CULTIVADORA DE BRAZOS RIGIDOS',
    description: 'Sembradoras de precisión para una distribución óptima de semillas. Control preciso de profundidad y espaciamiento. Perfecta para diversos tipos de semillas y condiciones de siembra.',
    image: 'https://scontent.flim2-4.fna.fbcdn.net/v/t39.30808-6/489808642_122102443232831227_1850769251382032774_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFwvjRYs89JILbcIQSVFvU_JB30lDrhqvckHfSUOuGq90UTLm_Tu73RGRc5I9YTQY5f86V4TOKS1eD9Be5pftyG&_nc_ohc=bl5lm14X7TIQ7kNvwF_p0qB&_nc_oc=AdnYsKu1foQy4Tye2X8ZibEFKxT1FGfAOnuJXQXPf0RaICnpyXxRv6dzx9GTvR7S-n8jJNMsTNvIukGiVDvQeyiV&_nc_zt=23&_nc_ht=scontent.flim2-4.fna&_nc_gid=afw1RSAfLSuaOZ6HyMyv8Q&oh=00_AfGL9tLwPoD7FRiigCL9irTLTmHah91U4SjNCH0qv5RgFw&oe=67FA61A7',
    price: 12500,
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
    id: 13,
    name: 'CULTIVADORA DE BRAZOS RIGIDOS',
    description: 'Sembradoras de precisión para una distribución óptima de semillas. Control preciso de profundidad y espaciamiento. Perfecta para diversos tipos de semillas y condiciones de siembra.',
    image: 'https://implementosagricolasfsi.com/images/Catalogo/SURCADORA-DE-BRAZOS-RIGIDOS.jpg#joomlaImage://local-images/Catalogo/SURCADORA-DE-BRAZOS-RIGIDOS.jpg?width=768&height=556',
    price: 12500,
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
    id: 14,
    name: 'CULTIVADORA DE BRAZOS RIGIDOS',
    description: 'Sembradoras de precisión para una distribución óptima de semillas. Control preciso de profundidad y espaciamiento. Perfecta para diversos tipos de semillas y condiciones de siembra.',
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/487506288_122102593160831227_2272955648380345151_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=updmzyw993cQ7kNvwGxjzra&_nc_oc=AdmSuhZvs5NCGKAa1IUw2TWAOCLtQQlM_xJE0OdahjCqy_ft0ShAsRBnju2v3WTomKPsMvMKhSZFXL9H9YSJu1kl&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=noZoy5izhQF1Jdf5hVROTg&oh=00_AfFUjF23VuGloMc-qXL7xS-Rvbkgd8DrsgKxrsCjFmxy8Q&oe=67FA9818',
    price: 12500,
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
    id: 15,
    name: 'PICADORA ESTACIONARIA DE CHALA DE 2TN A 4TN',
    description: 'Sistemas de fumigación de alta precisión para protección de cultivos. Control electrónico de flujo y presión. Ideal para la aplicación precisa de agroquímicos y fertilizantes líquidos.',
    image: 'https://scontent.flim2-4.fna.fbcdn.net/v/t39.30808-6/487946241_122102444330831227_3783527917550589000_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE5ZGeXTbCHzvmsBHBy2q9QRQ7oN-5yWBZFDug37nJYFt2BveLirfDCGb4sP-BqEZTZ8l6w--0eQCKtWj3FyjXX&_nc_ohc=HM3Bqv8oqNUQ7kNvwH1OtEk&_nc_oc=AdkaVZvYXbghpxwe1sGjuDJr5hUXmv9fbMtUFboaGrd4hy8yMis1S8FBRO0t73dYTJAlrHb6I-HfxmiqF_T66zof&_nc_zt=23&_nc_ht=scontent.flim2-4.fna&_nc_gid=XrbrWsm4K-dyAHcytyqxlA&oh=00_AfFoSbnFmpD7qJmtJ5QmgkeG4oZ6gfv4xOZRXYByFa-83Q&oe=67FA93C4',
    price: 12500,
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
