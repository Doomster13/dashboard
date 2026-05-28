import { useState } from 'react'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'
import { FileText, Presentation, Share2, Printer, Download, ChevronDown, ChevronUp, Shield } from 'lucide-react'
import StatusBadge from '../../components/shared/StatusBadge'
import { boardReportKPIs, boardNarrativeSummary, governanceRecommendations } from '../../data/cpoData'

const integrityScore = 76
const radialData = [{ name: 'Score', value: integrityScore, fill: '#1E3A5F' }]

function ActionButton({ icon: Icon, label, primary }) {
  return (
    <button
      className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors ${
        primary
          ? 'bg-navy-500 text-white hover:bg-navy-600'
          : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
      }`}
    >
      <Icon size={13} /> {label}
    </button>
  )
}

const priorityColors = {
  Immediate: 'text-risk-600 bg-risk-50 border-risk-100',
  'Short-term': 'text-warning-600 bg-warning-50 border-warning-100',
  'Medium-term': 'text-stone-600 bg-stone-50 border-stone-200',
}

export default function BoardReport() {
  const [expandedSection, setExpandedSection] = useState('summary')

  const toggle = (section) => setExpandedSection(expandedSection === section ? null : section)

  return (
    <div className="pt-2 pb-8 max-w-5xl">
      {/* Document Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-stone-800">Board-Ready Report</h1>
          <p className="text-xs text-stone-400 mt-0.5">Q2 FY25 · Procurement Governance & Risk Summary</p>
        </div>
        <div className="flex items-center gap-2">
          <ActionButton icon={Printer} label="Print" />
          <ActionButton icon={Download} label="Export PDF" />
          <ActionButton icon={Presentation} label="Export PPT" />
          <ActionButton icon={Share2} label="Share to Board Portal" primary />
        </div>
      </div>

      {/* Document Frame */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-enterprise-md overflow-hidden">
        {/* Document meta banner */}
        <div className="bg-navy-500 px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-white/80" />
            <span className="text-xs text-white/80 font-medium">Classification: Confidential — Board Use Only</span>
          </div>
          <span className="text-xs text-white/60">Generated: 28 Sep 2025 · Procurement Copilot AI</span>
        </div>

        {/* Document Title */}
        <div className="px-10 pt-8 pb-6 border-b border-stone-100">
          <p className="text-[11px] text-stone-400 uppercase tracking-wider font-medium mb-1">Procurement Intelligence Report</p>
          <h2 className="text-2xl font-bold text-stone-800 leading-tight">
            Q2 FY25 — Procurement Governance & Risk Assessment
          </h2>
          <p className="text-sm text-stone-500 mt-2">Board Audit Committee · September 2025</p>

          <div className="flex items-center gap-4 mt-4">
            <div className="text-xs text-stone-500">Prepared by: <span className="font-medium text-stone-700">Procurement Copilot AI</span></div>
            <div className="text-xs text-stone-500">Reviewed by: <span className="font-medium text-stone-700">Chief Procurement Officer</span></div>
            <div className="text-xs text-stone-500">Distribution: <span className="font-medium text-stone-700">Board Members, CFO, CEO</span></div>
          </div>
        </div>

        {/* Procurement Integrity Score + KPIs */}
        <div className="px-10 py-6 border-b border-stone-100">
          <div className="grid grid-cols-12 gap-6 items-center">
            {/* Integrity Score */}
            <div className="col-span-3 text-center">
              <div className="relative w-36 h-36 mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%" cy="50%"
                    innerRadius="65%" outerRadius="80%"
                    startAngle={225} endAngle={225 - (integrityScore / 100 * 270)}
                    data={radialData}
                  >
                    <RadialBar dataKey="value" background={{ fill: '#F5F5F4' }} cornerRadius={8} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-stone-800">{integrityScore}</span>
                  <span className="text-[10px] text-stone-400 font-medium">/ 100</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-stone-700 mt-1">Procurement Integrity</p>
              <StatusBadge status="Attention" size="xs" />
            </div>

            {/* KPI Grid */}
            <div className="col-span-9 grid grid-cols-3 gap-3">
              {boardReportKPIs.map((kpi, i) => (
                <div key={i} className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <p className="text-lg font-bold text-stone-800 leading-tight">{kpi.value}</p>
                  <p className="text-[11px] font-medium text-stone-600 mt-0.5">{kpi.label}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <StatusBadge status={kpi.status} size="xs" />
                    <span className="text-[10px] text-stone-400">{kpi.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Collapsible Sections */}
        {/* Executive Summary */}
        <div className="border-b border-stone-100">
          <button
            onClick={() => toggle('summary')}
            className="w-full px-10 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">01</span>
              <span className="text-sm font-semibold text-stone-800">Executive Summary</span>
            </div>
            {expandedSection === 'summary' ? <ChevronUp size={14} className="text-stone-400" /> : <ChevronDown size={14} className="text-stone-400" />}
          </button>
          {expandedSection === 'summary' && (
            <div className="px-10 pb-6">
              <div className="prose prose-sm max-w-none">
                <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">{boardNarrativeSummary}</p>
              </div>
            </div>
          )}
        </div>

        {/* Governance Recommendations */}
        <div className="border-b border-stone-100">
          <button
            onClick={() => toggle('recommendations')}
            className="w-full px-10 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">02</span>
              <span className="text-sm font-semibold text-stone-800">Governance Recommendations</span>
            </div>
            {expandedSection === 'recommendations' ? <ChevronUp size={14} className="text-stone-400" /> : <ChevronDown size={14} className="text-stone-400" />}
          </button>
          {expandedSection === 'recommendations' && (
            <div className="px-10 pb-6">
              <div className="space-y-3">
                {governanceRecommendations.map((rec) => (
                  <div key={rec.id} className="flex items-start gap-4 p-4 bg-stone-50 rounded-lg border border-stone-200">
                    <div className={`flex-shrink-0 px-2 py-0.5 text-[10px] font-semibold border rounded-full whitespace-nowrap ${priorityColors[rec.priority]}`}>
                      {rec.priority}
                    </div>
                    <p className="text-xs text-stone-700 flex-1 leading-relaxed">{rec.recommendation}</p>
                    <StatusBadge status={rec.status} size="xs" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Regulatory Posture */}
        <div className="border-b border-stone-100">
          <button
            onClick={() => toggle('regulatory')}
            className="w-full px-10 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">03</span>
              <span className="text-sm font-semibold text-stone-800">Regulatory Posture</span>
            </div>
            {expandedSection === 'regulatory' ? <ChevronUp size={14} className="text-stone-400" /> : <ChevronDown size={14} className="text-stone-400" />}
          </button>
          {expandedSection === 'regulatory' && (
            <div className="px-10 pb-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Companies Act — Section 447', status: 'Under Review', note: 'Potential fraud provisions being assessed' },
                  { label: 'Prevention of Corruption Act', status: 'Under Review', note: 'Bid collusion provisions applicable' },
                  { label: 'ISO 20400 Procurement Standard', status: 'Compliant', note: '94% adherence across categories' },
                  { label: 'SEBI Corporate Governance Code', status: 'Compliant', note: 'Timely disclosure maintained' },
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-stone-50 rounded-md border border-stone-200">
                    <p className="text-xs font-medium text-stone-700">{item.label}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <StatusBadge status={item.status} size="xs" />
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Document Footer */}
        <div className="px-10 py-4 bg-stone-50 flex items-center justify-between">
          <span className="text-[10px] text-stone-400">
            Procurement Copilot AI — Automated Intelligence Report · Version 2.4 · Confidential
          </span>
          <span className="text-[10px] text-stone-400">Page 1 of 1 · Q2 FY25</span>
        </div>
      </div>
    </div>
  )
}
