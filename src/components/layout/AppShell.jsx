import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import TopNav from './TopNav'
import SecondaryNav from './SecondaryNav'
import Breadcrumbs from './Breadcrumbs'

export default function AppShell() {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)
  const currentPersona = pathSegments[0] || null

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF9' }}>
      <TopNav currentPersona={currentPersona} />
      {currentPersona && <SecondaryNav personaId={currentPersona} />}
      {currentPersona && <Breadcrumbs />}
      <main className="max-w-[1600px] mx-auto px-6 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
