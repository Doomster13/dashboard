// Audit & Compliance Persona Mock Data

export const auditKPIs = [
  { id: 'open-cases', label: 'Open Investigations', value: '6', subtitle: '2 critical priority', icon: 'Search' },
  { id: 'critical-flags', label: 'Critical Flags', value: '2', subtitle: 'Requires immediate action', icon: 'AlertOctagon' },
  { id: 'audit-score', label: 'Audit Readiness Score', value: '91%', subtitle: '+3% from last assessment', icon: 'CheckCircle' },
  { id: 'evidence-complete', label: 'Evidence Completeness', value: '84%', subtitle: 'Avg across active cases', icon: 'FileCheck' },
]

export const investigations = [
  {
    id: 'INV-2025-001',
    title: 'Sulphur Procurement — Bid Collusion Suspected',
    category: 'Raw Materials — Sulphur',
    severity: 'Critical',
    status: 'Active Investigation',
    daysOpen: 14,
    investigator: 'Ananya Krishnan',
    escalationStage: 'CPO + Board Audit Committee',
    evidenceScore: 87,
    regulatoryFlags: ['Companies Act S.447', 'Prevention of Corruption Act'],
    exposure: '₹8.7 Cr',
  },
  {
    id: 'INV-2025-002',
    title: 'Logistics Contract — Cost Irregularity',
    category: 'Logistics — Inland',
    severity: 'High',
    status: 'Evidence Collection',
    daysOpen: 8,
    investigator: 'Rahul Mehra',
    escalationStage: 'VP Procurement',
    evidenceScore: 62,
    regulatoryFlags: [],
    exposure: '₹2.3 Cr',
  },
  {
    id: 'INV-2025-003',
    title: 'IT Vendor — Compliance Lapse',
    category: 'IT Services',
    severity: 'Medium',
    status: 'Review',
    daysOpen: 22,
    investigator: 'Priya Desai',
    escalationStage: 'Procurement Manager',
    evidenceScore: 91,
    regulatoryFlags: ['ISO Compliance'],
    exposure: '₹0.4 Cr',
  },
  {
    id: 'INV-2025-004',
    title: 'Phosphate Contract — Pricing Variance',
    category: 'Raw Materials — Phosphate',
    severity: 'Medium',
    status: 'Preliminary Review',
    daysOpen: 5,
    investigator: 'Vikram Reddy',
    escalationStage: 'Category Manager',
    evidenceScore: 45,
    regulatoryFlags: [],
    exposure: '₹1.1 Cr',
  },
  {
    id: 'INV-2025-005',
    title: 'Safety Equipment — Duplicate Invoice',
    category: 'Safety Equipment',
    severity: 'Low',
    status: 'Near Closure',
    daysOpen: 31,
    investigator: 'Meena Iyer',
    escalationStage: 'Accounts Payable',
    evidenceScore: 96,
    regulatoryFlags: [],
    exposure: '₹0.12 Cr',
  },
  {
    id: 'INV-2025-006',
    title: 'Packaging Supplier — Capacity Misrepresentation',
    category: 'Packaging Materials',
    severity: 'Low',
    status: 'Monitoring',
    daysOpen: 18,
    investigator: 'Suresh Kumar',
    escalationStage: 'Procurement Manager',
    evidenceScore: 73,
    regulatoryFlags: [],
    exposure: '₹0.3 Cr',
  },
]

