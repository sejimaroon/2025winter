import { useState } from 'react';
import { User, Briefcase, Heart, HelpCircle, Check, X } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: 'WEBの仕事はいつ受けられる？',
      options: ['平日のみ', '週末だけ', 'いつでも'],
      correctAnswer: 'いつでも'
    },
    {
      id: 2,
      question: '好きなものは？',
      options: ['金', '名誉', '自由時間'],
      correctAnswer: '金'
    },
    {
      id: 3,
      question: 'コンゴトモ？',
      options: ['マタコンド', 'オマカセシマス', 'ヨロシク'],
      correctAnswer: 'ヨロシク'
    }
  ];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {!quizStarted ? (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">せじま</h1>
                  <p className="text-cyan-300 text-lg">WEB制作クリエイター</p>
                </div>
              </div>

              <div className="space-y-6 text-white/90">
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                  <Briefcase className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-white">概要</h2>
                    <p className="text-lg">WEB制作がやれる、請け負いたい</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                  <Heart className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-white">趣味</h2>
                    <p className="text-lg">ゲーム、乳酸菌</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setQuizStarted(true)}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-10 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105"
              >
                <HelpCircle className="w-6 h-6" />
                クイズに挑戦する
                <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
            </div>
          </div>
        ) : !showResult ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 animate-fadeIn">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-cyan-300 font-semibold">
                  Question {currentQuestion + 1} / {quizQuestions.length}
                </span>
                <span className="text-white font-semibold">
                  Score: {score}
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {quizQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-5 rounded-xl text-left text-lg font-medium transition-all ${
                    selectedAnswer === null
                      ? 'bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-cyan-400'
                      : selectedAnswer === option
                      ? option === quizQuestions[currentQuestion].correctAnswer
                        ? 'bg-green-500/30 text-white border-2 border-green-400'
                        : 'bg-red-500/30 text-white border-2 border-red-400'
                      : option === quizQuestions[currentQuestion].correctAnswer
                      ? 'bg-green-500/30 text-white border-2 border-green-400'
                      : 'bg-white/5 text-white/50 border-2 border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedAnswer !== null && option === quizQuestions[currentQuestion].correctAnswer && (
                      <Check className="w-6 h-6 text-green-400" />
                    )}
                    {selectedAnswer === option && option !== quizQuestions[currentQuestion].correctAnswer && (
                      <X className="w-6 h-6 text-red-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 text-center animate-fadeIn">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Check className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">クイズ完了！</h2>

            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
              {score} / {quizQuestions.length}
            </div>

            <p className="text-xl text-white/90 mb-8">
              {score === quizQuestions.length
                ? '完璧です！せじまのことをよく理解していますね！'
                : score >= quizQuestions.length / 2
                ? 'なかなかいい感じです！'
                : 'もう一度挑戦してみてください！'}
            </p>

            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-10 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105"
            >
              もう一度プロフィールを見る
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
