import type { ReactNode } from 'react';
import { BookOpen, Home } from 'lucide-react';
import LatinText from '@/components/ui/LatinText';

interface LessonShellProps {
  title: string;
  completedSteps: number;
  totalSteps: number;
  onHome: () => void;
  children: ReactNode;
}

export default function LessonShell({ title, completedSteps, totalSteps, onHome, children }: LessonShellProps) {
  const progress = totalSteps > 0 ? Math.min(Math.max(completedSteps / totalSteps, 0), 1) : 0;
  const percent = Math.round(progress * 100);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-50 via-white to-sun-50">
      <header className="sticky top-0 z-10 border-b border-brand-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-md">
              <BookOpen className="h-6 w-6" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-lg font-extrabold leading-tight text-ink-900">Читаю по-английски</p>
              <p className="text-sm font-bold leading-snug text-ink-500"><LatinText text={title} /></p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-sun-100 px-4 py-1 text-base font-extrabold text-ink-800">
              Пройдено {completedSteps} из {totalSteps}
            </span>
            <button
              type="button"
              onClick={onHome}
              aria-label="Вернуться на главную"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-brand-200 bg-white text-brand-700 transition-colors hover:border-brand-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300"
            >
              <Home className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <div className="h-2 w-full bg-brand-100" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="h-full rounded-r-full bg-gradient-to-r from-brand-400 to-mint-500 transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 py-10">{children}</main>
    </div>
  );
}
