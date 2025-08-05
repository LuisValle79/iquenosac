import React from 'react';
import { X } from 'lucide-react';

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  const isRightClickAlert = message === 'El clic derecho está deshabilitado por seguridad.';
  const alertClass = isRightClickAlert ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`fixed bottom-4 right-4 ${alertClass} text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

export default Alert;