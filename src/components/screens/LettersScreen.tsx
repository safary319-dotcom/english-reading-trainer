import Button from '@/components/ui/Button';
import LatinText from '@/components/ui/LatinText';
import type { LetterInfo } from '@/data/lesson1';

interface LettersScreenProps {
  title: string;
  text?: string;
  letters: LetterInfo[];
  onNext: () => void;
}

const CARD_COLORS = [
  'bg-brand-500',
  'bg-sun-600',
  'bg-mint-600',
  'bg-coral-600',
];

function LetterCard({ info, colorClass }: { info: LetterInfo; colorClass: string }) {
  return (
    <div className="flex flex-col items-center rounded-[2rem] bg-white p-6 text-center shadow-lg shadow-brand-100 ring-1 ring-ink-200 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className={`flex h-28 w-full items-center justify-center gap-4 rounded-3xl text-white ${colorClass}`}>
        <span className="font-literacy text-6xl leading-none">{info.letter.toUpperCase()}</span>
        <span className="font-literacy text-6xl leading-none">{info.letter}</span>
      </div>
      <p className="mt-5 text-xl font-extrabold text-ink-900">{info.sound}</p>
      {info.tip && (
        <p className="mt-3 text-lg leading-relaxed text-ink-700">
          <LatinText text={info.tip} />
        </p>
      )}
    </div>
  );
}

export default function LettersScreen({ title, text, letters, onNext }: LettersScreenProps) {
  return (
    <div className="flex w-full flex-col items-center animate-pop-in">
      <h1 className="text-center text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">{title}</h1>
      {text && <p className="mt-4 max-w-xl text-center text-xl leading-relaxed text-ink-700">{text}</p>}

      <div className={`mt-10 grid w-full gap-6 ${letters.length > 1 ? 'sm:grid-cols-2' : 'max-w-md'}`}>
        {letters.map((info, index) => (
          <LetterCard key={info.letter} info={info} colorClass={CARD_COLORS[index]} />
        ))}
      </div>

      <Button onClick={onNext} className="mt-12">
        Дальше
      </Button>
    </div>
  );
}
