// Shared data constants used across all personas
// The central procurement fraud incident: Raw Materials — Sulphur Procurement

export const PERSONAS = [
  {
    id: 'cpo',
    title: 'Chief Procurement Officer',
    shortTitle: 'CPO',
    description: 'Strategic procurement governance and enterprise-wide risk oversight',
    priorities: ['Spend governance & compliance', 'Supplier concentration risk', 'Category strategy optimization', 'Board-level reporting'],
    metrics: { fraudAverted: '₹12.4 Cr', governanceScore: '87%', riskAlerts: 5 },
    color: 'navy',
    icon: 'Shield',
    screens: [
      { id: 'cockpit', label: 'CPO Cockpit', path: '/cpo/cockpit' },
      { id: 'category-risk', label: 'Category Risk', path: '/cpo/category-risk' },
      { id: 'board-report', label: 'Board Report', path: '/cpo/board-report' },
    ],
  },
  {
    id: 'buyer',
    title: 'Category Buyer',
    shortTitle: 'Buyer',
    description: 'Operational procurement execution and vendor management workflows',
    priorities: ['RFP evaluation efficiency', 'Bid anomaly detection', 'Vendor performance tracking', 'Procurement cycle optimization'],
    metrics: { activeRFPs: 8, pendingEvals: 3, anomalies: 4 },
    color: 'slate',
    icon: 'ShoppingCart',
    screens: [
      { id: 'workbench', label: 'My Workbench', path: '/buyer/workbench' },
      { id: 'bid-evaluation', label: 'Bid Evaluation', path: '/buyer/bid-evaluation' },
      { id: 'vendor-360', label: 'Vendor 360', path: '/buyer/vendor-360' },
    ],
  },
  {
    id: 'audit',
    title: 'Audit & Compliance Head',
    shortTitle: 'Audit',
    description: 'Forensic investigation, regulatory compliance, and governance assurance',
    priorities: ['Investigation case management', 'Evidence traceability', 'Regulatory compliance', 'Governance maturity assessment'],
    metrics: { openCases: 6, criticalFlags: 2, auditScore: '91%' },
    color: 'stone',
    icon: 'Scale',
    screens: [
      { id: 'queue', label: 'Audit Queue', path: '/audit/queue' },
      { id: 'case-file', label: 'Case File', path: '/audit/case-file' },
      { id: 'governance', label: 'Governance Reports', path: '/audit/governance' },
    ],
  },
]

export const SULPHUR_INCIDENT = {
  id: 'INC-2025-0847',
  title: 'Sulphur Procurement — Concentration & Bid Irregularities',
  category: 'Raw Materials — Sulphur',
  severity: 'High',
  dateIdentified: '2025-09-14',
  status: 'Under Investigation',
  totalExposure: '₹8.7 Cr',
  vendorsInvolved: ['Rajesh Chemicals Ltd', 'Gujarat Sulphur Industries', 'National Chemical Corp'],
  primaryVendor: 'Rajesh Chemicals Ltd',
  summary: 'AI-driven analysis identified a 34% increase in procurement concentration for sulphur across 2 quarters, coupled with bid timing anomalies suggesting potential collusion among 3 vendors.',
}

export const LAST_SYNCED = '28 May 2025, 18:42 IST'
