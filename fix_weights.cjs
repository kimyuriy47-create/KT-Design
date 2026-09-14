const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace in Hero section
let heroStart = code.indexOf('{/* 1. Первый экран (Hero Section) */}');
let heroEnd = code.indexOf('{/* 2. Блок "Математика конверсии" */}');

if (heroStart !== -1 && heroEnd !== -1) {
    let heroCode = code.substring(heroStart, heroEnd);
    heroCode = heroCode.replace(/font-black/g, 'font-semibold');
    code = code.substring(0, heroStart) + heroCode + code.substring(heroEnd);
    fs.writeFileSync('src/App.tsx', code);
    console.log('Fixed font weights.');
}
