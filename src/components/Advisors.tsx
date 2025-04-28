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
    name: 'Veronica Caico',
    position: 'Administradora',
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/490025759_122102566928831227_6172123913805551504_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=gPyPbcwSUbEQ7kNvwHdARMC&_nc_oc=AdkGSZym7jvinPT-EvFho13sKEFSyQSS2Osg3XiqQytOFIqKiFZT0DZJBe7n_EVnRBOb_hIqBI2tim72VosmQd79&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=a47NCT6DMhNKQa93zgrikA&oh=00_AfGIUaHEVtAoksygBwlSoZ2pH4Rp-ygXpZT3w4TR15QPFg&oe=6814908F',
    whatsapp: '963792905',
    specialties: ['Maquinarias Agricolas', 'Proyectos Especiales', 'Servicio al Cliente']
  }
];

const Advisors: React.FC = () => {
  const handleWhatsAppClick = (phone: string) => {
    window.open(`https://wa.me/51${phone}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1400px] mx-auto px-4 py-8">
      {advisors.map(advisor => (
        <div 
          key={advisor.id} 
          className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col md:flex-row h-full group cursor-pointer"
        >
          {/* Image Section */}
          <div className="relative md:w-2/5 overflow-hidden">
            <img
              src={advisor.image}
              alt={advisor.name}
              className="w-full h-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform transition-all duration-300 group-hover:translate-y-0 translate-y-0">
              <h3 className="text-white text-xl font-bold">{advisor.name}</h3>
              <p className="text-gray-200 text-sm transform transition-all duration-300 group-hover:translate-y-0">{advisor.position}</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-3/5 p-6 flex flex-col justify-between bg-gradient-to-br from-white to-gray-50 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-gray-50 group-hover:to-white">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Especialidades:</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {advisor.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1.5 rounded-full font-medium transition-all duration-300 hover:bg-indigo-200 hover:scale-105 hover:shadow-md"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => handleWhatsAppClick(advisor.whatsapp)}
              className="w-full bg-green-500 text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center text-base font-medium shadow-md hover:shadow-xl hover:bg-green-600 hover:scale-[1.02] active:scale-95"
            >
              <MessageCircle className="h-5 w-5 mr-2 transition-transform group-hover:rotate-12" />
              Contactar por WhatsApp
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Advisors;
