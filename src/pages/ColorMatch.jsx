import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ColorMatch = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentWord, setCurrentWord] = useState('');
  const [currentColor, setCurrentColor] = useState('');
  const [options, setOptions] = useState([]);

  const colors = [
    { name: 'ROJO', color: 'bg-red-500', textColor: 'text-red-500' },
    { name: 'AZUL', color: 'bg-blue-500', textColor: 'text-blue-500' },
    { name: 'VERDE', color: 'bg-green-500', textColor: 'text-green-500' },
    { name: 'AMARILLO', color: 'bg-yellow-500', textColor: 'text-yellow-500' },
    { name: 'MORADO', color: 'bg-purple-500', textColor: 'text-purple-500' },
    { name: 'NARANJA', color: 'bg-orange-500', textColor: 'text-orange-500' }
  ];

  useEffect(() => {
    const savedScore = localStorage.getItem("bestScore_color");
    if (savedScore) setBestScore(Number(savedScore));
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore_color", score);
    }
  }, [score, bestScore]);

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft]);

  const generateRound = () => {
    const wordColor = colors[Math.floor(Math.random() * colors.length)];
    const displayColor = colors[Math.floor(Math.random() * colors.length)];
    
    setCurrentWord(wordColor.name);
    setCurrentColor(displayColor.textColor);
    
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5).slice(0, 4);
    if (!shuffledColors.find(c => c.name === wordColor.name)) {
      shuffledColors[0] = wordColor;
    }
    setOptions(shuffledColors.sort(() => Math.random() - 0.5));
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    generateRound();
  };

  const handleColorClick = (selectedColor) => {
    if (!isPlaying) return;
    
    if (selectedColor.name === currentWord) {
      setScore(score + 10);
      generateRound();
    } else {
      setScore(Math.max(0, score - 5));
    }
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-4">🎨 Color Match</h1>
      <p className="text-white/80 mb-6">Elige el color correcto antes del tiempo</p>

      {isPlaying && (
        <>
          <div className="mb-6 text-center">
            <p className="text-lg mb-2">Tiempo: {timeLeft}s</p>
            <p className="text-2xl mb-4">¿Qué color dice la palabra?</p>
            <div className={`text-6xl font-bold ${currentColor} mb-6`}>
              {currentWord}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {options.map((colorOption, index) => (
              <motion.button
                key={index}
                onClick={() => handleColorClick(colorOption)}
                className={`w-24 h-24 ${colorOption.color} rounded-lg font-bold text-white hover:opacity-80`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {colorOption.name}
              </motion.button>
            ))}
          </div>
        </>
      )}

      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-lg">Puntaje actual: {score}</p>
        <p className="text-sm text-yellow-300">Mejor puntaje: {bestScore}</p>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={startGame}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-semibold"
        >
          {isPlaying ? 'Reiniciar' : 'Iniciar'}
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-semibold"
        >
          Volver al catálogo
        </button>
      </div>
    </motion.section>
  );
};

export default ColorMatch;