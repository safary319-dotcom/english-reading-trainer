import WordScreen from '@/components/screens/WordScreen';
import LettersScreen from '@/components/screens/LettersScreen';
import LetterChoiceScreen from '@/components/screens/LetterChoiceScreen';
import ReviewWordScreen from '@/components/screens/ReviewWordScreen';
import TextScreen from '@/components/screens/TextScreen';
import PairsScreen from '@/components/screens/PairsScreen';
import CheckWordScreen from '@/components/screens/CheckWordScreen';
import type { ReadingResult } from '@/data/lesson1';
import type { LessonStage } from '@/data/lessonStages';

export interface ReadingResults {
  first: Partial<Record<string, ReadingResult>>;
  repeat: Partial<Record<string, ReadingResult>>;
}

interface LessonStageViewProps {
  stage: LessonStage;
  readingResults: ReadingResults;
  onFirstResult: (word: string, result: ReadingResult) => void;
  onRepeatResult: (word: string, result: ReadingResult) => void;
  onNext: () => void;
}

export default function LessonStageView({
  stage,
  readingResults,
  onFirstResult,
  onRepeatResult,
  onNext,
}: LessonStageViewProps) {
  switch (stage.type) {
    case 'text':
      return <TextScreen title={stage.title} text={stage.text} letters={stage.letters} onNext={onNext} />;
    case 'letters':
      return <LettersScreen title={stage.title} text={stage.text} letters={stage.letters} onNext={onNext} />;
    case 'choice':
      return <LetterChoiceScreen task={stage} onNext={onNext} />;
    case 'word':
      return (
        <WordScreen
          data={stage.data}
          firstResult={readingResults.first[stage.data.word]}
          repeatResult={readingResults.repeat[stage.data.word]}
          onFirstResult={(result) => onFirstResult(stage.data.word, result)}
          onRepeatResult={(result) => onRepeatResult(stage.data.word, result)}
          onNext={onNext}
        />
      );
    case 'review':
      return <ReviewWordScreen word={stage.word} onNext={onNext} />;
    case 'pairs':
      return <PairsScreen title={stage.title} subtitle={stage.subtitle} pairs={stage.pairs} onNext={onNext} />;
    case 'check':
      return (
        <CheckWordScreen
          word={stage.word}
          result={readingResults.first[stage.word]}
          onResult={(result) => onFirstResult(stage.word, result)}
          onNext={onNext}
        />
      );
  }
}
