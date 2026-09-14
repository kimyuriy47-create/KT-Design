const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

const lines = content.split('\n');

// Find the start of Header
const startIdx = lines.findIndex(l => l.includes('{/* Header */}'));
// Find the start of Section 2
const endIdx = lines.findIndex(l => l.includes('{/* 2. Блок "Математика конверсии" */}'));

if (startIdx !== -1 && endIdx !== -1) {
  const before = lines.slice(0, startIdx).join('\n');
  const after = lines.slice(endIdx).join('\n');
  
  const newHero = `      {/* 1. Первый экран (Hero Section) */}
      <section className="relative min-h-screen flex flex-col font-sans uppercase font-semibold text-black tracking-widest overflow-hidden bg-white">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Nav (top, fixed height) */}
        <nav className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-24 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black tracking-widest text-black">
                KITOV<span className="text-[#5E0ED7]">.</span>DESIGN
              </span>
            </div>
            <button className="hidden sm:inline-flex items-center justify-center text-black px-5 py-2.5 text-sm font-semibold tracking-widest hover:opacity-70 transition-opacity uppercase">
              ОБСУДИТЬ ПРОЕКТ
            </button>
          </div>
        </nav>

        {/* Stats row (flex-1, vertically centered, right-aligned) */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-end px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <div className="text-right space-y-6">
            <div className="flex items-center justify-end gap-3 text-3xl md:text-5xl lg:text-6xl tracking-widest">
              <span className="text-[#5E0ED7] font-black">+</span> 120 ЗАЯВОК
            </div>
            <div className="flex items-center justify-end gap-3 text-3xl md:text-5xl lg:text-6xl tracking-widest">
              <span className="text-[#5E0ED7] font-black">+</span> 8% КОНВЕРСИЯ
            </div>
            <div className="flex items-center justify-end gap-3 text-3xl md:text-5xl lg:text-6xl tracking-widest">
              <span className="text-[#5E0ED7] font-black">+</span> 4x РОСТ ROI
            </div>
          </div>
        </div>

        {/* Bottom content (pinned to bottom with padding) */}
        <div className="relative z-10 pb-16 px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-widest text-black leading-[1.1] mb-8">
              СЛИВАЕТЕ БЮДЖЕТ НА ТРАФИК, А КАЧЕСТВЕННЫХ ЗАЯВОК НЕТ?
            </h1>
            <a href="#audit" className="inline-flex items-center gap-4 text-[#5E0ED7] text-lg hover:opacity-80 transition-opacity">
              ОБСУДИТЬ ПРОЕКТ <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

`;

  fs.writeFileSync('src/App.tsx', before + '\n' + newHero + '      ' + after);
  console.log('Successfully replaced Hero section.');
} else {
  console.log('Could not find start or end markers.', startIdx, endIdx);
}
