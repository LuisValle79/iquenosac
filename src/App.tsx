import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, MapPin, ChevronRight, Users, Building, Target } from 'lucide-react';
import ContactForm from './components/ContactForm';
import MachineGallery from './components/MachineGallery';
import SparePartsGallery from './components/SparePartsGallery';
import { motion } from 'framer-motion';
import Testimonials from './components/Testimonials';
import Alert from './components/Alert';
import VideoGallery from './components/VideoGallery';
import Advisors from './components/Advisors';
import Map from './components/Map';
import Clients from './components/Clients';
import Logo from './components/Logo';
import HeroCarousel from './components/HeroCarousel';
import image1 from './assets/portada1.jpg';
import image2 from './assets/portada2.jpg';
import image3 from './assets/portada3.jpg';
import image4 from './assets/Abonadora-Fertilizadora-Hidraulica.jpg';
import image5 from './assets/camara-comercio-lima.png';
import { Bot } from "lucide-react"; // 👈 importa el icono de robot

// Extiende la interfaz Window para incluir Chatbase
declare global {
  interface Window {
    chatbase?: {
      (method: string, ...args: any[]): void;
      q?: any[];
      getState?: () => string;
    };
  }
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isChatbotLoaded, setIsChatbotLoaded] = useState(false);
  const [chatbotError, setChatbotError] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);  // Ref para el script del chatbot

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleContactSuccess = () => {
    setAlertMessage('Mensaje enviado correctamente. Nos pondremos en contacto pronto.');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };


