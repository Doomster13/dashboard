import { NavLink } from 'react-router-dom'
import { PERSONAS } from '../../data/sharedData'

export default function SecondaryNav({ personaId }) {
  const persona = PERSONAS.find(p => p.id === personaId)
  if (!persona) return null

  return (
    <nav className="bg-white border-b border-stone-200">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex items-center gap-1">
          {persona.screens.map(screen => (
            <NavLink
              key={screen.id}
              to={screen.path}
              className={({ isActive }) =>
                `px-4 py-3 text-xs font-medium border-b-2 transition-colors no-underline ${
                  isActive
                    ? 'border-navy-500 text-navy-600'
                    : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
                }`
              }
            >
              {screen.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
