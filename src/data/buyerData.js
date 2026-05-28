// Category Buyer Persona Mock Data

export const buyerKPIs = [
  { id: 'active-rfps', label: 'Active RFPs', value: '8', subtitle: '3 closing this week', icon: 'FileText' },
  { id: 'pending-evals', label: 'Pending Evaluations', value: '3', subtitle: '1 overdue', icon: 'ClipboardCheck' },
  { id: 'anomaly-flags', label: 'Anomaly Flags', value: '4', subtitle: 'Across 2 categories', icon: 'AlertTriangle' },
  { id: 'cycle-time', label: 'Avg Cycle Time', value: '18 days', subtitle: 'vs 22 day target', icon: 'Clock' },
]

export const activeRFPs = [
  { id: 'RFP-2025-0312', title: 'Sulphur — Annual Supply Contract FY26', category: 'Raw Materials', status: 'Evaluation', deadline: '30 Sep 2025', bids: 4, anomalies: 3, value: '₹34.2 Cr' },
  { id: 'RFP-2025-0298', title: 'Packaging Materials — Corrugated Boxes', category: 'Packaging', status: 'Bid Collection', deadline: '15 Oct 2025', bids: 6, anomalies: 0, value: '₹8.4 Cr' },
  { id: 'RFP-2025-0305', title: 'Laboratory Equipment — Spectrometers', category: 'Lab Equipment', status: 'Technical Review', deadline: '05 Oct 2025', bids: 3, anomalies: 0, value: '₹2.1 Cr' },
  { id: 'RFP-2025-0287', title: 'IT Infrastructure — Server Refresh', category: 'IT Services', status: 'Award Pending', deadline: '20 Sep 2025', bids: 5, anomalies: 1, value: '₹6.7 Cr' },
  { id: 'RFP-2025-0319', title: 'Safety PPE — Annual Supply', category: 'Safety Equipment', status: 'Draft', deadline: '30 Oct 2025', bids: 0, anomalies: 0, value: '₹1.8 Cr' },
  { id: 'RFP-2025-0322', title: 'Phosphate Rock — Spot Purchase', category: 'Raw Materials', status: 'Bid Collection', deadline: '25 Sep 2025', bids: 3, anomalies: 0, value: '₹5.6 Cr' },
  { id: 'RFP-2025-0315', title: 'Maintenance Tools — Annual Contract', category: 'Maintenance', status: 'Evaluation', deadline: '10 Oct 2025', bids: 4, anomalies: 0, value: '₹3.2 Cr' },
  { id: 'RFP-2025-0330', title: 'Transport — Interstate Fleet', category: 'Logistics', status: 'Draft', deadline: '15 Nov 2025', bids: 0, anomalies: 0, value: '₹9.1 Cr' },
]

export const copilotNudges = [
  { id: 1, type: 'warning', message: '3 bids show timing anomalies — review before award.', rfp: 'RFP-2025-0312', action: 'Review Bids', timestamp: '2 hours ago' },
  { id: 2, type: 'info', message: 'Vendor response deadline approaching for Packaging RFP in 48 hours.', rfp: 'RFP-2025-0298', action: 'Check Status', timestamp: '4 hours ago' },
  { id: 3, type: 'warning', message: 'IT Server RFP — 1 bid shows pricing 23% below market average. Verify specifications.', rfp: 'RFP-2025-0287', action: 'Verify Bid', timestamp: '6 hours ago' },
  { id: 4, type: 'success', message: 'Lab Equipment evaluations completed ahead of schedule. Ready for commercial review.', rfp: 'RFP-2025-0305', action: 'Proceed', timestamp: '1 day ago' },
]

