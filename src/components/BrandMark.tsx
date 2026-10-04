interface BrandMarkProps {
  compact?: boolean;
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div className="flex items-center gap-3" aria-label="SkillPath home">
      <div className="relative h-9 w-9 shrink-0" aria-hidden="true">
        <span className="absolute left-0 top-0 h-6 w-6 rounded-xs border-2 border-ink bg-white" />
        <span className="absolute bottom-0 right-0 h-6 w-6 rounded-xs border-2 border-ink bg-navy" />
        <span className="absolute left-[10px] top-[10px] h-3 w-3 rounded-xs bg-ink" />
      </div>
      {!compact && (
        <div>
          <div className="font-display text-[18px] font-bold text-ink">SkillPath</div>
          <div className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-mutedink">Prompt builder</div>
        </div>
      )}
    </div>
  );
}
