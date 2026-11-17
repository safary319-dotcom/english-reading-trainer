import Button from '@/components/ui/Button';
import { PhaseHeading, WordCard } from '@/components/screens/WordScreen';
import type { WordPair } from '@/data/lessonStages';

interface PairsScreenProps {
  title: string;
  subtitle?: string;
  pairs: WordPair[];
  onNext: () => void;
}

export default function PairsScreen({ title, subtitle, pairs, onNext }: PairsScreenProps) {
  return (
    <div className="flex w-full flex-col items-center animate-pop-in">
      <p className="mb-6 text-lg font-extrabold uppercase tracking-wide text-brand-600">Сравниваем слова</p>
      <PhaseHeading title={title} subtitle={subtitle} />
      <div className="mt-10 grid w-full gap-6">
        {pairs.map((pair, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <WordCard>{pair.a}</WordCard>
            <WordCard>{pair.b}</WordCard>
          </div>
        ))}
      </div>
      <Button onClick={onNext} className="mt-12">
        Дальше
      </Button>
    </div>
  );
}
