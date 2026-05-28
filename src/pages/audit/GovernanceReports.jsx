import { useState } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts'
import { Download, Archive, FileCheck, Shield, ChevronDown, ChevronUp, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import StatusBadge from '../../components/shared/StatusBadge'
import ChartCard from '../../components/shared/ChartCard'
import ExportActions from '../../components/shared/ExportActions'
import { complianceChecklist, governanceMaturity, internalControlEffectiveness, auditReadinessScore } from '../../data/auditData'

const maturityChartData = governanceMaturity.map(d => ({
  dimension: d.dimension.replace(' & ', '\n& '),
  score: d.score,
  benchmark: d.benchmark,
}))

export default function GovernanceReports() {
  const [expandedSection, setExpandedSection] = useState('checklist')
  const toggle = (s) => setExpandedSection(expandedSection === s ? null : s)
  const isOpen = (s) => expandedSection === s

  return (
    <div className="space-y-6 pt-2 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-stone-800">Governance Reports</h1>
          <p className="text-xs text-stone-400 mt-0.5">Regulatory compliance, governance maturity & audit readiness — Q2 FY25</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
            <Archive size={13} /> Archive Investigation
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
            <FileCheck size={13} /> Compliance Summary
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-navy-500 rounded-lg hover:bg-navy-600 transition-colors">
            <Download size={13} /> Export Audit Package
          </button>
        </div>
      </div>

      {/* Audit Readiness Score + Governance Maturity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Readiness Score */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-stone-200 shadow-enterprise p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} className="text-navy-500" />
            <h3 className="text-sm font-semibold text-stone-800">Audit Readiness Score</h3>
          </div>
          {/* Large score display */}
          <div className="text-center py-4">
            <p className="text-6xl font-bold text-navy-500">{auditReadinessScore.overall}</p>
            <p className="text-stone-400 text-sm mt-1">/ 100</p>
            <div className="mt-2 inline-flex">
              <StatusBadge status="Compliant" />
            </div>
          </div>
          {/* Breakdown */}
          <div className="space-y-2.5 mt-4">
            {auditReadinessScore.breakdown.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-stone-600">{item.area}</span>
                  <span className="text-[11px] font-semibold text-stone-700">{item.score}%</span>
                </div>
                <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.score >= 90 ? 'bg-success-500' : item.score >= 80 ? 'bg-navy-400' : 'bg-warning-500'}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Governance Maturity Chart */}
        <div className="lg:col-span-8">
          <ChartCard title="Governance Maturity Assessment" subtitle="Score vs benchmark across 6 dimensions">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={maturityChartData} margin={{ top: 4, right: 4, bottom: 20, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
                <XAxis dataKey="dimension" tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #E7E5E4', borderRadius: 6 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="score" name="Current Score" fill="#1E3A5F" radius={[3, 3, 0, 0]} maxBarSize={28}>
                  {maturityChartData.map((entry, i) => (
                    <Cell key={i} fill={entry.score >= entry.benchmark ? '#1E3A5F' : '#D97706'} />
                  ))}
                </Bar>
                <Bar dataKey="benchmark" name="Benchmark" fill="#E7E5E4" radius={[3, 3, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-2">
              {governanceMaturity.map((item, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${item.score >= item.benchmark ? 'bg-navy-500' : 'bg-warning-500'}`} />
                  <span className="text-[10px] text-stone-500 truncate max-w-20">{item.dimension.split(' ')[0]}: {item.status.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Collapsible Report Sections */}
      {/* Compliance Checklist */}
      <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
        <button onClick={() => toggle('checklist')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors border-b border-stone-100">
          <div className="flex items-center gap-2">
            <CheckCircle size={15} className="text-navy-500" />
            <span className="text-sm font-semibold text-stone-800">Statutory Compliance Checklist</span>
            <span className="text-[11px] text-stone-400">({complianceChecklist.length} items)</span>
          </div>
          {isOpen('checklist') ? <ChevronUp size={14} className="text-stone-400" /> : <ChevronDown size={14} className="text-stone-400" />}
        </button>
        {isOpen('checklist') && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200">
                  {['Compliance Item', 'Status', 'Last Reviewed', 'Next Review', 'Coverage'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {complianceChecklist.map((item, i) => (
                  <tr key={i} className={`border-b border-stone-100 hover:bg-stone-50 transition-colors ${i % 2 === 0 ? '' : 'bg-stone-50/30'}`}>
                    <td className="px-4 py-3 text-xs font-medium text-stone-700">{item.item}</td>
                    <td className="px-4 py-3"><StatusBadge status={item.status} size="xs" /></td>
                    <td className="px-4 py-3 text-xs text-stone-500">{item.lastReview}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${item.nextReview === 'Immediate' ? 'text-risk-600' : 'text-stone-500'}`}>
                        {item.nextReview}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${parseInt(item.coverage) >= 90 ? 'bg-success-500' : 'bg-warning-500'}`}
                            style={{ width: item.coverage }} />
                        </div>
                        <span className="text-xs text-stone-600">{item.coverage}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Internal Control Effectiveness */}
      <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
        <button onClick={() => toggle('controls')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Shield size={15} className="text-navy-500" />
            <span className="text-sm font-semibold text-stone-800">Internal Control Effectiveness</span>
          </div>
          {isOpen('controls') ? <ChevronUp size={14} className="text-stone-400" /> : <ChevronDown size={14} className="text-stone-400" />}
        </button>
        {isOpen('controls') && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200">
                  {['Control', 'Effectiveness', 'Trend', 'Last Tested'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {internalControlEffectiveness.map((item, i) => (
                  <tr key={i} className={`border-b border-stone-100 hover:bg-stone-50 transition-colors ${i % 2 === 0 ? '' : 'bg-stone-50/30'}`}>
                    <td className="px-4 py-3 text-xs font-medium text-stone-700">{item.control}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${item.effectiveness >= 85 ? 'bg-success-500' : item.effectiveness >= 70 ? 'bg-warning-500' : 'bg-risk-500'}`}
                            style={{ width: `${item.effectiveness}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-stone-700">{item.effectiveness}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={item.trend} size="xs" /></td>
                    <td className="px-4 py-3 text-xs text-stone-500">{item.lastTested}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Board Governance Pack + Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise p-5">
          <h3 className="text-sm font-semibold text-stone-800 mb-4">Board Governance Pack</h3>
          <div className="space-y-2">
            {[
              { title: 'Q2 FY25 Board Report', type: 'PDF', size: '2.4 MB', date: '28 Sep 2025' },
              { title: 'Sulphur Procurement Incident Brief', type: 'PDF', size: '890 KB', date: '20 Sep 2025' },
              { title: 'Governance Maturity Assessment', type: 'XLSX', size: '1.1 MB', date: '15 Sep 2025' },
              { title: 'Audit Committee Presentation', type: 'PPT', size: '4.2 MB', date: '10 Sep 2025' },
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-stone-50 rounded-md border border-stone-200 hover:bg-stone-100 cursor-pointer transition-colors">
                <div>
                  <p className="text-xs font-medium text-stone-700">{doc.title}</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">{doc.type} · {doc.size} · {doc.date}</p>
                </div>
                <Download size={13} className="text-stone-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise p-5">
          <h3 className="text-sm font-semibold text-stone-800 mb-4">Regulator-Ready Templates</h3>
          <div className="space-y-2">
            {[
              { title: 'MCA Statutory Filing — Anti-Fraud Declaration', status: 'Ready' },
              { title: 'SEBI Governance Disclosure (Annual)', status: 'Ready' },
              { title: 'Internal Audit Report Format', status: 'Ready' },
              { title: 'Whistleblower Case Summary Template', status: 'Ready' },
              { title: 'Vendor Due Diligence Checklist', status: 'Under Review' },
            ].map((tmpl, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-stone-50 rounded-md border border-stone-200">
                <p className="text-xs font-medium text-stone-700">{tmpl.title}</p>
                <div className="flex items-center gap-2">
                  <StatusBadge status={tmpl.status} size="xs" />
                  <button className="text-[11px] text-navy-500 font-medium hover:text-navy-600">Use</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
