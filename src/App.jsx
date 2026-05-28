import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Landing from './pages/Landing'
import CpoCockpit from './pages/cpo/CpoCockpit'
import CategoryRisk from './pages/cpo/CategoryRisk'
import BoardReport from './pages/cpo/BoardReport'
import Workbench from './pages/buyer/Workbench'
import BidEvaluation from './pages/buyer/BidEvaluation'
import Vendor360 from './pages/buyer/Vendor360'
import AuditQueue from './pages/audit/AuditQueue'
import CaseFile from './pages/audit/CaseFile'
import GovernanceReports from './pages/audit/GovernanceReports'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<AppShell />}>
        {/* CPO Routes */}
        <Route path="/cpo" element={<Navigate to="/cpo/cockpit" replace />} />
        <Route path="/cpo/cockpit" element={<CpoCockpit />} />
        <Route path="/cpo/category-risk" element={<CategoryRisk />} />
        <Route path="/cpo/board-report" element={<BoardReport />} />

        {/* Buyer Routes */}
        <Route path="/buyer" element={<Navigate to="/buyer/workbench" replace />} />
        <Route path="/buyer/workbench" element={<Workbench />} />
        <Route path="/buyer/bid-evaluation" element={<BidEvaluation />} />
        <Route path="/buyer/vendor-360" element={<Vendor360 />} />

        {/* Audit Routes */}
        <Route path="/audit" element={<Navigate to="/audit/queue" replace />} />
        <Route path="/audit/queue" element={<AuditQueue />} />
        <Route path="/audit/case-file" element={<CaseFile />} />
        <Route path="/audit/governance" element={<GovernanceReports />} />
      </Route>
    </Routes>
  )
}
