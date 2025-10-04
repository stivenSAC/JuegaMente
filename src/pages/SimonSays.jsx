import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from '../components/Modal';

const SimonSays = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('info');
  const [modalMessage, setModalMessage] = useState('');

  const colors = [
    { id: 0, color: 'bg-red-800', activeColor: 'bg-red-400' },
    { id: 1, color: 'bg-blue-800', activeColor: 'bg-blue-400' },
    { id: 2, color: 'bg-green-800', activeColor: 'bg-green-400' },
    { id: 3, color: 'bg-yellow-800', activeColor: 'bg-yellow-400' }
  ];

  useEffect(() => {
    const savedScore = localStorage.getItem("bestScore_simon");
    if (savedScore) setBestScore(Number(savedScore));
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore_simon", score);
    }
  }, [score, bestScore]);

  const startGame = () => {
    const newSequence = [Math.floor(Math.random() * 4)];
    setSequence(newSequence);
    setUserSequence([]);
    setIsPlaying(true);
    playSequence(newSequence);
  };

  const playSequence = (seq) => {
    setShowingSequence(true);
    seq.forEach((colorId, index) => {
      setTimeout(() => {
        setActiveColor(colorId);
        setTimeout(() => setActiveColor(null), 400);
      }, index * 600);
    });
    setTimeout(() => setShowingSequence(false), seq.length * 600 + 500);
  };

  const handleColorClick = (colorId) => {
    if (!isPlaying || showingSequence) return;
    
    const newUserSequence = [...userSequence, colorId];
    setUserSequence(newUserSequence);

    if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      setIsPlaying(false);
      setModalType('error');
      setModalMessage('¡Secuencia incorrecta! Inténtalo de nuevo.');
      setShowModal(true);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      setScore(score + 10);
      const nextSequence = [...sequence, Math.floor(Math.random() * 4)];
      setSequence(nextSequence);
      setUserSequence([]);
      setTimeout(() => playSequence(nextSequence), 1000);
    }
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-4">🎶 Simon Says</h1>
      <p className="text-white/80 mb-6">Repite la secuencia de colores</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {colors.map((colorObj) => (
          <motion.button
            key={colorObj.id}
            onClick={() => handleColorClick(colorObj.id)}
            className={`w-24 h-24 rounded-lg ${
              activeColor === colorObj.id ? colorObj.activeColor : colorObj.color
            } ${!isPlaying || showingSequence ? 'cursor-not-allowed opacity-70' : 'hover:opacity-80'}`}
            whileHover={!showingSequence ? { scale: 1.05 } : {}}
            whileTap={!showingSequence ? { scale: 0.95 } : {}}
            disabled={!isPlaying || showingSequence}
          />
        ))}
      </div>

      {showingSequence && (
        <p className="text-lg mb-4 text-yellow-300">¡Observa la secuencia!</p>
      )}

      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-lg">Secuencia: {sequence.length}</p>
        <p className="text-lg">Puntaje actual: {score}</p>
        <p className="text-sm text-yellow-300">Mejor puntaje: {bestScore}</p>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => {
            setScore(0);
            startGame();
          }}
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

export default SimonSays;