export const approvalBottlenecks = [
  { rfp: 'RFP-2025-0312', stage: 'Commercial Evaluation', blocker: 'CPO Review Required', daysWaiting: 4, approver: 'VP Procurement' },
  { rfp: 'RFP-2025-0287', stage: 'Award Approval', blocker: 'Budget Sign-off', daysWaiting: 2, approver: 'CFO Office' },
  { rfp: 'RFP-2025-0315', stage: 'Technical Evaluation', blocker: 'SME Review Pending', daysWaiting: 6, approver: 'Plant Head' },
]

// Bid Evaluation Data (Sulphur RFP)
export const bidComparisonMatrix = [
  {
    vendor: 'Rajesh Chemicals Ltd',
    technicalScore: 82,
    commercialScore: 88,
    overallScore: 85,
    unitPrice: '₹17,200/MT',
    deliveryDays: 7,
    paymentTerms: 'Net 45',
    compliance: 'Full',
    anomalyFlags: ['Bid submitted within 4 min of 2 other vendors', 'Price exactly 2.3% below next bid'],
    bidTimestamp: '28 Jan 2025, 14:32:18',
    capacity: '5,000 MT/month',
    experience: '12 years',
  },
  {
    vendor: 'Gujarat Sulphur Industries',
    technicalScore: 79,
    commercialScore: 82,
    overallScore: 80,
    unitPrice: '₹17,600/MT',
    deliveryDays: 10,
    paymentTerms: 'Net 30',
    compliance: 'Full',
    anomalyFlags: ['Bid submitted within 4 min of 2 other vendors'],
    bidTimestamp: '28 Jan 2025, 14:34:41',
    capacity: '3,500 MT/month',
    experience: '8 years',
  },
  {
    vendor: 'National Chemical Corp',
    technicalScore: 75,
    commercialScore: 79,
    overallScore: 77,
    unitPrice: '₹17,900/MT',
    deliveryDays: 12,
    paymentTerms: 'Net 30',
    compliance: 'Partial',
    anomalyFlags: ['Bid submitted within 4 min of 2 other vendors', 'Missing safety audit certificate'],
    bidTimestamp: '28 Jan 2025, 14:36:02',
    capacity: '2,800 MT/month',
    experience: '6 years',
  },
  {
    vendor: 'Bharat Chemical Solutions',
    technicalScore: 71,
    commercialScore: 74,
    overallScore: 72,
    unitPrice: '₹18,400/MT',
    deliveryDays: 14,
    paymentTerms: 'Net 60',
    compliance: 'Full',
    anomalyFlags: [],
    bidTimestamp: '27 Jan 2025, 09:15:33',
    capacity: '2,200 MT/month',
    experience: '4 years',
  },
]

export const pricingVarianceData = [
  { vendor: 'Rajesh Chemicals', quoted: 17200, market: 14500, variance: 18.6 },
  { vendor: 'Gujarat Sulphur', quoted: 17600, market: 14500, variance: 21.4 },
  { vendor: 'National Chemical', quoted: 17900, market: 14500, variance: 23.4 },
  { vendor: 'Bharat Chemical', quoted: 18400, market: 14500, variance: 26.9 },
]

export const bidTimelineIrregularities = [
  { event: 'RFP Published', timestamp: '12 Jan 2025, 10:00:00', vendor: 'System', flag: false },
  { event: 'Bharat Chemical bid submitted', timestamp: '27 Jan 2025, 09:15:33', vendor: 'Bharat Chemical Solutions', flag: false },
  { event: 'Rajesh Chemicals bid submitted', timestamp: '28 Jan 2025, 14:32:18', vendor: 'Rajesh Chemicals Ltd', flag: true },
  { event: 'Gujarat Sulphur bid submitted', timestamp: '28 Jan 2025, 14:34:41', vendor: 'Gujarat Sulphur Industries', flag: true },
  { event: 'National Chemical bid submitted', timestamp: '28 Jan 2025, 14:36:02', vendor: 'National Chemical Corp', flag: true },
  { event: 'Bid deadline', timestamp: '28 Jan 2025, 17:00:00', vendor: 'System', flag: false },
]

