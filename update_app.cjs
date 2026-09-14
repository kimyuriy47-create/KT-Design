const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace('<div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 pt-16">',
                    '<div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-900" style={{ fontFamily: "\'Inter\', sans-serif" }}>');

fs.writeFileSync('src/App.tsx', code);
