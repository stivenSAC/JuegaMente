import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SumaCorrecta = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [target, setTarget] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const savedScore = localStorage.getItem("bestScore_suma");
    if (savedScore) setBestScore(Number(savedScore));
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore_suma", score);
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
    const newNumbers = Array.from({length: 8}, () => Math.floor(Math.random() * 15) + 1);
    // Generar objetivo basado en una combinación posible
    const possibleCombination = [];
    const numElements = Math.floor(Math.random() * 3) + 2; // 2-4 elementos
    for (let i = 0; i < numElements; i++) {
      possibleCombination.push(newNumbers[i]);
    }
    const newTarget = possibleCombination.reduce((sum, num) => sum + num, 0);
    
    setNumbers(newNumbers);
    setTarget(newTarget);
    setSelected([]);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    generateRound();
  };

  const handleNumberClick = (index) => {
    if (!isPlaying) return;
    
    const newSelected = selected.includes(index) 
      ? selected.filter(i => i !== index)
      : [...selected, index];
    
    setSelected(newSelected);
    
    const sum = newSelected.reduce((acc, i) => acc + numbers[i], 0);
    if (sum === target) {
      setScore(score + 20);
      generateRound();
    }
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-4">➕ Suma Correcta</h1>
      <p className="text-white/80 mb-6">Selecciona números que sumen al objetivo</p>

      {isPlaying && (
        <>
          <div className="mb-6 text-center">
            <p className="text-lg mb-2">Tiempo: {timeLeft}s</p>
            <p className="text-3xl font-bold text-yellow-300 mb-4">Objetivo: {target}</p>
            <p className="text-lg">Suma actual: {selected.reduce((acc, i) => acc + numbers[i], 0)}</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {numbers.map((num, index) => (
              <motion.button
                key={index}
                onClick={() => handleNumberClick(index)}
                className={`w-16 h-16 rounded-lg font-bold text-xl ${
                  selected.includes(index) 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white/20 backdrop-blur text-white hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {num}
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

export default SumaCorrecta;