import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, 
  ArrowRight,
  Gamepad2,
  Wind,
  Trophy
} from 'lucide-react';

// --- Types ---

interface SerEstarQuestion {
  sentence: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// --- Data ---

const SER_ESTAR_THEORY = [
  {
    title: "SER (Էություն)",
    usage: "Մշտական հատկանիշներ (Permanent)",
    details: [
      "Նկարագրություն: Yo soy alto (Ես բարձրահասակ եմ)",
      "Մասնագիտություն: Él es médico (Նա բժիշկ է)",
      "Բնավորություն: Nosotros somos amables (Մենք բարի ենք)",
      "Ժամանակ: Hoy es lunes (Այսօր երկուշաբթի է)",
      "Ծագում: Soy de Armenia (Ես Հայաստանից եմ)",
      "Հարաբերություններ: Ella es mi hermana (Նա իմ քույրն է)"
    ],
    color: "bg-blue-500"
  },
  {
    title: "ESTAR (Վիճակ)",
    usage: "Ժամանակավոր վիճակներ (Temporary)",
    details: [
      "Դիրք: El libro está en la mesa (Գիրքը սեղանի վրա է)",
      "Գտնվելու վայր: Estoy en casa (Ես տանն եմ)",
      "Գործողություն: Estoy comiendo (Ես ուտում եմ)",
      "Վիճակ: Estoy cansado (Ես հոգնած եմ)",
      "Էմոցիա: Ella está feliz (Նա երջանիկ է)"
    ],
    color: "bg-emerald-500"
  }
];

const SER_ESTAR_QUESTIONS: SerEstarQuestion[] = [
  {
    sentence: "Yo ___ profesor de español.",
    options: ["soy", "estoy"],
    correctAnswer: "soy",
    explanation: "Մասնագիտություն (Occupation) — օգտագործում ենք SER:"
  },
  {
    sentence: "Madrid ___ en España.",
    options: ["es", "está"],
    correctAnswer: "está",
    explanation: "Գտնվելու վայր (Location) — օգտագործում ենք ESTAR:"
  },
  {
    sentence: "Nosotros ___ muy cansados hoy.",
    options: ["somos", "estamos"],
    correctAnswer: "estamos",
    explanation: "Ֆիզիկական վիճակ (Condition) — օգտագործում ենք ESTAR:"
  },
  {
    sentence: "Hoy ___ el 14 de marzo.",
    options: ["es", "está"],
    correctAnswer: "es",
    explanation: "Ամսաթիվ (Time) — օգտագործում ենք SER:"
  },
  {
    sentence: "Tú ___ muy inteligente.",
    options: ["eres", "estás"],
    correctAnswer: "eres",
    explanation: "Մշտական հատկանիշ (Characteristic) — օգտագործում ենք SER:"
  },
  {
    sentence: "La sopa ___ fría.",
    options: ["es", "está"],
    correctAnswer: "está",
    explanation: "Ժամանակավոր վիճակ (Condition) — օգտագործում ենք ESTAR:"
  },
  {
    sentence: "Ellos ___ de México.",
    options: ["son", "están"],
    correctAnswer: "son",
    explanation: "Ծագում (Origin) — օգտագործում ենք SER:"
  },
  {
    sentence: "¿Dónde ___ las llaves?",
    options: ["son", "están"],
    correctAnswer: "están",
    explanation: "Առարկայի գտնվելու վայր (Location) — օգտագործում ենք ESTAR:"
  }
];

export default function App() {
  const [gameState, setGameState] = useState<'menu' | 'theory' | 'quiz'>('menu');
  
  // Quiz State
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const startQuiz = () => {
    setQuizIdx(0);
    setScore(0);
    setQuizFinished(false);
    setFeedback(null);
    setSelectedOption(null);
    setGameState('quiz');
  };

  const handleAnswer = (option: string) => {
    if (feedback) return; // Prevent double clicking
    
    setSelectedOption(option);
    const current = SER_ESTAR_QUESTIONS[quizIdx];
    
    if (option === current.correctAnswer) {
      setScore(prev => prev + 1);
      setFeedback('correct');
      setTimeout(() => {
        if (quizIdx < SER_ESTAR_QUESTIONS.length - 1) {
          setQuizIdx(prev => prev + 1);
          setFeedback(null);
          setSelectedOption(null);
        } else {
          setQuizFinished(true);
        }
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0ea5e9] bg-gradient-to-b from-[#0ea5e9] to-[#1e3a8a] flex flex-col font-sans text-white overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/20 blur-[150px] rounded-full -z-10" />

      {/* Header */}
      <header className="p-6 max-w-2xl mx-auto w-full z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter text-white">Spanish Master</h1>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-yellow-300 font-black text-2xl drop-shadow-md uppercase tracking-tighter">SER vs ESTAR</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 z-10 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {gameState === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-12 border border-white/20 shadow-2xl text-center">
                  <h2 className="text-4xl font-black text-white mb-8">Ser և Estar վարժություններ</h2>
                  <p className="text-blue-100 font-bold mb-10">
                    Սովորիր տեսությունը և ստուգիր գիտելիքներդ վիկտորինայում:
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    <button
                      onClick={() => setGameState('theory')}
                      className="w-full py-6 bg-blue-500 hover:bg-blue-400 text-white rounded-3xl font-black text-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                      Տեսություն
                      <Wind className="w-8 h-8" />
                    </button>
                    <button
                      onClick={startQuiz}
                      className="w-full py-6 bg-emerald-500 hover:bg-emerald-400 text-white rounded-3xl font-black text-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                      Սկսել թեստը
                      <ArrowRight className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {gameState === 'theory' && (
              <motion.div
                key="theory"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-2xl">
                  <h2 className="text-3xl font-black text-white mb-6 text-center">Ե՞րբ օգտագործել</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SER_ESTAR_THEORY.map((item, i) => (
                      <div key={i} className={`${item.color} p-6 rounded-3xl shadow-lg`}>
                        <h3 className="text-xl font-black mb-2">{item.title}</h3>
                        <p className="text-sm font-bold opacity-80 mb-4">Կանոն: {item.usage}</p>
                        <ul className="space-y-2">
                          {item.details.map((detail, j) => (
                            <li key={j} className="text-sm font-medium">• {detail}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setGameState('menu')}
                    className="mt-8 w-full py-4 bg-white text-blue-900 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    <RotateCcw className="w-6 h-6" />
                    Հետ դեպի մենյու
                  </button>
                </div>
              </motion.div>
            )}

            {gameState === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-md mx-auto"
              >
                {!quizFinished ? (
                  <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-10 border border-white/20 shadow-2xl">
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-xs font-black uppercase tracking-widest text-blue-200">Հարց {quizIdx + 1} / {SER_ESTAR_QUESTIONS.length}</span>
                      <span className="text-xs font-black uppercase tracking-widest text-emerald-300">Միավոր: {score}</span>
                    </div>

                    <div className="text-center mb-10">
                      <h3 className="text-3xl font-black text-white leading-tight">
                        {SER_ESTAR_QUESTIONS[quizIdx].sentence.split('___').map((part, i, arr) => (
                          <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && (
                              <span className={`inline-block min-w-[80px] border-b-4 mx-2 ${
                                feedback === 'correct' ? 'text-emerald-400 border-emerald-400' :
                                feedback === 'wrong' ? 'text-red-400 border-red-400' :
                                'text-yellow-400 border-white/30'
                              }`}>
                                {selectedOption || '___'}
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {SER_ESTAR_QUESTIONS[quizIdx].options.map((option) => (
                        <button
                          key={option}
                          disabled={!!feedback}
                          onClick={() => handleAnswer(option)}
                          className={`py-6 rounded-3xl font-black text-2xl shadow-xl transition-all ${
                            selectedOption === option
                              ? feedback === 'correct'
                                ? 'bg-emerald-500 text-white scale-105'
                                : feedback === 'wrong'
                                ? 'bg-red-500 text-white animate-shake'
                                : 'bg-blue-500 text-white'
                              : 'bg-white text-blue-900 hover:bg-blue-50'
                          }`}
                        >
                          {option.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence>
                      {feedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`mt-8 p-4 rounded-2xl text-center font-bold text-sm ${
                            feedback === 'correct' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                          }`}
                        >
                          {feedback === 'correct' ? 'Ճիշտ է!' : 'Սխալ է, նորից փորձիր:'}
                          <p className="mt-1 opacity-80">{SER_ESTAR_QUESTIONS[quizIdx].explanation}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/10 backdrop-blur-xl rounded-[50px] p-12 border border-white/20 shadow-2xl text-center"
                  >
                    <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-black mb-2">Գերազանց աշխատանք:</h2>
                    <p className="text-blue-200 font-bold mb-8">Քո արդյունքը՝ {score} {SER_ESTAR_QUESTIONS.length}-ից</p>
                    <button
                      onClick={() => setGameState('menu')}
                      className="w-full py-5 bg-white text-blue-900 rounded-3xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                      <RotateCcw className="w-6 h-6" />
                      Վերադառնալ մենյու
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-white/40 text-[10px] font-bold uppercase tracking-widest">
        Spanish Pronunciation Master • 2026
      </footer>
    </div>
  );
}
