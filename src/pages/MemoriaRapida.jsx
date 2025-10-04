import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from '../components/Modal';

const MemoriaRapida = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [level, setLevel] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('info');
  const [modalMessage, setModalMessage] = useState('');

  const getSymbolsForLevel = (level) => {
    const allSymbols = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎺', '🎆', '🎉', '🎈', '🎁'];
    return allSymbols.slice(0, Math.min(4 + level, 12));
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("bestScore_memoria");
    if (savedScore) setBestScore(Number(savedScore));
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore_memoria", score);
    }
  }, [score, bestScore]);

  const initGame = () => {
    const symbols = getSymbolsForLevel(level);
    const gameCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol, flipped: false }));
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setLevel(1);
    setIsPlaying(true);
  };

  const nextLevel = () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    const symbols = getSymbolsForLevel(newLevel);
    const gameCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol, flipped: false }));
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const handleCardClick = (cardId) => {
    if (!isPlaying || flippedCards.length === 2) return;
    
    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].symbol === cards[second].symbol) {
        setMatchedCards([...matchedCards, first, second]);
        setScore(score + 10);
        setFlippedCards([]);
        
        if (matchedCards.length + 2 === cards.length) {
          setModalType('success');
          setModalMessage(`¡Nivel ${level} completado! ¿Continuar al siguiente nivel?`);
          setShowModal(true);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-4">🧠 Memoria Rápida</h1>
      <p className="text-white/80 mb-6">Encuentra las parejas lo más rápido posible</p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`w-16 h-16 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center cursor-pointer text-2xl ${
              flippedCards.includes(index) || matchedCards.includes(index) ? 'bg-white/40' : ''
            }`}
            onClick={() => handleCardClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {flippedCards.includes(index) || matchedCards.includes(index) ? card.symbol : '?'}
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

export default MemoriaRapida;