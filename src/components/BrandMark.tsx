interface BrandMarkProps {
  compact?: boolean;
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div className="flex items-center gap-3" aria-label="SkillPath home">
      <div className="relative h-9 w-9 shrink-0" aria-hidden="true">
        <span className="absolute left-0 top-0 h-6 w-6 rounded-xs border-2 border-white bg-surface-base" />
        <span className="absolute bottom-0 right-0 h-6 w-6 rounded-xs border-2 border-cobalt bg-cobalt" />
        <span className="absolute left-[10px] top-[10px] h-3 w-3 rounded-xs bg-white" />
      </div>
      {!compact && (
        <div>
          <div className="text-[18px] font-black text-white">SkillPath</div>
          <div className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">Prompt builder</div>
        </div>
      )}
    </div>
  );
}
