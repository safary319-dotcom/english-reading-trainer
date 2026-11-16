import type { LetterInfo, ReadingWord } from '@/data/lesson1';
import { findTask, matchTask, soundTask, type LessonDefinition, type LessonStage } from '@/data/lessonStages';

const LEARNED_BEFORE = ['s', 'a', 't', 'p', 'm', 'n'];
const ALL_LETTERS = [...LEARNED_BEFORE, 'i'];

const I_SOUND = 'короткий звук, похожий на «и»';
const I_TIP = 'Звук короткий, немного похож на русское «и», но не совпадает с ним полностью.';

const LETTER_I: LetterInfo = {
  letter: 'i',
  sound: I_SOUND,
  tip: I_TIP,
};

const SIT: ReadingWord = {
  word: 'sit',
  sounds: [
    { letter: 's', hint: 'звук «с»' },
    { letter: 'i', hint: I_SOUND, tip: I_TIP },
    { letter: 't', hint: 'звук «т»' },
  ],
  meaning: 'сидеть',
  image: {
    src: 'https://images.pexels.com/photos/13663210/pexels-photo-13663210.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Человек сидит за столом',
  },
};

const PIN: ReadingWord = {
  word: 'pin',
  sounds: [
    { letter: 'p', hint: 'звук «п»' },
    { letter: 'i', hint: I_SOUND, tip: I_TIP },
    { letter: 'n', hint: 'звук «н»' },
  ],
  meaning: 'булавка',
  image: {
    src: 'https://images.pexels.com/photos/6461501/pexels-photo-6461501.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Английские булавки на рабочем столе',
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
    alt: 'Человек делает маленький глоток через трубочку',
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
    alt: 'Жестяные банки на столе',
  },
};

const TIP: ReadingWord = {
  word: 'tip',
  sounds: [
    { letter: 't', hint: 'звук «т»' },
    { letter: 'i', hint: I_SOUND, tip: I_TIP },
    { letter: 'p', hint: 'звук «п»' },
  ],
  meaning: 'совет',
  image: {
    src: 'https://images.pexels.com/photos/22307610/pexels-photo-22307610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Лампочка — символ идеи и совета',
  },
};

const PIT: ReadingWord = {
  word: 'pit',
  sounds: [
    { letter: 'p', hint: 'звук «п»' },
    { letter: 'i', hint: I_SOUND, tip: I_TIP },
    { letter: 't', hint: 'звук «т»' },
  ],
  meaning: 'яма',
  image: {
    src: 'https://images.pexels.com/photos/10045895/pexels-photo-10045895.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Яма в земле',
  },
};

const NIP: ReadingWord = {
  word: 'nip',
  sounds: [
    { letter: 'n', hint: 'звук «н»' },
    { letter: 'i', hint: I_SOUND, tip: I_TIP },
    { letter: 'p', hint: 'звук «п»' },
  ],
  meaning: 'ущипнуть',
  control: true,
  image: {
    src: 'https://images.pexels.com/photos/10029797/pexels-photo-10029797.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Жест руками',
  },
};

const REVIEW_WORDS = ['sat', 'sit', 'pat', 'pit', 'pan', 'pin', 'tap', 'tip', 'mat', 'map'];

export const LESSON_3: LessonDefinition = {
  title: 'Урок 3. Буква i',
  completeText:
    'Урок завершён! Ты выучил букву i и научился читать новые слова. Теперь ты знаешь, как одна гласная меняет слово. Отличная работа!',
  readingWords: [SIT, PIN, SIP, TIN, TIP, PIT, NIP],
  stages: [
    {
      type: 'text',
      title: 'Новая буква и новые слова!',
      text: 'Сегодня познакомимся с буквой i. Вспомни буквы, которые уже знаешь: s, a, t, p, m, n.',
      letters: LEARNED_BEFORE,
    },

    findTask('s', LEARNED_BEFORE),
    soundTask('p', 'звук «п»', LEARNED_BEFORE),
    findTask('n', LEARNED_BEFORE),
    matchTask('M', LEARNED_BEFORE),

    { type: 'letters', title: 'Знакомимся с новой буквой', letters: [LETTER_I] },
    findTask('i', ALL_LETTERS),
    findTask('I', ALL_LETTERS),
    matchTask('I', ALL_LETTERS),
    soundTask('i', I_SOUND, ALL_LETTERS),

    findTask('a', ALL_LETTERS),
    findTask('t', ALL_LETTERS),
    matchTask('i', ALL_LETTERS),
    matchTask('n', ALL_LETTERS),
    soundTask('s', 'звук «с»', ALL_LETTERS),

    { type: 'word', data: SIT },
    { type: 'word', data: PIN },
    { type: 'word', data: SIP },
    { type: 'word', data: TIN },
    { type: 'word', data: TIP },
    { type: 'word', data: PIT },

    { type: 'review', word: 'sat' },
    { type: 'review', word: 'sit' },
    { type: 'review', word: 'pat' },
    { type: 'review', word: 'pit' },
    { type: 'review', word: 'pan' },
    { type: 'review', word: 'pin' },

    { type: 'word', data: NIP },

    ...REVIEW_WORDS.map((word): LessonStage => ({ type: 'review', word })),
  ],
};
