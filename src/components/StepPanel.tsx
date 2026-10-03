import type { RoadmapFormData, Platform, StepNumber } from '../types';
import { approachOptions, dailyTimeOptions, deadlineOptions, educationOptions, formatOptions, goalOptions, knowledgeOptions, languageOptions, resourceOptions, skillSuggestions, studyDayOptions, yearOptions } from '../types';
import { ChoiceGrid, MultiChoice, SelectField, TextField } from './FormFields';

interface StepPanelProps {
  step: StepNumber;
  form: RoadmapFormData;
  platform: Platform;
  errors: Record<string, string>;
  update: <K extends keyof RoadmapFormData>(key: K, value: RoadmapFormData[K]) => void;
  onPlatformChange: (platform: Platform) => void;
}

export function StepPanel({ step, form, platform, errors, update, onPlatformChange }: StepPanelProps) {
  if (step === 1) {
    return (
      <section className="space-y-7" aria-labelledby="step-title">
        <div className="grid gap-6 md:grid-cols-[1.35fr_0.65fr]">
          <TextField id="skill" label="What skill do you want to learn?" value={form.skill} onChange={(value) => update('skill', value)} placeholder="e.g. Full-stack web development" list="skill-suggestions" error={errors.skill} />
          <datalist id="skill-suggestions">{skillSuggestions.map((skill) => <option key={skill} value={skill} />)}</datalist>
        </div>
        <ChoiceGrid legend="What is your primary goal?" options={goalOptions} value={form.primaryGoal} onChange={(value) => update('primaryGoal', value)} error={errors.primaryGoal} columns={3} />
        <TextField id="targetOutcome" label="Is there a specific target or outcome?" value={form.targetOutcome} onChange={(value) => update('targetOutcome', value)} placeholder="e.g. Ship a portfolio app and apply for frontend internships" optional multiline />
      </section>
    );
  }

  if (step === 2) {
    return (
      <section className="space-y-7" aria-labelledby="step-title">
        <div className="grid gap-6 md:grid-cols-2">
          <SelectField id="education" label="Current education" value={form.education} onChange={(value) => update('education', value)} options={educationOptions} error={errors.education} />
          <SelectField id="currentYear" label="Current year / status" value={form.currentYear} onChange={(value) => update('currentYear', value)} options={yearOptions} error={errors.currentYear} />
        </div>
        <ChoiceGrid legend="How would you rate your current knowledge?" options={knowledgeOptions} value={form.knowledgeLevel} onChange={(value) => update('knowledgeLevel', value)} error={errors.knowledgeLevel} />
        <TextField id="relatedSkills" label="Do you already know any related skills?" value={form.relatedSkills} onChange={(value) => update('relatedSkills', value)} placeholder="e.g. HTML basics, Excel, or nothing yet" optional multiline />
      </section>
    );
  }

  if (step === 3) {
    const customTime = form.dailyTime === 'Custom';
    const customDeadline = form.deadline === 'Custom';
    return (
      <section className="space-y-7" aria-labelledby="step-title">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <ChoiceGrid legend="How much time can you dedicate daily?" options={dailyTimeOptions} value={form.dailyTime} onChange={(value) => update('dailyTime', value)} error={errors.dailyTime} />
            {customTime && <div className="mt-4"><TextField id="customDailyTime" label="Describe your daily time" value={form.customDailyTime} onChange={(value) => update('customDailyTime', value)} placeholder="e.g. 90 minutes on weekdays" error={errors.customDailyTime} /></div>}
          </div>
          <ChoiceGrid legend="How many days per week can you study?" options={studyDayOptions} value={form.studyDays} onChange={(value) => update('studyDays', value)} error={errors.studyDays} />
        </div>
        <div>
          <ChoiceGrid legend="Do you have a deadline?" options={deadlineOptions} value={form.deadline} onChange={(value) => update('deadline', value)} error={errors.deadline} columns={3} />
          {customDeadline && <div className="mt-4 max-w-md"><TextField id="customDeadline" label="Describe your deadline" value={form.customDeadline} onChange={(value) => update('customDeadline', value)} placeholder="e.g. Before campus placements in September" error={errors.customDeadline} /></div>}
        </div>
      </section>
    );
  }

  if (step === 4) {
    return (
      <section className="space-y-7" aria-labelledby="step-title">
        <ChoiceGrid legend="What type of resources do you prefer?" options={resourceOptions} value={form.resourcePreference} onChange={(value) => update('resourcePreference', value)} error={errors.resourcePreference} columns={3} />
        <MultiChoice legend="Preferred learning format" options={formatOptions} values={form.learningFormats} onChange={(value) => update('learningFormats', value)} error={errors.learningFormats} />
        <div className="grid gap-6 md:grid-cols-2">
          <ChoiceGrid legend="Preferred teaching language" options={languageOptions} value={form.teachingLanguage} onChange={(value) => update('teachingLanguage', value)} error={errors.teachingLanguage} />
          <ChoiceGrid legend="Learning approach" options={approachOptions} value={form.learningApproach} onChange={(value) => update('learningApproach', value)} error={errors.learningApproach} />
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-7" aria-labelledby="step-title">
      <div className="review-box">
        <div>
          <p className="eyebrow">INPUT CHECK</p>
          <h3 className="mt-2 text-lg font-black text-ink">Your learning brief is ready.</h3>
        </div>
        <p className="text-sm leading-6 text-slate-600">Pick the AI platform you plan to paste this into. SkillPath will tune the instruction style, not call the platform for you.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[{ name: 'Claude' as Platform, note: 'Thoughtful Markdown' }, { name: 'ChatGPT' as Platform, note: 'Clear + interactive' }, { name: 'Gemini' as Platform, note: 'Verification-ready' }, { name: 'Universal Prompt' as Platform, note: 'Works anywhere' }].map(({ name, note }) => (
          <label key={name} className={`platform-card ${platform === name ? 'platform-selected' : ''}`}>
            <input type="radio" className="sr-only" name="platform" checked={platform === name} onChange={() => onPlatformChange(name)} />
            <span className="flex items-start justify-between gap-4">
              <span><span className="block text-base font-black text-ink">{name}</span><span className="mt-1 block text-xs text-slate-500">{note}</span></span>
              <span className={`mt-1 h-4 w-4 rounded-full border-2 ${platform === name ? 'border-cobalt bg-cobalt ring-2 ring-blue-100' : 'border-slate-400'}`} />
            </span>
          </label>
        ))}
      </div>
      <div className="grid gap-3 rounded-sm border border-slate-300 bg-paper p-4 text-sm sm:grid-cols-2">
        <div><span className="meta-label">GOAL</span><p className="mt-1 font-semibold text-ink">{form.skill || 'Add a skill'}</p></div>
        <div><span className="meta-label">OUTCOME</span><p className="mt-1 font-semibold text-ink">{form.primaryGoal || 'Add a goal'}</p></div>
        <div><span className="meta-label">TIME</span><p className="mt-1 font-semibold text-ink">{form.dailyTime || 'Add availability'} / {form.studyDays || 'days'}</p></div>
        <div><span className="meta-label">STYLE</span><p className="mt-1 font-semibold text-ink">{form.learningApproach || 'Add an approach'}</p></div>
      </div>
    </section>
  );
}
