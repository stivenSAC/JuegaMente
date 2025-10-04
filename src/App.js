import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import MemoriaRapida from './pages/MemoriaRapida';
import SecuenciaNumerica from './pages/SecuenciaNumerica';
import ReaccionRapida from './pages/ReaccionRapida';
import PuzzleMovil from './pages/PuzzleMovil';
import LaberintoExpres from './pages/LaberintoExpres';
import SumaCorrecta from './pages/SumaCorrecta';
import SimonSays from './pages/SimonSays';
import Rompecodigos from './pages/Rompecodigos';
import ColorMatch from './pages/ColorMatch';
import PatronVisual from './pages/PatronVisual';
import OrdenaSerie from './pages/OrdenaSerie';
import RetoRelampago from './pages/RetoRelampago';
import GamePlaceholder from './components/games/GamePlaceholder';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memoria" element={<MemoriaRapida />} />
          <Route path="/secuencia" element={<SecuenciaNumerica />} />
          <Route path="/parejas" element={<ReaccionRapida />} />
          <Route path="/puzzle" element={<PuzzleMovil />} />
          <Route path="/laberinto" element={<LaberintoExpres />} />
          <Route path="/suma" element={<SumaCorrecta />} />
          <Route path="/simon" element={<SimonSays />} />
          <Route path="/rompecodigos" element={<Rompecodigos />} />
          <Route path="/color" element={<ColorMatch />} />
          <Route path="/patron" element={<PatronVisual />} />
          <Route path="/orden" element={<OrdenaSerie />} />
          <Route path="/reto" element={<RetoRelampago />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;