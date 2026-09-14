const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide font-medium mb-5 sm:mb-8 uppercase"',
  'className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide font-medium mb-5 sm:mb-8"'
);

fs.writeFileSync('src/App.tsx', code);
