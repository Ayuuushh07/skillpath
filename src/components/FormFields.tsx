import type { ChangeEvent, ReactNode } from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface FieldLabelProps {
  htmlFor?: string;
  children: ReactNode;
  optional?: boolean;
}

export function FieldLabel({ htmlFor, children, optional = false }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-center justify-between gap-3 font-display text-sm font-semibold text-ink">
      <span>{children}</span>
      {optional && <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-mutedink">Optional</span>}
    </label>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  optional?: boolean;
  error?: string;
  list?: string;
  multiline?: boolean;
}

export function TextField({ id, label, value, onChange, placeholder, optional, error, list, multiline = false }: TextFieldProps) {
  const common = {
    id,
    value,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
    placeholder,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
    className: `field-control ${error ? 'field-error' : ''}`,
  };
  return (
    <div>
      <FieldLabel htmlFor={id} optional={optional}>{label}</FieldLabel>
      {multiline ? <textarea {...common} rows={3} /> : <input {...common} list={list} />}
      {error && <p id={`${id}-error`} className="mt-2 text-xs font-semibold text-red-700">{error}</p>}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  error?: string;
}

export function SelectField({ id, label, value, onChange, options, placeholder = 'Select an option', error }: SelectFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <select id={id} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`field-control appearance-none pr-10 ${error ? 'field-error' : ''}`}>
          <option value="">{placeholder}</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <ChevronDown size={17} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden="true" />
      </div>
      {error && <p id={`${id}-error`} className="mt-2 text-xs font-semibold text-red-700">{error}</p>}
    </div>
  );
}

interface ChoiceGridProps {
  legend: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  columns?: 2 | 3;
}

export function ChoiceGrid({ legend, options, value, onChange, error, columns = 2 }: ChoiceGridProps) {
  return (
    <fieldset>
      <legend className="mb-2 font-display text-sm font-semibold text-ink">{legend}</legend>
      <div className={`grid gap-2 ${columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {options.map((option) => {
          const selected = option === value;
          return (
            <label key={option} className={`choice-card ${selected ? 'choice-selected' : ''}`}>
              <input type="radio" className="sr-only" name={legend} value={option} checked={selected} onChange={() => onChange(option)} />
              <span className="flex min-w-0 items-center gap-2">
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-cobalt bg-cobalt text-white' : 'border-slate-400 bg-paper'}`}>
                  {selected && <Check size={10} strokeWidth={4} />}
                </span>
                <span className="text-sm font-medium leading-5">{option}</span>
              </span>
            </label>
          );
        })}
      </div>
      {error && <p className="mt-2 text-xs font-semibold text-red-700">{error}</p>}
    </fieldset>
  );
}

interface MultiChoiceProps {
  legend: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
}

export function MultiChoice({ legend, options, values, onChange, error }: MultiChoiceProps) {
  const toggle = (option: string) => onChange(values.includes(option) ? values.filter((item) => item !== option) : [...values, option]);
  return (
    <fieldset>
      <legend className="mb-2 flex items-center gap-2 font-display text-sm font-semibold text-ink">{legend} <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-mutedink">Choose all that apply</span></legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = values.includes(option);
          return (
            <label key={option} className={`choice-card ${selected ? 'choice-selected' : ''}`}>
              <input type="checkbox" className="sr-only" checked={selected} onChange={() => toggle(option)} />
              <span className="flex min-w-0 items-center gap-2">
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border ${selected ? 'border-cobalt bg-cobalt text-white' : 'border-slate-400 bg-paper'}`}>
                  {selected && <Check size={11} strokeWidth={4} />}
                </span>
                <span className="text-sm font-medium leading-5">{option}</span>
              </span>
            </label>
          );
        })}
      </div>
      {error && <p className="mt-2 text-xs font-semibold text-red-700">{error}</p>}
    </fieldset>
  );
}
