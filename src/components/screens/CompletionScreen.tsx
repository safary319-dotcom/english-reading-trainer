import { PartyPopper, RotateCcw, Home, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import LatinText from '@/components/ui/LatinText';
import { READING_RESULT_OPTIONS, type ReadingResult } from '@/data/lesson1';
import {
  adultRecommendation,
  categorizeWord,
  childMessage,
  controlMessage,
  isUnstable,
  summarizeProgress,
  type WordProgress,
} from '@/lib/readingProgress';

interface WordResultRow {
  word: string;
  firstResult: ReadingResult | undefined;
  repeatResult: ReadingResult | undefined;
  control?: boolean;
}

interface CompletionScreenProps {
  completeText: string;
  results: WordResultRow[];
  onRepeat: () => void;
  onHome: () => void;
  onResetResults: () => void;
}

function resultLabel(result: ReadingResult | undefined): string {
  return READING_RESULT_OPTIONS.find((option) => option.value === result)?.label ?? 'Не отмечено';
}

const CATEGORY_LABELS: Record<string, string> = {
  confident: 'Уверенно',
  progress: 'Есть прогресс',
  needsWork: 'Нужно закрепить',
  insufficient: 'Недостаточно данных',
};

const CATEGORY_STYLES: Record<string, string> = {
  confident: 'bg-mint-100 text-mint-700',
  progress: 'bg-brand-100 text-brand-700',
  needsWork: 'bg-sun-100 text-sun-600',
  insufficient: 'bg-ink-100 text-ink-500',
};

export default function CompletionScreen({
  completeText,
  results,
  onRepeat,
  onHome,
  onResetResults,
}: CompletionScreenProps) {
  const rows: WordProgress[] = results.map(({ word, firstResult, repeatResult, control }) => ({
    word,
    firstResult,
    repeatResult,
    control,
  }));
  const trainingRows = rows.filter((row) => !row.control);
  const controlRows = rows.filter((row) => row.control);
  const summary = summarizeProgress(rows);
  const kidMessage = childMessage(summary);
  const recommendation = adultRecommendation(summary);

  return (
    <div className="flex w-full flex-col items-center text-center animate-pop-in">
      <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-sun-100 text-sun-600 shadow-lg ring-1 ring-sun-200">
        <PartyPopper className="h-14 w-14" strokeWidth={2.25} />
      </div>
      <p className="mt-10 max-w-2xl text-2xl font-bold leading-relaxed text-ink-900 sm:text-3xl sm:leading-relaxed">
        <LatinText text={completeText} />
      </p>

      <div className="mt-6 max-w-xl rounded-[2rem] bg-mint-100 px-8 py-6 shadow-lg shadow-mint-100 ring-1 ring-mint-200">
        <p className="text-2xl font-extrabold leading-snug text-mint-700 sm:text-3xl">{kidMessage}</p>
      </div>

      <section className="mt-10 w-full max-w-xl rounded-[2rem] bg-white p-6 text-left shadow-lg shadow-brand-100 ring-1 ring-ink-200">
        <h2 className="text-2xl font-extrabold text-ink-900">Результаты чтения</h2>
        <p className="mt-2 text-base leading-relaxed text-ink-500">
          Первая попытка — до разбора слова. Повторное чтение — после разбора и слияния звуков.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl bg-mint-100 px-4 py-3 text-center">
            <span className="block text-2xl font-extrabold text-mint-700">{summary.confident}</span>
            <span className="text-sm font-bold text-mint-700">Уверенно</span>
          </div>
          <div className="rounded-2xl bg-brand-100 px-4 py-3 text-center">
            <span className="block text-2xl font-extrabold text-brand-700">{summary.progress}</span>
            <span className="text-sm font-bold text-brand-700">Есть прогресс</span>
          </div>
          <div className="rounded-2xl bg-sun-100 px-4 py-3 text-center">
            <span className="block text-2xl font-extrabold text-sun-600">{summary.needsWork}</span>
            <span className="text-sm font-bold text-sun-600">Нужно закрепить</span>
          </div>
          <div className="rounded-2xl bg-ink-100 px-4 py-3 text-center">
            <span className="block text-2xl font-extrabold text-ink-500">{summary.insufficient}</span>
            <span className="text-sm font-bold text-ink-500">Недостаточно данных</span>
          </div>
        </div>

        <ul className="mt-5 divide-y divide-ink-100">
          {trainingRows.map(({ word, firstResult, repeatResult }) => {
            const category = categorizeWord(firstResult, repeatResult);
            const unstable = isUnstable(firstResult, repeatResult);
            return (
              <li key={word} className="flex flex-col gap-2 py-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-literacy text-xl text-brand-700">{word}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-bold ${CATEGORY_STYLES[category]}`}
                  >
                    {CATEGORY_LABELS[category]}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-bold text-ink-500">Первое чтение</span>
                  <span className={`text-base font-bold ${firstResult ? 'text-ink-800' : 'text-ink-500'}`}>
                    {resultLabel(firstResult)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-bold text-ink-500">Повторное чтение</span>
                  <span className={`text-base font-bold ${repeatResult ? 'text-ink-800' : 'text-ink-500'}`}>
                    {resultLabel(repeatResult)}
                  </span>
                </div>
                {unstable && (
                  <p className="text-sm font-bold text-sun-600">
                    Первое чтение было самостоятельным, но повторное — нет. Навык пока нестабилен.
                  </p>
                )}
              </li>
            );
          })}
        </ul>

        {controlRows.length > 0 && (
          <div className="mt-6 rounded-[2rem] bg-brand-50 p-5 ring-1 ring-brand-100">
            <h3 className="text-xl font-extrabold text-brand-700">Проверка самостоятельного чтения</h3>
            <p className="mt-2 text-base leading-relaxed text-ink-500">
              Новое слово из уже изученных букв. Оценивается только первое чтение без подсказок.
            </p>
            <ul className="mt-4 divide-y divide-brand-100">
              {controlRows.map(({ word, firstResult }) => (
                <li key={word} className="flex flex-col gap-2 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-literacy text-xl text-brand-700">{word}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold ${
                        firstResult === 'independent'
                          ? 'bg-mint-100 text-mint-700'
                          : firstResult
                            ? 'bg-sun-100 text-sun-600'
                            : 'bg-ink-100 text-ink-500'
                      }`}
                    >
                      {firstResult === 'independent'
                        ? 'Прочитал самостоятельно'
                        : firstResult
                          ? resultLabel(firstResult)
                          : 'Не отмечено'}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed text-ink-700">{controlMessage(firstResult)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <div className="mt-8 max-w-xl rounded-[2rem] bg-brand-50 px-8 py-6 text-left ring-1 ring-brand-100">
        <h3 className="text-lg font-extrabold text-brand-700">Рекомендация</h3>
        <p className="mt-2 text-lg leading-relaxed text-ink-800">{recommendation}</p>
      </div>

      <div className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
        <Button onClick={onRepeat} variant="secondary">
          <RotateCcw className="h-6 w-6" strokeWidth={2.5} />
          Повторить урок
        </Button>
        <Button onClick={onHome} variant="secondary">
          <Home className="h-6 w-6" strokeWidth={2.5} />
          На главную
        </Button>
      </div>

      <button
        type="button"
        onClick={onResetResults}
        className="mt-8 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-base font-bold text-coral-600 transition-colors hover:bg-coral-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-coral-200"
      >
        <Trash2 className="h-5 w-5" strokeWidth={2.5} />
        Сбросить результаты
      </button>
    </div>
  );
}
