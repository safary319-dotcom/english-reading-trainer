import { findTask, type LessonDefinition, type LessonStage } from '@/data/lessonStages';

export interface LetterInfo {
  letter: string;
  sound: string;
  tip?: string;
}

export interface SoundPart {
  letter: string;
  hint: string;
  tip?: string;
}

export interface ReadingImage {
  src: string;
  alt: string;
}

export interface ReadingWord {
  word: string;
  sounds: SoundPart[];
  meaning: string;
  image?: ReadingImage;
  control?: boolean;
}

export type ReadingResult = 'independent' | 'assisted' | 'failed';

export const READING_RESULT_OPTIONS: { value: ReadingResult; label: string }[] = [
  { value: 'independent', label: 'Прочитал самостоятельно' },
  { value: 'assisted', label: 'Прочитал с помощью' },
  { value: 'failed', label: 'Не получилось' },
];

export const LESSON_TITLE = 'Урок 1. Буквы s, a, t, p';

export const LETTER_A_TIP =
  'Открой рот немного шире, чем для русского звука «э». Звук короткий, язык находится низко и ближе к передней части рта.';

export const LESSON_LETTERS: LetterInfo[] = [
  {
    letter: 's',
    sound: 'звук «с»',
  },
  {
    letter: 'a',
    sound: 'короткий широкий звук',
    tip: LETTER_A_TIP,
  },
  {
    letter: 't',
    sound: 'звук «т»',
  },
  {
    letter: 'p',
    sound: 'звук «п»',
  },
];

export const READING_WORDS: ReadingWord[] = [
  {
    word: 'sat',
    sounds: [
      { letter: 's', hint: 'звук «с»' },
      { letter: 'a', hint: 'короткий широкий звук', tip: LETTER_A_TIP },
      { letter: 't', hint: 'звук «т»' },
    ],
    meaning: 'сидел(а)',
  },
  {
    word: 'pat',
    sounds: [
      { letter: 'p', hint: 'звук «п»' },
      { letter: 'a', hint: 'короткий широкий звук', tip: LETTER_A_TIP },
      { letter: 't', hint: 'звук «т»' },
    ],
    meaning: 'похлопать, легонько погладить',
  },
  {
    word: 'tap',
    sounds: [
      { letter: 't', hint: 'звук «т»' },
      { letter: 'a', hint: 'короткий широкий звук', tip: LETTER_A_TIP },
      { letter: 'p', hint: 'звук «п»' },
    ],
    meaning: 'кран',
  },
];

export const LESSON_COMPLETE_TEXT =
  'Урок завершён! Сегодня ты познакомился с буквами s, a, t, p и попробовал читать первые английские слова. Отличная работа!';

const LESSON_LETTER_CHARS = LESSON_LETTERS.map((info) => info.letter);

export const LESSON_1: LessonDefinition = {
  title: LESSON_TITLE,
  completeText: LESSON_COMPLETE_TEXT,
  readingWords: READING_WORDS,
  stages: [
    {
      type: 'letters',
      title: 'Знакомимся с буквами',
      text: 'Запомни, как выглядит каждая буква: маленькая и большая. Смотри на них внимательно.',
      letters: LESSON_LETTERS,
    },
    ...LESSON_LETTERS.map((info) => findTask(info.letter, LESSON_LETTER_CHARS)),
    ...READING_WORDS.map((data): LessonStage => ({ type: 'word', data })),
  ],
};
