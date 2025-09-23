import React from 'react';
import imagelorena from '../assets/lorena.png';
import imagemaicol from '../assets/maicol.png';
import imagemanzo from '../assets/richiboy.jpg';

const testimonials = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    company: 'Industrias del Sur',
    content: 'Excelente servicio y calidad en la fabricación de nuestras máquinas industriales. El equipo de El Iqueño SAC demostró gran profesionalismo.',
    image: imagemaicol
  },
  {
    id: 2,
    name: 'María González',
    company: 'Metalúrgica Central',
    content: 'Trabajamos con El Iqueño SAC en varios proyectos y siempre entregan a tiempo y con la calidad prometida.',
    image: imagelorena
  },
  {
    id: 3,
    name: 'Jorge Mendoza',
    company: 'Agricola del Norte',
    content: 'Su conocimiento y experiencia en soluciones para el sector agrícola son excepcionales. Gracias a sus implementos de alta calidad, hemos optimizado nuestras labores en campo, logrando mayor eficiencia y mejores resultados en cada campaña.',
    image: imagemanzo
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map(testimonial => (
        <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
              <p className="text-gray-600 text-sm">{testimonial.company}</p>
            </div>
          </div>
          <p className="text-gray-700 italic">"{testimonial.content}"</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;