const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('AnimatePresence')) {
  code = code.replace("import { motion } from 'motion/react';", "import { motion, AnimatePresence } from 'motion/react';");
}

code = code.replace(
  '{isMobileMenuOpen && (',
  '<AnimatePresence>\n        {isMobileMenuOpen && ('
);

code = code.replace(
  '        )}',
  '        )}\n        </AnimatePresence>'
);

code = code.replace(
  'style={{ fontSize: \'clamp(1.75rem, 7vw, 4.2rem)\' }}',
  'className="font-medium text-gray-900 leading-[1.08] tracking-[-0.03em] text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)]"'
);
code = code.replace(
  'className="font-medium text-gray-900 leading-[1.08] tracking-[-0.03em]" \n            className="font-medium text-gray-900 leading-[1.08] tracking-[-0.03em] text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)]"',
  'className="font-medium text-gray-900 leading-[1.08] tracking-[-0.03em] text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)]"'
);

fs.writeFileSync('src/App.tsx', code);
