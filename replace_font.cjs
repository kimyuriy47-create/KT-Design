const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

if (!html.includes('fonts.googleapis.com')) {
  html = html.replace('</head>', '    <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600;900&display=swap" rel="stylesheet">\n  </head>');
  fs.writeFileSync('index.html', html);
  console.log('Added Inter font to index.html');
}
