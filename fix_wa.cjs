const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Insert handleWhatsAppClick
const hookDef = `  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = (e?: React.MouseEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    window.open('https://wa.me/77027776848?text=' + encodeURIComponent('Здравствуйте! Я хочу обсудить проект.'), '_blank');
  };`;

if (!code.includes('handleWhatsAppClick')) {
  code = code.replace('  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);', hookDef);
}

// 1. Mobile Menu Button (around line 155)
code = code.replace(
  '<button className="group flex items-center justify-between bg-gray-900 text-white text-[16px] font-medium rounded-full pl-6 pr-2 py-2 mt-4">',
  '<button onClick={handleWhatsAppClick} className="group flex items-center justify-between bg-gray-900 text-white text-[16px] font-medium rounded-full pl-6 pr-2 py-2 mt-4">'
);

// 2. Hero Button (around line 269)
code = code.replace(
  '<button className="group inline-flex items-center w-fit gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-colors">',
  '<button onClick={handleWhatsAppClick} className="group inline-flex items-center w-fit gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-colors">'
);

// 3. Pricing Button 1
code = code.replace(
  '<button className="w-full py-4 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors">\n                Выбрать тариф',
  '<button onClick={handleWhatsAppClick} className="w-full py-4 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors">\n                Выбрать тариф'
);

// 4. Pricing Button 2
code = code.replace(
  '<button className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">\n                Выбрать тариф',
  '<button onClick={handleWhatsAppClick} className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">\n                Выбрать тариф'
);

// 5. Pricing Button 3
code = code.replace(
  '<button className="w-full py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-colors">\n                Обсудить проект',
  '<button onClick={handleWhatsAppClick} className="w-full py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-colors">\n                Обсудить проект'
);

// 6. Contact Form submit button (We need to replace the form's action/onSubmit, or just change the button type)
// Alternatively, replace the form's submit handler if it exists or add onSubmit to the form.
code = code.replace(
  '<form className="space-y-6">',
  '<form className="space-y-6" onSubmit={handleWhatsAppClick}>'
);

// Optional: modify form button text if necessary (It says 'Оставить заявку' currently probably?)
code = code.replace(
  '<button \n              type="submit" \n              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg py-5 rounded-xl transition-colors shadow-lg shadow-blue-600/25 mt-2 flex items-center justify-center gap-2"\n            >\n              Оставить заявку',
  '<button \n              type="submit" \n              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg py-5 rounded-xl transition-colors shadow-lg shadow-blue-600/25 mt-2 flex items-center justify-center gap-2"\n            >\n              Оставить заявку'
);

fs.writeFileSync('src/App.tsx', code);
