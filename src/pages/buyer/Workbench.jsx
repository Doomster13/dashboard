import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import {
  AlertTriangle, Plus, CheckSquare, Phone, FileDown,
  Clock, ChevronRight, Filter, Circle
} from 'lucide-react'
import KPICard from '../../components/shared/KPICard'
import StatusBadge from '../../components/shared/StatusBadge'
import ChartCard from '../../components/shared/ChartCard'
import { buyerKPIs, activeRFPs, copilotNudges, approvalBottlenecks } from '../../data/buyerData'

const ALL_STATUSES = ['All', 'Draft', 'Bid Collection', 'Evaluation', 'Technical Review', 'Award Pending']

const nudgeColors = {
  warning: { bar: 'bg-warning-500', bg: 'bg-warning-50', icon: 'text-warning-600', border: 'border-warning-200' },
  info: { bar: 'bg-navy-400', bg: 'bg-navy-50', icon: 'text-navy-500', border: 'border-navy-100' },
  success: { bar: 'bg-success-500', bg: 'bg-success-50', icon: 'text-success-600', border: 'border-success-100' },
}

const statusCounts = ALL_STATUSES.slice(1).map(s => ({
  name: s.replace(' ', '\n'),
  count: activeRFPs.filter(r => r.status === s).length,
}))

export default function Workbench() {
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredRFPs = statusFilter === 'All'
    ? activeRFPs
    : activeRFPs.filter(r => r.status === statusFilter)

  return (
    <div className="space-y-5 pt-2 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-stone-800">My Workbench</h1>
          <p className="text-xs text-stone-400 mt-0.5">Daily procurement operations — 28 Sep 2025</p>
        </div>
        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          {[
            { icon: Plus, label: 'New RFP' },
            { icon: CheckSquare, label: 'Schedule Eval' },
            { icon: Phone, label: 'Contact Vendor' },
            { icon: FileDown, label: 'Export' },
          ].map(({ icon: Icon, label }) => (
            <button key={label} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {buyerKPIs.map(kpi => <KPICard key={kpi.id} {...kpi} compact />)}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left / Center — RFP Table (2/3) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Copilot Nudges */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <Circle size={8} className="text-warning-500 fill-warning-500" />
              Copilot Nudges — {copilotNudges.length} items requiring attention
            </p>
            {copilotNudges.map(nudge => {
              const style = nudgeColors[nudge.type]
              return (
                <div key={nudge.id} className={`flex items-start gap-0 bg-white border ${style.border} rounded-lg overflow-hidden shadow-enterprise`}>
                  <div className={`w-1 shrink-0 self-stretch ${style.bar}`} />
                  <div className="flex-1 px-4 py-3 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-stone-700">{nudge.message}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-stone-400">{nudge.rfp}</span>
                        <span className="text-[10px] text-stone-400">{nudge.timestamp}</span>
                      </div>
                    </div>
                    <button className={`shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors ${style.icon} ${style.bg} hover:opacity-80`}>
                      {nudge.action}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* RFP Table */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
            <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-stone-800">Active RFPs</h3>
              {/* Filter */}
              <div className="flex items-center gap-1">
                <Filter size={12} className="text-stone-400" />
                <div className="flex gap-1">
                  {ALL_STATUSES.map(s => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${
                        statusFilter === s
                          ? 'bg-navy-500 text-white'
                          : 'text-stone-500 hover:bg-stone-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-stone-200">
                    {['RFP ID', 'Title', 'Status', 'Deadline', 'Bids', 'Anomalies', 'Value'].map(h => (
                      <th key={h} className="px-3 py-2 text-[11px] font-semibold text-stone-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRFPs.map((rfp, i) => (
                    <motion.tr
                      key={rfp.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className={`border-b border-stone-100 hover:bg-stone-50 transition-colors cursor-pointer ${i % 2 === 0 ? 'bg-white' : 'bg-stone-50/30'}`}
                    >
                      <td className="px-3 py-2.5 text-[11px] font-mono text-navy-500 font-medium whitespace-nowrap">{rfp.id}</td>
                      <td className="px-3 py-2.5 text-xs text-stone-700 max-w-[200px]">
                        <p className="truncate font-medium">{rfp.title}</p>
                        <p className="text-[10px] text-stone-400">{rfp.category}</p>
                      </td>
                      <td className="px-3 py-2.5"><StatusBadge status={rfp.status} size="xs" /></td>
                      <td className="px-3 py-2.5 text-xs text-stone-500 whitespace-nowrap">
                        <div className="flex items-center gap-1"><Clock size={10} /> {rfp.deadline}</div>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-stone-600 text-center">{rfp.bids}</td>
                      <td className="px-3 py-2.5 text-center">
                        {rfp.anomalies > 0 ? (
                          <div className="flex items-center gap-1 text-risk-600">
                            <AlertTriangle size={11} />
                            <span className="text-xs font-semibold">{rfp.anomalies}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-stone-300">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-xs font-semibold text-stone-700 whitespace-nowrap">{rfp.value}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar — 1/3 */}
        <div className="space-y-5">
          {/* Status Distribution */}
          <ChartCard title="RFP Queue Distribution" subtitle="By current status">
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={statusCounts} layout="vertical" margin={{ top: 0, right: 4, bottom: 0, left: 60 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#78716C' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #E7E5E4', borderRadius: 6 }} />
                <Bar dataKey="count" fill="#1E3A5F" radius={[0, 3, 3, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Approval Bottlenecks */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
            <div className="px-4 py-3 border-b border-stone-100">
              <h3 className="text-sm font-semibold text-stone-800">Approval Bottlenecks</h3>
              <p className="text-[11px] text-stone-400">{approvalBottlenecks.length} RFPs awaiting sign-off</p>
            </div>
            <div className="divide-y divide-stone-100">
              {approvalBottlenecks.map((item, i) => (
                <div key={i} className="px-4 py-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] font-mono text-navy-500">{item.rfp}</p>
                      <p className="text-xs font-medium text-stone-700 mt-0.5">{item.stage}</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">{item.blocker}</p>
                    </div>
                    <div className={`flex items-center gap-1 text-[11px] font-semibold ${item.daysWaiting > 3 ? 'text-risk-600' : 'text-warning-600'}`}>
                      <Clock size={10} />
                      {item.daysWaiting}d
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-stone-400">Approver: {item.approver}</span>
                    <button className="text-[10px] text-navy-500 font-medium hover:text-navy-600 flex items-center gap-0.5">
                      Escalate <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workload Tracker */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise p-4">
            <h3 className="text-sm font-semibold text-stone-800 mb-3">Workload Tracker</h3>
            <div className="space-y-2.5">
              {[
                { label: 'RFPs Active', current: 8, max: 12, color: 'bg-navy-500' },
                { label: 'Evaluations Due', current: 3, max: 5, color: 'bg-warning-500' },
                { label: 'Vendor Contacts', current: 6, max: 10, color: 'bg-success-500' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-stone-600">{item.label}</span>
                    <span className="text-[11px] font-semibold text-stone-700">{item.current}/{item.max}</span>
                  </div>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.current / item.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
