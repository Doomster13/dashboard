import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertOctagon, Database, Brain, FileText, StickyNote, Download, ChevronDown, ChevronUp, ShieldAlert, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import StatusBadge from '../../components/shared/StatusBadge'
import { caseFileTimeline, dataSources, modelReasoningLogic, linkedEvidence, investigationNotes } from '../../data/auditData'
import { SULPHUR_INCIDENT } from '../../data/sharedData'

const evidenceTypeIcons = {
  'System Log': Database,
  Email: FileText,
  Document: FileText,
  Analysis: Brain,
  Process: StickyNote,
  Financial: FileText,
}

const timelineTypeConfig = {
  detection: { dot: 'bg-navy-400 border-navy-200', bar: 'bg-navy-50', label: 'Detection', labelColor: 'text-navy-600' },
  evidence: { dot: 'bg-navy-600 border-navy-300', bar: 'bg-navy-50', label: 'Evidence', labelColor: 'text-navy-700' },
  process: { dot: 'bg-stone-400 border-stone-200', bar: 'bg-stone-50', label: 'Process', labelColor: 'text-stone-500' },
  escalation: { dot: 'bg-risk-500 border-risk-200', bar: 'bg-risk-50', label: 'Escalation', labelColor: 'text-risk-600' },
}

export default function CaseFile() {
  const [expandedEvidence, setExpandedEvidence] = useState(null)
  const [openSections, setOpenSections] = useState(['timeline', 'evidence'])

  const toggleSection = (s) => setOpenSections(prev =>
    prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
  )
  const isOpen = (s) => openSections.includes(s)

  return (
    <div className="space-y-5 pt-2 pb-8">
      {/* Case Header */}
      <div className="bg-white rounded-xl border border-risk-200 shadow-enterprise overflow-hidden">
        <div className="h-1.5 bg-risk-500" />
        <div className="px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono text-stone-400">{SULPHUR_INCIDENT.id}</span>
                <StatusBadge status={SULPHUR_INCIDENT.severity} />
                <StatusBadge status={SULPHUR_INCIDENT.status} />
              </div>
              <h1 className="text-xl font-bold text-stone-800">{SULPHUR_INCIDENT.title}</h1>
              <p className="text-xs text-stone-500 mt-1">{SULPHUR_INCIDENT.category}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-2xl font-bold text-risk-600">{SULPHUR_INCIDENT.totalExposure}</p>
                <p className="text-[11px] text-stone-400">Total Exposure</p>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-navy-500 text-white text-xs font-medium rounded-lg hover:bg-navy-600 transition-colors">
                <Download size={13} /> Export Evidence Pack
              </button>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-stone-100">
            <span className="text-[11px] text-stone-500">Date Identified: <span className="font-medium text-stone-700">{SULPHUR_INCIDENT.dateIdentified}</span></span>
            <span className="text-[11px] text-stone-500">Investigator: <span className="font-medium text-stone-700">Ananya Krishnan</span></span>
            <span className="text-[11px] text-stone-500">Vendors Involved: <span className="font-medium text-stone-700">{SULPHUR_INCIDENT.vendorsInvolved.join(', ')}</span></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Timeline + Evidence + Notes */}
        <div className="lg:col-span-2 space-y-5">
          {/* Event Timeline */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
            <button onClick={() => toggleSection('timeline')}
              className="w-full px-5 py-3.5 border-b border-stone-100 flex items-center justify-between hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-navy-500" />
                <h3 className="text-sm font-semibold text-stone-800">Complete Event Timeline</h3>
                <span className="text-[11px] text-stone-400">({caseFileTimeline.length} events)</span>
              </div>
              {isOpen('timeline') ? <ChevronUp size={14} className="text-stone-400" /> : <ChevronDown size={14} className="text-stone-400" />}
            </button>
            {isOpen('timeline') && (
              <div className="p-5 space-y-0">
                {caseFileTimeline.map((event, i) => {
                  const cfg = timelineTypeConfig[event.type]
                  return (
                    <div key={i} className="flex gap-4 relative">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full border-2 ${cfg.dot} mt-1 shrink-0 z-10`} />
                        {i < caseFileTimeline.length - 1 && <div className="w-px flex-1 bg-stone-200 mt-1" />}
                      </div>
                      <div className={`flex-1 mb-4 p-3 rounded-md ${cfg.bar} ${i === caseFileTimeline.length - 1 ? 'mb-0' : ''}`}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-stone-400 font-mono">{event.date} {event.time}</span>
                            <span className={`text-[9px] font-semibold uppercase tracking-wider ${cfg.labelColor}`}>{cfg.label}</span>
                          </div>
                          {event.confidence && (
                            <span className="text-[10px] font-medium text-stone-500">
                              {event.confidence}% confidence
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-700 font-medium leading-snug">{event.event}</p>
                        <p className="text-[10px] text-stone-400 mt-0.5">Source: {event.source}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Linked Evidence */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
            <button onClick={() => toggleSection('evidence')}
              className="w-full px-5 py-3.5 border-b border-stone-100 flex items-center justify-between hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-navy-500" />
                <h3 className="text-sm font-semibold text-stone-800">Linked Evidence</h3>
                <span className="text-[11px] text-stone-400">({linkedEvidence.length} items)</span>
              </div>
              {isOpen('evidence') ? <ChevronUp size={14} className="text-stone-400" /> : <ChevronDown size={14} className="text-stone-400" />}
            </button>
            {isOpen('evidence') && (
              <div className="divide-y divide-stone-100">
                {linkedEvidence.map((ev, i) => {
                  const Icon = evidenceTypeIcons[ev.type] || FileText
                  return (
                    <div key={ev.id}>
                      <div
                        onClick={() => setExpandedEvidence(expandedEvidence === ev.id ? null : ev.id)}
                        className="px-5 py-3 flex items-center justify-between hover:bg-stone-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-md bg-stone-100 flex items-center justify-center">
                            <Icon size={13} className="text-stone-500" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-stone-700">{ev.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-mono text-stone-400">{ev.id}</span>
                              <span className="text-[10px] text-stone-400">{ev.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge status={ev.status} size="xs" />
                          <span className="text-[10px] text-stone-400">{ev.date}</span>
                          {expandedEvidence === ev.id ? <ChevronUp size={12} className="text-stone-300" /> : <ChevronDown size={12} className="text-stone-300" />}
                        </div>
                      </div>
                      {expandedEvidence === ev.id && (
                        <div className="px-5 py-3 bg-stone-50 border-t border-stone-100">
                          <p className="text-xs text-stone-500">
                            Evidence item <span className="font-mono font-medium">{ev.id}</span> — {ev.type} document.
                            Status: <StatusBadge status={ev.status} size="xs" />
                          </p>
                          <div className="flex gap-2 mt-2">
                            <button className="text-[11px] text-navy-500 font-medium hover:text-navy-600">View Document</button>
                            <span className="text-stone-300">·</span>
                            <button className="text-[11px] text-stone-500 font-medium hover:text-stone-600">Download</button>
                            <span className="text-stone-300">·</span>
                            <button className="text-[11px] text-stone-500 font-medium hover:text-stone-600">Add Note</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Investigation Notes */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
            <button onClick={() => toggleSection('notes')}
              className="w-full px-5 py-3.5 border-b border-stone-100 flex items-center justify-between hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-2">
                <StickyNote size={14} className="text-navy-500" />
                <h3 className="text-sm font-semibold text-stone-800">Investigation Notes</h3>
              </div>
              {isOpen('notes') ? <ChevronUp size={14} className="text-stone-400" /> : <ChevronDown size={14} className="text-stone-400" />}
            </button>
            {isOpen('notes') && (
              <div className="p-5 space-y-4">
                {investigationNotes.map((note, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-navy-50 border border-navy-100 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-navy-600">{note.author.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="flex-1 bg-stone-50 rounded-lg p-3 border border-stone-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-semibold text-stone-700">{note.author}</span>
                        <span className="text-[10px] text-stone-400">{note.date}</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">{note.note}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2 border border-dashed border-stone-300 rounded-lg text-xs text-stone-400 hover:border-stone-400 hover:text-stone-500 transition-colors">
                  + Add Investigation Note
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-5">
          {/* Data Sources */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
            <div className="px-4 py-3.5 border-b border-stone-100 flex items-center gap-2">
              <Database size={14} className="text-navy-500" />
              <h3 className="text-sm font-semibold text-stone-800">Data Sources</h3>
            </div>
            <div className="divide-y divide-stone-100">
              {dataSources.map((ds, i) => (
                <div key={i} className="px-4 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-stone-700 truncate pr-2">{ds.source}</span>
                    <StatusBadge status={ds.status} size="xs" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-stone-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${ds.coverage === '100%' ? 'bg-success-500' : ds.coverage === '0%' ? 'bg-stone-300' : 'bg-warning-500'}`}
                        style={{ width: ds.coverage }} />
                    </div>
                    <span className="text-[10px] text-stone-400 whitespace-nowrap">{ds.coverage} · {ds.records} records</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Reasoning */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
            <div className="px-4 py-3.5 border-b border-stone-100 flex items-center gap-2">
              <Brain size={14} className="text-navy-500" />
              <h3 className="text-sm font-semibold text-stone-800">Model Reasoning</h3>
              <span className="text-[10px] bg-navy-50 text-navy-600 px-1.5 py-0.5 rounded-full font-medium ml-auto">AI Analysis</span>
            </div>
            <div className="divide-y divide-stone-100">
              {modelReasoningLogic.map((factor, i) => (
                <div key={i} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-[11px] font-medium text-stone-700 flex-1">{factor.factor}</span>
                    <StatusBadge status={factor.verdict} size="xs" />
                  </div>
                  <p className="text-[10px] text-stone-500 mb-1.5 leading-relaxed">{factor.finding}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-navy-500 rounded-full" style={{ width: `${factor.confidence}%` }} />
                    </div>
                    <span className="text-[10px] text-stone-400 whitespace-nowrap">{factor.confidence}% conf · {factor.weight}</span>
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
