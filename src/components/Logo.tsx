import React from 'react';
import logoImage from '../assets/logo.png';

interface LogoProps {
  height?: number;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ height = 48 }) => {
  return (
    <div className="flex items-center">
      <img 
        src={logoImage}
        alt="FSI Implementos Agrícolas"
        style={{ height: `${height}px`, maxWidth: 'none' }}
        className="object-contain"
      />
    </div>
  );
};

export default Logo; 