import type { LetterInfo, ReadingWord } from '@/data/lesson1';
import { findTask, matchTask, soundTask, type LessonDefinition, type LessonStage } from '@/data/lessonStages';

const LEARNED = ['s', 'a', 't', 'p'];
const LEARNED_WITH_M = [...LEARNED, 'm'];
const ALL_LETTERS = [...LEARNED, 'm', 'n'];

const LETTER_M: LetterInfo = {
  letter: 'm',
  sound: 'звук «м»',
  tip: 'Это буква M m. Звук похож на русский «м».',
};

const LETTER_N: LetterInfo = {
  letter: 'n',
  sound: 'звук «н»',
  tip: 'Это буква N n. Звук похож на русский «н».',
};

const MAT: ReadingWord = {
  word: 'mat',
  sounds: [
    { letter: 'm', hint: 'звук «м»' },
    { letter: 'a', hint: 'особый короткий английский звук, не русский «а»' },
    { letter: 't', hint: 'звук «т»' },
  ],
  meaning: 'коврик',
  image: {
    src: 'https://images.pexels.com/photos/5840868/pexels-photo-5840868.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Коврик у двери',
  },
};

const MAP: ReadingWord = {
  word: 'map',
  sounds: [
    { letter: 'm', hint: 'звук «м»' },
    { letter: 'a', hint: 'особый короткий английский звук, не русский «а»' },
    { letter: 'p', hint: 'звук «п»' },
  ],
  meaning: 'карта',
  image: {
    src: 'https://images.pexels.com/photos/5302807/pexels-photo-5302807.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Свёрнутые карты на деревянном столе',
  },
};

const MAN: ReadingWord = {
  word: 'man',
  sounds: [
    { letter: 'm', hint: 'звук «м»' },
    { letter: 'a', hint: 'особый короткий английский звук, не русский «а»' },
    { letter: 'n', hint: 'звук «н»' },
  ],
  meaning: 'мужчина',
  image: {
    src: 'https://images.pexels.com/photos/36712860/pexels-photo-36712860.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Мужчина с бородой',
  },
};

const PAN: ReadingWord = {
  word: 'pan',
  sounds: [
    { letter: 'p', hint: 'звук «п»' },
    { letter: 'a', hint: 'особый короткий английский звук, не русский «а»' },
    { letter: 'n', hint: 'звук «н»' },
  ],
  meaning: 'сковорода',
  image: {
    src: 'https://images.pexels.com/photos/5093685/pexels-photo-5093685.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Сковорода на плите',
  },
};

const REVIEW_WORDS = ['map', 'sat', 'man', 'tap', 'pat', 'pan', 'mat'];

export const LESSON_2: LessonDefinition = {
  title: 'Урок 2. Буквы m, n',
  completeText:
    'Отличная работа! Сегодня ты познакомился с двумя новыми буквами и научился читать новые слова. Продолжай тренироваться!',
  readingWords: [MAT, MAP, MAN, PAN],
  stages: [
    {
      type: 'text',
      title: 'Продолжаем учиться читать по-английски!',
      text: 'Сегодня познакомимся с двумя новыми буквами. Вспомни буквы, которые уже знаешь.',
      letters: LEARNED,
    },
    findTask('a', LEARNED),
    soundTask('T', 'звук «т»', LEARNED),
    findTask('p', LEARNED),

    { type: 'letters', title: 'Знакомимся с новой буквой', letters: [LETTER_M] },
    findTask('m', LEARNED_WITH_M),
    findTask('M', LEARNED_WITH_M),
    matchTask('M', LEARNED_WITH_M),

    { type: 'letters', title: 'Знакомимся с новой буквой', letters: [LETTER_N] },
    findTask('n', ALL_LETTERS),
    findTask('N', ALL_LETTERS),
    findTask('n', ALL_LETTERS),
    findTask('m', ALL_LETTERS),

    findTask('s', ALL_LETTERS),
    findTask('T', ALL_LETTERS),
    matchTask('A', ALL_LETTERS),
    matchTask('n', ALL_LETTERS),
    soundTask('p', 'звук «п»', ALL_LETTERS),

    { type: 'word', data: MAT },
    { type: 'word', data: MAP },
    { type: 'word', data: MAN },
    { type: 'word', data: PAN },

    ...REVIEW_WORDS.map((word): LessonStage => ({ type: 'review', word })),
  ],
};
