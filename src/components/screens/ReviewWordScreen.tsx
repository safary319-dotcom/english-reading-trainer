import Button from '@/components/ui/Button';
import { PhaseHeading, WordCard } from '@/components/screens/WordScreen';

interface ReviewWordScreenProps {
  word: string;
  onNext: () => void;
}

export default function ReviewWordScreen({ word, onNext }: ReviewWordScreenProps) {
  return (
    <div className="flex w-full flex-col items-center animate-pop-in">
      <p className="mb-6 text-lg font-extrabold uppercase tracking-wide text-brand-600">Повторяем слова</p>
      <PhaseHeading title="Прочитай слово" subtitle="Читай слово целиком, без подсказок." />
      <div className="mt-10 w-full">
        <WordCard>{word}</WordCard>
      </div>
      <Button onClick={onNext} className="mt-12">
        Дальше
      </Button>
    </div>
  );
}
