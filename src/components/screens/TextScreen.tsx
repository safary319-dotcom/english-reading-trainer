import Button from '@/components/ui/Button';
import LatinText from '@/components/ui/LatinText';

interface TextScreenProps {
  title: string;
  text: string;
  letters?: string[];
  onNext: () => void;
}

const TILE_COLORS = ['bg-brand-500', 'bg-sun-600', 'bg-mint-600', 'bg-coral-600'];

export default function TextScreen({ title, text, letters, onNext }: TextScreenProps) {
  return (
    <div className="flex w-full flex-col items-center animate-pop-in">
      <h1 className="text-center text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-xl text-center text-xl leading-relaxed text-ink-700">
        <LatinText text={text} />
      </p>

      {letters && (
        <div className="mt-10 flex gap-4 sm:gap-6">
          {letters.map((letter, index) => (
            <span
              key={letter}
              className={`flex h-24 w-20 items-center justify-center rounded-3xl font-literacy text-6xl text-white shadow-lg sm:h-28 sm:w-24 ${TILE_COLORS[index % TILE_COLORS.length]}`}
            >
              {letter}
            </span>
          ))}
        </div>
      )}

      <Button onClick={onNext} className="mt-12">
        Дальше
      </Button>
    </div>
  );
}
