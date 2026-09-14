import React from 'react';
import { motion } from 'motion/react';

// Approximations of the requested shaders using CSS and SVG filters

export const Swirl = ({ colorA, colorB, detail }: any) => (
  <div 
    className="absolute inset-0 opacity-50"
    style={{
      background: `radial-gradient(circle at 50% 50%, ${colorA} 0%, ${colorB} 100%)`,
      filter: `blur(${detail * 10}px)`
    }}
  />
);

export const ChromaFlow = ({ baseColor, downColor, leftColor, rightColor, upColor, momentum, radius }: any) => (
  <motion.div 
    className="absolute inset-0 opacity-30"
    animate={{ 
      background: [
        `radial-gradient(circle at 0% 0%, ${upColor} 0%, transparent 50%), radial-gradient(circle at 100% 100%, ${downColor} 0%, transparent 50%)`,
        `radial-gradient(circle at 100% 0%, ${rightColor} 0%, transparent 50%), radial-gradient(circle at 0% 100%, ${leftColor} 0%, transparent 50%)`,
        `radial-gradient(circle at 0% 0%, ${upColor} 0%, transparent 50%), radial-gradient(circle at 100% 100%, ${downColor} 0%, transparent 50%)`
      ]
    }}
    transition={{ duration: momentum, repeat: Infinity, ease: "linear" }}
    style={{ backgroundColor: baseColor }}
  />
);

export const FlutedGlass = ({ aberration, angle, frequency, highlight, refraction, softness }: any) => (
  <div className="absolute inset-0 backdrop-blur-[40px] bg-white/10" style={{ transform: `rotate(${angle}deg)` }}>
    <svg className="absolute w-0 h-0">
      <filter id="fluted">
        <feTurbulence type="fractalNoise" baseFrequency={`${frequency} 0.01`} numOctaves="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale={refraction * 10} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
    <div className="absolute inset-0" style={{ filter: 'url(#fluted)', opacity: highlight + softness }} />
  </div>
);

export const FilmGrain = ({ strength }: any) => (
  <div 
    className="absolute inset-0 pointer-events-none mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='${strength}'/%3E%3C/svg%3E")`
    }}
  />
);
