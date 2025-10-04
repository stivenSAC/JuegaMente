import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center">
            <span className="text-white text-2xl font-bold font-fredoka">
              🧠 JuegaMente
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;