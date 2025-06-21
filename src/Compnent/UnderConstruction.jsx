import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import logoImg from "../../assets/logo/white.png";

const UnderConstruction = () => {
  const [particles, setParticles] = useState([]);
  const [currentGlow, setCurrentGlow] = useState(0);

  const glowColors = ['from-cyan-400', 'from-purple-400', 'from-pink-400', 'from-emerald-400'];

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setCurrentGlow((prev) => (prev + 1) % glowColors.length);
    }, 3000);

    return () => clearInterval(colorInterval);
  }, []);

  useEffect(() => {
    const createParticle = () => {
      const newParticle = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        duration: Math.random() * 4 + 3
      };
      setParticles(prev => [...prev, newParticle]);
      
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, newParticle.duration * 1000);
    };

    const particleInterval = setInterval(createParticle, 500);
    return () => clearInterval(particleInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 border border-white/20 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute top-32 right-20 w-48 h-48 border border-white/30 rotate-12 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
        <div className="absolute bottom-20 left-32 w-32 h-32 border border-white/25 rotate-45 animate-spin" style={{animationDuration: '25s'}}></div>
        <div className="absolute bottom-40 right-10 w-56 h-56 border border-white/15 rotate-12 animate-spin" style={{animationDuration: '18s', animationDirection: 'reverse'}}></div>
      </div>

      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`
          }}
        >
          <div className="w-full h-full bg-white rounded-full"></div>
        </div>
      ))}

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          
          {/* Central glowing orb */}
          <div className="mb-12 relative">
            <div className={`w-40 h-40 mx-auto rounded-full bg-gradient-to-br ${glowColors[currentGlow]} to-transparent opacity-20 animate-pulse blur-xl`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-white/50 animate-spin">
                <div className="w-full h-full rounded-full border-2 border-transparent border-t-white animate-spin" style={{animationDirection: 'reverse', animationDuration: '0.8s'}}></div>
              </div>
            </div>
          </div>

          {/* Brand section */}
          <div className="mb-16">
            <h1 className="text-7xl md:text-9xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white tracking-wider">
              GainCards
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-white to-transparent mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
              PREMIUM CARD COLLECTION PLATFORM
            </p>
          </div>

          {/* Status indicator */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-gray-900/50 backdrop-blur-md rounded-full px-8 py-4 border border-gray-700/50">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse mr-4"></div>
              <span className="text-gray-300 font-medium tracking-wide">SYSTEM INITIALIZING</span>
            </div>
          </div>

    

          {/* Feature grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Link to="/pokemon" className="group">
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:bg-gray-800/40 hover:border-gray-700/70 transition-all duration-500 group-hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  Pokemon Card
                </h3>
               
              </div>
            </Link>

            <Link to="/pokemon" className="group">
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:bg-gray-800/40 hover:border-gray-700/70 transition-all duration-500 group-hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  Lightning Fast
                </h3>
               
              </div>
            </Link>

            <Link to="/pokemon" className="group">
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:bg-gray-800/40 hover:border-gray-700/70 transition-all duration-500 group-hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/30">
                  <span className="text-3xl">🌐</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  Global Network
                </h3>
               
              </div>
            </Link>
          </div>

          {/* Bottom section */}
       
        </div>
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default UnderConstruction;