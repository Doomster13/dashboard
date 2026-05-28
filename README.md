# Procurement Copilot — Persona View

> A premium enterprise procurement intelligence platform prototype, designed for Fortune 500 leadership teams. Visualises the same procurement fraud incident through three distinct professional lenses: strategic, operational, and forensic.

![Preview](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-38bdf8?style=flat-square&logo=tailwindcss) ![Vite](https://img.shields.io/badge/Vite-8-purple?style=flat-square&logo=vite) ![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## Overview

Procurement Copilot demonstrates how the same procurement fraud incident — **"Raw Materials — Sulphur Procurement"** — surfaces differently depending on who is looking at it:

| Persona | Lens | Focus |
|---|---|---|
| **Chief Procurement Officer** | Strategic | Governance exposure, category risk, board reporting |
| **Category Buyer** | Operational | RFP anomalies, bid evaluation, vendor management |
| **Audit & Compliance Head** | Forensic | Evidence trails, case investigation, regulatory compliance |

---

## Prerequisites

Make sure the following are installed on your machine before proceeding:

| Tool | Version | Check |
|---|---|---|
| **Node.js** | v18 or higher | `node --version` |
| **npm** | v9 or higher | `npm --version` |

> **Note:** This is a Node.js/React project. No Python or virtual environment is required to run it. All dependencies install locally into `node_modules/` and nothing touches your global system packages.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Doomster13/dashboard
cd dashboard
```

Or download and extract the ZIP, then open a terminal in the project folder.

### 2. Set up the virtual environment (optional but recommended)

A Python `.venv` is included to keep your environment isolated. Activate it before running any commands:

**Windows (PowerShell):**
```powershell
& .\.venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```cmd
.\.venv\Scripts\activate.bat
```

**macOS / Linux:**
```bash
source .venv/bin/activate
```

> **Note:** This project is Node.js-based. The `.venv` provides environment isolation — all Node packages still install locally into `node_modules/` and nothing affects your global system. If you prefer not to use a venv, skip this step and proceed directly to `npm install`.

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

**With venv active (recommended):**

```powershell
# Windows PowerShell
& .\.venv\Scripts\Activate.ps1 ; npm run dev
```

```bash
# macOS / Linux
source .venv/bin/activate && npm run dev
```

**Without venv:**
```bash
npm run dev
```

Open your browser and go to:

```
http://localhost:5173
```

---

## Usage

1. **Landing Page** — Select a persona to enter the platform
2. **Persona Switcher** — Use the top-right dropdown to switch between personas at any time
3. **Secondary Navigation** — Use the tab bar below the top nav to move between screens within a persona
4. **Interactive Elements** — Click cards to expand details, use filters, hover over charts for tooltips

---

## Screens

### 🏠 Landing Page
Persona selector with product narrative and incident overview card.

### 🛡 Chief Procurement Officer (3 screens)
- **CPO Cockpit** — KPIs, category risk heatmap, supplier concentration, strategic alerts, AI summary
- **Category Risk Deep-Dive** — Sulphur price drift, vendor concentration timeline, risk scoring, procurement timeline, scenario simulator
- **Board-Ready Report** — Document-style report with integrity score, governance recommendations, regulatory posture

### 🛒 Category Buyer (3 screens)
- **My Workbench** — Active RFPs, Copilot nudges, approval bottlenecks, workload tracker
- **Bid Evaluation Cockpit** — Expandable bid matrix, pricing variance analysis, bid timestamp irregularities, AI recommendation engine
- **Vendor 360** — Performance radar, delivery reliability, compliance history, communication timeline, linked stakeholders

### 🔍 Audit & Compliance Head (3 screens)
- **Audit Queue** — Investigation cards with severity filters, evidence completeness scores, severity distribution
- **Case File** — Full forensic workspace: event timeline, linked evidence drawers, investigation notes, AI model reasoning
- **Governance Reports** — Audit readiness score, governance maturity chart, compliance checklist, board governance pack

---

## Tech Stack

| Package | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI framework |
| [Vite 8](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first styling |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [Framer Motion](https://www.framer.com/motion/) | Page transitions & animations |
| [Recharts](https://recharts.org/) | Charts (area, bar, pie, radar, radial) |
| [Lucide React](https://lucide.dev/) | Icon system |

---

## Project Structure

```
src/
├── main.jsx                        # React entry point
├── App.jsx                         # Router with all routes
├── index.css                       # Tailwind directives + base styles
│
├── data/                           # All mock data (realistic procurement metrics)
│   ├── sharedData.js               # Shared constants, persona definitions, incident
│   ├── cpoData.js                  # CPO persona data
│   ├── buyerData.js                # Buyer persona data
│   └── auditData.js                # Audit persona data
│
├── components/
│   ├── layout/
│   │   ├── AppShell.jsx            # Global layout wrapper with page transitions
│   │   ├── TopNav.jsx              # Sticky top nav, persona switcher, search
│   │   ├── SecondaryNav.jsx        # Per-persona screen tabs
│   │   └── Breadcrumbs.jsx         # Breadcrumb navigation
│   └── shared/
│       ├── KPICard.jsx             # Metric card with trend indicator
│       ├── StatusBadge.jsx         # Auto-colored severity/status badge
│       ├── AIInsightPanel.jsx      # AI-generated insight panel
│       ├── ChartCard.jsx           # Chart wrapper with title/subtitle
│       ├── DataTable.jsx           # Sortable, expandable table
│       └── ExportActions.jsx       # PDF / PPT / Share buttons
│
└── pages/
    ├── Landing.jsx                 # Persona selector landing page
    ├── cpo/
    │   ├── CpoCockpit.jsx
    │   ├── CategoryRisk.jsx
    │   └── BoardReport.jsx
    ├── buyer/
    │   ├── Workbench.jsx
    │   ├── BidEvaluation.jsx
    │   └── Vendor360.jsx
    └── audit/
        ├── AuditQueue.jsx
        ├── CaseFile.jsx
        └── GovernanceReports.jsx
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server at `http://localhost:5173` |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Design System

The platform uses a restrained, enterprise-grade visual language:

- **Background:** Warm white `#FAFAF9`
- **Primary accent:** Navy `#1E3A5F`
- **Risk indicators:** Red `#DC2626` / Orange `#D97706` — used only for risk/fraud signals
- **Compliance indicators:** Green `#16A34A` — used only for governed/compliant states
- **Typography:** [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- **Shadows:** Subtle, layered (`shadow-enterprise`, `shadow-enterprise-md`, `shadow-enterprise-lg`)

---

## Data & Privacy

All data in this prototype is **entirely fictional mock data**. No real vendor names, financial figures, or procurement records are used. The platform is a UI/UX prototype only — there is no backend, no database, and no API calls.

---

## Customisation

To adapt this prototype to a real use case:

1. **Replace mock data** — Edit files in `src/data/` with real or scenario-specific data
2. **Update incident details** — Modify `SULPHUR_INCIDENT` in `src/data/sharedData.js`
3. **Add personas** — Extend the `PERSONAS` array in `sharedData.js` and add routes in `App.jsx`
4. **Connect to an API** — Replace static imports in page components with `fetch` or React Query calls

---

## License

MIT — free to use, modify, and distribute.

---

*Built with Antigravity — AI-powered enterprise UI prototyping.*
