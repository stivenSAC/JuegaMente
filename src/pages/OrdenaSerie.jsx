import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from '../components/Modal';

const OrdenaSerie = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [items, setItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('info');
  const [modalMessage, setModalMessage] = useState('');
  const [currentSeries, setCurrentSeries] = useState(null);

  const series = [
    { original: ['A', 'B', 'C', 'D'], hint: 'Orden alfabético' },
    { original: [1, 2, 3, 4], hint: 'Secuencia numérica' },
    { original: ['🍎', '🍌', '🍇', '🍊'], hint: 'Frutas por tamaño' },
    { original: ['Lun', 'Mar', 'Mié', 'Jue'], hint: 'Días de la semana' },
    { original: ['Ene', 'Feb', 'Mar', 'Abr'], hint: 'Meses del año' },
    { original: ['🐶', '🐱', '🐭', '🐹'], hint: 'Animales por tamaño' },
    { original: ['Do', 'Re', 'Mi', 'Fa'], hint: 'Notas musicales' },
    { original: ['♠️', '♥️', '♦️', '♣️'], hint: 'Palos de cartas' },
    { original: ['Norte', 'Sur', 'Este', 'Oeste'], hint: 'Puntos cardinales' },
    { original: ['🌅', '🌄', '🌇', '🌃'], hint: 'Momentos del día' },
    { original: ['🌸', '☀️', '🍂', '❄️'], hint: 'Estaciones del año' },
    { original: ['🥇', '🥈', '🥉', '4º'], hint: 'Posiciones en competencia' }
  ];

  useEffect(() => {
    const savedScore = localStorage.getItem("bestScore_orden");
    if (savedScore) setBestScore(Number(savedScore));
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore_orden", score);
    }
  }, [score, bestScore]);

  const [currentLevel, setCurrentLevel] = useState(1);

  const startGame = () => {
    setCurrentLevel(1);
    startLevel(1);
  };

  const startLevel = (levelNum) => {
    const seriesIndex = (levelNum - 1) % series.length;
    const selectedSeries = series[seriesIndex];
    setCurrentSeries(selectedSeries);
    const shuffled = [...selectedSeries.original].sort(() => Math.random() - 0.5);
    setItems(shuffled.map((item, index) => ({ id: index, content: item })));
    setIsPlaying(true);
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetItem) => {
    e.preventDefault();
    if (!draggedItem) return;

    const dragIndex = items.findIndex(item => item.id === draggedItem.id);
    const dropIndex = items.findIndex(item => item.id === targetItem.id);

    const newItems = [...items];
    [newItems[dragIndex], newItems[dropIndex]] = [newItems[dropIndex], newItems[dragIndex]];
    
    setItems(newItems);
    setDraggedItem(null);
    
    // Check if correct order
    const currentOrder = newItems.map(item => item.content).join('');
    const correctOrder = currentSeries.original.join('');
    
    if (currentOrder === correctOrder) {
      setScore(score + 50);
      if (currentLevel >= 12) {
        setIsPlaying(false);
        setModalType('success');
        setModalMessage('¡Has completado todos los 12 niveles!');
        setShowModal(true);
      } else {
        setCurrentLevel(currentLevel + 1);
        setModalType('success');
        setModalMessage(`¡Nivel ${currentLevel} completado! Continuando al nivel ${currentLevel + 1}`);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          startLevel(currentLevel + 1);
        }, 2000);
      }
    }
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-4">🔄 Ordena la Serie</h1>
      <p className="text-white/80 mb-4">Ordena los elementos correctamente</p>
      {currentSeries && (
        <div className="mb-6 text-center">
          <p className="text-sm text-yellow-300 mb-2">Nivel: {currentLevel}/12</p>
          <p className="text-lg text-blue-300 mb-2">Pista: {currentSeries.hint}</p>
          <p className="text-xs text-white/60">Arrastra los elementos para ordenarlos</p>
        </div>
      )}

      {isPlaying && (
        <div className="flex gap-4 mb-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item)}
              className="w-20 h-16 bg-black/40 backdrop-blur rounded-lg flex items-center justify-center text-sm font-bold cursor-move hover:bg-black/60 border-2 border-white/20"
              whileHover={{ scale: 1.05 }}
              whileDrag={{ scale: 1.1 }}
            >
              {item.content}
            </motion.div>
          ))}
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
        title={modalType === 'success' ? '¡Excelente!' : 'Información'}
        message={modalMessage}
        type={modalType}
      />
    </motion.section>
  );
};

export default OrdenaSerie;