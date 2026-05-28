import { useState } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { Building2, MapPin, Users, DollarSign, Award, AlertTriangle, Mail, Phone, MessageSquare, Calendar, Briefcase } from 'lucide-react'
import StatusBadge from '../../components/shared/StatusBadge'
import ChartCard from '../../components/shared/ChartCard'
import {
  vendorProfile, vendorPerformanceScores, deliveryReliability,
  complianceHistory, riskIndicators, communicationTimeline, linkedStakeholders
} from '../../data/buyerData'

const radarData = Object.entries(vendorPerformanceScores).map(([key, value]) => ({
  subject: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
  score: value,
  fullMark: 100,
}))

const commTypeIcons = {
  Meeting: Calendar,
  Email: Mail,
  Call: Phone,
  'Site Visit': Briefcase,
}

export default function Vendor360() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6 pt-2 pb-8">
      {/* Vendor Header */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-enterprise overflow-hidden">
        <div className="h-2 bg-navy-500" />
        <div className="px-6 py-5 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center">
              <Building2 size={24} className="text-navy-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-800">{vendorProfile.name}</h1>
              <div className="flex items-center gap-4 mt-1">
                <span className="flex items-center gap-1 text-xs text-stone-500"><MapPin size={11} /> {vendorProfile.headquarters}</span>
                <span className="flex items-center gap-1 text-xs text-stone-500"><Users size={11} /> {vendorProfile.employees} employees</span>
                <span className="flex items-center gap-1 text-xs text-stone-500"><DollarSign size={11} /> Revenue: {vendorProfile.annualRevenue}</span>
                <span className="flex items-center gap-1 text-xs text-stone-500"><Award size={11} /> Est. {vendorProfile.established}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {vendorProfile.certifications.map(cert => (
                  <span key={cert} className="text-[10px] px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md font-medium">{cert}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-stone-800">{vendorPerformanceScores.overall}</p>
            <p className="text-[11px] text-stone-400">Overall Score / 100</p>
            <div className="mt-1.5">
              <StatusBadge status="High" />
            </div>
            <p className="text-[10px] text-risk-600 mt-1 font-medium">Risk Level</p>
          </div>
        </div>
        {/* Risk indicators strip */}
        <div className="px-6 pb-4 flex items-center gap-2 flex-wrap">
          {riskIndicators.map((r, i) => (
            <div key={i} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-medium ${
              r.level === 'Critical' ? 'bg-risk-50 border-risk-100 text-risk-600' :
              r.level === 'High' ? 'bg-warning-50 border-warning-100 text-warning-600' :
              'bg-stone-50 border-stone-200 text-stone-500'
            }`}>
              {r.level === 'Critical' || r.level === 'High' ? <AlertTriangle size={10} /> : null}
              {r.indicator}: {r.level}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-stone-200">
        {['overview', 'compliance', 'communications', 'stakeholders'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors capitalize ${
              activeTab === tab
                ? 'border-navy-500 text-navy-600'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Radar */}
          <ChartCard title="Performance Scorecard" subtitle="Across 6 key dimensions">
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E7E5E4" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#A8A29E' }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="score" stroke="#1E3A5F" fill="#1E3A5F" fillOpacity={0.15} strokeWidth={2} />
                <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #E7E5E4', borderRadius: 6 }} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {Object.entries(vendorPerformanceScores).map(([key, val]) => (
                <div key={key} className="text-center p-2 bg-stone-50 rounded-md">
                  <p className="text-sm font-bold text-stone-800">{val}</p>
                  <p className="text-[10px] text-stone-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Delivery Reliability */}
          <ChartCard title="Delivery Reliability" subtitle="On-time performance — last 6 months">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={deliveryReliability} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="onTimeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A5F" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1E3A5F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} domain={[0, 100]} />
                <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #E7E5E4', borderRadius: 6 }}
                  formatter={(v, n) => [`${v}%`, n]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="onTime" name="On-Time" stroke="#1E3A5F" fill="url(#onTimeGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="delayed" name="Delayed" stroke="#D97706" fill="none" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-3 p-2 bg-risk-50 border border-risk-100 rounded-md">
              <p className="text-[11px] text-risk-700 font-medium">On-time delivery has declined from 85% to 71% over 6 months — trend requires attention</p>
            </div>
          </ChartCard>

          {/* Risk Indicators */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
            <div className="px-5 py-3.5 border-b border-stone-100">
              <h3 className="text-sm font-semibold text-stone-800">Risk Indicators</h3>
            </div>
            <div className="p-4 grid grid-cols-2 lg:grid-cols-3 gap-3">
              {riskIndicators.map((r, i) => (
                <div key={i} className={`p-3 rounded-lg border ${
                  r.level === 'Critical' ? 'bg-risk-50 border-risk-100' :
                  r.level === 'High' ? 'bg-warning-50 border-warning-100' :
                  'bg-stone-50 border-stone-200'
                }`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <StatusBadge status={r.level} size="xs" />
                  </div>
                  <p className="text-xs font-semibold text-stone-700">{r.indicator}</p>
                  <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">{r.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
          <div className="px-5 py-3.5 border-b border-stone-100">
            <h3 className="text-sm font-semibold text-stone-800">Compliance History</h3>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stone-200">
                {['Date', 'Compliance Item', 'Status'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complianceHistory.map((item, i) => (
                <tr key={i} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3 text-xs text-stone-500 whitespace-nowrap">{item.date}</td>
                  <td className="px-4 py-3 text-xs text-stone-700">{item.item}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} size="xs" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'communications' && (
        <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
          <div className="px-5 py-3.5 border-b border-stone-100">
            <h3 className="text-sm font-semibold text-stone-800">Communication History</h3>
          </div>
          <div className="p-5 space-y-0">
            {communicationTimeline.map((item, i) => {
              const Icon = commTypeIcons[item.type] || MessageSquare
              return (
                <div key={i} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-navy-50 border border-navy-100 flex items-center justify-center shrink-0 z-10">
                      <Icon size={13} className="text-navy-500" />
                    </div>
                    {i < communicationTimeline.length - 1 && <div className="w-px flex-1 bg-stone-200 mt-1 mb-1" />}
                  </div>
                  <div className={`pb-5 flex-1 ${i === communicationTimeline.length - 1 ? 'pb-0' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">{item.type}</span>
                        <p className="text-xs font-medium text-stone-700 mt-0.5">{item.subject}</p>
                        <p className="text-[11px] text-stone-400 mt-0.5">Attendees: {item.attendees}</p>
                      </div>
                      <span className="text-[10px] text-stone-400 whitespace-nowrap ml-4">{item.date}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'stakeholders' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {linkedStakeholders.map((s, i) => (
            <div key={i} className="bg-white rounded-lg border border-stone-200 shadow-enterprise p-4 hover:shadow-enterprise-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mb-3">
                <span className="text-sm font-bold text-stone-500">{s.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <p className="text-xs font-semibold text-stone-800">{s.name}</p>
              <p className="text-[11px] text-stone-500 mt-0.5">{s.role}</p>
              <p className="text-[10px] text-stone-400 mt-0.5">{s.company}</p>
              <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] text-stone-400">Interactions</span>
                <span className="text-xs font-semibold text-navy-600">{s.interactions}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
