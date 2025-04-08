import React from 'react';
import { MessageCircle } from 'lucide-react';

const advisors = [
  {
    id: 1,
    name: 'Karla Albites',
    position: 'Asistente Administrativo , contable y ventas',
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t1.6435-9/199483639_4032706436811261_4971965865721243258_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=W02BmXFMXjUQ7kNvwG5Sqaq&_nc_oc=Adlj5uo7LfeV7C8YLbIBWE9UjuMnuiX31Hrj4syjt_rmowh8FA1Cz2s8FAsvmpL2GmndDx6XNvudv2u-yZ2DiZzf&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=cSmyGtyehBsR8KQBzxl1dg&oh=00_AfFDSJ7NlA6DpSH28QdZLq_dPd5P5JWUKI1srZbbB4qyTg&oe=681C4546',
    whatsapp: '958840599',
    specialties: ['Ventas Corporativas', 'Asesoria de Productos Agricolas', 'Servicio al Cliente']
  },
  {
    id: 2,
    name: 'Veronica Meneses',
    position: 'Administradora',
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/490025759_122102566928831227_6172123913805551504_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=H4N3JsfDiZgQ7kNvwHr94Ub&_nc_oc=Admw1cCeCkiLv0qOWWtakl-8PqvLOeNdqrS6x54Plu5ON4TrODtx56zfVJntNYASJfAFbFOou_WCozzAvRdy0tUl&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=IefAEslxXNH88gRbV2Aj_A&oh=00_AfH0aldh8fRGU5FdDpH4fV2DBQ-uJn1tn6LnG37u_NrUHg&oe=67FAA30F',
    whatsapp: '963792905',
    specialties: ['Maquinarias Agricolas', 'Proyectos Especiales', 'Servicio al Cliente']
  }
];

const Advisors: React.FC = () => {
  const handleWhatsAppClick = (phone: string) => {
    window.open(`https://wa.me/51${phone}`, '_blank');
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
      {advisors.map(advisor => (
        <div key={advisor.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
          <div className="relative">
            <img
              src={advisor.image}
              alt={advisor.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h3 className="text-white text-2xl font-bold">{advisor.name}</h3>
              <p className="text-gray-200">{advisor.position}</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Especialidades:</h4>
              <div className="flex flex-wrap gap-2">
                {advisor.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => handleWhatsAppClick(advisor.whatsapp)}
              className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Contactar por WhatsApp
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Advisors;
