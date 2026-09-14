const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix React imports
if (!code.includes('useEffect')) {
  code = code.replace("import { useState } from 'react';", "import { useState, useEffect } from 'react';");
}
// 2. Fix lucide-react imports
if (!code.includes('Menu,')) {
  code = code.replace("RefreshCcw\n} from 'lucide-react';", "RefreshCcw,\n  Menu,\n  X\n} from 'lucide-react';");
}

// 3. Add shaders import
if (!code.includes('import { Swirl')) {
  const importLines = code.split('\n');
  const lastImportIndex = importLines.findIndex(line => line.includes("from 'lucide-react';"));
  importLines.splice(lastImportIndex + 1, 0, "import { Swirl, ChromaFlow, FlutedGlass, FilmGrain } from './components/shaders';");
  code = importLines.join('\n');
}

// 4. Add Helper components
const helpers = `
const HoverTextRoll = ({ text }: { text: string }) => (
  <div className="flex flex-col h-[20px] overflow-hidden relative">
    <div className="group-hover:-translate-y-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex flex-col">
      <span className="h-[20px] leading-[20px]">{text}</span>
      <span className="h-[20px] leading-[20px]">{text}</span>
    </div>
  </div>
);

const LondonClock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
      });
      setTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return <span>{time} in London</span>;
};
`;

if (!code.includes('HoverTextRoll')) {
  code = code.replace('export default function App() {', helpers + '\nexport default function App() {');
}

// 5. Add mobile menu state
if (!code.includes('isMobileMenuOpen')) {
  code = code.replace('const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);', 
    'const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);');
}

// 6. Replace Hero
const heroStart = code.indexOf('{/* 1. Первый экран (Hero Section) */}');
const heroEnd = code.indexOf('{/* 2. Блок "Математика конверсии" */}');

const newHero = `{/* 1. Первый экран (Hero Section) */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#EFEFEF] font-sans">
        
        {/* Shaders Background */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
          <ChromaFlow baseColor="#ffffff" downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={13} radius={3.5} />
          <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
          <FilmGrain strength={0.05} />
        </div>

        {/* Navigation */}
        <nav className="relative z-20 w-full max-w-[1440px] mx-auto p-2 sm:p-3">
          <div className="bg-white rounded-full p-[5px] flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-6 pl-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white text-[10px] leading-[11px] font-bold tracking-tight">AX</span>
              </div>
              <div className="hidden md:flex items-center gap-6 text-[14px] text-gray-900 font-medium">
                <a href="#" className="hover:text-gray-500 transition-colors duration-300">Projects</a>
                <a href="#" className="hover:text-gray-500 transition-colors duration-300">Studio</a>
                <a href="#" className="hover:text-gray-500 transition-colors duration-300">Journal</a>
                <a href="#" className="hover:text-gray-500 transition-colors duration-300">Connect</a>
              </div>
            </div>

            {/* RIGHT (Desktop) */}
            <div className="hidden md:flex items-center gap-6 pr-1">
              <div className="hidden lg:block text-[13px] text-gray-600">
                Taking on projects for Q1 2026
              </div>
              <div className="flex items-center gap-2 text-[13px] text-gray-600">
                <Clock className="w-[14px] h-[14px]" />
                <LondonClock />
              </div>
              <button className="group flex items-center gap-3 bg-gray-900 text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 hover:bg-gray-800 transition-colors">
                <HoverTextRoll text="Book a strategy call" />
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <ArrowRight className="w-[14px] h-[14px] text-gray-900 group-hover:-rotate-45 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
                </div>
              </button>
            </div>

            {/* MOBILE TOGGLE */}
            <div className="md:hidden pr-1">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-9 h-9 bg-gray-900 text-white rounded-full flex items-center justify-center"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="relative bg-white rounded-2xl mx-3 mb-3 p-6 pb-8 flex flex-col gap-8 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[13px] text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                  <Clock className="w-[14px] h-[14px]" />
                  <LondonClock />
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex flex-col gap-4 text-[28px] leading-[32px] font-medium text-gray-900">
                <a href="#" className="hover:text-gray-500">Projects</a>
                <a href="#" className="hover:text-gray-500">Studio</a>
                <a href="#" className="hover:text-gray-500">Journal</a>
                <a href="#" className="hover:text-gray-500">Connect</a>
              </div>

              <button className="group flex items-center justify-between bg-gray-900 text-white text-[16px] font-medium rounded-full pl-6 pr-2 py-2 mt-4">
                <span>Start a project</span>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-gray-900 group-hover:-rotate-45 transition-transform duration-500" />
                </div>
              </button>
            </motion.div>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-20 flex-1 flex flex-col justify-end w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
          <div className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide font-medium mb-5 sm:mb-8 uppercase">
            Axion Studio
          </div>
          
          <h1 
            className="font-medium text-gray-900 leading-[1.08] tracking-[-0.03em]" 
            style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)' }}
          >
            We craft digital experiences <br className="hidden sm:block" /><span className="sm:hidden"> </span>
            for brands ready to dominate <br className="hidden sm:block" /><span className="sm:hidden"> </span>
            their category online.
          </h1>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5">
            <button className="group inline-flex items-center w-fit gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-colors">
              <HoverTextRoll text="Start a project" />
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shrink-0">
                <ArrowRight className="w-[14px] h-[14px] sm:w-4 sm:h-4 text-[#F26522] group-hover:-rotate-45 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
              </div>
            </button>
          </div>
        </div>
      </section>
\n`;

code = code.substring(0, heroStart) + newHero + code.substring(heroEnd);

// Also remove font-family override on root div if it conflicts.
code = code.replace(' style={{ fontFamily: "\'Inter\', sans-serif" }}', '');

fs.writeFileSync('src/App.tsx', code);
console.log('Hero updated');
