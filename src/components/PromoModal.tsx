import React, { useState, useEffect, useRef } from 'react';
import { X, Tag, Clock, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

// ============================================
// CONFIGURACIÓN DE SUPABASE
// ============================================
const supabase = createClient(
  'https://rqouqtdgxsksueyskdow.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxb3VxdGRneHNrc3VleXNrZG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MjgxNTcsImV4cCI6MjA2OTIwNDE1N30.7s3i-7gJw-MiI0473eR_3gVX5TrskpJ1ivZKglfeMk0'
);

interface PromoModalProps {
  onClose: () => void;
}

interface PromoData {
  id: string;
  title: string;
  subtitle: string;
  features: string;
  image: string;
  validUntil: string;
  mediaType: 'image' | 'video';
}

const PromoModal: React.FC<PromoModalProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [promos, setPromos] = useState<PromoData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetchActivePromos();
  }, []);

  useEffect(() => {
    if (promos.length > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [promos]);

  // Auto-slide dinámico: más tiempo para videos, menos para imágenes
  useEffect(() => {
    if (promos.length > 1) {
      // Determinar el tiempo según el tipo de media actual
      const currentPromo = promos[currentIndex];
      const slideTime = currentPromo.mediaType === 'video' ? 25000 : 6000; // 15s para video, 5s para imagen
      
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % promos.length);
      }, slideTime);
      
      return () => clearInterval(interval);
    }
  }, [promos.length, currentIndex, promos]); // Agregamos currentIndex y promos como dependencias

  const fetchActivePromos = async () => {
    try {
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .eq('is_active', true)
        .eq('show_in_web', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const formattedPromos = data.map((promo: any) => ({
          id: promo.id,
          title: promo.title,
          subtitle: promo.subtitle || '',
          features: promo.features,
          image: promo.image_url,
          validUntil: promo.valid_until,
          mediaType: promo.media_type || 'image'
        }));
        setPromos(formattedPromos);
      }
    } catch (error) {
      console.error('Error al cargar promociones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleWhatsAppClick = () => {
    if (promos.length === 0) return;
    const currentPromo = promos[currentIndex];
    const message = encodeURIComponent(`Hola! Me interesa la oferta de ${currentPromo.title}`);
    const whatsappUrl = `https://wa.me/51958840599?text=${message}`;
    window.open(whatsappUrl, '_blank');
    handleClose();
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + promos.length) % promos.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % promos.length);
  };

  if (loading) return null;
  if (promos.length === 0) return null;
  
  const currentPromo = promos[currentIndex];
  

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[99999999999999999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop con blur */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 p-2 transition-all duration-300 hover:scale-110 group"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-red-500 transition-colors" />
            </button>

            {/* Indicador de múltiples promociones */}
            {promos.length > 1 && (
              <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                <span className="text-xs font-semibold text-gray-700">
                  {currentIndex + 1} / {promos.length}
                </span>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-0"
              >
                {/* Left Side - Image or Video */}
                
                <div className="relative h-56 sm:h-64 md:h-auto bg-white overflow-hidden flex flex-col items-center justify-center p-4 md:p-5">
                  {currentPromo.mediaType === 'video' ? (
                    <motion.video
                      src={currentPromo.image}
                      className="w-full h-full object-contain"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                      controls
                      autoPlay
                      muted={isMuted}
                      onClick={() => setIsMuted(false)}
                      loop
                      playsInline

                    />
                  ) : (
                    <motion.img
                      src={currentPromo.image}
                      alt={currentPromo.title}
                      className="w-full h-full object-contain"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                  )}

                  {/* Discount Badge - Floating (PROMOCIÓN rojo) */}
                  <motion.div
                    className="absolute top-4 left-3 md:top-6 md:left-4 bg-red-500 text-white px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl shadow-2xl"
                    initial={{ rotate: -12, scale: 0 }}
                    animate={{ rotate: -12, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <div className="flex items-center space-x-1 md:space-x-1.5">
                      <Tag className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span className="text-base md:text-xl font-black">PROMOCIÓN</span>
                    </div>
                  </motion.div>

                  {/* Banner promocional animado - Debajo de la imagen */}
                  <motion.div
                    className="absolute bottom-12 left-0 right-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-gray-900 py-2 px-3 shadow-lg overflow-hidden"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    {/* Efecto de brillo animado */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                    <div className="relative flex items-center justify-center space-x-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Tag className="w-4 h-4 md:w-5 md:h-5" />
                      </motion.div>
                      <span className="text-xs md:text-sm font-black uppercase tracking-wider">
                        ¡Oferta por tiempo limitado!
                      </span>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ⚡
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Validity Badge */}
                  <motion.div
                    className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg shadow-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center space-x-1 md:space-x-1.5 text-xs md:text-sm">
                      <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-tractor-200" />
                      <span className="text-gray-700 font-semibold">Válido: {currentPromo.validUntil}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Right Side - Content */}
                <div className="p-6 sm:p-7 md:p-8 flex flex-col justify-between">
                  {/* Badge */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-block bg-gradient-to-r from-machinery-200 to-machinery-300 text-tractor-700 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md">
                      ¡OFERTA ESPECIAL!
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    className="mt-4 md:mt-5"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black text-tractor-700 leading-tight mb-1 pr-4">
                      {currentPromo.title}
                    </h2>
                    {currentPromo.subtitle && (
                      <p className="text-base sm:text-lg md:text-lg text-tractor-200 font-semibold">
                        {currentPromo.subtitle}
                      </p>
                    )}
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    className="mt-3 md:mt-4 text-gray-600 leading-relaxed text-xs md:text-sm"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {currentPromo.features}
                  </motion.p>

                  {/* CTA Button - Solo WhatsApp */}
                  <motion.div
                    className="mt-5 md:mt-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <button
                      onClick={handleWhatsAppClick}
                      className="w-full bg-tractor-200 text-white px-5 py-3 md:px-6 md:py-3.5 rounded-xl font-bold text-base md:text-lg hover:bg-tractor-300 hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 group"
                    >
                      <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>Comprar</span>
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Botones de navegación (solo si hay múltiples promociones) */}
            {promos.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </button>

                {/* Indicadores de puntos */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
                  {promos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'bg-tractor-200 w-6'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Ir a promoción ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoModal;
