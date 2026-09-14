import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  ChevronRight, 
  Target, 
  Calculator, 
  Filter,
  ArrowRight,
  Briefcase,
  ShieldCheck,
  Ban,
  Clock,
  Smartphone,
  Laptop,
  RefreshCcw,
  Menu,
  X
} from 'lucide-react';
import { Swirl, ChromaFlow, FlutedGlass, FilmGrain } from './components/shaders';

const WhaleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 17c0 1.5-1.5 3-4 3H6c-2.5 0-4-1.5-4-3 0-2.5 2-4.5 4.5-4.5 1 0 2 .5 2.5 1 .5.5 1.5.5 2 0 1-1 2.5-1 4 0 1 1 2 1 3 0 1-1 3-1h.5c1.5 0 2.5 1.5 2.5 3v1.5z" />
    <path d="M12 9V5" />
    <path d="M10 5h4" />
    <circle cx="16" cy="13" r="1" fill="currentColor" />
  </svg>
);


const HoverTextRoll = ({ text }: { text: string }) => (
  <div className="flex flex-col h-[20px] overflow-hidden relative">
    <div className="group-hover:-translate-y-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex flex-col">
      <span className="h-[20px] leading-[20px]">{text}</span>
      <span className="h-[20px] leading-[20px]">{text}</span>
    </div>
  </div>
);

const LondonClock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
      });
      setTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return <span>{time} in London</span>;
};

