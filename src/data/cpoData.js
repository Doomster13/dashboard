// CPO Persona Mock Data

export const cpoKPIs = [
  { id: 'spend-governance', label: 'Spend Under AI Governance', value: '73%', trend: '+4.2%', trendDirection: 'up', subtitle: 'vs 68.8% last quarter', icon: 'ShieldCheck' },
  { id: 'fraud-averted', label: 'Fraud Exposure Averted', value: '₹12.4 Cr', trend: '₹3.1 Cr', trendDirection: 'up', subtitle: 'YTD savings', icon: 'TrendingUp' },
  { id: 'governance-score', label: 'Governance Adoption Score', value: '87/100', trend: '+6', trendDirection: 'up', subtitle: 'Enterprise-wide', icon: 'Award' },
  { id: 'risk-alerts', label: 'Active Strategic Alerts', value: '5', trend: '+2', trendDirection: 'down', subtitle: 'Requires attention', icon: 'AlertTriangle' },
]

export const categoryRiskHeatmap = [
  { category: 'Raw Materials — Sulphur', risk: 92, spend: '₹34.2 Cr', concentration: 'High', trend: 'Increasing' },
  { category: 'Raw Materials — Phosphate', risk: 45, spend: '₹22.1 Cr', concentration: 'Medium', trend: 'Stable' },
  { category: 'Packaging Materials', risk: 31, spend: '₹18.7 Cr', concentration: 'Low', trend: 'Decreasing' },
  { category: 'Logistics — Inland', risk: 58, spend: '₹15.3 Cr', concentration: 'Medium', trend: 'Increasing' },
  { category: 'Lab Equipment', risk: 22, spend: '₹8.9 Cr', concentration: 'Low', trend: 'Stable' },
  { category: 'IT Services', risk: 38, spend: '₹12.4 Cr', concentration: 'Medium', trend: 'Stable' },
  { category: 'Maintenance & Repair', risk: 27, spend: '₹6.8 Cr', concentration: 'Low', trend: 'Decreasing' },
  { category: 'Safety Equipment', risk: 15, spend: '₹4.2 Cr', concentration: 'Low', trend: 'Stable' },
]

export const strategicAlerts = [
  {
    id: 1,
    severity: 'Critical',
    title: 'Sulphur procurement concentration increased 34% across 2 quarters',
    category: 'Raw Materials — Sulphur',
    timestamp: '14 Sep 2025',
    impact: '₹8.7 Cr exposure',
    description: 'AI analysis detected significant vendor concentration shift toward Rajesh Chemicals Ltd, with 78% of sulphur volume now routed through a single supplier.',
  },
  {
    id: 2,
    severity: 'High',
    title: 'Logistics contract renewal shows 18% cost deviation from market',
    category: 'Logistics — Inland',
    timestamp: '28 Aug 2025',
    impact: '₹2.3 Cr over-spend',
    description: 'Renewal pricing for inland logistics significantly exceeds comparable market benchmarks across 3 regions.',
  },
  {
    id: 3,
    severity: 'Medium',
    title: 'IT Services vendor compliance certificate expired',
    category: 'IT Services',
    timestamp: '10 Sep 2025',
    impact: 'Compliance risk',
    description: 'ISO 27001 certification for primary IT vendor lapsed 45 days ago without renewal notification.',
  },
  {
    id: 4,
    severity: 'Medium',
    title: 'Phosphate pricing variance detected in Q3 contracts',
    category: 'Raw Materials — Phosphate',
    timestamp: '05 Sep 2025',
    impact: '₹1.1 Cr variance',
    description: 'Contract pricing deviates from commodity index benchmarks by 12% across 2 supplier agreements.',
  },
  {
    id: 5,
    severity: 'Low',
    title: 'New supplier onboarding backlog exceeding SLA',
    category: 'Operations',
    timestamp: '01 Sep 2025',
    impact: 'Process delay',
    description: '7 supplier onboarding requests pending beyond 15-day SLA threshold.',
  },
]

export const supplierConcentration = [
  { name: 'Rajesh Chemicals', value: 42, category: 'Sulphur' },
  { name: 'Gujarat Sulphur Ind.', value: 23, category: 'Sulphur' },
  { name: 'National Chemical', value: 13, category: 'Sulphur' },
  { name: 'Others', value: 22, category: 'Various' },
]

