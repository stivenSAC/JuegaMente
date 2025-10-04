import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from '../components/Modal';

const SecuenciaNumerica = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('info');
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const savedScore = localStorage.getItem("bestScore_secuencia");
    if (savedScore) setBestScore(Number(savedScore));
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore_secuencia", score);
    }
  }, [score, bestScore]);

  const generateSequence = (level) => {
    const newSequence = [];
    for (let i = 0; i < level + 2; i++) {
      newSequence.push(Math.floor(Math.random() * 9) + 1);
    }
    return newSequence;
  };

  const startGame = () => {
    const newSequence = generateSequence(currentLevel);
    setSequence(newSequence);
    setUserSequence([]);
    setIsPlaying(true);
    showSequence(newSequence);
  };

  const showSequence = (seq) => {
    setShowingSequence(true);
    setTimeout(() => setShowingSequence(false), seq.length * 800 + 1000);
  };

  const handleNumberClick = (number) => {
    if (!isPlaying || showingSequence) return;
    
    const newUserSequence = [...userSequence, number];
    setUserSequence(newUserSequence);

    if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      setIsPlaying(false);
      setModalType('error');
      setModalMessage(`¡Secuencia incorrecta! La secuencia era: ${sequence.join(' - ')}`);
      setShowModal(true);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      setScore(score + currentLevel * 10);
      setCurrentLevel(currentLevel + 1);
      setTimeout(() => startGame(), 1000);
    }
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-4">🔢 Secuencia Numérica</h1>
      <p className="text-white/80 mb-6">Recuerda la secuencia correcta</p>

      {showingSequence && (
        <div className="mb-6">
          <p className="text-lg mb-4">Memoriza esta secuencia:</p>
          <div className="flex gap-2">
            {sequence.map((num, index) => (
              <motion.div
                key={index}
                className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center text-black font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.8 }}
              >
                {num}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {isPlaying && !showingSequence && (
        <div className="mb-6">
          <p className="text-lg mb-4">Repite la secuencia:</p>
          <div className="mb-4">
            <p className="text-sm text-yellow-300 mb-2">Tu secuencia:</p>
            <div className="flex gap-2 justify-center">
              {userSequence.map((num, index) => (
                <div key={index} className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-sm font-bold">
                  {num}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3,4,5,6,7,8,9].map(num => (
              <motion.button
                key={num}
                onClick={() => handleNumberClick(num)}
                className="w-16 h-16 bg-white/20 backdrop-blur rounded-lg text-2xl font-bold hover:bg-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {num}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-lg">Nivel: {currentLevel}</p>
        <p className="text-lg">Puntaje actual: {score}</p>
        <p className="text-sm text-yellow-300">Mejor puntaje: {bestScore}</p>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => {
            setScore(0);
            setCurrentLevel(1);
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
        title={modalType === 'error' ? '¡Fallaste!' : '¡Bien hecho!'}
        message={modalMessage}
        type={modalType}
      />
    </motion.section>
  );
};

export default SecuenciaNumerica;