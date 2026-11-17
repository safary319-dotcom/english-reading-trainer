import { useEffect, useState, type ReactNode } from 'react';
import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { READING_RESULT_OPTIONS, type ReadingResult, type ReadingWord } from '@/data/lesson1';

interface WordScreenProps {
  data: ReadingWord;
  firstResult: ReadingResult | undefined;
  repeatResult: ReadingResult | undefined;
  onFirstResult: (result: ReadingResult) => void;
  onRepeatResult: (result: ReadingResult) => void;
  onNext: () => void;
}

type WordPhase = 'try' | 'sounds' | 'blend' | 'repeat' | 'meaning';

function getInitialPhase(
  firstResult: ReadingResult | undefined,
  repeatResult: ReadingResult | undefined,
  isControl: boolean,
): WordPhase {
  if (isControl) return firstResult ? 'meaning' : 'try';
  if (firstResult && repeatResult) return 'meaning';
  if (firstResult) return 'sounds';
  return 'try';
}

const BLEND_STEP_MS = 900;
const BLEND_START_DELAY_MS = 600;

export function WordCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-48 w-full items-center justify-center rounded-[2.5rem] bg-white px-10 py-12 shadow-xl shadow-brand-100 ring-1 ring-ink-200">
      <span className="font-literacy text-7xl tracking-wide text-brand-700 sm:text-8xl">{children}</span>
    </div>
  );
}

function HighlightedWord({ word, activeIndex }: { word: string; activeIndex: number }) {
  return (
    <>
      {word.split('').map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className={`rounded-2xl px-1 transition-colors duration-300 ${index === activeIndex ? 'bg-sun-300 text-ink-900' : ''}`}
        >
          {letter}
        </span>
      ))}
    </>
  );
}

export function PhaseHeading({ title, subtitle }: { title: ReactNode; subtitle?: string }) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-xl leading-relaxed text-ink-700">{subtitle}</p>}
    </div>
  );
}

export function ResultChooser({ result, onResult }: { result: ReadingResult | undefined; onResult: (result: ReadingResult) => void }) {
  return (
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
              {isSelected && <Check className="h-6 w-6 shrink-0 text-mint-700" strokeWidth={3} />}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-center text-base leading-relaxed text-ink-500">
        Если ребёнок ошибся, а потом прочитал с помощью взрослого, выбери «Прочитал с помощью». Самостоятельным считается чтение без подсказки.
      </p>
    </div>
  );
}

function TryPhase({
  data,
  result,
  onResult,
  onNext,
}: {
  data: ReadingWord;
  result: ReadingResult | undefined;
  onResult: (result: ReadingResult) => void;
  onNext: () => void;
}) {
  return (
    <>
      <PhaseHeading
        title="Попробуй прочитать слово сам"
        subtitle={
          data.control
            ? 'Это новое слово. Ребёнок читает его вслух без подсказок, а взрослый отмечает, как получилось.'
            : 'Ребёнок читает слово вслух без подсказок, а взрослый отмечает, как получилось.'
        }
      />
      <div className="mt-10 w-full">
        <WordCard>{data.word}</WordCard>
      </div>
      <ResultChooser result={result} onResult={onResult} />
      <Button onClick={onNext} disabled={!result} className="mt-10">
        {data.control ? 'Узнать значение слова' : 'Разобрать слово на звуки'}
      </Button>
    </>
  );
}

function SoundsPhase({ data, onNext }: { data: ReadingWord; onNext: () => void }) {
  const tips = data.sounds.filter((part) => part.tip);

  return (
    <>
      <PhaseHeading
        title="Разбираем на звуки"
        subtitle="Каждая буква в слове читается как свой звук. Читай их по порядку."
      />
      <div className="mt-10 flex flex-col items-center gap-6">
        <div className="flex gap-3 sm:gap-4">
          {data.sounds.map((part, index) => (
            <div key={`${part.letter}-${index}`} className="flex flex-col items-center gap-3">
              <span className="flex h-24 w-20 items-center justify-center rounded-3xl bg-brand-500 font-literacy text-6xl text-white shadow-lg sm:h-28 sm:w-24">
                {part.letter}
              </span>
              <span className="max-w-[7rem] text-center text-lg font-bold text-ink-700">{part.hint}</span>
            </div>
          ))}
        </div>
        <p className="rounded-2xl bg-sun-100 px-6 py-3 text-lg font-bold text-ink-800">
          Вместе: <span className="font-literacy">{data.sounds.map((part) => part.letter).join(' + ')}</span>
        </p>
        {tips.map((part, index) => (
          <div key={`tip-${index}`} className="max-w-xl rounded-3xl bg-mint-100 px-6 py-5 text-lg leading-relaxed text-ink-800">
            <span className="font-extrabold text-mint-700">Как произнести букву «<span className="font-literacy">{part.letter}</span>»: </span>
            {part.tip}
          </div>
        ))}
      </div>
      <Button onClick={onNext} className="mt-12">
        Соединить звуки
      </Button>
    </>
  );
}

