import React from 'react';

// Import client logos
import novolizLogo from '../assets/grupoandina.jpg';
import pozoAltoLogo from '../assets/vivero_arona_logo.jpg';
import lxgLogo from '../assets/HM-CLAUSE.jpg';
import hefeiLogo from '../assets/ROOTS-PERU.jpg';
import rootsLogo from '../assets/agrokr.jpg';
import agrokrLogo from '../assets/agrovision.jpg';

const Clients: React.FC = () => {
  const clientLogos = [
    { src: novolizLogo, alt: 'Novoliz Logo' },
    { src: pozoAltoLogo, alt: 'Pozo Alto S.A.C. Logo' },
    { src: lxgLogo, alt: 'LXG Amazon Reforestry Fund Logo' },
    { src: hefeiLogo, alt: 'Hefei Logo' },
    { src: rootsLogo, alt: 'Roots Peru Logo' },
    { src: agrokrLogo, alt: 'Agrokr Logo' },
  ];

  return (
    <section className="py-20 bg-tractor-200 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
          Nuestros Clientes
        </h2>
        <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Brindamos soluciones integrales en el sector agroindustrial e industria en general.
          Innovamos, diseñamos y fabricamos repuestos, implementos y maquinaria agrícola a la medida.
        </p>

        {/* Carrusel infinito con animación horizontal */}
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white rounded-xl shadow-xl p-4 w-40 h-28 flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>


      </div>

      {/* Animación CSS */}
      <style>
        {`
          @keyframes marquee {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Clients;