// Case File Data (Sulphur Investigation INV-2025-001)
export const caseFileTimeline = [
  { date: '01 Sep 2025', time: '09:15', event: 'AI system flagged bid timing anomaly in RFP-2025-0312', source: 'Copilot AI Engine', type: 'detection', confidence: 94 },
  { date: '01 Sep 2025', time: '10:30', event: 'Automated concentration risk alert triggered — Rajesh Chemicals at 78%', source: 'Supplier Risk Module', type: 'detection', confidence: 98 },
  { date: '02 Sep 2025', time: '14:00', event: 'Preliminary review initiated by Compliance team', source: 'Manual', type: 'process', confidence: null },
  { date: '05 Sep 2025', time: '11:20', event: 'Bid timestamps analyzed — 3 vendors submitted within 3m44s window', source: 'Forensic Analytics', type: 'evidence', confidence: 96 },
  { date: '07 Sep 2025', time: '16:45', event: 'Email metadata review — shared IP addresses detected for 2 vendor submissions', source: 'Email Forensics', type: 'evidence', confidence: 88 },
  { date: '08 Sep 2025', time: '09:00', event: 'Vendor relationship mapping — common directors identified', source: 'Corporate Registry Analysis', type: 'evidence', confidence: 91 },
  { date: '10 Sep 2025', time: '14:30', event: 'Price benchmarking analysis — 20.7% above market for latest contract', source: 'Market Intelligence', type: 'evidence', confidence: 95 },
  { date: '12 Sep 2025', time: '10:00', event: 'Access log review — unusual after-hours system access before bid deadline', source: 'IT Security Logs', type: 'evidence', confidence: 82 },
  { date: '14 Sep 2025', time: '08:30', event: 'Case escalated to CPO and Board Audit Committee', source: 'Audit Head', type: 'escalation', confidence: null },
  { date: '15 Sep 2025', time: '15:00', event: 'Investigation formally opened — INV-2025-001', source: 'Compliance Office', type: 'process', confidence: null },
  { date: '18 Sep 2025', time: '11:00', event: 'Vendor site visit scheduled for Gujarat operations', source: 'Investigation Team', type: 'process', confidence: null },
  { date: '20 Sep 2025', time: '09:30', event: 'Procurement approval chain review — single-approver override detected', source: 'Process Audit', type: 'evidence', confidence: 87 },
]

export const dataSources = [
  { source: 'Procurement System (SAP)', records: 1247, status: 'Analyzed', coverage: '100%' },
  { source: 'Email Metadata', records: 342, status: 'Analyzed', coverage: '95%' },
  { source: 'Access Logs (IT Security)', records: 89, status: 'Analyzed', coverage: '100%' },
  { source: 'Corporate Registry (MCA)', records: 12, status: 'Analyzed', coverage: '100%' },
  { source: 'Market Price Feeds', records: 365, status: 'Analyzed', coverage: '100%' },
  { source: 'Vendor Communication Records', records: 56, status: 'Partial', coverage: '78%' },
  { source: 'Financial Statements', records: 8, status: 'Pending', coverage: '60%' },
  { source: 'Bank Transaction Metadata', records: 0, status: 'Requested', coverage: '0%' },
]

export const modelReasoningLogic = [
  { factor: 'Bid Timing Cluster', weight: '25%', finding: '3 of 4 bids submitted within a 3-minute 44-second window', confidence: 96, verdict: 'Anomalous' },
  { factor: 'Vendor Concentration Drift', weight: '20%', finding: 'Single vendor share increased from 31% to 78% over 6 quarters', confidence: 98, verdict: 'Anomalous' },
  { factor: 'Price-Market Deviation', weight: '20%', finding: 'Contract prices diverged from market index by up to 20.7%', confidence: 95, verdict: 'Anomalous' },
  { factor: 'Corporate Linkage', weight: '15%', finding: 'Common directorship identified between 2 of 3 suspected vendors', confidence: 91, verdict: 'Suspicious' },
  { factor: 'Shared Infrastructure', weight: '10%', finding: 'Bids from 2 vendors originated from same IP subnet', confidence: 88, verdict: 'Suspicious' },
  { factor: 'Approval Override', weight: '10%', finding: 'Single-approver override used for 4 of 6 recent sulphur POs', confidence: 87, verdict: 'Procedural Violation' },
]

export const linkedEvidence = [
  { id: 'EVD-001', type: 'System Log', title: 'Bid submission timestamps — RFP-2025-0312', status: 'Verified', date: '05 Sep 2025' },
  { id: 'EVD-002', type: 'Email', title: 'IP address forensic report', status: 'Verified', date: '07 Sep 2025' },
  { id: 'EVD-003', type: 'Document', title: 'MCA director cross-reference report', status: 'Verified', date: '08 Sep 2025' },
  { id: 'EVD-004', type: 'Analysis', title: 'Price benchmarking vs commodity index', status: 'Verified', date: '10 Sep 2025' },
  { id: 'EVD-005', type: 'System Log', title: 'After-hours access log extract', status: 'Verified', date: '12 Sep 2025' },
  { id: 'EVD-006', type: 'Process', title: 'Approval chain override records', status: 'Under Review', date: '20 Sep 2025' },
  { id: 'EVD-007', type: 'Financial', title: 'Vendor financial statements FY24', status: 'Pending', date: '—' },
  { id: 'EVD-008', type: 'Financial', title: 'Bank transaction metadata', status: 'Requested', date: '—' },
]

