import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RetoRelampago = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(45);
  const [questionTime, setQuestionTime] = useState(5);

  const questions = [
    { q: "¿Cuánto es 7 + 8?", options: ["14", "15", "16", "17"], correct: 1 },
    { q: "¿Capital de Francia?", options: ["Londres", "París", "Madrid", "Roma"], correct: 1 },
    { q: "¿Cuánto es 12 × 3?", options: ["35", "36", "37", "38"], correct: 1 },
    { q: "¿Planeta más cercano al Sol?", options: ["Venus", "Mercurio", "Tierra", "Marte"], correct: 1 },
    { q: "¿Cuánto es 100 ÷ 4?", options: ["20", "25", "30", "35"], correct: 1 },
    { q: "¿Océano más grande?", options: ["Atlántico", "Pacífico", "Índico", "Ártico"], correct: 1 },
    { q: "¿Cuánto es 15 - 7?", options: ["6", "7", "8", "9"], correct: 2 },
    { q: "¿Continente más grande?", options: ["África", "Asia", "América", "Europa"], correct: 1 },
    { q: "¿Cuánto es 9 × 7?", options: ["56", "63", "72", "81"], correct: 1 },
    { q: "¿Capital de España?", options: ["Barcelona", "Madrid", "Sevilla", "Valencia"], correct: 1 },
    { q: "¿Cuánto es 144 ÷ 12?", options: ["10", "11", "12", "13"], correct: 2 },
    { q: "¿País más grande del mundo?", options: ["China", "Rusia", "Canadá", "EE.UU."], correct: 1 },
    { q: "¿Cuánto es 25 + 37?", options: ["60", "61", "62", "63"], correct: 2 },
    { q: "¿Río más largo del mundo?", options: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"], correct: 1 },
    { q: "¿Cuánto es 8²?", options: ["56", "64", "72", "81"], correct: 1 },
    { q: "¿Montaña más alta?", options: ["K2", "Everest", "Kilimanjaro", "Aconcagua"], correct: 1 },
    { q: "¿Cuánto es 50% de 80?", options: ["30", "35", "40", "45"], correct: 2 },
    { q: "¿Inventor de la bombilla?", options: ["Tesla", "Edison", "Bell", "Einstein"], correct: 1 },
    { q: "¿Cuánto es 13 + 29?", options: ["40", "41", "42", "43"], correct: 2 },
    { q: "¿Planeta conocido como 'planeta rojo'?", options: ["Venus", "Marte", "Júpiter", "Saturno"], correct: 1 },
    { q: "¿Cuánto es 6 × 9?", options: ["52", "54", "56", "58"], correct: 1 },
    { q: "¿Capital de Italia?", options: ["Milán", "Roma", "Nápoles", "Venecia"], correct: 1 },
    { q: "¿Cuánto es 81 ÷ 9?", options: ["8", "9", "10", "11"], correct: 1 },
    { q: "¿Animal más rápido del mundo?", options: ["León", "Guepardo", "Caballo", "Águila"], correct: 1 },
    { q: "¿Cuánto es 45 - 18?", options: ["25", "26", "27", "28"], correct: 2 },
    { q: "¿Elemento químico del agua?", options: ["H2O", "CO2", "O2", "NaCl"], correct: 0 },
    { q: "¿Cuánto es 11 × 11?", options: ["111", "121", "131", "141"], correct: 1 },
    { q: "¿Autor de 'Don Quijote'?", options: ["Lope", "Cervantes", "Quevedo", "Góngora"], correct: 1 },
    { q: "¿Cuánto es 200 ÷ 8?", options: ["20", "25", "30", "35"], correct: 1 },
    { q: "¿Hueso más largo del cuerpo?", options: ["Húmero", "Fémur", "Tibia", "Radio"], correct: 1 },
    { q: "¿Cuánto es 16 + 25?", options: ["39", "40", "41", "42"], correct: 2 },
    { q: "¿Capital de Alemania?", options: ["Múnich", "Berlín", "Hamburgo", "Colonia"], correct: 1 },
    { q: "¿Cuánto es 7 × 8?", options: ["54", "56", "58", "60"], correct: 1 },
    { q: "¿Gas más abundante en la atmósfera?", options: ["Oxígeno", "Nitrógeno", "Argón", "CO2"], correct: 1 },
    { q: "¿Cuánto es 90 ÷ 6?", options: ["14", "15", "16", "17"], correct: 1 },
    { q: "¿País con más población?", options: ["India", "China", "EE.UU.", "Indonesia"], correct: 1 },
    { q: "¿Cuánto es 33 - 17?", options: ["14", "15", "16", "17"], correct: 2 },
    { q: "¿Inventor del teléfono?", options: ["Edison", "Bell", "Tesla", "Marconi"], correct: 1 },
    { q: "¿Cuánto es 5³?", options: ["100", "115", "125", "135"], correct: 2 },
    { q: "¿Deporte olímpico de verano?", options: ["Esqui", "Natación", "Hockey hielo", "Curling"], correct: 1 },
    { q: "¿Cuánto es 72 ÷ 8?", options: ["8", "9", "10", "11"], correct: 1 },
    { q: "¿Vitamina del sol?", options: ["A", "B", "C", "D"], correct: 3 },
    { q: "¿Cuánto es 19 + 23?", options: ["40", "41", "42", "43"], correct: 2 },
    { q: "¿Planeta con anillos?", options: ["Júpiter", "Saturno", "Urano", "Neptuno"], correct: 1 },
    { q: "¿Cuánto es 14 × 4?", options: ["52", "54", "56", "58"], correct: 2 },
    { q: "¿Capital de Japón?", options: ["Osaka", "Tokio", "Kioto", "Hiroshima"], correct: 1 },
    { q: "¿Cuánto es 85 - 29?", options: ["54", "55", "56", "57"], correct: 2 },
    { q: "¿Metal más abundante en la Tierra?", options: ["Hierro", "Aluminio", "Cobre", "Oro"], correct: 1 },
    { q: "¿Cuánto es 13 × 6?", options: ["76", "78", "80", "82"], correct: 1 },
    { q: "¿Continentes que existen?", options: ["5", "6", "7", "8"], correct: 2 }
  ];

  useEffect(() => {
    const savedScore = localStorage.getItem("bestScore_reto");
    if (savedScore) setBestScore(Number(savedScore));
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore_reto", score);
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

  useEffect(() => {
    let questionTimer;
    if (isPlaying && questionTime > 0 && currentQuestion) {
      questionTimer = setTimeout(() => setQuestionTime(questionTime - 1), 1000);
    } else if (questionTime === 0) {
      generateQuestion();
    }
    return () => clearTimeout(questionTimer);
  }, [isPlaying, questionTime, currentQuestion, generateQuestion]);

  const generateQuestion = useCallback(() => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
    setQuestionTime(5);
  }, [questions]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(45);
    setIsPlaying(true);
    generateQuestion();
  };

  const handleAnswer = (selectedIndex) => {
    if (!isPlaying) return;
    
    if (selectedIndex === currentQuestion.correct) {
      setScore(score + 10);
    } else {
      setScore(Math.max(0, score - 3));
    }
    generateQuestion();
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-4">⚡ Reto Relámpago</h1>
      <p className="text-white/80 mb-6">Responde preguntas rápidas de lógica</p>

      {isPlaying && currentQuestion && (
        <>
          <div className="mb-6 text-center">
            <p className="text-lg mb-2">Tiempo total: {timeLeft}s</p>
            <p className="text-sm text-yellow-300 mb-4">Tiempo pregunta: {questionTime}s</p>
            <div className="bg-white/20 backdrop-blur rounded-xl p-6 mb-6 max-w-md">
              <h3 className="text-xl font-bold mb-4">{currentQuestion.q}</h3>
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-lg font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
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

export default RetoRelampago;