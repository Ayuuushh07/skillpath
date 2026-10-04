import { Check, LockKeyhole } from 'lucide-react';
import { steps, type StepNumber } from '../types';

interface ProgressRailProps {
  currentStep: StepNumber;
  onStepSelect?: (step: StepNumber) => void;
}

export function ProgressRail({ currentStep, onStepSelect }: ProgressRailProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div><p className="eyebrow">BUILD SEQUENCE</p><h2 className="mt-1 font-display text-xl font-bold text-ink">Roadmap input stages</h2></div>
        <span className="font-mono text-xs font-bold text-mutedink">{String(currentStep).padStart(2, '0')} / 05</span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step) => {
          const complete = step.number < currentStep;
          const active = step.number === currentStep;
          const canSelect = step.number < currentStep;
          return (
            <button
              key={step.number}
              type="button"
              disabled={!canSelect}
              onClick={() => canSelect && onStepSelect?.(step.number)}
              className={`group flex min-h-[104px] w-full flex-col items-start justify-between rounded border-2 p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${
                active ? 'border-ink bg-navy text-white shadow-[3px_3px_0_0_#111827]' : complete ? 'border-ink bg-sandline text-ink shadow-[2px_2px_0_0_#111827]' : 'border-ink bg-white text-ink hover:bg-mist'
              } ${canSelect ? 'cursor-pointer' : 'cursor-default'}`}
              aria-current={active ? 'step' : undefined}
            >
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded border-2 font-mono text-[10px] font-bold ${active ? 'border-white bg-white text-ink' : complete ? 'border-ink bg-ink text-white' : 'border-ink bg-white text-ink'}`}>
                {complete ? <Check size={15} strokeWidth={3} /> : String(step.number).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className={`block font-display text-sm font-bold ${active ? 'text-white' : 'text-ink'}`}>{step.label}</span>
                <span className={`mt-0.5 block text-xs ${active ? 'text-slate-300' : 'text-mutedink'}`}>{step.description}</span>
              </span>
              {!active && !complete && <LockKeyhole size={14} className="self-end text-slate-500" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
