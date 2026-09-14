const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add quizAnswers state
const statePattern = `  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);`;
if (!code.includes('const [quizAnswers, setQuizAnswers]')) {
  code = code.replace(
    statePattern,
    `  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);\n  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);`
  );
}

// 2. Modify handleNextStep
const oldHandleNextStep = `  const handleNextStep = () => {
    if (quizStep < 4) {
      setQuizStep(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setIsQuizSubmitted(true);
    }
  };`;

const newHandleNextStep = `  const handleNextStep = () => {
    const currentQuestion = quizQuestions[quizStep - 1];
    const answer = selectedOption !== null ? currentQuestion.options[selectedOption] : "";
    const newAnswers = [...quizAnswers];
    newAnswers[quizStep - 1] = answer;
    setQuizAnswers(newAnswers);

    if (quizStep < 4) {
      setQuizStep(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setIsQuizSubmitted(true);
      let text = "Здравствуйте! Хочу получить расчет стоимости проекта.\\nМои ответы на квиз:\\n";
      quizQuestions.forEach((q, idx) => {
         text += \`\${idx + 1}. \${q.title} - \${idx === 3 ? answer : newAnswers[idx]}\\n\`;
      });
      window.open('https://wa.me/77027776848?text=' + encodeURIComponent(text), '_blank');
    }
  };`;

if (code.includes(oldHandleNextStep)) {
  code = code.replace(oldHandleNextStep, newHandleNextStep);
} else {
    // maybe it has a different format, let's use a regex or string replacement
    const stepRegex = /const handleNextStep = \(\) => \{[\s\S]*?setIsQuizSubmitted\(true\);\s*\}\s*\};/m;
    code = code.replace(stepRegex, newHandleNextStep);
}

fs.writeFileSync('src/App.tsx', code);
