import { type LessonDefinition, type LessonStage, type WordPair } from '@/data/lessonStages';

const CHECK_WORDS = ['tan', 'tin', 'sap', 'sip'];

const FAMILIAR_PAIRS: WordPair[] = [
  { a: 'sat', b: 'sit' },
  { a: 'pat', b: 'pit' },
  { a: 'pan', b: 'pin' },
];

function shuffleOnce<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const CHECK_ORDER = shuffleOnce(CHECK_WORDS);

export const LESSON_4: LessonDefinition = {
  title: 'Урок 4. Одна буква меняет слово',
  completeText:
    'Урок завершён! Ты заметил, как одна буква меняет слово. Сравнивай пары слов — это помогает читать увереннее!',
  readingWords: [
    { word: 'tan', sounds: [], meaning: '', control: true },
    { word: 'tin', sounds: [], meaning: '', control: true },
    { word: 'sap', sounds: [], meaning: '', control: true },
    { word: 'sip', sounds: [], meaning: '', control: true },
  ],
  stages: [
    {
      type: 'text',
      title: 'Одна буква меняет слово!',
      text: 'Сегодня мы увидим, как замена одной буквы — гласной — меняет всё слово. Сравнивай пары внимательно!',
    },

    {
      type: 'pairs',
      title: 'Сравни пары слов',
      subtitle:
        'Посмотри: в каждой паре слова отличаются только одной буквой. Замена одной буквы меняет слово.',
      pairs: FAMILIAR_PAIRS,
    },

    ...CHECK_ORDER.map((word): LessonStage => ({ type: 'check', word })),
  ],
};
