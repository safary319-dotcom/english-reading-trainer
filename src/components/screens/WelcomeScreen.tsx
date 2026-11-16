import { Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import LatinText from '@/components/ui/LatinText';
import { LESSON_1 } from '@/data/lesson1';
import { LESSON_2 } from '@/data/lesson2';
import { LESSON_3 } from '@/data/lesson3';
import { LESSON_4 } from '@/data/lesson4';
import type { LessonDefinition } from '@/data/lessonStages';

interface WelcomeScreenProps {
  onStart: (lesson: LessonDefinition) => void;
}

const FLOATING_LETTERS = [
  { letter: 's', className: 'bg-brand-500 -rotate-6', delay: '0s' },
  { letter: 'a', className: 'bg-sun-600 rotate-3', delay: '0.4s' },
  { letter: 't', className: 'bg-mint-600 -rotate-3', delay: '0.8s' },
  { letter: 'p', className: 'bg-coral-600 rotate-6', delay: '1.2s' },
];

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-brand-100 via-white to-sun-100 px-6 py-12 text-center">
      <div className="flex gap-4 sm:gap-6">
        {FLOATING_LETTERS.map(({ letter, className, delay }) => (
          <div
            key={letter}
            className={`flex h-20 w-20 animate-bounce-soft items-center justify-center rounded-3xl font-literacy text-5xl text-white shadow-lg sm:h-24 sm:w-24 sm:text-6xl ${className}`}
            style={{ animationDelay: delay }}
          >
            {letter}
          </div>
        ))}
      </div>

      <h1 className="mt-12 text-5xl font-extrabold leading-tight text-ink-900 sm:text-6xl">Готов читать?</h1>
      <p className="mt-6 max-w-xl text-xl leading-relaxed text-ink-700">
        Сегодня ты познакомишься с буквами и прочитаешь первые английские слова. Это просто и интересно!
      </p>

      <Button onClick={() => onStart(LESSON_1)} className="mt-12 px-12 py-5 text-2xl">
        <Sparkles className="h-7 w-7" strokeWidth={2.5} />
        Начать обучение
      </Button>

      <Button onClick={() => onStart(LESSON_2)} variant="secondary" className="mt-4 px-12 py-4 text-xl">
        <LatinText text="Урок 2: буквы m и n" />
      </Button>

      <Button onClick={() => onStart(LESSON_3)} variant="secondary" className="mt-4 px-12 py-4 text-xl">
        <LatinText text="Урок 3: буква i" />
      </Button>

      <Button onClick={() => onStart(LESSON_4)} variant="secondary" className="mt-4 px-12 py-4 text-xl">
        <LatinText text="Урок 4: одна буква меняет слово" />
      </Button>
    </div>
  );
}
