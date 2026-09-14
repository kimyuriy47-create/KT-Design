const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'onSubmit={(e) => e.preventDefault()}',
  'onSubmit={handleWhatsAppClick as any}'
);

fs.writeFileSync('src/App.tsx', code);
