export default function ChartCard({ title, subtitle, children, className = '', actions }) {
  return (
    <div className={`bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden ${className}`}>
      <div className="px-5 py-3.5 border-b border-stone-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-stone-800">{title}</h3>
          {subtitle && <p className="text-[11px] text-stone-400 mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  )
}
