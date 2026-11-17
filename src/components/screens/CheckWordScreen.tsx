import { READING_RESULT_OPTIONS, type ReadingResult } from '@/data/lesson1';
import Button from '@/components/ui/Button';
import { WordCard } from '@/components/screens/WordScreen';

interface CheckWordScreenProps {
  word: string;
  result: ReadingResult | undefined;
  onResult: (result: ReadingResult) => void;
  onNext: () => void;
}

export default function CheckWordScreen({ word, result, onResult, onNext }: CheckWordScreenProps) {
  return (
    <div className="flex w-full flex-col items-center animate-pop-in">
      <p className="mb-6 text-lg font-extrabold uppercase tracking-wide text-brand-600">
        Проверка самостоятельного чтения
      </p>
      <h2 className="text-center text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
        Прочитай слово сам
      </h2>
      <p className="mt-4 max-w-xl text-center text-xl leading-relaxed text-ink-700">
        Прочитай слово вслух без подсказок. Взрослый отметит, как получилось.
      </p>
      <div className="mt-10 w-full">
        <WordCard>{word}</WordCard>
      </div>
      <div className="mt-8 w-full max-w-md">
        <p className="mb-4 text-center text-lg font-extrabold text-ink-800">Взрослый отмечает результат:</p>
        <div className="flex flex-col gap-3">
          {READING_RESULT_OPTIONS.map((option) => {
            const isSelected = result === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onResult(option.value)}
                className={`flex items-center justify-between gap-3 rounded-3xl border-2 px-6 py-4 text-left text-lg font-bold transition-all duration-150 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300 ${
                  isSelected
                    ? 'border-mint-600 bg-mint-100 text-ink-900'
                    : 'border-ink-200 bg-white text-ink-800 hover:border-brand-400 hover:-translate-y-0.5'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
      <Button onClick={onNext} disabled={!result} className="mt-10">
        Дальше
      </Button>
    </div>
  );
}
