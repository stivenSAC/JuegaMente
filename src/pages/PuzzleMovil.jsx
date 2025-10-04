import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from '../components/Modal';

const PuzzleMovil = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [level, setLevel] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('info');
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const savedScore = localStorage.getItem("bestScore_puzzle");
    if (savedScore) setBestScore(Number(savedScore));
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore_puzzle", score);
    }
  }, [score, bestScore]);

  const initGame = () => {
    const initialTiles = [1,2,3,4,5,6,7,8,0];
    const shuffled = [...initialTiles].sort(() => Math.random() - 0.5);
    setTiles(shuffled);
    setScore(0);
    setLevel(1);
    setIsPlaying(true);
  };

  const nextLevel = () => {
    const initialTiles = [1,2,3,4,5,6,7,8,0];
    const shuffled = [...initialTiles].sort(() => Math.random() - 0.5);
    setTiles(shuffled);
    setLevel(level + 1);
    setScore(score + 100);
  };

  const moveTile = (index) => {
    if (!isPlaying) return;
    
    const emptyIndex = tiles.indexOf(0);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 3, emptyIndex + 3];
    
    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setScore(score + 1);
      
      if (newTiles.join('') === '123456780') {
        setModalType('success');
        setModalMessage(`¡Nivel ${level} completado! ¿Continuar al siguiente nivel?`);
        setShowModal(true);
      }
    }
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-4">🧩 Puzzle Móvil</h1>
      <p className="text-white/80 mb-4">Ordena las piezas correctamente</p>
      <div className="mb-6 text-center">
        <p className="text-sm text-yellow-300 mb-2">Objetivo: Ordenar del 1 al 8</p>
        <div className="grid grid-cols-3 gap-1 bg-green-500/20 p-2 rounded-lg inline-block">
          {[1,2,3,4,5,6,7,8,''].map((num, i) => (
            <div key={i} className="w-6 h-6 bg-green-500/40 rounded text-xs flex items-center justify-center">
              {num}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6 bg-white/20 p-4 rounded-xl">
        {tiles.map((tile, index) => (
          <motion.div
            key={index}
            onClick={() => moveTile(index)}
            className={`w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-lg cursor-pointer ${
              tile === 0 ? 'bg-transparent' : 'bg-white/30 hover:bg-white/40'
            }`}
            whileHover={tile !== 0 ? { scale: 1.05 } : {}}
            whileTap={tile !== 0 ? { scale: 0.95 } : {}}
          >
            {tile !== 0 && tile}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-lg">Nivel: {level}</p>
        <p className="text-lg">Movimientos: {score}</p>
        <p className="text-sm text-yellow-300">Mejor puntaje: {bestScore}</p>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={initGame}
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

export default PuzzleMovil;