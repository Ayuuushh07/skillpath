import type { Platform, RoadmapFormData } from '../types';

const FORM_KEY = 'skillpath:roadmap-form';
const PLATFORM_KEY = 'skillpath:platform';

function hasMeaningfulDraft(form: RoadmapFormData): boolean {
  return Object.values(form).some((value) => Array.isArray(value) ? value.length > 0 : Boolean(value?.trim()));
}

export function loadDraft(): { form: RoadmapFormData | null; platform: Platform | null } {
  if (typeof window === 'undefined') return { form: null, platform: null };

  try {
    const savedForm = window.localStorage.getItem(FORM_KEY);
    const savedPlatform = window.localStorage.getItem(PLATFORM_KEY);
    const platformValues: Platform[] = ['Claude', 'ChatGPT', 'Gemini', 'Universal Prompt'];
    const parsedForm = savedForm ? (JSON.parse(savedForm) as RoadmapFormData) : null;
    const form = parsedForm && hasMeaningfulDraft(parsedForm) ? parsedForm : null;
    if (!form) {
      window.localStorage.removeItem(FORM_KEY);
      window.localStorage.removeItem(PLATFORM_KEY);
    }
    return {
      form,
      platform: form && platformValues.includes(savedPlatform as Platform) ? (savedPlatform as Platform) : null,
    };
  } catch {
    return { form: null, platform: null };
  }
}

export function saveDraft(form: RoadmapFormData, platform: Platform): void {
  if (typeof window === 'undefined') return;
  try {
    if (!hasMeaningfulDraft(form)) {
      window.localStorage.removeItem(FORM_KEY);
      window.localStorage.removeItem(PLATFORM_KEY);
      return;
    }
    window.localStorage.setItem(FORM_KEY, JSON.stringify(form));
    window.localStorage.setItem(PLATFORM_KEY, platform);
  } catch {
    // Storage can be unavailable in private browsing; the in-memory form still works.
  }
}

export function clearDraft(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(FORM_KEY);
    window.localStorage.removeItem(PLATFORM_KEY);
  } catch {
    // Ignore storage failures while resetting the in-memory experience.
  }
}