// Vendor 360 Data (Rajesh Chemicals)
export const vendorProfile = {
  name: 'Rajesh Chemicals Ltd',
  established: '2013',
  headquarters: 'Ahmedabad, Gujarat',
  employees: '320+',
  annualRevenue: '₹180 Cr',
  certifications: ['ISO 9001:2015', 'ISO 14001:2015', 'OHSAS 18001'],
  category: 'Chemical Manufacturing',
  keyProducts: ['Industrial Sulphur', 'Sulphuric Acid', 'Chemical Intermediates'],
}

export const vendorPerformanceScores = {
  overall: 72,
  quality: 78,
  delivery: 68,
  pricing: 65,
  compliance: 74,
  communication: 80,
}

export const deliveryReliability = [
  { month: 'Apr 25', onTime: 85, delayed: 12, cancelled: 3 },
  { month: 'May 25', onTime: 82, delayed: 15, cancelled: 3 },
  { month: 'Jun 25', onTime: 79, delayed: 17, cancelled: 4 },
  { month: 'Jul 25', onTime: 76, delayed: 20, cancelled: 4 },
  { month: 'Aug 25', onTime: 73, delayed: 22, cancelled: 5 },
  { month: 'Sep 25', onTime: 71, delayed: 23, cancelled: 6 },
]

export const complianceHistory = [
  { date: '15 Sep 2025', item: 'Safety audit — passed with 2 minor observations', status: 'Compliant' },
  { date: '01 Aug 2025', item: 'Environmental compliance review', status: 'Compliant' },
  { date: '15 Jun 2025', item: 'Quality certification renewal', status: 'Compliant' },
  { date: '01 Apr 2025', item: 'Financial health assessment', status: 'Under Review' },
  { date: '15 Feb 2025', item: 'Labour law compliance', status: 'Compliant' },
  { date: '01 Dec 2024', item: 'Anti-bribery policy acknowledgement', status: 'Overdue' },
]

export const riskIndicators = [
  { indicator: 'Concentration Risk', level: 'Critical', detail: '78% of sulphur volume from single vendor' },
  { indicator: 'Bid Pattern Anomaly', level: 'High', detail: 'Clustered bid submissions with 2 other vendors' },
  { indicator: 'Price Escalation', level: 'High', detail: '20.7% above market benchmark in Sep 2025' },
  { indicator: 'Delivery Deterioration', level: 'Medium', detail: 'On-time delivery declined from 85% to 71% in 6 months' },
  { indicator: 'Financial Stability', level: 'Low', detail: 'Stable revenue growth, adequate working capital' },
]

export const communicationTimeline = [
  { date: '20 Sep 2025', type: 'Meeting', subject: 'Quarterly business review', attendees: 'Procurement Manager, Vendor MD' },
  { date: '14 Sep 2025', type: 'Email', subject: 'Response to concentration inquiry', attendees: 'Vendor Sales Head' },
  { date: '01 Sep 2025', type: 'Call', subject: 'Delivery schedule discussion', attendees: 'Procurement Analyst' },
  { date: '15 Aug 2025', type: 'Email', subject: 'Price revision request', attendees: 'Vendor Commercial Team' },
  { date: '01 Aug 2025', type: 'Site Visit', subject: 'Plant capacity verification', attendees: 'Quality Team' },
  { date: '15 Jul 2025', type: 'Meeting', subject: 'Contract amendment discussion', attendees: 'Legal, Procurement' },
]

export const linkedStakeholders = [
  { name: 'Amit Patel', role: 'Managing Director', company: 'Rajesh Chemicals Ltd', interactions: 12 },
  { name: 'Sunita Mehta', role: 'Sales Head', company: 'Rajesh Chemicals Ltd', interactions: 28 },
  { name: 'Vikram Singh', role: 'Category Manager', company: 'Internal — Procurement', interactions: 45 },
  { name: 'Priya Sharma', role: 'Quality Lead', company: 'Internal — Quality', interactions: 15 },
]
