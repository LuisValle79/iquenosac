import React from 'react';
import logoImage from '../assets/Logo-El-Iqueño.png';

interface LogoProps {
  height?: number;
  showText?: boolean;
  variant?: 'navbar' | 'footer' | 'default';
}

const Logo: React.FC<LogoProps> = ({ height = 48, showText = false, variant = 'default' }) => {
  const getLogoStyles = () => {
    switch (variant) {
      case 'navbar':
        return {
          container: "flex items-center space-x-3 group cursor-pointer",
          imageWrapper: "bg-white p-3 shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-1",
          image: "object-contain filter drop-shadow-lg transition-all duration-300",
          textWrapper: "hidden sm:block transition-all duration-300 group-hover:translate-x-1",
          title: "text-xl font-bold text-white leading-tight drop-shadow-md group-hover:text-machinery-100 transition-colors duration-300",
          subtitle: "text-sm text-machinery-100 leading-tight drop-shadow-sm group-hover:text-white transition-colors duration-300"
        };
      case 'footer':
        return {
          container: "flex items-center justify-center group cursor-pointer",
          imageWrapper: "bg-white p-4 shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1",
          image: "object-contain filter drop-shadow-xl transition-all duration-300 hover:brightness-110",
          textWrapper: "ml-4 transition-all duration-300 group-hover:translate-x-1",
          title: "text-2xl font-bold text-white leading-tight drop-shadow-lg group-hover:text-machinery-100 transition-colors duration-300",
          subtitle: "text-base text-machinery-100 leading-tight drop-shadow-md group-hover:text-white transition-colors duration-300"
        };
      default:
        return {
          container: "flex items-center",
          imageWrapper: "",
          image: "object-contain",
          textWrapper: "ml-3",
          title: "text-lg font-bold leading-tight",
          subtitle: "text-sm leading-tight"
        };
    }
  };

  const styles = getLogoStyles();

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img 
          src={logoImage}
          alt="El Iqueño SAC - Implementos Agrícolas"
          style={{ height: `${height}px` }}
          className={styles.image}
        />
      </div>
      {showText && (
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>El Iqueño SAC</h1>
          <p className={styles.subtitle}>Implementos Agrícolas</p>
        </div>
      )}
    </div>
  );
};

export default Logo; 