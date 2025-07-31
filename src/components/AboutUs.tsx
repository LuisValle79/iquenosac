import React from 'react';
import { Target, Eye } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <img
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Taller metalúrgico"
          className="rounded-lg shadow-lg w-full h-[400px] object-cover"
        />
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-indigo-900 mb-4">Nuestra Historia</h3>
          <p className="text-gray-600 leading-relaxed">
            Con más de dos décadas de experiencia en la industria metalúrgica, 
            El Iqueño SAC se ha consolidado como líder en la fabricación y mantenimiento 
            de maquinaria industrial en la región de Ica. Nuestro compromiso con la 
            calidad y la innovación nos ha permitido crecer y evolucionar, 
            manteniendo siempre los más altos estándares en cada proyecto que emprendemos.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-start mb-6">
            <Target className="h-8 w-8 text-indigo-900 mr-4 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-semibold text-indigo-900 mb-2">Misión</h4>
              <p className="text-gray-600">
                Proporcionar soluciones metalúrgicas innovadoras y de alta calidad que impulsen 
                el éxito de nuestros clientes, manteniendo un compromiso inquebrantable con 
                la excelencia y la satisfacción del cliente.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Eye className="h-8 w-8 text-indigo-900 mr-4 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-semibold text-indigo-900 mb-2">Visión</h4>
              <p className="text-gray-600">
                Ser reconocidos como la empresa líder en soluciones metalúrgicas en el Perú,
                 destacando por nuestra innovación, calidad y compromiso con el desarrollo
                  industrial de la región.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;