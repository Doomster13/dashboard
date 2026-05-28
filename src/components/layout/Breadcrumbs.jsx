import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { PERSONAS } from '../../data/sharedData'

export default function Breadcrumbs() {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)

  if (pathSegments.length === 0) return null

  const persona = PERSONAS.find(p => p.id === pathSegments[0])
  const screen = persona?.screens.find(s => s.id === pathSegments[1])

  const crumbs = [
    { label: 'Home', path: '/' },
  ]

  if (persona) {
    crumbs.push({ label: persona.title, path: persona.screens[0].path })
  }

  if (screen) {
    crumbs.push({ label: screen.label, path: screen.path })
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-2.5">
      <nav className="flex items-center gap-1.5 text-[11px]">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={10} className="text-stone-300" />}
            {i === crumbs.length - 1 ? (
              <span className="text-stone-600 font-medium">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="text-stone-400 hover:text-stone-600 transition-colors no-underline">
                {i === 0 ? <Home size={11} /> : crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </div>
  )
}
