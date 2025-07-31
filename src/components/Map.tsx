import React from 'react';

const Map: React.FC = () => {
  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-sm">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.635622305664!2d-76.35826521976324!3d-13.058850154427262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910ffbdcdc4a02d5%3A0x9c874b00280adab6!2sAugusto%20B.%20Legu%C3%ADa%20523%2C%20Imperial%2015701!5e0!3m2!1ses!2spe!4v1753945472176!5m2!1ses!2spe"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;

