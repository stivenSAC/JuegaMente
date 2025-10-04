import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from '../components/Modal';

const LaberintoExpres = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [moves, setMoves] = useState(0);
  const [level, setLevel] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('info');
  const [modalMessage, setModalMessage] = useState('');
  const [currentMaze, setCurrentMaze] = useState([]);

  const mazes = [
    [[0,0,0,0,0,0,0,0,0,0],[0,1,1,1,0,1,1,1,0,0],[0,0,0,1,0,0,0,1,0,0],[0,1,0,0,0,1,0,0,0,0],[0,1,0,1,1,1,0,1,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,1,1,0,1,1,1,0,1],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,1,1,0,1,1,0],[0,0,0,0,0,0,0,0,0,2]],
    [[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,1,0,1,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,1,0,1,0,1,1],[0,0,0,0,0,0,0,0,0,0],[0,1,1,0,1,1,0,1,1,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,2]],
    [[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,1,0,1,1,0,1,1,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,1,0,1,1,0,1,0,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,0,2]],
    [[0,0,0,0,0,0,0,0,0,0],[0,1,1,0,1,1,0,1,1,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,1,0,1,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,1,0,1,0,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,2]],
    [[0,0,0,0,0,0,0,0,0,0],[1,0,1,1,0,1,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,1,0,1,0,1,1],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,1,0,1,0,0],[0,0,0,0,0,0,0,0,0,0],[0,1,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[1,0,0,1,0,1,0,1,0,2]],
    [[0,0,0,0,0,0,0,0,0,0],[0,1,1,1,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,1,1,0,1,0,1],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,2]],
    [[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,2]],
    [[0,0,0,0,0,0,0,0,0,0],[0,1,1,0,1,1,0,1,1,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,1,0,1,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,2]],
    [[0,0,0,0,0,0,0,0,0,0],[1,0,1,1,0,1,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,1],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,1,1,0,1,0,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,2]],
    [[0,0,0,0,0,0,0,0,0,0],[0,1,1,0,1,1,0,1,0,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,1],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,1,1,0,1,1,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,2]],
    [[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,2]],
    [[0,0,0,0,0,0,0,0,0,0],[0,1,1,1,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1],[0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,2]]
  ];

  useEffect(() => {
    const savedScore = localStorage.getItem("bestScore_laberinto");
    if (savedScore) setBestScore(Number(savedScore));
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore_laberinto", score);
    }
  }, [score, bestScore]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlaying) return;
      
      let newX = playerPos.x;
      let newY = playerPos.y;
      
      switch(e.key.toLowerCase()) {
        case 'w':
        case 'arrowup': newY = Math.max(0, newY - 1); break;
        case 's':
        case 'arrowdown': newY = Math.min(9, newY + 1); break;
        case 'a':
        case 'arrowleft': newX = Math.max(0, newX - 1); break;
        case 'd':
        case 'arrowright': newX = Math.min(9, newX + 1); break;
        default: return;
      }
      
      if (currentMaze[newY][newX] !== 1) {
        setPlayerPos({ x: newX, y: newY });
        setMoves(moves + 1);
        
        if (currentMaze[newY][newX] === 2) {
          setScore(score + Math.max(100 - moves, 10));
          setModalType('success');
          setModalMessage(`¡Nivel ${level} completado! ¿Continuar al siguiente nivel?`);
          setShowModal(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, playerPos, moves]);

  const startGame = () => {
    setPlayerPos({ x: 0, y: 0 });
    setMoves(0);
    setScore(0);
    setLevel(1);
    setCurrentMaze(mazes[0]);
    setIsPlaying(true);
  };

  const nextLevel = () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    setPlayerPos({ x: 0, y: 0 });
    setMoves(0);
    setCurrentMaze(mazes[(newLevel - 1) % mazes.length]);
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-4">🌀 Laberinto Exprés</h1>
      <p className="text-white/80 mb-6">Llega a la meta evitando obstáculos</p>
      <p className="text-sm text-yellow-300 mb-4">Usa WASD o las flechas del teclado</p>

      <div className="grid grid-cols-10 gap-1 mb-6 bg-black/40 p-2 rounded-xl max-w-2xl">
        {currentMaze.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`w-6 h-6 flex items-center justify-center text-xs ${
                cell === 1 ? 'bg-gray-800' : 
                cell === 2 ? 'bg-yellow-400' : 'bg-white/20'
              } ${playerPos.x === x && playerPos.y === y ? 'bg-green-500' : ''}`}
            >
              {playerPos.x === x && playerPos.y === y ? '🔴' : 
               cell === 2 ? '🎯' : 
               cell === 1 ? '⬛' : ''}
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-lg">Nivel: {level}</p>
        <p className="text-lg">Movimientos: {moves}</p>
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
        title={modalType === 'success' ? '¡Nivel Completado!' : 'Información'}
        message={modalMessage}
        type={modalType}
        onConfirm={modalType === 'success' ? () => { setShowModal(false); nextLevel(); } : null}
      />
    </motion.section>
  );
};

export default LaberintoExpres;