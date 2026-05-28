import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ChevronDown, Clock, Bell, Settings, User, LogOut, Search } from 'lucide-react'
import { PERSONAS, LAST_SYNCED } from '../../data/sharedData'

export default function TopNav({ currentPersona }) {
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false)
  const [utilityDropdownOpen, setUtilityDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const activePersona = PERSONAS.find(p => p.id === currentPersona)

  const handlePersonaSwitch = (persona) => {
    setPersonaDropdownOpen(false)
    navigate(persona.screens[0].path)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-enterprise">
      <div className="max-w-[1600px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Left: Logo & Product Title */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 bg-navy-500 rounded-lg flex items-center justify-center">
            <Shield className="w-4.5 h-4.5 text-white" size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-stone-800 leading-tight tracking-tight">Procurement Copilot</span>
            <span className="text-[10px] text-stone-400 leading-tight">Persona View</span>
          </div>
        </Link>

        {/* Center: Search (subtle) */}
        <div className="hidden lg:flex items-center bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 w-72">
          <Search size={14} className="text-stone-400 mr-2" />
          <input
            type="text"
            placeholder="Search procurement data..."
            className="bg-transparent text-xs text-stone-600 placeholder-stone-400 outline-none w-full"
          />
        </div>

        {/* Right: Persona Switcher + Utilities */}
        <div className="flex items-center gap-4">
          {/* Last Synced */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-stone-400">
            <Clock size={12} />
            <span>Last synced: {LAST_SYNCED}</span>
          </div>

          {/* Notifications */}
          <button className="relative p-1.5 text-stone-400 hover:text-stone-600 transition-colors">
            <Bell size={16} />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-risk-600 rounded-full text-[8px] text-white flex items-center justify-center font-semibold">3</span>
          </button>

          {/* Persona Switcher */}
          {activePersona && (
            <div className="relative">
              <button
                onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg hover:border-stone-300 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-navy-500 flex items-center justify-center">
                  <span className="text-[10px] font-semibold text-white">{activePersona.shortTitle[0]}</span>
                </div>
                <span className="text-xs font-medium text-stone-700">{activePersona.shortTitle}</span>
                <ChevronDown size={12} className={`text-stone-400 transition-transform ${personaDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {personaDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setPersonaDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1.5 w-64 bg-white border border-stone-200 rounded-lg shadow-enterprise-lg z-50 overflow-hidden"
                    >
                      <div className="p-2">
                        <p className="text-[10px] text-stone-400 uppercase tracking-wider font-medium px-2 py-1.5">Switch Persona</p>
                        {PERSONAS.map(persona => (
                          <button
                            key={persona.id}
                            onClick={() => handlePersonaSwitch(persona)}
                            className={`w-full text-left px-2.5 py-2 rounded-md flex items-center gap-2.5 transition-colors ${
                              persona.id === currentPersona
                                ? 'bg-navy-50 text-navy-700'
                                : 'hover:bg-stone-50 text-stone-700'
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              persona.id === currentPersona ? 'bg-navy-500' : 'bg-stone-200'
                            }`}>
                              <span className={`text-[10px] font-semibold ${
                                persona.id === currentPersona ? 'text-white' : 'text-stone-600'
                              }`}>{persona.shortTitle[0]}</span>
                            </div>
                            <div>
                              <p className="text-xs font-medium">{persona.title}</p>
                              <p className="text-[10px] text-stone-400 leading-tight">{persona.description.split(' ').slice(0, 4).join(' ')}...</p>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="border-t border-stone-100 p-2">
                        <Link
                          to="/"
                          onClick={() => setPersonaDropdownOpen(false)}
                          className="block text-center text-[11px] text-navy-500 hover:text-navy-600 font-medium py-1 no-underline"
                        >
                          Back to Persona Selector
                        </Link>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUtilityDropdownOpen(!utilityDropdownOpen)}
              className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center hover:bg-stone-200 transition-colors"
            >
              <User size={14} className="text-stone-500" />
            </button>
            <AnimatePresence>
              {utilityDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUtilityDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-stone-200 rounded-lg shadow-enterprise-lg z-50 overflow-hidden"
                  >
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 text-xs text-stone-600 hover:bg-stone-50 rounded-md flex items-center gap-2">
                        <Settings size={13} /> Settings
                      </button>
                      <button className="w-full text-left px-3 py-2 text-xs text-stone-600 hover:bg-stone-50 rounded-md flex items-center gap-2">
                        <LogOut size={13} /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