export const investigationNotes = [
  { date: '20 Sep 2025', author: 'Ananya Krishnan', note: 'Approval chain analysis reveals consistent pattern of single-approver override for sulphur POs. Requesting historical approval data for comparison with other categories.' },
  { date: '14 Sep 2025', author: 'Ananya Krishnan', note: 'Escalated to Board Audit Committee given the magnitude of exposure (₹8.7 Cr) and the nature of findings (potential collusion). CPO briefed separately.' },
  { date: '08 Sep 2025', author: 'Rahul Mehra', note: 'MCA registry shows Amit Patel (MD, Rajesh Chemicals) and Suresh Patel (Director, Gujarat Sulphur) share a common registered address. Further KYC verification in progress.' },
  { date: '05 Sep 2025', author: 'Ananya Krishnan', note: 'Bid timing analysis conclusive — statistical probability of 3 independent submissions within 3m44s is <0.2%. Recommending formal investigation.' },
]

// Governance Reports Data
export const complianceChecklist = [
  { item: 'Anti-Bribery & Corruption Policy', status: 'Compliant', lastReview: '01 Jul 2025', nextReview: '01 Jan 2026', coverage: '100%' },
  { item: 'Vendor Due Diligence Protocol', status: 'Partial', lastReview: '15 Jun 2025', nextReview: '15 Dec 2025', coverage: '87%' },
  { item: 'Procurement Approval Matrix', status: 'Non-Compliant', lastReview: '01 Apr 2025', nextReview: 'Immediate', coverage: '72%' },
  { item: 'Bid Evaluation Standards', status: 'Compliant', lastReview: '01 Aug 2025', nextReview: '01 Feb 2026', coverage: '95%' },
  { item: 'Contract Management Policy', status: 'Compliant', lastReview: '15 Jul 2025', nextReview: '15 Jan 2026', coverage: '91%' },
  { item: 'Whistleblower Protection', status: 'Compliant', lastReview: '01 May 2025', nextReview: '01 Nov 2025', coverage: '100%' },
  { item: 'Conflict of Interest Declaration', status: 'Partial', lastReview: '01 Jun 2025', nextReview: '01 Dec 2025', coverage: '83%' },
  { item: 'Data Privacy & Retention', status: 'Compliant', lastReview: '01 Sep 2025', nextReview: '01 Mar 2026', coverage: '96%' },
]

export const governanceMaturity = [
  { dimension: 'Policy Framework', score: 88, benchmark: 85, status: 'Above Benchmark' },
  { dimension: 'Process Controls', score: 72, benchmark: 80, status: 'Below Benchmark' },
  { dimension: 'Technology Enablement', score: 81, benchmark: 75, status: 'Above Benchmark' },
  { dimension: 'People & Culture', score: 76, benchmark: 78, status: 'Near Benchmark' },
  { dimension: 'Monitoring & Reporting', score: 84, benchmark: 82, status: 'Above Benchmark' },
  { dimension: 'Risk Management', score: 69, benchmark: 80, status: 'Below Benchmark' },
]

export const internalControlEffectiveness = [
  { control: 'Segregation of Duties', effectiveness: 91, trend: 'Stable', lastTested: 'Aug 2025' },
  { control: 'Authorization Limits', effectiveness: 68, trend: 'Declining', lastTested: 'Sep 2025' },
  { control: 'Vendor Master Controls', effectiveness: 82, trend: 'Improving', lastTested: 'Jul 2025' },
  { control: 'Invoice Matching (3-way)', effectiveness: 94, trend: 'Stable', lastTested: 'Sep 2025' },
  { control: 'Contract Compliance', effectiveness: 77, trend: 'Stable', lastTested: 'Aug 2025' },
  { control: 'Bid Process Controls', effectiveness: 63, trend: 'Declining', lastTested: 'Sep 2025' },
]

export const auditReadinessScore = {
  overall: 91,
  breakdown: [
    { area: 'Documentation', score: 94 },
    { area: 'Evidence Trail', score: 88 },
    { area: 'Process Adherence', score: 87 },
    { area: 'Reporting Timeliness', score: 95 },
    { area: 'Corrective Actions', score: 82 },
  ],
}
