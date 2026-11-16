import type { ReadingResult } from '@/data/lesson1';

export type WordCategory = 'confident' | 'progress' | 'needsWork' | 'insufficient';

export interface WordProgress {
  word: string;
  firstResult: ReadingResult | undefined;
  repeatResult: ReadingResult | undefined;
  control?: boolean;
}

export interface ProgressSummary {
  confident: number;
  progress: number;
  needsWork: number;
  insufficient: number;
  unstable: number;
  total: number;
}

export function categorizeWord(
  first: ReadingResult | undefined,
  repeat: ReadingResult | undefined,
): WordCategory {
  if (!first || !repeat) return 'insufficient';
  if (first === 'independent' && repeat === 'independent') return 'confident';
  if (repeat === 'independent') return 'progress';
  return 'needsWork';
}

export function summarizeProgress(rows: WordProgress[]): ProgressSummary {
  const training = rows.filter((row) => !row.control);
  const summary: ProgressSummary = {
    confident: 0,
    progress: 0,
    needsWork: 0,
    insufficient: 0,
    unstable: 0,
    total: training.length,
  };
  for (const row of training) {
    const category = categorizeWord(row.firstResult, row.repeatResult);
    summary[category] += 1;
    if (isUnstable(row.firstResult, row.repeatResult)) summary.unstable += 1;
  }
  return summary;
}

export function isUnstable(
  first: ReadingResult | undefined,
  repeat: ReadingResult | undefined,
): boolean {
  return first === 'independent' && !!repeat && repeat !== 'independent';
}

export function controlMessage(result: ReadingResult | undefined): string {
  if (!result) return 'Результат не отмечен — попросите ребёнка прочитать слово и отметьте, как получилось.';
  if (result === 'independent')
    return 'Отлично! Ребёнок самостоятельно прочитал новое слово из изученных букв.';
  return 'Новое слово пока не удалось прочитать самостоятельно. Это результат проверки. Продолжай тренироваться на знакомых словах.';
}

export function childMessage(summary: ProgressSummary): string {
  const { confident, progress, needsWork, insufficient, total } = summary;
  if (total === 0 || insufficient === total) {
    return 'Ты закончил урок! Давай посмотрим, что у тебя получилось';
  }
  if (needsWork > 0) {
    return 'Ты уже многому научился. Давай ещё немного потренируемся!';
  }
  if (progress > 0) {
    return 'Здорово! После разбора ты смог прочитать слова самостоятельно!';
  }
  if (confident === total) {
    return 'Отличная работа! Ты уже умеешь читать эти слова!';
  }
  return 'Молодец! Ты прошёл весь урок!';
}

export function adultRecommendation(summary: ProgressSummary): string {
  const { confident, progress, needsWork, insufficient, unstable, total } = summary;
  if (total === 0) {
    return 'Отметьте результаты чтения для всех слов, чтобы получить рекомендацию.';
  }
  if (unstable > 0) {
    return insufficient > 0
      ? 'Некоторые слова ребёнок прочитал самостоятельно в начале, но не смог повторить после разбора — навык пока нестабилен. Рекомендуется дополнительное закрепление этих слов. Отметьте результаты для всех слов, чтобы получить полную картину.'
      : 'Некоторые слова ребёнок прочитал самостоятельно в начале, но не смог повторить после разбора — навык пока нестабилен. Рекомендуется дополнительное закрепление этих слов. Решение о переходе к следующему уроку остаётся за вами.';
  }
  if (needsWork > 0) {
    return insufficient > 0
      ? 'Рекомендуется повторить слова, которые требуют закрепления. Отметьте результаты для всех слов, чтобы получить полную картину.'
      : 'Рекомендуется повторить слова, которые требуют закрепления. Решение о переходе к следующему уроку остаётся за вами.';
  }
  if (progress > 0) {
    return insufficient > 0
      ? 'Полезно ещё раз прочитать слова, чтобы закрепить самостоятельное чтение. Отметьте результаты для остальных слов.'
      : 'Полезно ещё раз прочитать слова, чтобы закрепить самостоятельное чтение. Можно переходить к следующему уроку.';
  }
  if (confident === total) {
    return 'Все слова прочитаны уверенно — можно переходить к следующему уроку.';
  }
  return 'Отметьте результаты чтения для всех слов, чтобы получить полную рекомендацию.';
}
