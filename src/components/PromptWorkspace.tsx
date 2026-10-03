import { ArrowLeft, Clipboard, ClipboardCheck, Edit3, RefreshCw, RotateCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { Platform } from '../types';

interface PromptWorkspaceProps {
  prompt: string;
  platform: Platform;
  onBackToBrief: () => void;
  onRegenerate: () => void;
  onStartAgain: () => void;
}

export function PromptWorkspace({ prompt, platform, onBackToBrief, onRegenerate, onStartAgain }: PromptWorkspaceProps) {
  const [editablePrompt, setEditablePrompt] = useState(prompt);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const copyPrompt = async () => {
    setCopyError(false);
    try {
      if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(editablePrompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopyError(true);
    }
  };

  const regenerate = () => {
    setIsEditing(false);
    setEditablePrompt(prompt);
    onRegenerate();
  };

  return (
    <div className="space-y-6 animate-rise">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-300 pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">OUTPUT / READY TO COPY</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-black text-ink sm:text-4xl">Your roadmap prompt is built.</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">Paste this into <span className="font-bold text-ink">{platform}</span>. It now asks for a Word document and researched, clickable resources.</p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-sm border border-slate-300 bg-bluewash px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-cobalt sm:self-auto"><Sparkles size={14} /> Client-side build</div>
      </div>

      <div className="prompt-shell">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface-muted px-4 py-3">
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cobalt" /><span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink">skillpath_prompt.md</span></div>
          <span className="font-mono text-[10px] font-bold text-slate-500">{editablePrompt.length.toLocaleString()} chars</span>
        </div>
        {isEditing ? <textarea aria-label="Edit generated prompt" className="prompt-editor" value={editablePrompt} onChange={(event) => setEditablePrompt(event.target.value)} /> : <pre className="prompt-output">{editablePrompt}</pre>}
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-300 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button type="button" className="button-secondary" onClick={onBackToBrief}><ArrowLeft size={16} /> Back to brief</button>
          <button type="button" className="button-primary" onClick={copyPrompt}>{copied ? <ClipboardCheck size={16} /> : <Clipboard size={16} />} {copied ? 'Copied' : 'Copy prompt'}</button>
          <button type="button" className="button-secondary" onClick={() => setIsEditing((value) => !value)}><Edit3 size={16} /> {isEditing ? 'Done editing' : 'Edit prompt'}</button>
          {copyError && <p className="basis-full text-xs font-semibold text-red-700">Clipboard access failed. Select the prompt text and copy it manually.</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="button-quiet" onClick={regenerate}><RefreshCw size={15} /> Regenerate</button>
          <button type="button" className="button-quiet" onClick={onStartAgain}><RotateCcw size={15} /> Start again</button>
        </div>
      </div>
    </div>
  );
}
