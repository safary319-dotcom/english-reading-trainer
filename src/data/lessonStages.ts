import type { LetterInfo, ReadingWord } from '@/data/lesson1';

export interface ChoiceStage {
  type: 'choice';
  eyebrow: string;
  heading: string;
  hint: string;
  shown: string;
  correct: string;
  pool: string[];
  prompt?: string;
}

export type LessonStage =
  | { type: 'text'; title: string; text: string; letters?: string[] }
  | { type: 'letters'; title: string; text?: string; letters: LetterInfo[] }
  | ChoiceStage
  | { type: 'word'; data: ReadingWord }
  | { type: 'review'; word: string };

export interface LessonDefinition {
  title: string;
  completeText: string;
  readingWords: ReadingWord[];
  stages: LessonStage[];
}

export function findTask(letter: string, pool: string[]): ChoiceStage {
  return {
    type: 'choice',
    eyebrow: 'Упражнение «Найди букву»',
    heading: 'Найди букву',
    hint: 'Выбери такую же букву среди вариантов',
    shown: letter,
    correct: letter,
    pool,
  };
}

export function matchTask(letter: string, pool: string[]): ChoiceStage {
  const isUpperCase = letter !== letter.toLowerCase();
  return {
    type: 'choice',
    eyebrow: 'Упражнение «Соответствие»',
    heading: 'Найди пару',
    hint: isUpperCase
      ? 'Найди маленькую букву, которая соответствует большой'
      : 'Найди большую букву, которая соответствует маленькой',
    shown: letter,
    correct: isUpperCase ? letter.toLowerCase() : letter.toUpperCase(),
    pool,
  };
}

export function soundTask(letter: string, sound: string, pool: string[]): ChoiceStage {
  return {
    type: 'choice',
    eyebrow: 'Упражнение «Буква по звуку»',
    heading: 'Найди букву по звуку',
    hint: 'Выбери букву, которая даёт этот звук',
    shown: letter,
    correct: letter,
    pool,
    prompt: sound,
  };
}