function BlendPhase({ data, onNext }: { data: ReadingWord; onNext: () => void }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const soundCount = data.sounds.length;
  const isBlended = activeIndex >= soundCount;

  useEffect(() => {
    const timers = data.sounds.map((_, index) =>
      window.setTimeout(() => setActiveIndex(index), BLEND_START_DELAY_MS + index * BLEND_STEP_MS),
    );
    timers.push(
      window.setTimeout(() => setActiveIndex(soundCount), BLEND_START_DELAY_MS + soundCount * BLEND_STEP_MS),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [data, soundCount]);

  return (
    <>
      <PhaseHeading
        title={isBlended ? 'Звуки соединились!' : 'Соединяем звуки'}
        subtitle={
          isBlended
            ? 'Теперь прочитаем всё слово целиком.'
            : 'Произноси звуки по порядку, не отрывая их друг от друга.'
        }
      />
      <div className="mt-10 w-full">
        <WordCard>
          <HighlightedWord word={data.word} activeIndex={isBlended ? -1 : activeIndex} />
        </WordCard>
      </div>
      <Button onClick={onNext} disabled={!isBlended} className="mt-12">
        Прочитать слово целиком
      </Button>
    </>
  );
}

function RepeatPhase({
  data,
  repeatResult,
  onRepeatResult,
  onNext,
}: {
  data: ReadingWord;
  repeatResult: ReadingResult | undefined;
  onRepeatResult: (result: ReadingResult) => void;
  onNext: () => void;
}) {
  return (
    <>
      <PhaseHeading
        title="Прочитай слово целиком"
        subtitle="Теперь прочитай всё слово вслух одним куском."
      />
      <div className="mt-10 w-full animate-pop-in">
        <WordCard>{data.word}</WordCard>
      </div>
      <ResultChooser result={repeatResult} onResult={onRepeatResult} />
      <Button onClick={onNext} disabled={!repeatResult} className="mt-10">
        Что значит это слово?
      </Button>
    </>
  );
}

function MeaningPhase({ data, onNext }: { data: ReadingWord; onNext: () => void }) {
  return (
    <>
      <PhaseHeading title={<>Значение слова «<span className="font-literacy">{data.word}</span>»</>} />
      <div className="mt-10 w-full rounded-[2.5rem] bg-white p-8 text-center shadow-xl shadow-brand-100 ring-1 ring-ink-200 animate-pop-in">
        {data.image && <img src={data.image.src} alt={data.image.alt} className="mb-6 h-56 w-full rounded-3xl object-cover" />}
        <p className="font-literacy text-5xl text-brand-700">{data.word}</p>
        <p className="mt-4 text-2xl font-bold text-ink-900">— {data.meaning}</p>
      </div>
      <Button onClick={onNext} className="mt-12">
        Дальше
      </Button>
    </>
  );
}

export default function WordScreen({
  data,
  firstResult,
  repeatResult,
  onFirstResult,
  onRepeatResult,
  onNext,
}: WordScreenProps) {
  const [phase, setPhase] = useState<WordPhase>(() =>
    getInitialPhase(firstResult, repeatResult, !!data.control),
  );

  return (
    <div className="flex w-full flex-col items-center animate-pop-in">
      <p className="mb-6 text-lg font-extrabold uppercase tracking-wide text-brand-600">Читаем слово</p>
      {phase === 'try' && (
        <TryPhase
          data={data}
          result={firstResult}
          onResult={onFirstResult}
          onNext={() => setPhase(data.control ? 'meaning' : 'sounds')}
        />
      )}
      {phase === 'sounds' && <SoundsPhase data={data} onNext={() => setPhase('blend')} />}
      {phase === 'blend' && <BlendPhase data={data} onNext={() => setPhase('repeat')} />}
      {phase === 'repeat' && (
        <RepeatPhase
          data={data}
          repeatResult={repeatResult}
          onRepeatResult={onRepeatResult}
          onNext={() => setPhase('meaning')}
        />
      )}
      {phase === 'meaning' && <MeaningPhase data={data} onNext={onNext} />}
    </div>
  );
}
