import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, ShoppingCart, Scale, ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { PERSONAS } from '../data/sharedData'

const iconMap = { Shield, ShoppingCart, Scale }

export default function Landing() {
  const navigate = useNavigate()
  const [hoveredCard, setHoveredCard] = useState(null)

  const handlePersonaClick = (persona) => {
    navigate(persona.screens[0].path)
  }

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Minimal Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-navy-500 rounded-lg flex items-center justify-center">
              <Shield className="w-4.5 h-4.5 text-white" size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-stone-800 leading-tight tracking-tight">Procurement Copilot</span>
              <span className="text-[10px] text-stone-400 leading-tight">Persona View</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
            <Sparkles size={12} className="text-navy-400" />
            <span>AI-Powered Procurement Intelligence</span>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Narrative */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <h1 className="text-3xl font-bold text-stone-800 leading-tight tracking-tight">
                Procurement Copilot
              </h1>
              <p className="text-lg text-navy-500 font-medium mt-1">Persona View</p>

              <p className="text-sm text-stone-500 mt-6 leading-relaxed">
                See the same procurement incident through the lens of strategy, operations, and governance.
              </p>

              <div className="mt-8 p-4 bg-white rounded-lg border border-stone-200 shadow-enterprise">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-risk-500"></div>
                  <p className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider">Active Incident</p>
                </div>
                <p className="text-sm font-semibold text-stone-800">Raw Materials — Sulphur Procurement</p>
                <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                  AI-driven analysis has identified a 34% increase in procurement concentration and bid timing anomalies across 3 vendors. Estimated exposure: ₹8.7 Cr.
                </p>
                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-stone-400">INC-2025-0847</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-risk-50 text-risk-600 font-medium border border-risk-100">Under Investigation</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <div className="w-6 h-6 rounded-md bg-stone-100 flex items-center justify-center">
                    <Shield size={12} className="text-stone-500" />
                  </div>
                  <span>One incident — three perspectives</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <div className="w-6 h-6 rounded-md bg-stone-100 flex items-center justify-center">
                    <Sparkles size={12} className="text-stone-500" />
                  </div>
                  <span>AI-powered insights at every level</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <div className="w-6 h-6 rounded-md bg-stone-100 flex items-center justify-center">
                    <Scale size={12} className="text-stone-500" />
                  </div>
                  <span>Enterprise-grade governance</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Persona Cards */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {PERSONAS.map((persona, index) => {
                const Icon = iconMap[persona.icon]
                return (
                  <motion.div
                    key={persona.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.1, ease: 'easeOut' }}
                    onMouseEnter={() => setHoveredCard(persona.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handlePersonaClick(persona)}
                    className="group cursor-pointer"
                  >
                    <div className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                      hoveredCard === persona.id
                        ? 'border-navy-200 shadow-enterprise-lg'
                        : 'border-stone-200 shadow-enterprise'
                    }`}>
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                              hoveredCard === persona.id ? 'bg-navy-500' : 'bg-stone-100'
                            }`}>
                              <Icon size={22} className={`transition-colors ${
                                hoveredCard === persona.id ? 'text-white' : 'text-stone-500'
                              }`} />
                            </div>
                            <div>
                              <h2 className="text-base font-semibold text-stone-800">{persona.title}</h2>
                              <p className="text-xs text-stone-500 mt-0.5">{persona.description}</p>
                            </div>
                          </div>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                            hoveredCard === persona.id
                              ? 'bg-navy-500 translate-x-0'
                              : 'bg-stone-100 -translate-x-1'
                          }`}>
                            <ArrowRight size={14} className={`transition-colors ${
                              hoveredCard === persona.id ? 'text-white' : 'text-stone-400'
                            }`} />
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-2">
                          <div>
                            <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Key Priorities</p>
                            <ul className="space-y-1.5">
                              {persona.priorities.map((priority, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs text-stone-600">
                                  <ChevronRight size={10} className="text-stone-300 shrink-0" />
                                  {priority}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Preview Metrics</p>
                            <div className="space-y-2">
                              {Object.entries(persona.metrics).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                  <span className="text-xs text-stone-500">{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</span>
                                  <span className="text-xs font-semibold text-stone-800">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Screen links */}
                        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-3">
                          {persona.screens.map(screen => (
                            <span key={screen.id} className="text-[11px] text-stone-400 px-2.5 py-1 bg-stone-50 rounded-md">
                              {screen.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-100 mt-16">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-[11px] text-stone-400">Procurement Copilot © 2025 — Enterprise Intelligence Platform</span>
          <span className="text-[11px] text-stone-400">Prototype — Persona View</span>
        </div>
      </footer>
    </div>
  )
}
