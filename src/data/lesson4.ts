import type { ReadingWord } from '@/data/lesson1';
import { type LessonDefinition, type LessonStage } from '@/data/lessonStages';

const A_HINT = 'короткий звук, похожий на «а» и «э» одновременно';
const I_SOUND = 'короткий звук, похожий на «и»';
const I_TIP = 'Звук короткий, немного похож на русское «и», но не совпадает с ним полностью.';

const TAN: ReadingWord = {
  word: 'tan',
  sounds: [
    { letter: 't', hint: 'звук «т»' },
    { letter: 'a', hint: A_HINT },
    { letter: 'n', hint: 'звук «н»' },
  ],
  meaning: 'загорать',
  image: {
    src: 'https://images.pexels.com/photos/38702703/pexels-photo-38702703.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Человек загорает на пляже',
  },
};

const TIN: ReadingWord = {
  word: 'tin',
  sounds: [
    { letter: 't', hint: 'звук «т»' },
    { letter: 'i', hint: I_SOUND, tip: I_TIP },
    { letter: 'n', hint: 'звук «н»' },
  ],
  meaning: 'жестяная банка',
  image: {
    src: 'https://images.pexels.com/photos/39630840/pexels-photo-39630840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Жестяные банки',
  },
};

const SAP: ReadingWord = {
  word: 'sap',
  sounds: [
    { letter: 's', hint: 'звук «с»' },
    { letter: 'a', hint: A_HINT },
    { letter: 'p', hint: 'звук «п»' },
  ],
  meaning: 'древесный сок',
  image: {
    src: 'https://images.pexels.com/photos/35963724/pexels-photo-35963724.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Сок дерева на коре',
  },
};

const SIP: ReadingWord = {
  word: 'sip',
  sounds: [
    { letter: 's', hint: 'звук «с»' },
    { letter: 'i', hint: I_SOUND, tip: I_TIP },
    { letter: 'p', hint: 'звук «п»' },
  ],
  meaning: 'маленький глоток',
  image: {
    src: 'https://images.pexels.com/photos/6544070/pexels-photo-6544070.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Человек делает глоток через трубочку',
  },
};

const FAMILIAR_PAIRS = ['sat', 'sit', 'pat', 'pit', 'pan', 'pin'];

const INDEPENDENT_WORDS = ['tan', 'sip', 'tin', 'sap'];

export const LESSON_4: LessonDefinition = {
  title: 'Урок 4. Одна буква меняет слово',
  completeText:
    'Урок завершён! Ты заметил, как одна буква меняет слово. Сравнивай пары слов — это помогает читать увереннее!',
  readingWords: [TAN, TIN, SAP, SIP],
  stages: [
    {
      type: 'text',
      title: 'Одна буква меняет слово!',
      text: 'Сегодня мы увидим, как замена одной буквы — гласной — меняет всё слово. Сравнивай пары внимательно!',
    },

    ...FAMILIAR_PAIRS.map((word): LessonStage => ({ type: 'review', word })),

    { type: 'word', data: TAN },
    { type: 'word', data: TIN },

    { type: 'word', data: SAP },
    { type: 'word', data: SIP },

    ...INDEPENDENT_WORDS.map((word): LessonStage => ({ type: 'review', word })),
  ],
};
