import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from '../components/Modal';

const ReaccionRapida = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTarget, setShowTarget] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [reactionTime, setReactionTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [round, setRound] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('info');
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const savedScore = localStorage.getItem("bestScore_reaccion");
    if (savedScore) setBestScore(Number(savedScore));
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore_reaccion", score);
    }
  }, [score, bestScore]);

  const startGame = () => {
    setScore(0);
    setRound(0);
    setIsPlaying(true);
    nextRound();
  };

  const nextRound = () => {
    setShowTarget(false);
    const delay = Math.random() * 3000 + 1000; // 1-4 segundos
    
    setTimeout(() => {
      const x = Math.random() * 300 + 20;
      const y = Math.random() * 200 + 20;
      setTargetPosition({ x, y });
      setShowTarget(true);
      setStartTime(Date.now());
    }, delay);
  };

  const handleTargetClick = () => {
    if (!showTarget) return;
    
    const endTime = Date.now();
    const reaction = endTime - startTime;
    setReactionTime(reaction);
    setShowTarget(false);
    
    let points = Math.max(1000 - reaction, 100);
    setScore(score + Math.round(points));
    setRound(round + 1);
    
    if (round >= 9) {
      setIsPlaying(false);
      setModalType('success');
      setModalMessage(`¡Juego completado! Tiempo promedio: ${Math.round(score/10)}ms`);
      setShowModal(true);
    } else {
      setTimeout(nextRound, 1000);
    }
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-4">⚡ Reacción Rápida</h1>
      <p className="text-white/80 mb-6">Haz clic en el círculo tan rápido como puedas</p>

      {isPlaying && (
        <div className="relative w-96 h-80 bg-black/40 rounded-xl mb-6 border-2 border-white/20">
          <p className="absolute top-4 left-4 text-sm">Ronda: {round + 1}/10</p>
          {reactionTime > 0 && (
            <p className="absolute top-4 right-4 text-sm text-yellow-300">
              {reactionTime}ms
            </p>
          )}
          
          {showTarget && (
            <motion.div
              className="absolute w-16 h-16 bg-red-500 rounded-full cursor-pointer hover:bg-red-400 border-2 border-white z-10"
              style={{ 
                left: Math.max(10, Math.min(targetPosition.x, 320)), 
                top: Math.max(10, Math.min(targetPosition.y, 250))
              }}
              onClick={handleTargetClick}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            />
          )}
          
          {!showTarget && isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-yellow-300">Espera el círculo rojo...</p>
            </div>
          )}
        </div>
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

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'success' ? '¡Completado!' : 'Información'}
        message={modalMessage}
        type={modalType}
      />
    </motion.section>
  );
};

export default ReaccionRapida;