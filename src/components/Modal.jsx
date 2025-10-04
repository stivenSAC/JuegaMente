import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, message, type = 'info', onConfirm }) => {
  if (!isOpen) return null;

  const getColors = () => {
    switch (type) {
      case 'success': return 'bg-green-500 border-green-400';
      case 'error': return 'bg-red-500 border-red-400';
      case 'warning': return 'bg-yellow-500 border-yellow-400';
      default: return 'bg-blue-500 border-blue-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`${getColors()} p-6 rounded-xl shadow-xl max-w-md w-full mx-4 text-white border-2`}
      >
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold"
            >
              Continuar
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;