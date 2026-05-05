// JUDUL SECTION DAN GARIS PEMISAH
export default function SectionDivider({ label }: { label: string }) {
  return (
    <div className="pt-1 pb-1">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40 whitespace-nowrap">
          {label}
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
    </div>
  )
}
