import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import {
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts'
import { AlertTriangle, Clock, ChevronDown, ChevronUp, Sparkles, Shield, CheckCircle } from 'lucide-react'
import StatusBadge from '../../components/shared/StatusBadge'
import ChartCard from '../../components/shared/ChartCard'
import AIInsightPanel from '../../components/shared/AIInsightPanel'
import { bidComparisonMatrix, pricingVarianceData, bidTimelineIrregularities } from '../../data/buyerData'

const VENDOR_COLORS = ['#1E3A5F', '#3B6B9C', '#64748B', '#94A3B8']

export default function BidEvaluation() {
  const [expandedVendor, setExpandedVendor] = useState(null)
  const [compareA, setCompareA] = useState(0)
  const [compareB, setCompareB] = useState(1)

  const radarData = ['Technical', 'Commercial', 'Delivery', 'Compliance', 'Overall'].map(key => {
    const row = { subject: key }
    bidComparisonMatrix.forEach((v, i) => {
      const k = key.toLowerCase() + (key === 'Technical' ? 'Score' : key === 'Commercial' ? 'Score' : key === 'Overall' ? 'Score' : '')
      if (key === 'Technical') row[`v${i}`] = v.technicalScore
      else if (key === 'Commercial') row[`v${i}`] = v.commercialScore
      else if (key === 'Overall') row[`v${i}`] = v.overallScore
      else if (key === 'Delivery') row[`v${i}`] = 100 - v.deliveryDays * 5
      else if (key === 'Compliance') row[`v${i}`] = v.compliance === 'Full' ? 90 : 60
    })
    return row
  })

  return (
    <div className="space-y-6 pt-2 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-stone-800">Bid Evaluation Cockpit</h1>
        <p className="text-xs text-stone-400 mt-0.5">RFP-2025-0312 — Sulphur Annual Supply Contract FY26 · 4 bids received</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-risk-50 border border-risk-100 rounded-md">
            <AlertTriangle size={12} className="text-risk-600" />
            <span className="text-[11px] font-medium text-risk-600">3 bid timing anomalies detected — review before award</span>
          </div>
        </div>
      </div>

      {/* Bid Comparison Matrix */}
      <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
        <div className="px-5 py-3.5 border-b border-stone-100">
          <h3 className="text-sm font-semibold text-stone-800">Bid Comparison Matrix</h3>
          <p className="text-[11px] text-stone-400">Click a row to expand vendor details</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stone-200">
                {['Vendor', 'Tech Score', 'Comm Score', 'Overall', 'Unit Price', 'Delivery', 'Compliance', 'Anomalies'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bidComparisonMatrix.map((vendor, i) => (
                <React.Fragment key={vendor.vendor}>
                  <tr
                    key={vendor.vendor}
                    onClick={() => setExpandedVendor(expandedVendor === i ? null : i)}
                    className={`border-b border-stone-100 cursor-pointer transition-colors hover:bg-stone-50 ${i === 0 ? 'bg-success-50/30' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: VENDOR_COLORS[i] }}>
                          {i + 1}
                        </div>
                        <span className="text-xs font-semibold text-stone-700 whitespace-nowrap">{vendor.vendor}</span>
                        {i === 0 && <span className="text-[9px] bg-success-100 text-success-700 px-1.5 py-0.5 rounded-full font-semibold">L1</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-10 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <div className="h-full bg-navy-500 rounded-full" style={{ width: `${vendor.technicalScore}%` }} />
                        </div>
                        <span className="text-xs font-medium text-stone-700">{vendor.technicalScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-10 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-500 rounded-full" style={{ width: `${vendor.commercialScore}%` }} />
                        </div>
                        <span className="text-xs font-medium text-stone-700">{vendor.commercialScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-stone-800">{vendor.overallScore}</span>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium text-stone-700 whitespace-nowrap">{vendor.unitPrice}</td>
                    <td className="px-4 py-3 text-xs text-stone-600">{vendor.deliveryDays} days</td>
                    <td className="px-4 py-3"><StatusBadge status={vendor.compliance} size="xs" /></td>
                    <td className="px-4 py-3">
                      {vendor.anomalyFlags.length > 0 ? (
                        <div className="flex items-center gap-1 text-risk-600">
                          <AlertTriangle size={12} />
                          <span className="text-xs font-semibold">{vendor.anomalyFlags.length}</span>
                        </div>
                      ) : <CheckCircle size={14} className="text-success-500" />}
                    </td>
                  </tr>
                  <AnimatePresence>
                    {expandedVendor === i && (
                      <tr key={`exp-${i}`}>
                        <td colSpan={8} className="px-4 py-0 bg-stone-50 border-b border-stone-200">
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="py-4 grid grid-cols-3 gap-6"
                          >
                            <div>
                              <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Vendor Details</p>
                              {[
                                ['Capacity', vendor.capacity],
                                ['Experience', vendor.experience],
                                ['Payment Terms', vendor.paymentTerms],
                                ['Bid Timestamp', vendor.bidTimestamp],
                              ].map(([k, v]) => (
                                <div key={k} className="flex justify-between py-1 border-b border-stone-200 last:border-0">
                                  <span className="text-[11px] text-stone-400">{k}</span>
                                  <span className="text-[11px] font-medium text-stone-700">{v}</span>
                                </div>
                              ))}
                            </div>
                            <div className="col-span-2">
                              <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Anomaly Flags</p>
                              {vendor.anomalyFlags.length === 0 ? (
                                <p className="text-xs text-success-600 flex items-center gap-1.5"><CheckCircle size={13} /> No anomalies detected</p>
                              ) : (
                                <ul className="space-y-1.5">
                                  {vendor.anomalyFlags.map((flag, fi) => (
                                    <li key={fi} className="flex items-start gap-2 text-xs text-risk-700">
                                      <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                                      {flag}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pricing Variance */}
        <div className="lg:col-span-2 space-y-6">
          <ChartCard title="Pricing Variance Analysis" subtitle="Quoted price vs market benchmark (₹/MT)">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={pricingVarianceData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
                <XAxis dataKey="vendor" tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false}
                  tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} domain={[12000, 20000]} />
                <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #E7E5E4', borderRadius: 6 }}
                  formatter={(v, n) => [`₹${v.toLocaleString()}/MT`, n]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="market" name="Market Benchmark" fill="#D6D3D1" radius={[3, 3, 0, 0]} maxBarSize={32} />
                <Bar dataKey="quoted" name="Quoted Price" fill="#1E3A5F" radius={[3, 3, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {pricingVarianceData.map((v, i) => (
                <div key={i} className="text-center p-2 bg-risk-50 rounded-md border border-risk-100">
                  <p className="text-[10px] text-stone-500">{v.vendor.split(' ')[0]}</p>
                  <p className="text-sm font-bold text-risk-600">+{v.variance}%</p>
                  <p className="text-[10px] text-stone-400">above mkt</p>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Bid Timeline Irregularities */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
            <div className="px-5 py-3.5 border-b border-stone-100 flex items-center gap-2">
              <Clock size={14} className="text-navy-500" />
              <h3 className="text-sm font-semibold text-stone-800">Bid Timeline Irregularities</h3>
            </div>
            <div className="p-5 space-y-2">
              {bidTimelineIrregularities.map((item, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-md border ${
                  item.flag ? 'bg-risk-50 border-risk-100' : 'bg-stone-50 border-stone-200'
                }`}>
                  <div className={`w-2.5 h-2.5 rounded-full mt-0.5 shrink-0 ${item.flag ? 'bg-risk-500' : 'bg-stone-400'}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium ${item.flag ? 'text-risk-700' : 'text-stone-600'}`}>{item.event}</p>
                    <p className="text-[10px] text-stone-400 font-mono mt-0.5">{item.timestamp}</p>
                  </div>
                  {item.flag && (
                    <span className="text-[10px] bg-risk-100 text-risk-700 px-1.5 py-0.5 rounded-full font-semibold shrink-0">Flagged</span>
                  )}
                </div>
              ))}
              <div className="mt-2 p-3 bg-warning-50 border border-warning-100 rounded-md">
                <p className="text-xs text-warning-700 font-medium">
                  ⚠ 3 vendors submitted bids within a 3-minute 44-second window — statistical probability &lt;0.2%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Technical vs Commercial Radar */}
          <ChartCard title="Score Comparison" subtitle="Technical vs Commercial">
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E7E5E4" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#A8A29E' }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                {bidComparisonMatrix.slice(0, 2).map((v, i) => (
                  <Radar key={i} name={v.vendor.split(' ')[0]} dataKey={`v${i}`}
                    stroke={VENDOR_COLORS[i]} fill={VENDOR_COLORS[i]} fillOpacity={0.15} strokeWidth={2} />
                ))}
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #E7E5E4', borderRadius: 6 }} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* AI Recommendation */}
          <AIInsightPanel
            title="Recommendation Engine"
            content={`Based on overall score and bid documentation review, Rajesh Chemicals Ltd is the technical L1 with the highest composite score (85/100).

However, the AI system has flagged significant concerns with this award:
• Bid timing clustering with 2 other shortlisted vendors
• Price 18.6% above market benchmark
• Increasing concentration risk (currently 78%)

Recommending: Proceed with technical clarification round before commercial award. Seek independent price validation.`}
          />

          {/* Normalization Controls */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise p-4">
            <h3 className="text-sm font-semibold text-stone-800 mb-3">Bid Normalization</h3>
            <div className="space-y-3">
              {[
                { label: 'Technical Weight', value: 40 },
                { label: 'Commercial Weight', value: 40 },
                { label: 'Risk Adjustment', value: 20 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-stone-600">{item.label}</span>
                    <span className="text-[11px] font-semibold text-stone-700">{item.value}%</span>
                  </div>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-navy-400 rounded-full" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-1.5 text-xs font-medium text-navy-600 bg-navy-50 border border-navy-100 rounded-md hover:bg-navy-100 transition-colors">
              Recalculate Scores
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
