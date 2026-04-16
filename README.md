FlowState is a predictive cash flow intelligence platform built with Next.js. It helps businesses anticipate liquidity gaps, analyze financial data in real time, and take instant action.

---

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 in your browser to view the app.

You can start editing the application by modifying:

```
app/page.tsx
```

The page will automatically update as you make changes.

---

## Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Custom glassmorphic UI (CSS / Tailwind if applicable)
* **AI Layer:** Gemini API
* **Data Integrations:** Plaid, QuickBooks
* **Backend:** Next.js API routes (Node.js)
* **Infrastructure:** Google Cloud

---

## Project Structure

```
flowstate/
│
├── app/                    # App Router (Next.js)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard entry
│   ├── globals.css         # Global styles
│   └── components/         # UI components (charts, cards, copilot UI)
│
├── components/             # Reusable UI components
│   ├── dashboard/          # Dashboard-specific components
│   ├── charts/             # Graphs and visualizations
│   ├── copilot/            # AI Copilot interface
│   └── ui/                 # Buttons, modals, inputs
│
├── lib/                    # Core logic and utilities
│   ├── ai/                 # Gemini integration and prompts
│   ├── financial/          # Cash flow calculations and forecasting
│   ├── integrations/       # Plaid & QuickBooks connectors
│   └── utils.ts            # Helper functions
│
├── api/                    # API routes (server-side logic)
│   ├── analyze/            # AI analysis endpoints
│   ├── transactions/       # Financial data handling
│   └── forecast/           # Cash flow prediction logic
│
├── hooks/                  # Custom React hooks
│   ├── useCashFlow.ts
│   ├── useCopilot.ts
│   └── useTransactions.ts
│
├── public/                 # Static assets
│   ├── images/
│   └── icons/
│
├── styles/                 # Additional styling (if separated)
│
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── package.json
└── tsconfig.json
```

---

## Features

* Real-time cash flow monitoring
* Predictive liquidity gap detection
* AI-powered financial insights (Gemini)
* Instant resolution suggestions (e.g., invoice factoring)
* Interactive dashboard with dynamic charts
* Conversational AI Copilot with live financial context

---

## Learn More

To learn more about Next.js:

* Next.js Documentation: https://nextjs.org/docs
* Learn Next.js: https://nextjs.org/learn
* GitHub Repository: https://github.com/vercel/next.js

---