export const quarterlyTrends = [
  { quarter: 'Q1 FY24', governanceScore: 71, fraudAverted: 2.1, spendGoverned: 58, riskAlerts: 8 },
  { quarter: 'Q2 FY24', governanceScore: 74, fraudAverted: 3.4, spendGoverned: 62, riskAlerts: 6 },
  { quarter: 'Q3 FY24', governanceScore: 78, fraudAverted: 4.8, spendGoverned: 65, riskAlerts: 7 },
  { quarter: 'Q4 FY24', governanceScore: 81, fraudAverted: 6.2, spendGoverned: 69, riskAlerts: 5 },
  { quarter: 'Q1 FY25', governanceScore: 84, fraudAverted: 9.3, spendGoverned: 71, riskAlerts: 4 },
  { quarter: 'Q2 FY25', governanceScore: 87, fraudAverted: 12.4, spendGoverned: 73, riskAlerts: 5 },
]

export const aiStrategicSummary = `Procurement governance posture has strengthened significantly over the past 6 quarters, with AI-monitored spend coverage increasing from 58% to 73%. However, the emerging sulphur procurement concentration risk demands immediate attention.

Key observations:
• Vendor concentration in sulphur has crossed the 75% single-supplier threshold
• Bid timing patterns in recent sulphur RFPs show statistical anomalies consistent with potential coordination
• The estimated fraud exposure of ₹8.7 Cr represents 25% of the category's annual spend

Recommended actions:
1. Initiate category strategy review for sulphur procurement
2. Mandate multi-vendor sourcing for all orders exceeding ₹2 Cr
3. Escalate bid anomaly findings to Audit & Compliance for forensic review`

// Category Risk Deep-Dive Data
export const sulphurPriceTrends = [
  { month: 'Jan 25', marketPrice: 14200, contractPrice: 14500, variance: 2.1 },
  { month: 'Feb 25', marketPrice: 14350, contractPrice: 14800, variance: 3.1 },
  { month: 'Mar 25', marketPrice: 14100, contractPrice: 15200, variance: 7.8 },
  { month: 'Apr 25', marketPrice: 13900, contractPrice: 15600, variance: 12.2 },
  { month: 'May 25', marketPrice: 14050, contractPrice: 16100, variance: 14.6 },
  { month: 'Jun 25', marketPrice: 14200, contractPrice: 16400, variance: 15.5 },
  { month: 'Jul 25', marketPrice: 14400, contractPrice: 16800, variance: 16.7 },
  { month: 'Aug 25', marketPrice: 14300, contractPrice: 17200, variance: 20.3 },
  { month: 'Sep 25', marketPrice: 14500, contractPrice: 17500, variance: 20.7 },
]

export const vendorConcentrationTimeline = [
  { quarter: 'Q1 FY24', rajeshChemicals: 31, gujaratSulphur: 28, nationalChemical: 22, others: 19 },
  { quarter: 'Q2 FY24', rajeshChemicals: 35, gujaratSulphur: 26, nationalChemical: 20, others: 19 },
  { quarter: 'Q3 FY24', rajeshChemicals: 38, gujaratSulphur: 25, nationalChemical: 19, others: 18 },
  { quarter: 'Q4 FY24', rajeshChemicals: 41, gujaratSulphur: 24, nationalChemical: 18, others: 17 },
  { quarter: 'Q1 FY25', rajeshChemicals: 45, gujaratSulphur: 23, nationalChemical: 16, others: 16 },
  { quarter: 'Q2 FY25', rajeshChemicals: 42, gujaratSulphur: 23, nationalChemical: 13, others: 22 },
]

export const regionDependency = [
  { region: 'Gujarat', percentage: 62, vendors: 3, risk: 'High' },
  { region: 'Rajasthan', percentage: 18, vendors: 2, risk: 'Medium' },
  { region: 'Maharashtra', percentage: 12, vendors: 2, risk: 'Low' },
  { region: 'Tamil Nadu', percentage: 8, vendors: 1, risk: 'Low' },
]

