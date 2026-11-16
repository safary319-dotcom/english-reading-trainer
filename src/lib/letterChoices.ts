const CHOICES_COUNT = 4;

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function buildLetterChoices(correct: string, pool: string[]): string[] {
  const isUpperCase = correct !== correct.toLowerCase();
  const forms = pool
    .map((letter) => (isUpperCase ? letter.toUpperCase() : letter))
    .filter((letter) => letter !== correct);
  return shuffle([correct, ...shuffle(forms).slice(0, CHOICES_COUNT - 1)]);
}