export default function App() {
  const [quizStep, setQuizStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = (e?: any) => {
    if (e && e.preventDefault) e.preventDefault();
    window.open('https://wa.me/77027776848?text=' + encodeURIComponent('Здравствуйте! Я хочу обсудить проект.'), '_blank');
  };

  const quizQuestions = [
    {
      step: 1,
      title: "В какой сфере работает ваш бизнес?",
      options: ["Товарный Бизнес", "Услуги", "B2B", "Производство"]
    },
    {
      step: 2,
      title: "Какой бюджет выделен на ваш проект?",
      options: ["Менее 50 000 ₸", "От 100 000 ₸ до 500 000 ₸", "От 1 000 000 ₸ и выше"]
    },
    {
      step: 3,
      title: "Какой основной источник трафика планируете использовать?",
      options: ["Контекстная реклама (Google/Yandex)", "Таргет (Instagram/Facebook)", "SEO-продвижение", "Пока не определились"]
    },
    {
      step: 4,
      title: "Как срочно вам нужны первые заявки?",
      options: ["Нужны были «вчера»", "В течение 2-3 недель", "Планируем на следующий квартал"]
    }
  ];

  const handleNextStep = () => {
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
      let text = "Здравствуйте! Хочу получить расчет стоимости проекта.\nМои ответы на квиз:\n";
      quizQuestions.forEach((q, idx) => {
         text += `${idx + 1}. ${q.title} - ${idx === 3 ? answer : newAnswers[idx]}\n`;
      });
      window.open('https://wa.me/77027776848?text=' + encodeURIComponent(text), '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-900">
      
      {/* 1. Первый экран (Hero Section) */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#EFEFEF] font-sans">
        
        {/* Shaders Background */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
          <ChromaFlow baseColor="#ffffff" downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={13} radius={3.5} />
          <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
          <FilmGrain strength={0.05} />
        </div>

        {/* Navigation */}


        {/* Mobile Menu Overlay */}
        <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="relative bg-white rounded-2xl mx-3 mb-3 p-6 pb-8 flex flex-col gap-8 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[13px] text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                  <Clock className="w-[14px] h-[14px]" />
                  <LondonClock />
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex flex-col gap-4 text-[28px] leading-[32px] font-medium text-gray-900">
                <a href="#" className="hover:text-gray-500">Projects</a>
                <a href="#" className="hover:text-gray-500">Studio</a>
                <a href="#" className="hover:text-gray-500">Journal</a>
                <a href="#" className="hover:text-gray-500">Connect</a>
              </div>

              <button onClick={handleWhatsAppClick} className="group flex items-center justify-between bg-gray-900 text-white text-[16px] font-medium rounded-full pl-6 pr-2 py-2 mt-4">
                <span>Обсудить проект</span>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-gray-900 group-hover:-rotate-45 transition-transform duration-500" />
                </div>
              </button>
            </motion.div>
          </div>
        )}
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-20 flex-1 flex flex-col justify-end w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
          
          {/* Smartphone Mockup (Right Background) */}
          <div className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 lg:w-[280px] xl:w-[320px] h-[600px] pointer-events-none perspective-1000 z-0">
            <motion.div 
              initial={{ opacity: 0, y: 50, rotateZ: 5, rotateY: -15, rotateX: 5 }}
              animate={{ opacity: 1, y: 0, rotateZ: 8, rotateY: -15, rotateX: 5 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              className="w-full h-full bg-white/80 backdrop-blur-2xl border-[8px] border-slate-900 rounded-[3rem] shadow-2xl overflow-hidden relative"
            >
              {/* Floating animation wrapper */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="w-full h-full relative px-5 pb-6 flex flex-col"
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-2xl z-10"></div>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-800 rounded-full z-10"></div>

                {/* UI Content */}
                <div className="mt-12 flex flex-col h-full space-y-4">
                  
                  {/* Header/Greeting */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-[#F26522] shadow-inner">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Конверсия</div>
                      <div className="text-xl font-black text-slate-900">+12.4%</div>
                    </div>
                  </div>

                  {/* Main Chart Card */}
                  <div className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-slate-100 flex-1 relative flex flex-col overflow-hidden">
                    <div className="text-xs font-bold text-slate-800 mb-1">Динамика заявок</div>
                    <div className="text-[9px] text-gray-400 font-medium mb-4">Текущий месяц</div>
                    
                    {/* SVG Chart pointing up */}
                    <div className="flex-1 w-full relative mt-2">
                       <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                         <defs>
                           <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="0%" stopColor="#F26522" stopOpacity="0.4" />
                             <stop offset="100%" stopColor="#F26522" stopOpacity="0" />
                           </linearGradient>
                         </defs>
                         {/* Fill Area */}
                         <path d="M0 50 L 0 42 Q 15 42 25 35 T 50 25 T 75 15 T 100 5 L 100 50 Z" fill="url(#chartGrad)" />
                         {/* Line */}
                         <path d="M0 42 Q 15 42 25 35 T 50 25 T 75 15 T 100 5" fill="none" stroke="#F26522" strokeWidth="3" strokeLinecap="round" />
                         
                         {/* Glowing endpoint */}
                         <circle cx="100" cy="5" r="4" fill="#F26522" className="animate-pulse" />
                         <circle cx="100" cy="5" r="8" fill="#F26522" opacity="0.3" className="animate-pulse" />
                       </svg>
                    </div>

                    {/* Stats metrics */}
                    <div className="grid grid-cols-2 gap-2 mt-6">
                       <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                         <div className="text-[9px] text-gray-500 font-bold uppercase mb-0.5">Лиды</div>
                         <div className="text-base font-black text-slate-900">120</div>
                       </div>
                       <div className="bg-orange-50 p-2.5 rounded-xl border border-orange-100">
                         <div className="text-[9px] text-orange-600 font-bold uppercase mb-0.5">CPL</div>
                         <div className="text-base font-black text-orange-600">1 250 ₸</div>
                       </div>
                    </div>
                  </div>

                  {/* Secondary card */}
                  <div className="bg-slate-900 rounded-[1.25rem] p-4 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Трафик</div>
                      <div className="text-sm font-bold text-white">1 500</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                      <Target className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="relative z-10">
            <div className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide font-medium mb-5 sm:mb-8">
              KT Design
            </div>
          
          <h1 
            className="font-medium text-gray-900 leading-[1.08] tracking-[-0.03em] text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)]"
          >
            Умные лендинги, <br className="hidden sm:block" /><span className="sm:hidden"> </span>
            которые продают сами — <br className="hidden sm:block" /><span className="sm:hidden"> </span>
            от первого клика до сделки
          </h1>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5">
            <button onClick={handleWhatsAppClick} className="group inline-flex items-center w-fit gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-colors">
              <HoverTextRoll text="Обсудить проект" />
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shrink-0">
                <ArrowRight className="w-[14px] h-[14px] sm:w-4 sm:h-4 text-[#F26522] group-hover:-rotate-45 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
              </div>
            </button>
          </div>
          </div>
        </div>
      </section>

{/* 2. Блок "Математика конверсии" */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Математика конверсии: Почему старые сайты убивают ваши продажи
            </h2>
            <p className="text-slate-600 text-lg flex flex-col sm:flex-row items-center justify-center gap-3">
              <span>Давайте посчитаем. Ваш рекламный бюджет —</span>
              <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-lg font-black text-2xl border border-blue-200 shadow-sm inline-block">150 000 ₸</span>
            </p>
            <p className="text-slate-600 text-lg mt-4">
              Стоимость одного клика (CPC) составляет <strong className="text-slate-900">100 ₸</strong>. Вы получаете ровно <strong className="text-slate-900">1 500 посетителей</strong>. Что дальше?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Сценарий А */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <div className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-2">Сценарий А</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 pb-6 border-b border-slate-100">
                Обычный корпоративный сайт
              </h3>
              <div className="space-y-6 flex-grow">
                <div>
                  <div className="text-slate-500 text-sm mb-1">Конверсия сайта</div>
                  <div className="text-2xl font-semibold text-slate-700">2%</div>
                  <p className="text-sm text-slate-400 mt-1">Внимание клиента рассеивается по страницам и вкладкам.</p>
                </div>
                <div>
                  <div className="text-slate-500 text-sm mb-1">Итого заявок</div>
                  <div className="text-2xl font-semibold text-slate-700">30</div>
                </div>
                <div className="pt-4 mt-auto">
                  <div className="text-slate-500 text-sm mb-1">Стоимость одного лида (CPL)</div>
                  <div className="text-3xl font-bold text-red-500">5 000 ₸</div>
                </div>
              </div>
            </div>

            {/* Сценарий Б */}
            <div className="bg-blue-600 p-8 rounded-2xl border border-blue-500 shadow-xl flex flex-col text-white relative transform md:-translate-y-4">
              <div className="absolute top-0 right-8 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-b-lg tracking-wider uppercase">
                Наш продукт
              </div>
              <div className="text-sm font-bold tracking-wider text-blue-200 uppercase mb-2">Сценарий Б</div>
              <h3 className="text-2xl font-bold text-white mb-6 pb-6 border-b border-blue-500/50">
                Лендинг с одним четким оффером
              </h3>
              <div className="space-y-6 flex-grow">
                <div>
                  <div className="text-blue-200 text-sm mb-1">Конверсия сайта</div>
                  <div className="text-2xl font-semibold text-white">8%</div>
                  <p className="text-sm text-blue-300 mt-1">Точечный фокус, закрытие возражений, сильный призыв к действию.</p>
                </div>
                <div>
                  <div className="text-blue-200 text-sm mb-1">Итого заявок</div>
                  <div className="text-2xl font-semibold text-white">120</div>
                </div>
                <div className="pt-4 mt-auto">
                  <div className="text-blue-200 text-sm mb-1">Стоимость одного лида (CPL)</div>
                  <div className="text-4xl font-bold text-emerald-300">1 250 ₸</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm text-lg font-medium text-slate-700">
              <Calculator className="text-blue-600 w-6 h-6" />
              <span>Вывод: Вы получаете <strong className="text-blue-600">в 4 раза больше заявок</strong> за те же 150 000 тенге.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Блок "Качество заявок" */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                <Filter className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                Количество — ничто без качества. <br/>Как мы отсекаем нецелевых клиентов
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  Вместо 50 пустых звонков студентам или "просто спросить", ваш отдел продаж получает 15 заявок от реальных клиентов, готовых к сделке.
                </p>
                <p>
                  <strong>Как мы это делаем?</strong> Через инструменты квалификации: интерактивные квизы, точный копирайтинг и фильтрующие формы. 
                </p>
                <p className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-base mt-6 text-slate-700">
                  <strong className="text-slate-900 block mb-2">Пример из практики:</strong>
                  Мы вшиваем в квиз вопрос о бюджете проекта и мягко отсекаем тех, кто ищет услуги за 50 000 ₸. В вашу CRM падают только те заявки, чей проект стартует от 1 000 000 ₸. В результате ваш отдел продаж <strong>закрывает сделки, а не работает колл-центром</strong>.
                </p>
              </div>
            </div>

            {/* Визуал Квиза */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-inner">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {!isQuizSubmitted ? (
                  <>
                    <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                      <span className="text-white font-medium text-sm">Шаг {quizStep} из 4</span>
                      <div className="w-32 bg-slate-700 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" 
                          style={{ width: `${(quizStep / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="p-8">
                      <h4 className="text-xl font-bold text-slate-900 mb-6">{quizQuestions[quizStep - 1].title}</h4>
                      <div className="space-y-4">
                        {quizQuestions[quizStep - 1].options.map((option, index) => {
                          const isBadOption = quizStep === 2 && index === 0;
                          
                          if (isBadOption) {
                            return (
                              <div key={index} className="p-4 border border-red-100 bg-red-50 text-red-500 rounded-xl flex items-center justify-between opacity-60 cursor-not-allowed">
                                <span className="font-medium">{option}</span>
                                <XCircle className="w-5 h-5" />
                              </div>
                            );
                          }

                          const isSelected = selectedOption === index;
                          return (
                            <div 
                              key={index}
                              onClick={() => setSelectedOption(index)}
                              className={`p-4 rounded-xl flex items-center justify-between cursor-pointer transition-colors border ${isSelected ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600'}`}
                            >
                              <span className={isSelected ? "font-bold" : "font-medium"}>{option}</span>
                              {isSelected && <CheckCircle2 className="w-6 h-6 text-blue-600" />}
                            </div>
                          );
                        })}
                      </div>
                      <button 
                        onClick={handleNextStep}
                        disabled={selectedOption === null}
                        className="w-full mt-8 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        {quizStep < 4 ? 'Следующий шаг' : 'Получить расчет'} <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-12 text-center bg-white">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">Отлично, вы нам подходите!</h4>
                    <p className="text-slate-500 text-base mb-8">Теперь мы знаем ваш масштаб. Оставьте заявку, чтобы получить разбор.</p>
                    <button 
                      onClick={() => {
                        let text = "Здравствуйте! Хочу получить расчет стоимости проекта.\nМои ответы на квиз:\n";
                        quizQuestions.forEach((q, idx) => {
                           text += `${idx + 1}. ${q.title} - ${quizAnswers[idx]}\n`;
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
                    </button>
                  </div>
                )}
              </div>
              <p className="text-center text-sm text-slate-500 mt-6 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" /> 100% защита от "мусорных" лидов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Блок "Таблица сравнения" */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Базовый сайт vs Landing Page
            </h2>
            <p className="text-slate-600 text-lg">Сравнение ключевых показателей эффективности.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="p-6 border-b border-slate-200 bg-slate-50 w-1/3 text-sm font-bold text-slate-500 uppercase tracking-wider">Метрика</th>
                  <th className="p-6 border-b border-slate-200 bg-white w-1/3 text-lg font-bold text-slate-800 text-center">Базовый сайт</th>
                  <th className="p-6 border-b border-blue-200 bg-blue-50 w-1/3 text-lg font-bold text-blue-700 border-l border-blue-200 text-center">Наш Лендинг</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-6 font-medium text-slate-900 bg-slate-50/50">Средняя конверсия</td>
                  <td className="p-6 text-slate-600 text-center">1 – 2%</td>
                  <td className="p-6 text-blue-700 font-bold bg-blue-50/30 border-l border-blue-100 text-center text-lg">8 – 15%</td>
                </tr>
                <tr>
                  <td className="p-6 font-medium text-slate-900 bg-slate-50/50">Фокус внимания клиента</td>
                  <td className="p-6 text-slate-600 text-center">Рассеянный (меню, статьи, новости)</td>
                  <td className="p-6 text-blue-700 font-medium bg-blue-50/30 border-l border-blue-100 text-center">Точечный (только целевое действие)</td>
                </tr>
                <tr>
                  <td className="p-6 font-medium text-slate-900 bg-slate-50/50">Стоимость лида (CPL)</td>
                  <td className="p-6 text-slate-600 text-center">Высокая</td>
                  <td className="p-6 text-blue-700 font-bold bg-blue-50/30 border-l border-blue-100 text-center">Снижена в 2-4 раза</td>
                </tr>
                <tr>
                  <td className="p-6 font-medium text-slate-900 bg-slate-50/50">Квалификация заявок</td>
                  <td className="p-6 text-slate-600 text-center">Все подряд ("просто спросить")</td>
                  <td className="p-6 text-blue-700 font-medium bg-blue-50/30 border-l border-blue-100 text-center">Отсев нецелевых на этапе формы / квиза</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4.5 Трафик в WhatsApp */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm font-semibold mb-6 border border-red-500/20">
              <Ban className="w-4 h-4" /> Главная ошибка в Instagram-трафике
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight">
              Хватит сливать трафик в WhatsApp и делать из менеджеров справочную
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              При прямой ссылке из рекламы в чат из 100 написавших «Сколько стоит?» покупают единицы. 
              Бюджет уходит на пустые клики, а ушедшие навсегда потеряны, так как <strong className="text-white">невозможно настроить пиксель ретаргетинга</strong>.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {/* Сценарий: Только WhatsApp */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm relative"
            >
              <div className="absolute top-0 right-8 bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-1.5 rounded-b-xl text-xs font-bold tracking-wider uppercase flex items-center gap-2">
                <Smartphone className="w-4 h-4" /> Сейчас
              </div>
              <h3 className="text-2xl font-bold text-white mb-8 pb-6 border-b border-slate-700/50">
                Прямой трафик в WhatsApp
              </h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                  <span className="text-slate-400">Рекламный бюджет</span>
                  <span className="text-lg font-semibold">200 000 ₸</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                  <span className="text-slate-400">Переходов в чат (клик 1000 ₸)</span>
                  <span className="text-lg font-semibold">200 человек</span>
                </div>
                <div className="pb-4 border-b border-slate-700/50">
                  <span className="text-slate-400 block mb-2">Действия менеджера</span>
                  <div className="flex items-start gap-3 bg-red-500/5 rounded-xl p-4 border border-red-500/10">
                    <Clock className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300"><strong>20 часов переписок.</strong> Однотипные ответы на вопросы о цене, доставке и гарантиях.</span>
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-700/50">
                  <span className="text-slate-400 block mb-2">Итог</span>
                  <div className="text-sm text-slate-300 mb-2">90% сливаются после слова «Цена»</div>
                  <div className="text-xl font-bold text-white">5 реальных продаж</div>
                </div>
                <div className="pt-2">
                  <span className="text-slate-400 block mb-1">Стоимость клиента (CAC)</span>
                  <div className="text-4xl font-extrabold text-red-400">40 000 ₸</div>
                </div>
              </div>
            </motion.div>

            {/* Сценарий: Лендинг + WhatsApp */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gradient-to-b from-blue-900/40 to-blue-900/10 p-8 rounded-3xl border border-blue-500/30 backdrop-blur-sm relative shadow-[0_0_40px_-15px_rgba(59,130,246,0.2)]"
            >
              <div className="absolute top-0 right-8 bg-emerald-500 text-slate-900 px-4 py-1.5 rounded-b-xl text-xs font-bold tracking-wider uppercase flex items-center gap-2">
                <Laptop className="w-4 h-4" /> С нашим Лендингом
              </div>
              <h3 className="text-2xl font-bold text-white mb-8 pb-6 border-b border-blue-500/20">
                Сначала Лендинг → затем CRM/WA
              </h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-blue-500/20">
                  <span className="text-blue-200">Рекламный бюджет</span>
                  <span className="text-lg font-semibold text-white">200 000 ₸</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-blue-500/20">
                  <span className="text-blue-200">Переходов в чат</span>
                  <span className="text-lg font-semibold text-white">40 "теплых" клиентов</span>
                </div>
                <div className="pb-4 border-b border-blue-500/20">
                  <span className="text-blue-200 block mb-2">Действия менеджера</span>
                  <div className="flex items-start gap-3 bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-blue-50"><strong>Всего 3 часа на сделки.</strong> Клиенты уже прочитали выгоды и цены на сайте. Кнопка нажата осознанно.</span>
                  </div>
                </div>
                <div className="pb-4 border-b border-blue-500/20">
                  <span className="text-blue-200 block mb-2">Итог</span>
                  <div className="text-sm text-blue-50 mb-2">Неплатежеспособная аудитория отсеяна</div>
                  <div className="text-xl font-bold text-white">15 реальных продаж</div>
                </div>
                <div className="pt-2">
                  <span className="text-blue-200 block mb-1">Стоимость клиента (CAC)</span>
                  <div className="text-4xl font-extrabold text-emerald-400">13 330 ₸</div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto bg-slate-800/80 border border-slate-700 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6"
          >
            <div className="w-16 h-16 shrink-0 bg-blue-500/20 rounded-2xl border border-blue-500/30 flex items-center justify-center">
              <RefreshCcw className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">Лендинг — ваш лучший бесплатный менеджер 24/7</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Он забирает на себя 80% рутины, фильтрует неплатежеспособную аудиторию и передает в отдел продаж только тех, кто готов платить. 
                <strong className="text-emerald-400"> Бонус:</strong> вы собираете базу для догоняющей рекламы (ретаргетинга), что технически невозможно сделать при прямом переходе в мессенджер.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Услуги и тарифы */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Инвестиции в маркетинг</h2>
            <p className="text-slate-600 text-lg">Выберите формат работы, который решает вашу задачу.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Базовый */}
            <div className="border border-slate-200 rounded-2xl p-8 bg-white shadow-sm flex flex-col">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Базовый</h3>
              <p className="text-slate-500 text-sm mb-6 h-10">Оптимально для быстрого тестирования новой ниши или продукта.</p>
              <div className="text-4xl font-extrabold text-slate-900 mb-8">от 150 000 ₸</div>
              <ul className="space-y-4 mb-8 flex-grow text-slate-600">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> Анализ конкурентов</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> Разработка структуры и копирайтинг</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> Базовый дизайн и верстка</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> Настройка базовой аналитики</li>
              </ul>
              <button onClick={handleWhatsAppClick} className="w-full py-4 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors">
                Выбрать тариф
              </button>
            </div>

            {/* Бизнес */}
            <div className="border-2 border-blue-600 rounded-2xl p-8 bg-white shadow-xl flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                ХИТ ПРОДАЖ
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Продвинутый</h3>
              <p className="text-slate-500 text-sm mb-6 h-10">С глубоким маркетинговым исследованием и системой квалификации лидов.</p>
              <div className="text-4xl font-extrabold text-blue-600 mb-8">от 250 000 ₸</div>
              <ul className="space-y-4 mb-8 flex-grow text-slate-600">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" /> Всё из тарифа Базовый</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" /> Глубинное интервью (CustDev)</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" /> Разработка фильтрующего Квиза</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" /> Интеграция с вашей CRM</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" /> A/B тестирование заголовков</li>
              </ul>
              <button onClick={handleWhatsAppClick} className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                Выбрать тариф
              </button>
            </div>

            {/* Под ключ */}
            <div className="border border-slate-200 rounded-2xl p-8 bg-slate-900 text-white shadow-sm flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">Под ключ + Трафик</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">Создание посадочной страницы и полная настройка рекламных кампаний.</p>
              <div className="text-4xl font-extrabold text-white mb-8">от 500 000 ₸</div>
              <ul className="space-y-4 mb-8 flex-grow text-slate-300">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> Всё из тарифа Продвинутый</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> Настройка Контекстной рекламы</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> Настройка Таргетированной рекламы</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> Оптимизация кампаний (1 месяц)</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> Гарантия целевых лидов по договору</li>
              </ul>
              <button onClick={handleWhatsAppClick} className="w-full py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-colors">
                Обсудить проект
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Социальное доказательство (Кейсы) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Наши результаты в цифрах</h2>
            <p className="text-slate-600 text-lg">Как мы снижаем стоимость привлечения клиента на практике.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Кейс 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-slate-100 rounded-lg"><Briefcase className="w-6 h-6 text-slate-700" /></div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">Продажа спецтехники</h4>
                  <p className="text-sm text-slate-500">Бюджет: 800 000 ₸ / мес.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="text-xs text-red-500 font-bold uppercase tracking-wider mb-1">До нашей работы</div>
                  <div className="text-slate-600 text-sm mb-1">Цена лида (CPL):</div>
                  <div className="text-2xl font-bold text-red-600">35 000 ₸</div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">После запуска</div>
                  <div className="text-slate-600 text-sm mb-1">Цена лида (CPL):</div>
                  <div className="text-2xl font-bold text-emerald-600">8 500 ₸</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 text-slate-700">
                <strong>Результат:</strong> Объем целевых заявок вырос в 4 раза, итоговая выручка компании увеличилась на 45% за квартал.
              </div>
            </div>

            {/* Кейс 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-slate-100 rounded-lg"><Briefcase className="w-6 h-6 text-slate-700" /></div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">IT-Аутсорсинг</h4>
                  <p className="text-sm text-slate-500">Бюджет: 600 000 ₸ / мес.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="text-xs text-red-500 font-bold uppercase tracking-wider mb-1">До нашей работы</div>
                  <div className="text-slate-600 text-sm mb-1">Цена лида (CPL):</div>
                  <div className="text-2xl font-bold text-red-600">40 000 ₸</div>
                  <div className="text-xs text-red-400 mt-1">*Много "мусорных"</div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">После запуска</div>
                  <div className="text-slate-600 text-sm mb-1">Цена лида (CPL):</div>
                  <div className="text-2xl font-bold text-emerald-600">12 000 ₸</div>
                  <div className="text-xs text-emerald-500 mt-1">*Чеки от 2 млн ₸</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 text-slate-700">
                <strong>Результат:</strong> Внедрили квиз, отсеяли малый бизнес (чеки до 500к). Отдел продаж работает только с крупными контрактами.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Форма захвата (Закрывающий CTA) */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/2" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-6">Узнайте потенциал вашей ниши</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Оставьте заявку, и мы <strong className="text-white">бесплатно рассчитаем</strong>, сколько целевых заявок и по какой цене вы сможете получать с помощью нашего лендинга (при бюджете на рекламу от 200 000 ₸).
          </p>
          
          <form className="bg-white/5 border border-slate-700 p-8 rounded-2xl backdrop-blur-sm max-w-2xl mx-auto flex flex-col gap-4" onSubmit={handleWhatsAppClick as any}>
            <div className="grid sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Ваше имя" 
                className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-5 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
              <input 
                type="tel" 
                placeholder="Номер телефона" 
                className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-5 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <input 
              type="text" 
              placeholder="Ваша ниша (например: продажа спецтехники)" 
              className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-5 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg py-5 rounded-xl transition-colors shadow-lg shadow-blue-600/25 mt-2 flex items-center justify-center gap-2"
            >
              Получить бесплатный расчет <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-slate-400 mt-2">
              Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
