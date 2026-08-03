'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { QUIZ_QUESTIONS } from '@/data/quiz';

const QUESTIONS_PER_QUIZ = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function QuizModal({ onClose }: { onClose: () => void }) {
  const questions = useMemo(() => shuffle(QUIZ_QUESTIONS).slice(0, QUESTIONS_PER_QUIZ), []);
  const [index, setIndex]         = useState(0);
  const [selected, setSelected]   = useState<number | null>(null);
  const [score, setScore]         = useState(0);
  const [finished, setFinished]   = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const current = questions[index];
  const isLast = index === questions.length - 1;

  const handleChoice = (choiceIndex: number) => {
    if (selected !== null) return;
    setSelected(choiceIndex);
    if (choiceIndex === current.correctIndex) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex(i => i + 1);
    setSelected(null);
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,8,0.88)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full rounded-2xl flex flex-col"
        style={{
          maxWidth: 560,
          background: 'rgba(8,12,28,0.97)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 30px 90px rgba(0,0,0,0.7)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full" style={{ background: '#A78BFA', boxShadow: '0 0 8px #A78BFA' }} />
            <span className="text-white font-mono text-sm tracking-wide">Quiz Suri Space</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors text-xl leading-none px-1 cursor-pointer"
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {!finished ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                  Question {index + 1} / {questions.length}
                </span>
                <span className="text-xs font-mono text-violet-400">Score : {score}</span>
              </div>

              <div className="h-1 rounded-full bg-white/5 overflow-hidden mb-6">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${(index / questions.length) * 100}%`, background: 'linear-gradient(90deg, #60A5FA, #A78BFA)' }}
                />
              </div>

              <h2 className="text-lg font-semibold text-white mb-5 leading-snug">{current.question}</h2>

              <div className="flex flex-col gap-2.5 mb-5">
                {current.choices.map((choice, i) => {
                  const isCorrect = i === current.correctIndex;
                  const isSelected = i === selected;
                  let style: React.CSSProperties = {
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'rgba(255,255,255,0.85)',
                  };
                  if (selected !== null) {
                    if (isCorrect) {
                      style = { border: '1px solid rgba(52,211,153,0.5)', background: 'rgba(52,211,153,0.1)', color: '#6EE7B7' };
                    } else if (isSelected) {
                      style = { border: '1px solid rgba(248,113,113,0.5)', background: 'rgba(248,113,113,0.1)', color: '#FCA5A5' };
                    } else {
                      style = { ...style, opacity: 0.5 };
                    }
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleChoice(i)}
                      disabled={selected !== null}
                      className="text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer disabled:cursor-not-allowed"
                      style={style}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className="rounded-xl px-4 py-3 mb-5 text-sm text-gray-400 leading-relaxed" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {current.explanation}
                  {current.href && (
                    <Link href={current.href} onClick={onClose} className="block mt-1.5 text-violet-400 hover:text-violet-300 font-semibold">
                      En savoir plus →
                    </Link>
                  )}
                </div>
              )}

              <button
                onClick={handleNext}
                disabled={selected === null}
                className="w-full py-3 rounded-xl font-semibold text-white transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #60A5FA, #A78BFA)' }}
              >
                {isLast ? 'Voir le résultat' : 'Question suivante'}
              </button>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-5xl font-extrabold mb-2" style={{ background: 'linear-gradient(135deg, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {score} / {questions.length}
              </div>
              <p className="text-gray-400 text-sm mb-6">
                {score === questions.length
                  ? 'Score parfait — tu connais bien ton sujet !'
                  : score >= questions.length * 0.7
                  ? 'Très bon score !'
                  : score >= questions.length * 0.4
                  ? 'Pas mal, il y a matière à creuser encore.'
                  : "L'exploration ne fait que commencer."}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={restart}
                  className="px-5 py-2.5 rounded-xl font-semibold text-white border border-white/10 hover:bg-white/6 transition-all cursor-pointer"
                >
                  Rejouer
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl font-semibold text-white transition-all cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #60A5FA, #A78BFA)' }}
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function QuizButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <QuizModal onClose={() => setOpen(false)} />}
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 rounded-xl font-semibold text-white border border-violet-500/25 hover:bg-violet-500/10 transition-all cursor-pointer"
      >
        🧠 Quiz du savoir
      </button>
    </>
  );
}
