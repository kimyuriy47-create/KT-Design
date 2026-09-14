const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const successBlock = `<p className="text-slate-500 text-base mb-8">Теперь мы знаем ваш масштаб. Оставьте заявку, чтобы получить разбор.</p>
                    <button 
                      onClick={() => {
                        let text = "Здравствуйте! Хочу получить расчет стоимости проекта.\\nМои ответы на квиз:\\n";
                        quizQuestions.forEach((q, idx) => {
                           text += \`\${idx + 1}. \${q.title} - \${quizAnswers[idx]}\\n\`;
                        });
                        window.open('https://wa.me/77027776848?text=' + encodeURIComponent(text), '_blank');
                      }}
                      className="w-full mb-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
                    >
                      Перейти в WhatsApp <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => {
                        setIsQuizSubmitted(false);
                        setQuizStep(1);
                        setSelectedOption(null);
                        setQuizAnswers([]);
                      }}
                      className="text-sm font-semibold text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <RefreshCcw className="w-4 h-4 inline-block mr-1" />
                      Сбросить квиз
                    </button>`;

const regex = /<p className="text-slate-500 text-base mb-8">Теперь мы знаем ваш масштаб. Оставьте заявку, чтобы получить разбор.<\/p>\s*<button\s*onClick=\{\(\) => \{\s*setIsQuizSubmitted\(false\);\s*setQuizStep\(1\);\s*setSelectedOption\(null\);\s*\}\}\s*className="text-sm font-semibold text-slate-400 hover:text-blue-600 transition-colors"\s*>\s*<RefreshCcw className="w-4 h-4 inline-block mr-1" \/>\s*Сбросить квиз\s*<\/button>/m;

code = code.replace(regex, successBlock);

fs.writeFileSync('src/App.tsx', code);
