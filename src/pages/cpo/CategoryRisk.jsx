import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts'
import { AlertTriangle, MapPin, Clock, AlertOctagon } from 'lucide-react'
import StatusBadge from '../../components/shared/StatusBadge'
import AIInsightPanel from '../../components/shared/AIInsightPanel'
import ChartCard from '../../components/shared/ChartCard'
import {
  sulphurPriceTrends, vendorConcentrationTimeline,
  regionDependency, riskScoringFactors, procurementTimeline
} from '../../data/cpoData'

const timelineTypeStyles = {
  process: { dot: 'bg-stone-400', label: 'text-stone-500', border: 'border-stone-200' },
  anomaly: { dot: 'bg-warning-500', label: 'text-warning-600', border: 'border-warning-100' },
  escalation: { dot: 'bg-risk-500', label: 'text-risk-600', border: 'border-risk-100' },
}

const aiCommentary = `The sulphur procurement category exhibits multiple compounding risk signals that together indicate elevated exposure to both financial loss and reputational harm.

Contract pricing has diverged from commodity market benchmarks by over 20%, a gap that has widened consistently across 9 consecutive months. Concurrently, vendor concentration has reached levels that breach internal thresholds, with a single supplier now controlling 78% of volume.

The bid timing irregularities identified in Q1 FY25 add a further dimension of concern: three vendors submitted within a 3-minute 44-second window on the final submission day — a statistical anomaly with probability below 0.2%.

Combined exposure estimate: ₹8.7 Cr across active contracts.`

const aiRecommendations = [
  'Freeze new single-vendor awards in sulphur category pending investigation outcome',
  'Engage independent price benchmarking firm for market rate validation',
  'Commission forensic review of bid process for Q1 FY25 RFP',
  'Initiate qualification of 2 additional sulphur suppliers within 60 days',
]

