import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GameIcon from '../images/GameIcon';

const Home = () => {
  const navigate = useNavigate();

  const games = [
    { id: 1, name: "Memoria Rápida", icon: "memoria", desc: "Encuentra las parejas lo más rápido posible", route: "/memoria" },
    { id: 2, name: "Secuencia Numérica", icon: "secuencia", desc: "Recuerda la secuencia correcta", route: "/secuencia" },
    { id: 3, name: "Reacción Rápida", icon: "parejas", desc: "Haz clic en el círculo lo más rápido posible", route: "/parejas" },
    { id: 4, name: "Puzzle Móvil", icon: "puzzle", desc: "Ordena las piezas correctamente", route: "/puzzle" },
    { id: 5, name: "Laberinto Exprés", icon: "laberinto", desc: "Llega a la meta evitando obstáculos", route: "/laberinto" },
    { id: 6, name: "Suma Correcta", icon: "suma", desc: "Selecciona números que sumen al objetivo", route: "/suma" },
    { id: 7, name: "Simon Says", icon: "simon", desc: "Repite la secuencia de colores", route: "/simon" },
    { id: 8, name: "Rompecódigos", icon: "rompecodigos", desc: "Adivina la combinación secreta", route: "/rompecodigos" },
    { id: 9, name: "Color Match", icon: "color", desc: "Elige el color correcto antes del tiempo", route: "/color" },
    { id: 10, name: "Patrón Visual", icon: "patron", desc: "Memoriza y repite el patrón mostrado", route: "/patron" },
    { id: 11, name: "Ordena la Serie", icon: "orden", desc: "Ordena los elementos correctamente", route: "/orden" },
    { id: 12, name: "Reto Relámpago", icon: "reto", desc: "Responde preguntas rápidas de lógica", route: "/reto" },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-white font-bold text-4xl md:text-5xl font-fredoka mb-4">
            Desafía tu mente 🧩
          </h1>
          <p className="text-white/90 text-lg md:text-xl mt-2 font-poppins">
            Elige un juego y mejora tus habilidades con JuegaMente
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="bg-black/40 backdrop-blur rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
            >
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <GameIcon type={game.icon} className="w-16 h-16" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2 font-poppins">
                  {game.name}
                </h3>
                <p className="text-white/80 text-sm mb-4 font-poppins">
                  {game.desc}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(game.route)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Jugar
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;