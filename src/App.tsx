import { ArrowLeft, ArrowRight, Check, Info, LoaderCircle, Save, WandSparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { BrandMark } from './components/BrandMark';
import { ProgressRail } from './components/ProgressRail';
import { PromptWorkspace } from './components/PromptWorkspace';
import { StepPanel } from './components/StepPanel';
import { generatePrompt } from './lib/promptGenerator';
import { clearDraft, loadDraft, saveDraft } from './lib/storage';
import { defaultFormData, steps, type Platform, type RoadmapFormData, type StepNumber } from './types';

const stepCopy: Record<StepNumber, { title: string; body: string }> = {
  1: { title: 'Start with the destination.', body: 'Tell us what you want to learn and what a win looks like. A sharper goal makes a sharper prompt.' },
  2: { title: 'Give the prompt some context.', body: 'Your current baseline helps the generated roadmap skip what you already know and protect the fundamentals.' },
  3: { title: 'Make the plan fit real life.', body: 'A useful roadmap respects your calendar. Give the AI a schedule it can actually work with.' },
  4: { title: 'Choose how you learn best.', body: 'Set your resource boundaries and learning rhythm so recommendations feel made for you.' },
  5: { title: 'One last check before build.', body: 'Choose where you plan to use the prompt, then SkillPath will package your brief into a detailed instruction set.' },
};

function validateStep(step: StepNumber, form: RoadmapFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (step === 1) {
    if (!form.skill.trim()) errors.skill = 'Tell us the skill you want to learn.';
    if (!form.primaryGoal) errors.primaryGoal = 'Choose the outcome that matters most.';
  }
  if (step === 2) {
    if (!form.education) errors.education = 'Choose your current education.';
    if (!form.currentYear) errors.currentYear = 'Choose your current year or status.';
    if (!form.knowledgeLevel) errors.knowledgeLevel = 'Choose your current knowledge level.';
  }
  if (step === 3) {
    if (!form.dailyTime) errors.dailyTime = 'Choose a daily commitment.';
    if (form.dailyTime === 'Custom' && !form.customDailyTime.trim()) errors.customDailyTime = 'Describe your custom daily time.';
    if (!form.studyDays) errors.studyDays = 'Choose how many days you can study.';
    if (!form.deadline) errors.deadline = 'Choose a deadline option.';
    if (form.deadline === 'Custom' && !form.customDeadline.trim()) errors.customDeadline = 'Describe your custom deadline.';
  }
  if (step === 4) {
    if (!form.resourcePreference) errors.resourcePreference = 'Choose a resource preference.';
    if (!form.learningFormats.length) errors.learningFormats = 'Choose at least one learning format.';
    if (!form.teachingLanguage) errors.teachingLanguage = 'Choose a teaching language.';
    if (!form.learningApproach) errors.learningApproach = 'Choose a learning approach.';
  }
  return errors;
}

export default function App() {
  const [form, setForm] = useState<RoadmapFormData>(defaultFormData);
  const [platform, setPlatform] = useState<Platform>('Universal Prompt');
  const [step, setStep] = useState<StepNumber>(1);
  const [view, setView] = useState<'form' | 'output'>('form');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [hasDraft, setHasDraft] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadDraft();
    if (saved.form) {
      setForm({ ...defaultFormData, ...saved.form });
      setHasDraft(true);
    }
    if (saved.platform) setPlatform(saved.platform);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveDraft(form, platform);
  }, [form, platform, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const currentStep = useMemo(() => steps.find((item) => item.number === step) ?? steps[0], [step]);

  const update = <K extends keyof RoadmapFormData>(key: K, value: RoadmapFormData[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: '' }));
    setHasDraft(true);
  };

  const focusFirstError = (nextErrors: Record<string, string>) => {
    const firstField = Object.keys(nextErrors)[0];
    if (firstField) window.setTimeout(() => document.getElementById(firstField)?.focus(), 0);
  };

  const goNext = () => {
    const nextErrors = validateStep(step, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      focusFirstError(nextErrors);
      setToast('A couple of inputs need your attention.');
      return;
    }
    if (step < 5) setStep((step + 1) as StepNumber);
  };

  const goBack = () => {
    setErrors({});
    if (step > 1) setStep((step - 1) as StepNumber);
  };

  const buildPrompt = () => {
    setIsGenerating(true);
    window.setTimeout(() => {
      setPrompt(generatePrompt(form, platform));
      setIsGenerating(false);
      setView('output');
      setToast('Your prompt is ready to copy.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 650);
  };

  const regenerate = () => {
    setIsGenerating(true);
    window.setTimeout(() => {
      setPrompt(generatePrompt(form, platform));
      setIsGenerating(false);
      setToast('Prompt regenerated from your latest inputs.');
    }, 500);
  };

  const backToBrief = () => {
    setView('form');
    setStep(5);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startAgain = () => {
    if (!window.confirm('Start again and clear this saved learning brief?')) return;
    clearDraft();
    setForm(defaultFormData);
    setPlatform('Universal Prompt');
    setStep(1);
    setPrompt('');
    setView('form');
    setErrors({});
    setHasDraft(false);
    setToast('Fresh brief started.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resumeDraft = () => {
    setHasDraft(false);
    setToast('Draft restored. Your answers are safe while you work.');
  };

  return (
    <div className="min-h-screen bg-surface-base text-text-primary">
      <header className="border-b border-slate-700 bg-surface-base text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10">
          <BrandMark />
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:inline">v1.0 / client-side only</span>
            <span className="flex items-center gap-2 rounded-sm border border-slate-300 bg-bluewash px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-cobalt"><span className="h-1.5 w-1.5 rounded-full bg-cobalt" /> No API keys</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden border-r border-slate-700 bg-surface-base px-6 py-9 lg:block lg:px-8"><ProgressRail currentStep={step} onStepSelect={(selected) => { setStep(selected); setErrors({}); }} /></aside>
        <main id="main-content" className="min-w-0 bg-surface-raised px-5 py-7 sm:px-8 lg:px-14 lg:py-12">
          {view === 'form' ? (
            <div className="mx-auto max-w-[940px] animate-rise">
              <div className="mb-7 flex items-center justify-between gap-4 lg:hidden">
                <div><p className="eyebrow">STEP {String(step).padStart(2, '0')} / 05</p><p className="mt-1 text-sm font-bold text-ink">{currentStep.label}</p></div>
                <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-200"><div className="h-full bg-cobalt transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }} /></div>
              </div>

              <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-300 pb-7 sm:flex-row sm:items-end">
                <div><p className="eyebrow">{currentStep.eyebrow}</p><h1 id="step-title" className="mt-2 max-w-3xl text-4xl font-black text-ink sm:text-5xl">{stepCopy[step].title}</h1><p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{stepCopy[step].body}</p></div>
                <div className="hidden shrink-0 border-l-2 border-cobalt pl-4 sm:block"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Progress</p><p className="mt-1 text-2xl font-black text-ink">{Math.round((step / 5) * 100)}%</p></div>
              </div>

              {hasDraft && <div className="mb-6 flex flex-col justify-between gap-3 rounded-sm border border-slate-300 bg-bluewash p-3.5 sm:flex-row sm:items-center"><div className="flex items-start gap-3"><Save size={17} className="mt-0.5 shrink-0 text-cobalt" /><p className="text-sm font-semibold text-ink">Saved draft found. Your previous answers are already restored.</p></div><button type="button" className="button-link self-start sm:self-auto" onClick={resumeDraft}>Got it</button></div>}

              <div className="form-card">
                <StepPanel step={step} form={form} platform={platform} errors={errors} update={update} onPlatformChange={setPlatform} />
                <div className="mt-9 flex flex-col-reverse justify-between gap-3 border-t border-slate-300 pt-5 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2 text-xs text-slate-500"><Info size={14} /> <span>Saved automatically in this browser</span></div>
                  <div className="flex gap-2 sm:ml-auto">
                    {step > 1 && <button type="button" className="button-secondary" onClick={goBack}><ArrowLeft size={16} /> Back</button>}
                    {step < 5 ? <button type="button" className="button-primary" onClick={goNext}>Next step <ArrowRight size={16} /></button> : <button type="button" className="button-primary" onClick={buildPrompt} disabled={isGenerating}>{isGenerating ? <><LoaderCircle size={16} className="animate-spin" /> Building…</> : <><WandSparkles size={16} /> Generate my prompt</>}</button>}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-[1060px]"><PromptWorkspace key={prompt} prompt={prompt} platform={platform} onBackToBrief={backToBrief} onRegenerate={regenerate} onStartAgain={startAgain} /></div>
          )}
        </main>
      </div>

      <footer className="border-t border-slate-700 bg-surface-base"><div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-10"><span><span className="font-bold text-white">SkillPath</span> turns better context into better AI output.</span><span className="font-mono uppercase tracking-[0.1em]">Built for students / made to be edited</span></div></footer>

      {toast && <div role="status" className="toast"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-cobalt text-white"><Check size={12} strokeWidth={4} /></span>{toast}</div>}
    </div>
  );
}