export const riskScoringFactors = [
  { factor: 'Vendor Concentration Index', score: 92, weight: '25%', status: 'Critical' },
  { factor: 'Price Deviation from Market', score: 78, weight: '20%', status: 'High' },
  { factor: 'Bid Timing Anomaly Score', score: 85, weight: '20%', status: 'Critical' },
  { factor: 'Geographic Dependency', score: 65, weight: '15%', status: 'Medium' },
  { factor: 'Contract Compliance', score: 42, weight: '10%', status: 'Medium' },
  { factor: 'Supplier Financial Health', score: 38, weight: '10%', status: 'Low' },
]

export const procurementTimeline = [
  { date: '12 Jan 2025', event: 'RFP issued for sulphur procurement — FY25 annual contract', type: 'process' },
  { date: '28 Jan 2025', event: 'Bid submission deadline — 4 responses received', type: 'process' },
  { date: '02 Feb 2025', event: 'Technical evaluation completed — 3 vendors shortlisted', type: 'process' },
  { date: '15 Feb 2025', event: 'AI flag: Bid timestamps within 4-minute window for 3 vendors', type: 'anomaly' },
  { date: '22 Feb 2025', event: 'Commercial evaluation — Rajesh Chemicals L1 by 2.3%', type: 'process' },
  { date: '01 Mar 2025', event: 'Contract awarded to Rajesh Chemicals Ltd', type: 'process' },
  { date: '15 Apr 2025', event: 'AI alert: Concentration threshold breached (78% single vendor)', type: 'anomaly' },
  { date: '14 Sep 2025', event: 'Escalated to strategic risk — CPO notification triggered', type: 'escalation' },
]

// Board Report Data
export const boardReportKPIs = [
  { label: 'Procurement Integrity Score', value: '76/100', status: 'Attention', change: '-3 from last quarter' },
  { label: 'AI Governance Coverage', value: '73%', status: 'On Track', change: '+4.2% QoQ' },
  { label: 'Fraud Exposure Averted (YTD)', value: '₹12.4 Cr', status: 'Positive', change: '+₹3.1 Cr vs prior year' },
  { label: 'Open Risk Investigations', value: '6', status: 'Attention', change: '+2 from last quarter' },
  { label: 'Regulatory Compliance', value: '94%', status: 'On Track', change: 'Stable' },
  { label: 'Supplier Diversity Index', value: '0.68', status: 'Attention', change: '-0.04 QoQ' },
]

export const boardNarrativeSummary = `The procurement function continues to strengthen its governance posture through AI-enabled monitoring, now covering 73% of enterprise spend. However, the Board's attention is required on two material findings:

1. **Sulphur Procurement Concentration Risk** — A single vendor (Rajesh Chemicals Ltd) now commands 78% of sulphur procurement volume, representing ₹34.2 Cr in annual spend. AI analysis has identified bid timing anomalies consistent with potential vendor coordination. Total estimated exposure: ₹8.7 Cr. Investigation escalated to Audit & Compliance.

2. **Logistics Cost Deviation** — Inland logistics renewal pricing shows 18% deviation from market benchmarks across 3 regions, representing ₹2.3 Cr in potential over-spend. Category strategy review initiated.

Management has initiated corrective actions including mandatory multi-vendor sourcing policies, enhanced bid monitoring protocols, and a full forensic review of sulphur procurement over the past 4 quarters.`

export const governanceRecommendations = [
  { id: 1, priority: 'Immediate', recommendation: 'Suspend single-vendor awards exceeding ₹2 Cr in the Raw Materials category pending concentration review', status: 'Pending Approval' },
  { id: 2, priority: 'Immediate', recommendation: 'Commission independent forensic audit of sulphur procurement contracts from Q1 FY24 to present', status: 'In Progress' },
  { id: 3, priority: 'Short-term', recommendation: 'Implement mandatory dual-source policy for all commodity categories exceeding ₹10 Cr annual spend', status: 'Under Review' },
  { id: 4, priority: 'Short-term', recommendation: 'Deploy real-time bid timing analytics across all RFP processes', status: 'Approved' },
  { id: 5, priority: 'Medium-term', recommendation: 'Establish quarterly vendor concentration review cadence with CPO sign-off', status: 'Planned' },
]
