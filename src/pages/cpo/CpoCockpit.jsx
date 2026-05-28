import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { AlertTriangle, ChevronRight, TrendingUp } from 'lucide-react'
import KPICard from '../../components/shared/KPICard'
import StatusBadge from '../../components/shared/StatusBadge'
import AIInsightPanel from '../../components/shared/AIInsightPanel'
import ChartCard from '../../components/shared/ChartCard'
import {
  cpoKPIs, categoryRiskHeatmap, strategicAlerts,
  supplierConcentration, quarterlyTrends, aiStrategicSummary
} from '../../data/cpoData'

const CHART_COLORS = ['#1E3A5F', '#3B6B9C', '#64748B', '#94A3B8']
const SEVERITY_ORDER = { Critical: 0, High: 1, Medium: 2, Low: 3 }

const getRiskColor = (score) => {
  if (score >= 75) return 'bg-risk-500'
  if (score >= 50) return 'bg-warning-500'
  return 'bg-success-500'
}

const getRiskTextColor = (score) => {
  if (score >= 75) return 'text-risk-600'
  if (score >= 50) return 'text-warning-600'
  return 'text-success-600'
}

export default function CpoCockpit() {
  const [selectedAlert, setSelectedAlert] = useState(null)
  const sortedAlerts = [...strategicAlerts].sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])

  return (
    <div className="space-y-6 pt-2 pb-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-stone-800">CPO Cockpit</h1>
          <p className="text-xs text-stone-400 mt-0.5">Strategic procurement governance overview — Q2 FY25</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-risk-50 border border-risk-100 rounded-lg">
          <AlertTriangle size={13} className="text-risk-600" />
          <span className="text-xs font-medium text-risk-600">5 Active Strategic Alerts</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cpoKPIs.map((kpi) => (
          <KPICard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column — Charts (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quarterly Trends */}
          <ChartCard
            title="Governance Performance Trends"
            subtitle="Quarterly — FY24 to Q2 FY25"
          >
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={quarterlyTrends} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="govGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A5F" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1E3A5F" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B6B9C" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3B6B9C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 11, border: '1px solid #E7E5E4', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="governanceScore" name="Governance Score" stroke="#1E3A5F" fill="url(#govGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="spendGoverned" name="Spend Governed %" stroke="#3B6B9C" fill="url(#spendGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Category Risk Heatmap */}
          <ChartCard title="Category Risk Heatmap" subtitle="All procurement categories — risk scoring">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-stone-200">
                    {['Category', 'Risk Score', 'Annual Spend', 'Concentration', 'Trend'].map(h => (
                      <th key={h} className="px-3 py-2 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categoryRiskHeatmap.map((row, i) => (
                    <tr key={i} className={`border-b border-stone-100 hover:bg-stone-50 transition-colors ${i === 0 ? 'bg-risk-50/40' : ''}`}>
                      <td className="px-3 py-2.5 text-xs font-medium text-stone-700">{row.category}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${getRiskColor(row.risk)}`} style={{ width: `${row.risk}%` }} />
                          </div>
                          <span className={`text-xs font-semibold ${getRiskTextColor(row.risk)}`}>{row.risk}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-stone-600">{row.spend}</td>
                      <td className="px-3 py-2.5"><StatusBadge status={row.concentration} size="xs" /></td>
                      <td className="px-3 py-2.5">
                        <span className={`text-xs font-medium ${row.trend === 'Increasing' ? 'text-risk-600' : row.trend === 'Decreasing' ? 'text-success-600' : 'text-stone-400'}`}>
                          {row.trend === 'Increasing' ? '↑' : row.trend === 'Decreasing' ? '↓' : '→'} {row.trend}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>

          {/* Fraud Averted Trend */}
          <ChartCard title="Fraud Exposure Averted" subtitle="Cumulative ₹ Cr — YTD">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={quarterlyTrends} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
                <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 11, border: '1px solid #E7E5E4', borderRadius: 6 }}
                  formatter={(v) => [`₹${v} Cr`, 'Fraud Averted']}
                />
                <Bar dataKey="fraudAverted" name="Fraud Averted (₹ Cr)" fill="#1E3A5F" radius={[3, 3, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Right Sidebar (1/3 width) */}
        <div className="space-y-6">
          {/* Supplier Concentration */}
          <ChartCard title="Supplier Concentration" subtitle="Raw Materials — Sulphur">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={supplierConcentration} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={2} dataKey="value">
                  {supplierConcentration.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #E7E5E4', borderRadius: 6 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-1">
              {supplierConcentration.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                    <span className="text-[11px] text-stone-600">{item.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-stone-700">{item.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Strategic Alerts */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
            <div className="px-4 py-3 border-b border-stone-100">
              <h3 className="text-sm font-semibold text-stone-800">Strategic Alerts</h3>
              <p className="text-[11px] text-stone-400">Top priority — action required</p>
            </div>
            <div className="divide-y divide-stone-100">
              {sortedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                  className="px-4 py-3 hover:bg-stone-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <StatusBadge status={alert.severity} size="xs" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-stone-700 leading-snug">{alert.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-stone-400">{alert.timestamp}</span>
                        <span className="text-[10px] font-medium text-risk-600">{alert.impact}</span>
                      </div>
                    </div>
                    <ChevronRight size={12} className={`text-stone-300 mt-0.5 transition-transform ${selectedAlert === alert.id ? 'rotate-90' : ''}`} />
                  </div>
                  {selectedAlert === alert.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 pl-2 border-l-2 border-stone-200"
                    >
                      <p className="text-[11px] text-stone-500 leading-relaxed">{alert.description}</p>
                      <button className="mt-2 text-[11px] text-navy-500 font-medium hover:text-navy-600">
                        View Full Analysis →
                      </button>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Insight */}
          <AIInsightPanel
            title="AI Strategic Summary"
            content={aiStrategicSummary}
          />
        </div>
      </div>
    </div>
  )
}