// Cargar el script de Chatbase
  useEffect(() => {
    // Inicializar la cola de comandos de Chatbase
    if (!window.chatbase || window.chatbase.getState?.() !== 'initialized') {
      window.chatbase = (...args) => {
        if (window.chatbase && !window.chatbase.q) window.chatbase.q = [];
        window.chatbase?.q?.push(args);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === 'q') return target.q;
          if (typeof prop === 'string') {
            return (...args: any[]) => target(prop, ...args);
          }
          return undefined;
        },
      });
    }

    // Verificar si el script ya está cargado
    if (!document.querySelector("script[id='VFvg22QWfY7w7D_axwc-m']")) {
      const onLoad = () => {
        const script = document.createElement('script');
        script.src = 'https://www.chatbase.co/embed.min.js';
        script.id = 'VFvg22QWfY7w7D_axwc-m';
        script.setAttribute('domain', 'www.chatbase.co');
        script.defer = true;
        script.async = true; // Agregar async para mejor rendimiento

        script.onload = () => {
          setIsChatbotLoaded(true);
          // Deshabilitar comportamientos automáticos del chatbot
          setTimeout(() => {
            if (window.chatbase) {
              try {
                window.chatbase('close'); // Asegurar que esté cerrado inicialmente
              } catch (error) {
                console.warn('Chatbot initialization warning:', error);
              }
            }
          }, 100);
        };

        script.onerror = () => {
          setChatbotError('Error al cargar el script del chatbot. Verifica tu conexión o el ID.');
        };

        document.body.appendChild(script);
        scriptRef.current = script;
      };

      if (document.readyState === 'complete') {
        onLoad();
      } else {
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
      }
    }

    // Cleanup al desmontar
    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
      setIsChatbotLoaded(false);
    };
  }, []);

  // Ocultar el ícono flotante nativo de Chatbase y ajustar el tamaño del widget en móviles
  useEffect(() => {
    if (isChatbotLoaded) {
      const style = document.createElement('style');
      style.innerHTML = `
        #chatbase-bubble-button, .chatbase-bubble-button {
          display: none !important;
        }
        #chatbase-bubble-window {
          z-index: 9999 !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          border-radius: 12px !important;
          position: fixed !important;
          transform: translateZ(0) !important;
          will-change: transform !important;
        }
        @media (max-width: 640px) {
          #chatbase-bubble-window {
            width: 90% !important;
            max-width: 360px !important;
            height: 70vh !important;
            bottom: 80px !important;
            left: 50% !important;
            transform: translateX(-50%) translateZ(0) !important;
            right: auto !important;
          }
        }
        @media (min-width: 641px) {
          #chatbase-bubble-window {
            width: 400px !important;
            height: 600px !important;
            bottom: 80px !important;
            right: 20px !important;
            left: auto !important;
            transform: translateZ(0) !important;
          }
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [isChatbotLoaded]);

  // Mostrar errores del chatbot
  useEffect(() => {
    if (chatbotError) {
      setAlertMessage(chatbotError);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  }, [chatbotError]);

  // Cerrar el chatbot al hacer clic fuera - VERSION SIMPLIFICADA
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const chatWindow = document.getElementById('chatbase-bubble-window');
      const chatButton = document.getElementById('agroChatButton');
      const target = event.target as HTMLElement;
      
      // Solo ejecutar si el chatbot está abierto y visible
      if (
        isChatbotLoaded &&
        chatWindow &&
        chatWindow.style.display !== 'none' &&
        !chatWindow.contains(target) &&
        chatButton &&
        !chatButton.contains(target)
      ) {
        try {
          if (window.chatbase) {
            window.chatbase('close');
          }
        } catch (error) {
          console.warn('Error cerrando chatbot:', error);
        }
      }
    };

    // Solo agregar el listener si el chatbot está cargado
    if (isChatbotLoaded) {
      // Usar timeout para evitar conflictos inmediatos
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside, { passive: true });
      }, 100);
      
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isChatbotLoaded]);

  // Función para abrir el chatbot - VERSIÓN SIMPLIFICADA
  const openChatbot = () => {
    if (isChatbotLoaded && window.chatbase) {
      try {
        window.chatbase('open');
      } catch (error) {
        setChatbotError('No se pudo abrir el chatbot. Intenta de nuevo.');
      }
    } else {
      setChatbotError('El chatbot aún no está cargado. Por favor, espera un momento.');
    }
  };




  const menuItems = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#quienes-somos', label: 'Quiénes Somos' },
    { href: '#maquinarias', label: 'Maquinarias' },
    { href: '#repuestos', label: 'Repuestos' },
    { href: '#videos', label: 'Videos' },
    { href: '#testimonios', label: 'Testimonios' },
    { href: '#asesores', label: 'Asesores' },
    { href: '#contacto', label: 'Contacto' },
  ];

  // Variantes de animación para secciones (entrada desde lados alternados)
  const sectionVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
      scale: 0.95,
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: 0.1,
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  // Variantes de animación para cards dentro de secciones
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  // Animación para el número de teléfono
  const phoneVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      color: '#FBBF24', // machinery-200
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

// SOLO bloquear clic derecho, F12 y Ctrl+U - SIN otros event listeners
useEffect(() => {
  // Bloquear clic derecho
  const disableRightClick = (e: MouseEvent) => {
    e.preventDefault();
  };

  // Bloquear F12 y Ctrl+U
  const disableKeys = (e: KeyboardEvent) => {
    if (e.key === "F12") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.key.toLowerCase() === "u") {
      e.preventDefault();
    }
  };

  // Solo eventos necesarios
  document.addEventListener("contextmenu", disableRightClick);
  document.addEventListener("keydown", disableKeys);

  // Cleanup
  return () => {
    document.removeEventListener("contextmenu", disableRightClick);
    document.removeEventListener("keydown", disableKeys);
  };
}, []);


  // Efecto para cerrar el menú al hacer clic fuera en móviles
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-tractor-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-tractor-200 text-white fixed w-full z-50 shadow-lg">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="ml-[0px] transform transition-all duration-300 hover:scale-105">
              <Logo height={50}  />
            </div>
{/* Número con título encima */}
<motion.div
  className="flex flex-col items-start space-y-1 animate-pulse"
  variants={phoneVariants}
  initial="hidden"
  animate="visible"
  whileHover="hover"
>
  <h3 className="text-sm text-machinery-200 font-semibold">Información de Contacto:</h3>

  <div className="flex items-center space-x-2">
    <Phone className="h-5 w-5 text-machinery-200" />
    <a
      href="tel:+51958840599"
      className="text-machinery-50 font-semibold text-sm sm:text-base hover:text-machinery-200 transition duration-300"
    >
      +51 958 840 599
    </a>
  </div>
</motion.div>

            {/* Desktop Navigation and Search */}
            <div className="hidden md:flex items-center space-x-3 mr-[-10px]">
              <div className="flex items-center space-x-1">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="hover:text-machinery-200 px-3 py-2 rounded-md transition duration-300 hover:bg-tractor-300/50"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            {/* Mobile menu button */}
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-tractor-300/50 transition-colors duration-300">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </motion.div>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
            <motion.div
              ref={menuRef}
              className="bg-tractor-200 h-full w-3/4 max-w-sm p-6 transform transition-transform duration-300"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0, ease: 'easeOut' }}
            >
              <div className="flex justify-center items-center mb-8">
                <Logo height={55} />
              </div>
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-3 text-center hover:bg-tractor-300 rounded-lg transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-6 border-t border-tractor-300">
                  <a
                    href="#contacto"
                    className="block px-4 py-3 bg-machinery-200 text-tractor-400 rounded-lg text-center font-semibold hover:bg-machinery-300 transition duration-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contáctanos
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </nav>
      {/* Hero Section */}
      <motion.section
        id="inicio"
        className="relative"
        custom={0}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <HeroCarousel />
      </motion.section>
      {/* About Us Section */}
      <motion.section
        id="quienes-somos"
        className="py-24 bg-white"
        custom={1}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-extrabold text-center mb-6 text-tractor-200 tracking-tight"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Quiénes Somos
          </motion.h2>
          <motion.h1
            className=" font-bold text-center  text-tractor-200"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="none"
            viewport={{ once: true }}
          >
            Implementos Agrícolas FSI - Soluciones para el Agro Peruano
          </motion.h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.h3
                className="text-2xl font-bold text-tractor-200"
                custom={0}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Nuestra Historia
              </motion.h3>
              <motion.p
                className="text-gray-600 leading-relaxed"
                custom={1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                FSI Implementos Agrícolas es una empresa peruana que nace como respuesta a la necesidad de
                todos los agricultores y empresas agroindustriales del país en
                hacer más fácil la tarea del agricultor y realizarlo en menos
                tiempo. Más de 30 años de experiencia fabricando maquinaria e
                implementos agrícolas para el campo peruano a los mejores
                precios. F.S.I SAC, desarrolla, innova, fabrica implementos y maquinaria
                agrícola para tractor.
              </motion.p>
              <motion.h3
                className="text-2xl font-bold text-tractor-200"
                custom={2}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Nuestra Misión
              </motion.h3>
              <motion.p
                className="text-gray-600 leading-relaxed"
                custom={3}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Proporcionar implementos agrícolas de la más alta calidad que mejoren la eficiencia y
                productividad de nuestros clientes, contribuyendo al desarrollo del sector agrícola.
              </motion.p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <motion.div
                  className="bg-tractor-50 p-6 rounded-xl text-center shadow-md"
                  custom={4}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                >
                  <h4 className="text-4xl font-bold text-tractor-200 mb-2">30+</h4>
                  <p className="text-gray-600">Años de Experiencia</p>
                </motion.div>
                <motion.div
                  className="bg-machinery-50 p-6 rounded-xl text-center shadow-md"
                  custom={5}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                >
                  <h4 className="text-4xl font-bold text-machinery-200 mb-2">1000+</h4>
                  <p className="text-gray-600">Clientes Satisfechos</p>
                </motion.div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.img
                  src={image1}
                  alt="Tractor en campo"
                  className="rounded-xl shadow-lg"
                  custom={6}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
                <motion.img
                  src={image4}
                  alt="Implemento agrícola"
                  className="rounded-xl shadow-lg"
                  custom={7}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </div>
              <div className="space-y-4 mt-8">
                <motion.img
                  src={image2}
                  alt="Trabajo en campo"
                  className="rounded-xl shadow-lg"
                  custom={8}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
                <motion.img
                  src={image3}
                  alt="Trabajo en campo"
                  className="rounded-xl shadow-lg"
                  custom={9}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Services Section */}
      <motion.section
        className="py-24 bg-gradient-to-b from-tractor-50 to-tractor-100"
        custom={2}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-extrabold text-center mb-12 text-tractor-200 tracking-tight"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Nuestros Servicios
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="h-6 w-6 text-machinery-50" />,
                title: 'Fabricación',
                description: 'Fabricamos implementos agrícolas a medida, adaptados a las necesidades específicas de cada cliente.',
                bg: 'bg-tractor-200',
              },
              {
                icon: <Building className="h-6 w-6 text-machinery-50" />,
                title: 'Mantenimiento',
                description: 'Servicio técnico especializado y mantenimiento preventivo para mantener su maquinaria en óptimas condiciones.',
                bg: 'bg-machinery-200',
              },
              {
                icon: <Users className="h-6 w-6 text-machinery-50" />,
                title: 'Asesoría',
                description: 'Asesoramiento técnico personalizado para la selección y uso óptimo de implementos agrícolas.',
                bg: 'bg-tractor-200',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <div className={`w-12 h-12 ${service.bg} rounded-full flex items-center justify-center mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-tractor-700">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* Products Section */}
      <motion.section
        id="maquinarias"
        className="py-20 bg-white w-full"
        custom={3}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="w-full px-4">
          <motion.h2
            className="text-3xl font-extrabold text-center mb-12 text-tractor-200"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Nuestros Productos
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Ofrecemos una amplia gama de implementos como: cosechadoras, picadoras, cultivadoras, abonadoras, y entre otros equipos diseñados para tareas específicas del sector agrícola.
            Cada implemento es cuidadosamente fabricado para asegurar un rendimiento óptimo y una larga vida útil, incluso en terrenos exigentes.
          </motion.p>
          <MachineGallery searchQuery={searchQuery} />
        </div>
      </motion.section>
      {/* Spare Parts Section */}
      <motion.section
        id="repuestos"
        className="py-24 bg-gradient-to-b from-white to-gray-50"
        custom={4}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-extrabold text-center mb-12 text-tractor-200 tracking-tight"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Nuestros Repuestos
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Descubre una amplia gama de repuestos de alta calidad para mantener tus equipos agrícolas en óptimas condiciones. Garantizamos durabilidad y compatibilidad.
          </motion.p>
          <SparePartsGallery searchQuery={searchQuery} />
        </div>
      </motion.section>
      {/* CTA Section */}
      <motion.section
        className="py-16 bg-tractor-200 "
        custom={5}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center animate-pulse">
          <motion.h2
            className="text-3xl font-extrabold text-white mb-6"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            ¿Necesitas un implemento específico?
          </motion.h2>
          <motion.p
            className="text-tractor-50 text-xl mb-8"
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Contáctanos y te ayudaremos a encontrar la solución perfecta para tu necesidad
          </motion.p>
          <motion.a
            href="#contacto"
            className="bg-machinery-200 text-tractor-400 px-8 py-3 rounded-lg font-semibold hover:bg-machinery-300 transition duration-300 inline-flex items-center"
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            Solicitar Cotización
            <ChevronRight className="ml-2 h-5 w-5" />
          </motion.a>
        </div>
      </motion.section>
      {/* Video Gallery Section */}
      <motion.section
        id="videos"
        className="py-20 bg-white"
        custom={6}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-extrabold text-center mb-12 text-tractor-200"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Videos de Nuestros Proyectos
          </motion.h2>
          <VideoGallery />
        </div>
      </motion.section>
      {/* Testimonials Section */}
      <motion.section
        id="testimonios"
        className="py-20 bg-tractor-50"
        custom={7}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-extrabold text-center mb-12 text-tractor-200"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Testimonios de Clientes
          </motion.h2>
          <Testimonials />
        </div>
      </motion.section>
      {/* Advisors Section */}
      <motion.section
        id="asesores"
        className="py-20 bg-white"
        custom={8}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-extrabold text-center mb-12 text-tractor-200"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Personal Administrativo
          </motion.h2>
          <Advisors />
        </div>
      </motion.section>
      {/* Clients Section */}
      <motion.section
        className="py-20 bg-white"
        custom={9}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Clients />
      </motion.section>
      {/* Contact Section */}
      <motion.section
        id="contacto"
        className="py-20 bg-tractor-50"
        custom={10}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-extrabold text-center mb-12 text-tractor-200"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Contáctanos
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ContactForm onSuccess={handleContactSuccess} />
            </div>
            <div className="space-y-6">
              <motion.div
                className="flex items-center p-4 bg-white rounded-lg shadow-sm"
                custom={1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Phone className="h-6 w-6 text-tractor-200 mr-3" />
                <span>+51 958 840 599</span>
              </motion.div>
              <motion.div
                className="flex items-center p-4 bg-white rounded-lg shadow-sm"
                custom={2}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Mail className="h-6 w-6 text-tractor-200 mr-3" />
                <span>eliquenosac.lili@gmail.com</span>
              </motion.div>
              <motion.div
                className="flex items-center p-4 bg-white rounded-lg shadow-sm"
                custom={3}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <MapPin className="h-6 w-6 text-tractor-200 mr-3" />
                <span>Jr. Augusto B. Leguia n 523. Imperial cañete Lima Perú</span>
              </motion.div>
              <motion.div
                custom={4}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Map />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Footer */}
      <motion.footer
        className="bg-tractor-200 text-white py-12"
        custom={11}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl text-center mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <motion.h3
                className="text-xl font-bold mb-4 flex items-center"
                custom={0}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Logo height={50} />
              </motion.h3>
              <motion.p
                className="text-tractor-50"
                custom={1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Expertos en soluciones metalúrgicas industriales.
              </motion.p>
            </div>
            <div>
              <motion.p
                className="text-tractor-50"
                custom={0}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Estamos asociados con la camara de comercio de lima.
              </motion.p>
              <br />
              <motion.h3
                className="text-xl font-bold mb-4 flex items-center"
                custom={1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <img src={image5} alt="Cámara de Comercio de Lima" className="h-30 w-auto" />
              </motion.h3>
            </div>
            <div>
              <motion.h3
                className="text-xl font-bold mb-4"
                custom={0}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Enlaces Rápidos
              </motion.h3>
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <a href={item.href} className="text-tractor-50 hover:text-white transition duration-300">
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <motion.h3
                className="text-xl font-bold mb-4"
                custom={0}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Horario de Atención
              </motion.h3>
              <motion.p
                className="text-tractor-50"
                custom={1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Lunes a Viernes: 08:00 AM - 01:00 PM<br />
                03:00 PM - 06:00 PM<br />
                Sábados: 08:00 AM - 1:00 PM<br />
                03:00 PM - 06:00 PM<br />
                Domingos: Cerrado
              </motion.p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-tractor-300 text-center">
            <motion.p
              className="text-tractor-50"
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} El Iqueño SAC. Todos los derechos reservados.
            </motion.p>
          </div>
        </div>
      </motion.footer>
      {/* Alert Component */}
      {showAlert && (
        <Alert message={alertMessage} onClose={() => setShowAlert(false)} />
      )}

<motion.div
  className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9000] pointer-events-none"
  style={{
    transform: 'translateZ(0)',
    willChange: 'transform',
    position: 'fixed',
    right: '1rem',
    bottom: '1rem'
  }}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Tooltip con el texto */}
  <motion.div
    className="absolute -top-12 right-0 bg-gradient-to-r from-green-600 to-emerald-500 
               text-white text-xs sm:text-sm font-semibold px-3 py-2 
               rounded-xl shadow-lg whitespace-nowrap"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3, duration: 0.6 }}
  >
    🤖 Soy Iqueñobot, tu asistente virtual
  </motion.div>

  {/* Botón flotante - VERSIÓN SIMPLIFICADA */}
  <motion.button
    id="agroChatButton"
    onClick={openChatbot}
    type="button"
    className="relative bg-gradient-to-r from-green-600 to-green-500 
               text-white rounded-full p-4 sm:p-5 shadow-lg flex 
               items-center justify-center pointer-events-auto"
    initial={{ scale: 1 }}
    animate={{
      scale: [1, 1.1, 1],
      boxShadow: [
        "0 0 10px rgba(16, 185, 129, 0.4)",
        "0 0 25px rgba(16, 185, 129, 0.6)",
        "0 0 10px rgba(16, 185, 129, 0.4)"
      ]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    whileHover={{
      scale: 1.2,
      rotate: 5,
      boxShadow: "0 0 30px rgba(16,185,129,0.8)"
    }}
    whileTap={{
      scale: 0.9,
      rotate: -5
    }}
    title="Habla con nuestro asistente agrícola"
  >
    <Bot className="h-7 w-7" />
  </motion.button>
</motion.div>



      
    </div>
  );
}

export default App;