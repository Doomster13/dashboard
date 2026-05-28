import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, ShieldCheck, Award, AlertTriangle, Clock, FileText, ClipboardCheck, Search, AlertOctagon, CheckCircle, FileCheck, ShoppingCart } from 'lucide-react'

const iconMap = {
  ShieldCheck, TrendingUp, Award, AlertTriangle, Clock, FileText, ClipboardCheck,
  Search, AlertOctagon, CheckCircle, FileCheck, ShoppingCart, Minus, TrendingDown
}

export default function KPICard({ label, value, subtitle, trend, trendDirection, icon, compact = false }) {
  const Icon = iconMap[icon] || ShieldCheck

  const getTrendColor = () => {
    if (trendDirection === 'up') return 'text-success-600'
    if (trendDirection === 'down') return 'text-risk-600'
    return 'text-stone-400'
  }

  const TrendIcon = trendDirection === 'up' ? TrendingUp : trendDirection === 'down' ? TrendingDown : Minus

  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15 }}
      className={`bg-white rounded-lg border border-stone-200 shadow-enterprise hover:shadow-enterprise-md transition-shadow ${compact ? 'p-4' : 'p-5'}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center">
          <Icon size={16} className="text-navy-500" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-[11px] font-medium ${getTrendColor()}`}>
            <TrendIcon size={12} />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <p className={`font-semibold text-stone-800 ${compact ? 'text-xl' : 'text-2xl'} leading-tight`}>{value}</p>
      <p className="text-xs text-stone-500 mt-1 font-medium">{label}</p>
      {subtitle && <p className="text-[11px] text-stone-400 mt-0.5">{subtitle}</p>}
    </motion.div>
  )
}
