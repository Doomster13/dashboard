import { useState } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Search, Filter, AlertOctagon, AlertTriangle, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import KPICard from '../../components/shared/KPICard'
import StatusBadge from '../../components/shared/StatusBadge'
import ChartCard from '../../components/shared/ChartCard'
import { auditKPIs, investigations } from '../../data/auditData'

const SEVERITY_COLORS = { Critical: '#DC2626', High: '#D97706', Medium: '#92400E', Low: '#64748B' }
const ALL_SEVERITIES = ['All', 'Critical', 'High', 'Medium', 'Low']
const ALL_STATUSES = ['All', 'Active Investigation', 'Evidence Collection', 'Review', 'Preliminary Review', 'Near Closure', 'Monitoring']

const severityCounts = Object.entries(
  investigations.reduce((acc, inv) => {
    acc[inv.severity] = (acc[inv.severity] || 0) + 1
    return acc
  }, {})
).map(([name, value]) => ({ name, value }))

export default function AuditQueue() {
  const [severityFilter, setSeverityFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [expandedCase, setExpandedCase] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = investigations.filter(inv => {
    const matchSev = severityFilter === 'All' || inv.severity === severityFilter
    const matchStat = statusFilter === 'All' || inv.status === statusFilter
    const matchSearch = !search || inv.title.toLowerCase().includes(search.toLowerCase()) || inv.category.toLowerCase().includes(search.toLowerCase())
    return matchSev && matchStat && matchSearch
  })

  return (
    <div className="space-y-5 pt-2 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-stone-800">Audit Queue</h1>
        <p className="text-xs text-stone-400 mt-0.5">Investigation management — {investigations.length} active cases · 28 Sep 2025</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {auditKPIs.map(kpi => <KPICard key={kpi.id} {...kpi} compact />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Main Table — 3/4 */}
        <div className="lg:col-span-3 space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-stone-200 rounded-lg flex-1 min-w-48">
              <Search size={13} className="text-stone-400" />
              <input
                type="text"
                placeholder="Search cases..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="text-xs text-stone-600 placeholder-stone-400 outline-none bg-transparent w-full"
              />
            </div>
            <div className="flex items-center gap-1">
              <Filter size={12} className="text-stone-400" />
              <span className="text-[11px] text-stone-400 mr-1">Severity:</span>
              {ALL_SEVERITIES.map(s => (
                <button key={s} onClick={() => setSeverityFilter(s)}
                  className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${severityFilter === s ? 'bg-navy-500 text-white' : 'text-stone-500 hover:bg-stone-100'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Investigation Cards */}
          <div className="space-y-3">
            {filtered.map((inv, i) => (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-white rounded-lg border shadow-enterprise overflow-hidden ${
                  inv.severity === 'Critical' ? 'border-risk-200' :
                  inv.severity === 'High' ? 'border-warning-200' :
                  'border-stone-200'
                }`}
              >
                {/* Priority strip */}
                <div className={`h-1 ${inv.severity === 'Critical' ? 'bg-risk-500' : inv.severity === 'High' ? 'bg-warning-500' : inv.severity === 'Medium' ? 'bg-amber-400' : 'bg-stone-300'}`} />

                <div className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono text-stone-400">{inv.id}</span>
                        <StatusBadge status={inv.severity} size="xs" />
                        <StatusBadge status={inv.status} size="xs" />
                      </div>
                      <h3 className="text-sm font-semibold text-stone-800 leading-tight">{inv.title}</h3>
                      <p className="text-[11px] text-stone-400 mt-0.5">{inv.category}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <p className="text-[10px] text-stone-400">Exposure</p>
                        <p className="text-sm font-bold text-stone-800">{inv.exposure}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-stone-400">Days Open</p>
                        <p className={`text-sm font-bold ${inv.daysOpen > 20 ? 'text-risk-600' : inv.daysOpen > 10 ? 'text-warning-600' : 'text-stone-800'}`}>
                          {inv.daysOpen}
                        </p>
                      </div>
                      <button
                        onClick={() => setExpandedCase(expandedCase === inv.id ? null : inv.id)}
                        className="w-8 h-8 bg-stone-50 border border-stone-200 rounded-md flex items-center justify-center hover:bg-stone-100 transition-colors"
                      >
                        {expandedCase === inv.id ? <ChevronUp size={13} className="text-stone-500" /> : <ChevronDown size={13} className="text-stone-500" />}
                      </button>
                    </div>
                  </div>

                  {/* Summary row */}
                  <div className="flex items-center gap-6 mt-3">
                    <span className="text-[11px] text-stone-500">Investigator: <span className="font-medium text-stone-700">{inv.investigator}</span></span>
                    <span className="text-[11px] text-stone-500">Escalated to: <span className="font-medium text-stone-700">{inv.escalationStage}</span></span>
                    {inv.regulatoryFlags.length > 0 && (
                      <div className="flex items-center gap-1 text-risk-600 text-[11px] font-medium">
                        <AlertOctagon size={11} />
                        {inv.regulatoryFlags.length} regulatory flag{inv.regulatoryFlags.length > 1 ? 's' : ''}
                      </div>
                    )}
                    {/* Evidence score */}
                    <div className="ml-auto flex items-center gap-2">
                      <span className="text-[10px] text-stone-400">Evidence</span>
                      <div className="w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${inv.evidenceScore >= 80 ? 'bg-success-500' : inv.evidenceScore >= 60 ? 'bg-warning-500' : 'bg-risk-500'}`}
                          style={{ width: `${inv.evidenceScore}%` }} />
                      </div>
                      <span className="text-[10px] font-semibold text-stone-700">{inv.evidenceScore}%</span>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedCase === inv.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-2 gap-4"
                    >
                      <div>
                        <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Regulatory Flags</p>
                        {inv.regulatoryFlags.length === 0 ? (
                          <p className="text-xs text-stone-400">No regulatory flags</p>
                        ) : (
                          inv.regulatoryFlags.map((flag, fi) => (
                            <div key={fi} className="flex items-center gap-2 text-xs text-risk-700 mb-1">
                              <AlertTriangle size={11} /> {flag}
                            </div>
                          ))
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="flex-1 py-1.5 text-xs font-medium bg-navy-50 text-navy-600 border border-navy-100 rounded-md hover:bg-navy-100 transition-colors">
                          Open Case File
                        </button>
                        <button className="flex-1 py-1.5 text-xs font-medium bg-stone-50 text-stone-600 border border-stone-200 rounded-md hover:bg-stone-100 transition-colors">
                          Escalate
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar — 1/4 */}
        <div className="space-y-5">
          {/* Severity Distribution */}
          <ChartCard title="Severity Distribution">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={severityCounts} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                  {severityCounts.map((entry, i) => (
                    <Cell key={i} fill={SEVERITY_COLORS[entry.name] || '#94A3B8'} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #E7E5E4', borderRadius: 6 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-1">
              {severityCounts.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SEVERITY_COLORS[item.name] }} />
                    <span className="text-[11px] text-stone-600">{item.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-stone-700">{item.value}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Summary Stats */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise p-4 space-y-3">
            <h3 className="text-sm font-semibold text-stone-800">Queue Summary</h3>
            {[
              { label: 'Total Exposure', value: '₹12.8 Cr', color: 'text-risk-600' },
              { label: 'Critical Cases', value: '1', color: 'text-risk-600' },
              { label: 'Avg Evidence Score', value: '74%', color: 'text-stone-700' },
              { label: 'Cases with Reg. Flags', value: '2', color: 'text-warning-600' },
              { label: 'Avg Days Open', value: '16.3', color: 'text-stone-700' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between border-b border-stone-100 pb-2 last:border-0 last:pb-0">
                <span className="text-[11px] text-stone-500">{item.label}</span>
                <span className={`text-xs font-semibold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