export default function CategoryRisk() {
  const [activeScenario, setActiveScenario] = useState('current')

  const scenarios = {
    current: { label: 'Current State', threshold: 78, saving: 0 },
    threshold50: { label: 'Cap at 50%', threshold: 50, saving: 2.1 },
    threshold33: { label: 'Three-vendor split', threshold: 33, saving: 4.3 },
  }

  return (
    <div className="space-y-6 pt-2 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-stone-800">Raw Materials — Sulphur</h1>
            <StatusBadge status="Critical" />
          </div>
          <p className="text-xs text-stone-400">Category Risk Deep-Dive · INC-2025-0847 · Strategic Intelligence</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-500">
            <span className="font-medium text-stone-700">₹34.2 Cr</span> annual category spend
          </div>
          <div className="px-3 py-1.5 bg-risk-50 border border-risk-100 rounded-lg text-xs font-medium text-risk-600">
            Risk Score: 92/100
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content — 2/3 */}
        <div className="lg:col-span-2 space-y-6">

          {/* Price Trend Chart */}
          <ChartCard title="Commodity Drift — Contract vs Market Price" subtitle="₹/MT — Jan to Sep 2025">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={sulphurPriceTrends} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false}
                  tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} domain={[12000, 19000]} />
                <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #E7E5E4', borderRadius: 6 }}
                  formatter={(v, n) => [`₹${v.toLocaleString()}/MT`, n]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="marketPrice" name="Market Price" stroke="#64748B"
                  strokeWidth={2} dot={false} strokeDasharray="4 2" />
                <Line type="monotone" dataKey="contractPrice" name="Contract Price" stroke="#1E3A5F"
                  strokeWidth={2.5} dot={{ r: 3, fill: '#1E3A5F' }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-3 p-3 bg-risk-50 border border-risk-100 rounded-md">
              <p className="text-xs text-risk-700 font-medium">⚠ Price deviation has reached 20.7% above market in Sep 2025 — material overpayment risk</p>
            </div>
          </ChartCard>

          {/* Vendor Concentration */}
          <ChartCard title="Vendor Concentration Timeline" subtitle="% share by supplier — quarterly">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={vendorConcentrationTimeline} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
                <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false}
                  tickFormatter={v => `${v}%`} domain={[0, 100]} />
                <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #E7E5E4', borderRadius: 6 }}
                  formatter={(v, n) => [`${v}%`, n]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <ReferenceLine y={75} stroke="#DC2626" strokeDasharray="4 2" strokeWidth={1.5}
                  label={{ value: '75% threshold', position: 'right', fontSize: 10, fill: '#DC2626' }} />
                <Bar dataKey="rajeshChemicals" name="Rajesh Chemicals" stackId="a" fill="#1E3A5F" />
                <Bar dataKey="gujaratSulphur" name="Gujarat Sulphur" stackId="a" fill="#3B6B9C" />
                <Bar dataKey="nationalChemical" name="National Chemical" stackId="a" fill="#64748B" />
                <Bar dataKey="others" name="Others" stackId="a" fill="#D6D3D1" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Risk Scoring Table */}
          <ChartCard title="Risk Scoring Logic" subtitle="Composite category risk — factor breakdown">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-200">
                  {['Factor', 'Score', 'Weight', 'Status'].map(h => (
                    <th key={h} className="px-3 py-2 text-[11px] font-semibold text-stone-400 uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {riskScoringFactors.map((row, i) => (
                  <tr key={i} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                    <td className="px-3 py-2.5 text-xs text-stone-700 font-medium">{row.factor}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${row.score >= 75 ? 'bg-risk-500' : row.score >= 50 ? 'bg-warning-500' : 'bg-success-500'}`}
                            style={{ width: `${row.score}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-stone-700">{row.score}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-stone-500">{row.weight}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={row.status} size="xs" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ChartCard>

          {/* Procurement Timeline */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
            <div className="px-5 py-3.5 border-b border-stone-100">
              <h3 className="text-sm font-semibold text-stone-800">Procurement Timeline</h3>
              <p className="text-[11px] text-stone-400">Key events — FY25 sulphur procurement</p>
            </div>
            <div className="p-5 space-y-0">
              {procurementTimeline.map((event, i) => {
                const style = timelineTypeStyles[event.type]
                return (
                  <div key={i} className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${style.dot} mt-0.5 shrink-0 z-10`} />
                      {i < procurementTimeline.length - 1 && (
                        <div className="w-px flex-1 bg-stone-200 mt-1" />
                      )}
                    </div>
                    <div className={`pb-4 flex-1 ${i === procurementTimeline.length - 1 ? 'pb-0' : ''}`}>
                      <p className="text-[10px] text-stone-400 mb-0.5">{event.date}</p>
                      <p className={`text-xs font-medium leading-snug ${style.label}`}>{event.event}</p>
                      {event.type === 'anomaly' && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-warning-600 mt-0.5">
                          <AlertTriangle size={10} /> AI Detected Anomaly
                        </span>
                      )}
                      {event.type === 'escalation' && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-risk-600 mt-0.5">
                          <AlertOctagon size={10} /> Escalated
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar — 1/3 */}
        <div className="space-y-6">
          {/* Region Dependency */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
            <div className="px-4 py-3 border-b border-stone-100 flex items-center gap-2">
              <MapPin size={14} className="text-navy-500" />
              <h3 className="text-sm font-semibold text-stone-800">Region Dependency</h3>
            </div>
            <div className="p-4 space-y-3">
              {regionDependency.map((region, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-stone-700">{region.region}</span>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={region.risk} size="xs" />
                      <span className="text-xs font-semibold text-stone-700">{region.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${region.risk === 'High' ? 'bg-risk-500' : region.risk === 'Medium' ? 'bg-warning-500' : 'bg-success-500'}`}
                      style={{ width: `${region.percentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-stone-400 mt-0.5">{region.vendors} active vendors</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scenario Simulation */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
            <div className="px-4 py-3 border-b border-stone-100">
              <h3 className="text-sm font-semibold text-stone-800">Scenario Impact</h3>
              <p className="text-[11px] text-stone-400">Concentration reduction simulation</p>
            </div>
            <div className="p-4">
              <div className="space-y-2 mb-4">
                {Object.entries(scenarios).map(([key, s]) => (
                  <button
                    key={key}
                    onClick={() => setActiveScenario(key)}
                    className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors ${
                      activeScenario === key
                        ? 'bg-navy-500 text-white'
                        : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="p-3 bg-stone-50 rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-stone-500">Single-vendor cap</span>
                  <span className="text-[11px] font-semibold text-stone-700">{scenarios[activeScenario].threshold}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">Estimated saving</span>
                  <span className="text-[11px] font-semibold text-success-600">
                    {scenarios[activeScenario].saving > 0 ? `+₹${scenarios[activeScenario].saving} Cr` : 'Baseline'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Commentary */}
          <AIInsightPanel
            title="AI Commentary"
            content={aiCommentary}
            recommendations={aiRecommendations}
          />

          {/* Executive Recommendation */}
          <div className="bg-navy-500 rounded-lg p-4 text-white">
            <h3 className="text-sm font-semibold mb-2">Executive Recommendation</h3>
            <p className="text-xs text-navy-100 leading-relaxed">
              Immediate intervention required. Recommend suspending single-vendor awards in sulphur pending forensic review. Dual-source qualification should be initiated within 30 days.
            </p>
            <button className="mt-3 w-full py-1.5 bg-white/10 hover:bg-white/20 text-xs font-medium rounded-md transition-colors border border-white/20">
              Generate Board Briefing →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
