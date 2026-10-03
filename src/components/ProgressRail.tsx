import { Check, LockKeyhole } from 'lucide-react';
import { steps, type StepNumber } from '../types';

interface ProgressRailProps {
  currentStep: StepNumber;
  onStepSelect?: (step: StepNumber) => void;
}

export function ProgressRail({ currentStep, onStepSelect }: ProgressRailProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">BUILD SEQUENCE</p>
          <h2 className="mt-2 text-xl font-black text-white">Your roadmap input</h2>
        </div>
        <span className="font-mono text-xs font-bold text-slate-400">{String(currentStep).padStart(2, '0')} / 05</span>
      </div>
      <div className="space-y-2">
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
              className={`group flex w-full items-center gap-3 rounded-sm border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 ${
                active ? 'border-white bg-bluewash shadow-[3px_3px_0_0_#ebdbb7]' : 'border-transparent bg-transparent hover:border-slate-600'
              } ${canSelect ? 'cursor-pointer' : 'cursor-default'}`}
              aria-current={active ? 'step' : undefined}
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border-2 font-mono text-xs font-bold ${active ? 'border-cobalt bg-cobalt text-white' : complete ? 'border-ink bg-ink text-white' : 'border-slate-300 bg-paper text-slate-400'}`}>
                {complete ? <Check size={15} strokeWidth={3} /> : String(step.number).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block text-sm font-bold ${active ? 'text-ink' : 'text-white'}`}>{step.label}</span>
                <span className="mt-0.5 block text-xs text-slate-400">{step.description}</span>
              </span>
              {!active && !complete && <LockKeyhole size={14} className="text-slate-400" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      <div className="border-t border-slate-700 pt-4">
        <p className="text-xs leading-5 text-slate-400"><span className="font-bold text-white">No AI connection here.</span> SkillPath creates the instructions. Your selected AI turns them into the roadmap.</p>
      </div>
    </div>
  );
}
