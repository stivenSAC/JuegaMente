import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GamePlaceholder = ({ title, icon, description }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/20 backdrop-blur rounded-xl p-8 shadow-lg text-center max-w-md w-full"
      >
        <div className="text-6xl mb-4">{icon}</div>
        <h1 className="text-white font-bold text-3xl mb-4 font-fredoka">{title}</h1>
        <p className="text-white/80 text-lg mb-6 font-poppins">{description}</p>
        <p className="text-white/60 text-sm mb-6">¡Próximamente disponible!</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300"
        >
          Volver al Inicio
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GamePlaceholder;