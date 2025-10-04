import React from 'react';

const GameIcon = ({ type, className = "w-16 h-16" }) => {
  const icons = {
    memoria: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="35" r="25" fill="#FF6B6B" stroke="#fff" strokeWidth="3"/>
        <path d="M30 60 Q50 45 70 60 Q50 75 30 60" fill="#4ECDC4" stroke="#fff" strokeWidth="2"/>
        <circle cx="42" cy="30" r="3" fill="#fff"/>
        <circle cx="58" cy="30" r="3" fill="#fff"/>
      </svg>
    ),
    secuencia: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <rect x="15" y="25" width="20" height="20" rx="5" fill="#FF6B6B" stroke="#fff" strokeWidth="2"/>
        <rect x="40" y="25" width="20" height="20" rx="5" fill="#4ECDC4" stroke="#fff" strokeWidth="2"/>
        <rect x="65" y="25" width="20" height="20" rx="5" fill="#FFE66D" stroke="#fff" strokeWidth="2"/>
        <text x="25" y="40" fill="#fff" fontSize="12" textAnchor="middle">1</text>
        <text x="50" y="40" fill="#fff" fontSize="12" textAnchor="middle">2</text>
        <text x="75" y="40" fill="#fff" fontSize="12" textAnchor="middle">3</text>
        <path d="M35 35 L40 35" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <path d="M60 35 L65 35" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)"/>
      </svg>
    ),
    parejas: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="35" fill="#FF6B6B" stroke="#fff" strokeWidth="3"/>
        <circle cx="50" cy="50" r="25" fill="#FFE66D" stroke="#fff" strokeWidth="2"/>
        <circle cx="50" cy="50" r="15" fill="#4ECDC4" stroke="#fff" strokeWidth="2"/>
        <circle cx="50" cy="50" r="5" fill="#fff"/>
        <path d="M20 20 L30 30 M80 20 L70 30 M20 80 L30 70 M80 80 L70 70" stroke="#95E1D3" strokeWidth="3"/>
      </svg>
    ),
    puzzle: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <path d="M20 20 L45 20 Q50 15 55 20 L80 20 L80 45 Q85 50 80 55 L80 80 L55 80 Q50 85 45 80 L20 80 Z" 
              fill="#4ECDC4" stroke="#fff" strokeWidth="2"/>
        <path d="M45 20 L45 45 Q40 50 45 55 L45 80" stroke="#fff" strokeWidth="2"/>
        <path d="M20 45 Q15 50 20 55 L80 55" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    laberinto: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <rect x="15" y="15" width="70" height="70" fill="none" stroke="#fff" strokeWidth="3"/>
        <path d="M15 25 L35 25 L35 45 L55 45 L55 25 L75 25 L75 65 L55 65 L55 75 L85 75" 
              stroke="#4ECDC4" strokeWidth="3" fill="none"/>
        <circle cx="20" cy="20" r="3" fill="#FF6B6B"/>
        <circle cx="80" cy="80" r="3" fill="#FFE66D"/>
      </svg>
    ),
    suma: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <circle cx="30" cy="35" r="12" fill="#FF6B6B" stroke="#fff" strokeWidth="2"/>
        <circle cx="70" cy="35" r="12" fill="#4ECDC4" stroke="#fff" strokeWidth="2"/>
        <text x="30" y="40" fill="#fff" fontSize="10" textAnchor="middle">5</text>
        <text x="70" y="40" fill="#fff" fontSize="10" textAnchor="middle">3</text>
        <text x="50" y="40" fill="#fff" fontSize="16" textAnchor="middle">+</text>
        <text x="50" y="65" fill="#fff" fontSize="14" textAnchor="middle">=</text>
        <circle cx="50" cy="75" r="12" fill="#FFE66D" stroke="#fff" strokeWidth="2"/>
        <text x="50" y="80" fill="#333" fontSize="10" textAnchor="middle">8</text>
      </svg>
    ),
    simon: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="35" fill="#333" stroke="#fff" strokeWidth="3"/>
        <path d="M50 15 A35 35 0 0 1 85 50 L50 50 Z" fill="#FF6B6B"/>
        <path d="M85 50 A35 35 0 0 1 50 85 L50 50 Z" fill="#4ECDC4"/>
        <path d="M50 85 A35 35 0 0 1 15 50 L50 50 Z" fill="#FFE66D"/>
        <path d="M15 50 A35 35 0 0 1 50 15 L50 50 Z" fill="#95E1D3"/>
        <circle cx="50" cy="50" r="8" fill="#333"/>
      </svg>
    ),
    rompecodigos: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <rect x="25" y="35" width="50" height="40" rx="5" fill="#4ECDC4" stroke="#fff" strokeWidth="2"/>
        <rect x="40" y="20" width="20" height="20" rx="3" fill="none" stroke="#fff" strokeWidth="2"/>
        <circle cx="35" cy="50" r="3" fill="#fff"/>
        <circle cx="50" cy="50" r="3" fill="#fff"/>
        <circle cx="65" cy="50" r="3" fill="#fff"/>
        <rect x="30" y="60" width="40" height="3" fill="#FFE66D"/>
      </svg>
    ),
    color: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <circle cx="35" cy="35" r="15" fill="#FF6B6B" stroke="#fff" strokeWidth="2"/>
        <circle cx="65" cy="35" r="15" fill="#4ECDC4" stroke="#fff" strokeWidth="2"/>
        <circle cx="35" cy="65" r="15" fill="#FFE66D" stroke="#fff" strokeWidth="2"/>
        <circle cx="65" cy="65" r="15" fill="#95E1D3" stroke="#fff" strokeWidth="2"/>
        <circle cx="50" cy="50" r="8" fill="#fff" stroke="#333" strokeWidth="2"/>
      </svg>
    ),
    patron: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="30" r="20" fill="#4ECDC4" stroke="#fff" strokeWidth="2"/>
        <circle cx="45" cy="25" r="3" fill="#fff"/>
        <circle cx="55" cy="25" r="3" fill="#fff"/>
        <path d="M40 35 Q50 40 60 35" stroke="#fff" strokeWidth="2" fill="none"/>
        <rect x="30" y="55" width="40" height="25" rx="5" fill="#FF6B6B" stroke="#fff" strokeWidth="2"/>
        <circle cx="40" cy="65" r="2" fill="#fff"/>
        <circle cx="50" cy="65" r="2" fill="#fff"/>
        <circle cx="60" cy="65" r="2" fill="#fff"/>
      </svg>
    ),
    orden: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <rect x="15" y="30" width="15" height="40" fill="#FF6B6B" stroke="#fff" strokeWidth="2"/>
        <rect x="35" y="20" width="15" height="50" fill="#4ECDC4" stroke="#fff" strokeWidth="2"/>
        <rect x="55" y="40" width="15" height="30" fill="#FFE66D" stroke="#fff" strokeWidth="2"/>
        <rect x="75" y="25" width="15" height="45" fill="#95E1D3" stroke="#fff" strokeWidth="2"/>
        <path d="M25 75 L85 75" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    reto: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <polygon points="50,15 65,35 85,35 70,50 75,70 50,60 25,70 30,50 15,35 35,35" 
                 fill="#FFE66D" stroke="#fff" strokeWidth="2"/>
        <circle cx="50" cy="45" r="15" fill="#FF6B6B" stroke="#fff" strokeWidth="2"/>
        <path d="M45 40 L45 50 L55 45 Z" fill="#fff"/>
      </svg>
    )
  };

  return icons[type] || icons.memoria;
};

export default GameIcon;