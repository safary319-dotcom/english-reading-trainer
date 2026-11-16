import { useCallback, useEffect, useState } from 'react';
import LessonShell from '@/components/LessonShell';
import LessonStageView, { type ReadingResults } from '@/components/LessonStageView';
import WelcomeScreen from '@/components/screens/WelcomeScreen';
import CompletionScreen from '@/components/screens/CompletionScreen';
import type { ReadingResult } from '@/data/lesson1';
import type { LessonDefinition } from '@/data/lessonStages';

const STORAGE_PREFIX = 'reading-app:lesson';

interface PersistedState {
  stageIndex: number;
  results: ReadingResults;
}

const emptyResults = (): ReadingResults => ({ first: {}, repeat: {} });

function loadPersisted(lessonTitle: string): PersistedState | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}:${lessonTitle}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (
      parsed &&
      typeof parsed.stageIndex === 'number' &&
      parsed.results &&
      typeof parsed.results.first === 'object' &&
      typeof parsed.results.repeat === 'object'
    ) {
      return parsed;
    }
  } catch {
    /* ignore malformed JSON */
  }
  return null;
}

function savePersisted(lessonTitle: string, state: PersistedState) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}:${lessonTitle}`, JSON.stringify(state));
  } catch {
    /* storage may be full or unavailable */
  }
}

function clearPersisted(lessonTitle: string) {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}:${lessonTitle}`);
  } catch {
    /* ignore */
  }
}

export default function App() {
  const [lesson, setLesson] = useState<LessonDefinition | null>(null);
  const [stageIndex, setStageIndex] = useState(0);
  const [readingResults, setReadingResults] = useState<ReadingResults>(emptyResults());

  useEffect(() => {
    if (!lesson) return;
    const persisted = loadPersisted(lesson.title);
    if (persisted) {
      setStageIndex(persisted.stageIndex);
      setReadingResults(persisted.results);
    } else {
      setStageIndex(0);
      setReadingResults(emptyResults());
    }
  }, [lesson]);

  useEffect(() => {
    if (!lesson) return;
    savePersisted(lesson.title, { stageIndex, results: readingResults });
  }, [lesson, stageIndex, readingResults]);

  const resetLesson = useCallback(() => {
    if (lesson) clearPersisted(lesson.title);
    setStageIndex(0);
    setReadingResults(emptyResults());
  }, [lesson]);

  const startLesson = (selected: LessonDefinition) => {
    setLesson(selected);
  };

  const goHome = () => {
    setLesson(null);
  };

  const resetResultsOnly = () => {
    setReadingResults(emptyResults());
    setStageIndex(0);
    if (lesson) clearPersisted(lesson.title);
  };

  if (!lesson) {
    return <WelcomeScreen onStart={startLesson} />;
  }

  const stages = lesson.stages;
  const isFinished = stageIndex >= stages.length;
  const goNext = () => setStageIndex((index) => index + 1);
  const setFirstResult = (word: string, result: ReadingResult) =>
    setReadingResults((prev) =>
      prev.first[word] ? prev : { ...prev, first: { ...prev.first, [word]: result } },
    );
  const setRepeatResult = (word: string, result: ReadingResult) =>
    setReadingResults((prev) => ({ ...prev, repeat: { ...prev.repeat, [word]: result } }));

  if (isFinished) {
    return (
      <LessonShell title={lesson.title} completedSteps={stages.length} totalSteps={stages.length} onHome={goHome}>
        <CompletionScreen
          completeText={lesson.completeText}
          results={lesson.readingWords.map((data) => ({
            word: data.word,
            firstResult: readingResults.first[data.word],
            repeatResult: readingResults.repeat[data.word],
            control: data.control,
          }))}
          onRepeat={resetLesson}
          onHome={goHome}
          onResetResults={resetResultsOnly}
        />
      </LessonShell>
    );
  }

  return (
    <LessonShell title={lesson.title} completedSteps={stageIndex} totalSteps={stages.length} onHome={goHome}>
      <LessonStageView
        key={stageIndex}
        stage={stages[stageIndex]}
        readingResults={readingResults}
        onFirstResult={setFirstResult}
        onRepeatResult={setRepeatResult}
        onNext={goNext}
      />
    </LessonShell>
  );
}
