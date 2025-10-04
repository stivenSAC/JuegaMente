import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from '../components/Modal';

const PatronVisual = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pattern, setPattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [showingPattern, setShowingPattern] = useState(false);
  const [level, setLevel] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('info');
  const [modalMessage, setModalMessage] = useState('');
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem("bestScore_patron");
    if (savedScore) setBestScore(Number(savedScore));
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore_patron", score);
    }
  }, [score, bestScore]);

  const generatePattern = () => {
    const patternLength = Math.min(level + 2, 15);
    const newPattern = [];
    const usedCells = new Set();
    
    while (newPattern.length < patternLength) {
      const cell = Math.floor(Math.random() * 56);
      if (!usedCells.has(cell)) {
        newPattern.push(cell);
        usedCells.add(cell);
      }
    }
    
    setPattern(newPattern);
    setUserPattern([]);
    showPattern(newPattern);
  };

  const showPattern = (pat) => {
    setShowingPattern(true);
    setCurrentPatternIndex(0);
    
    pat.forEach((_, index) => {
      setTimeout(() => {
        setCurrentPatternIndex(index);
      }, index * 800);
    });
    
    setTimeout(() => {
      setShowingPattern(false);
      setCurrentPatternIndex(-1);
    }, pat.length * 800 + 500);
  };

  const startGame = () => {
    setScore(0);
    setLevel(1);
    setIsPlaying(true);
    generatePattern();
  };

  const handleCellClick = (index) => {
    if (!isPlaying || showingPattern) return;
    
    const newUserPattern = [...userPattern, index];
    setUserPattern(newUserPattern);

    if (newUserPattern[newUserPattern.length - 1] !== pattern[newUserPattern.length - 1]) {
      setIsPlaying(false);
      setModalType('error');
      setModalMessage('¡Patrón incorrecto! Inténtalo de nuevo.');
      setShowModal(true);
      return;
    }

    if (newUserPattern.length === pattern.length) {
      setScore(score + level * 15);
      setLevel(level + 1);
      setTimeout(() => generatePattern(), 1000);
    }
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-4">👁️ Patrón Visual</h1>
      <p className="text-white/80 mb-6">Memoriza y repite el patrón mostrado</p>

      {showingPattern && (
        <p className="text-lg mb-4 text-yellow-300">¡Memoriza el patrón!</p>
      )}

      <div className="grid grid-cols-8 gap-1 mb-6 bg-black/40 p-2 rounded-xl max-w-xl">
        {Array.from({length: 56}, (_, index) => (
          <motion.div
            key={index}
            onClick={() => handleCellClick(index)}
            className={`w-8 h-8 rounded cursor-pointer flex items-center justify-center text-sm font-bold ${
              showingPattern && pattern[currentPatternIndex] === index ? 'bg-yellow-400 text-black' :
              userPattern.includes(index) ? 'bg-green-500' : 'bg-black/40 hover:bg-black/60'
            }`}
            whileHover={!showingPattern ? { scale: 1.05 } : {}}
            whileTap={!showingPattern ? { scale: 0.95 } : {}}
          >
            {showingPattern && pattern[currentPatternIndex] === index ? '⭐' : 
             userPattern.includes(index) ? '✓' : ''}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-lg">Nivel: {level}</p>
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

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'error' ? '¡Fallaste!' : 'Información'}
        message={modalMessage}
        type={modalType}
      />
    </motion.section>
  );
};

export default PatronVisual;