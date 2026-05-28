export default function StatusBadge({ status, size = 'sm' }) {
  const getStyles = () => {
    const s = status?.toLowerCase()
    if (['critical', 'non-compliant', 'anomalous'].includes(s)) {
      return 'bg-risk-50 text-risk-700 border-risk-100'
    }
    if (['high', 'overdue', 'declining', 'suspicious', 'partial'].includes(s)) {
      return 'bg-warning-50 text-warning-600 border-warning-100'
    }
    if (['medium', 'under review', 'attention', 'near benchmark'].includes(s)) {
      return 'bg-amber-50 text-amber-700 border-amber-100'
    }
    if (['low', 'compliant', 'stable', 'on track', 'positive', 'above benchmark', 'verified', 'improving'].includes(s)) {
      return 'bg-success-50 text-success-700 border-success-100'
    }
    if (['pending', 'requested', 'planned', 'draft', 'monitoring', 'near closure'].includes(s)) {
      return 'bg-stone-50 text-stone-600 border-stone-200'
    }
    if (['in progress', 'active investigation', 'evidence collection', 'review', 'preliminary review', 'under review'].includes(s)) {
      return 'bg-navy-50 text-navy-600 border-navy-100'
    }
    return 'bg-stone-50 text-stone-600 border-stone-200'
  }

  const sizeClasses = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-[11px] px-2 py-0.5'

  return (
    <span className={`inline-flex items-center rounded-full border font-medium whitespace-nowrap ${getStyles()} ${sizeClasses}`}>
      {status}
    </span>
  )
}
