import { useMemo, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import type { ChoiceStage } from '@/data/lessonStages';
import { buildLetterChoices } from '@/lib/letterChoices';
import LatinText from '@/components/ui/LatinText';

interface LetterChoiceScreenProps {
  task: ChoiceStage;
  onNext: () => void;
}

export default function LetterChoiceScreen({ task, onNext }: LetterChoiceScreenProps) {
  const options = useMemo(() => buildLetterChoices(task.correct, task.pool), [task]);
  const [wrongChoice, setWrongChoice] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const handleChoice = (choice: string) => {
    if (solved) return;
    if (choice === task.correct) {
      setWrongChoice(null);
      setSolved(true);
      return;
    }
    setWrongChoice(choice);
    setShakeKey((key) => key + 1);
  };

  return (
    <div className="flex w-full flex-col items-center animate-pop-in">
      <p className="text-lg font-extrabold uppercase tracking-wide text-brand-600">{task.eyebrow}</p>
      <h1 className="mt-3 text-center text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
        {task.heading}
      </h1>

      {task.prompt ? (
        <div className="mt-8 flex min-h-40 w-full max-w-md items-center justify-center rounded-[2rem] bg-white px-8 py-6 shadow-xl shadow-brand-100 ring-1 ring-ink-200">
          <span className="text-3xl font-extrabold leading-tight text-brand-600 sm:text-4xl">
            <LatinText text={task.prompt} />
          </span>
        </div>
      ) : (
        <div className="mt-8 flex h-40 w-40 items-center justify-center rounded-[2rem] bg-white shadow-xl shadow-brand-100 ring-1 ring-ink-200">
          <span className="font-literacy text-8xl leading-none text-brand-600">{task.shown}</span>
        </div>
      )}

      <p className="mt-6 min-h-[2.5rem] text-center text-xl font-bold text-ink-700" aria-live="polite">
        {solved && (
          <span className="inline-flex items-center gap-2 text-mint-700">
            <CheckCircle2 className="h-6 w-6" /> Верно! Это буква «<span className="font-literacy">{task.correct}</span>».
          </span>
        )}
        {!solved && wrongChoice && (
          <span className="inline-flex items-center gap-2 text-coral-700"><XCircle className="h-6 w-6" /> Не совсем. Попробуй ещё раз!</span>
        )}
        {!solved && !wrongChoice && task.hint}
      </p>

      <div className="mt-8 grid w-full grid-cols-2 gap-4 sm:gap-6">
        {options.map((option) => {
          const isWrong = wrongChoice === option;
          const isRight = solved && option === task.correct;
          return (
            <button
              key={`${shakeKey}-${option}`}
              type="button"
              onClick={() => handleChoice(option)}
              disabled={solved && !isRight}
              className={`flex h-28 items-center justify-center rounded-3xl border-4 font-literacy text-6xl transition-all duration-150 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300 sm:h-36 ${
                isRight
                  ? 'border-mint-600 bg-mint-100 text-mint-700'
                  : isWrong
                    ? 'animate-shake border-coral-500 bg-coral-50 text-coral-700'
                    : 'border-ink-200 bg-white text-ink-900 shadow-md hover:-translate-y-1 hover:border-brand-400 hover:shadow-lg active:translate-y-0'
              } disabled:cursor-default`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-10 h-20">
        {solved && (
          <Button onClick={onNext} className="animate-pop-in">
            Дальше
          </Button>
        )}
      </div>
    </div>
  );
}
