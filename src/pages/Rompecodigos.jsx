import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from '../components/Modal';

const Rompecodigos = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [secretCode, setSecretCode] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(6);
  const [level, setLevel] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('info');
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const savedScore = localStorage.getItem("bestScore_rompecodigos");
    if (savedScore) setBestScore(Number(savedScore));
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore_rompecodigos", score);
    }
  }, [score, bestScore]);

  const startGame = () => {
    const codeLength = Math.min(3 + level, 6);
    const newCode = Array.from({length: codeLength}, () => Math.floor(Math.random() * 6) + 1);
    setSecretCode(newCode);
    setCurrentGuess([]);
    setAttempts([]);
    setAttemptsLeft(6);
    setScore(0);
    setLevel(1);
    setIsPlaying(true);
  };

  const nextLevel = () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    const codeLength = Math.min(3 + newLevel, 6);
    const newCode = Array.from({length: codeLength}, () => Math.floor(Math.random() * 6) + 1);
    setSecretCode(newCode);
    setCurrentGuess([]);
    setAttempts([]);
    setAttemptsLeft(6);
  };

  const addToGuess = (number) => {
    if (currentGuess.length < secretCode.length) {
      setCurrentGuess([...currentGuess, number]);
    }
  };

  const submitGuess = () => {
    if (currentGuess.length !== secretCode.length) return;
    
    const feedback = currentGuess.map((guess, index) => {
      if (guess === secretCode[index]) return 'correct';
      if (secretCode.includes(guess)) return 'partial';
      return 'wrong';
    });
    
    setAttempts([...attempts, { guess: [...currentGuess], feedback }]);
    
    if (currentGuess.join('') === secretCode.join('')) {
      setScore(score + attemptsLeft * 20);
      setModalType('success');
      setModalMessage(`¡Nivel ${level} completado! ¿Continuar al siguiente nivel?`);
      setShowModal(true);
    } else if (attemptsLeft === 1) {
      setIsPlaying(false);
      setModalType('error');
      setModalMessage(`¡Fallaste! El código era: ${secretCode.join('')}`);
      setShowModal(true);
    } else {
      setAttemptsLeft(attemptsLeft - 1);
    }
    
    setCurrentGuess([]);
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-4">🔐 Rompecódigos</h1>
      <p className="text-white/80 mb-6">Adivina la combinación secreta</p>

      {isPlaying && (
        <>
          <div className="mb-6">
            <p className="text-lg mb-4">Intentos restantes: {attemptsLeft}</p>
            
            <div className="mb-4">
              <p className="mb-2">Tu intento actual:</p>
              <div className="flex gap-2">
                {Array.from({length: secretCode.length}, (_, i) => (
                  <div key={i} className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-xl font-bold">
                    {currentGuess[i] || '?'}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[1,2,3,4,5,6].map(num => (
                <motion.button
                  key={num}
                  onClick={() => addToGuess(num)}
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-lg font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {num}
                </motion.button>
              ))}
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={submitGuess}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold"
              >
                Enviar
              </button>
              <button
                onClick={() => setCurrentGuess([])}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold"
              >
                Limpiar
              </button>
            </div>

            <div className="space-y-2">
              {attempts.map((attempt, index) => (
                <div key={index} className="flex gap-2">
                  {attempt.guess.map((num, i) => (
                    <div key={i} className={`w-8 h-8 rounded flex items-center justify-center text-sm font-bold ${
                      attempt.feedback[i] === 'correct' ? 'bg-green-500' :
                      attempt.feedback[i] === 'partial' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {num}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

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
        title={modalType === 'success' ? '¡Nivel Completado!' : '¡Fallaste!'}
        message={modalMessage}
        type={modalType}
        onConfirm={modalType === 'success' ? () => { setShowModal(false); nextLevel(); } : null}
      />
    </motion.section>
  );
};

export default Rompecodigos;