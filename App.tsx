import {
  Activity, ArrowUpRight, BriefcaseBusiness, ChartNoAxesCombined,
  FileText, HeartPulse, Plus, ShieldCheck, Target, Users, Wallet
} from 'lucide-react'

const modules = [
  { label: 'Clients & Families', detail: 'Manage client profiles and family groups', icon: Users },
  { label: 'Financial Profile', detail: 'Income, expenses, assets and liabilities', icon: Wallet },
  { label: 'Goals & Scenarios', detail: 'Plan life goals and explore what-if events', icon: Target },
  { label: 'Simulations', detail: 'Explore long-term cash flow projections', icon: ChartNoAxesCombined },
  { label: 'Insurance & Protection', detail: 'Review protection and planning assumptions', icon: HeartPulse },
  { label: 'Reports', detail: 'Prepare clear, bilingual client reports', icon: FileText },
]

export default function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">F</div>
          <div><strong>FinPath</strong><span>Planning workspace</span></div>
        </div>
        <div className="nav-label">WORKSPACE</div>
        <a className="nav-item active" href="#overview"><Activity size={18} /> Overview</a>
        <a className="nav-item" href="#clients"><Users size={18} /> Clients</a>
        <a className="nav-item" href="#planning"><Target size={18} /> Planning</a>
        <a className="nav-item" href="#reports"><FileText size={18} /> Reports</a>
        <div className="sidebar-bottom">
          <ShieldCheck size={17} />
          <span>Local-first foundation</span>
        </div>
      </aside>

      <section className="main-panel" id="overview">
        <header className="topbar">
          <div><span className="eyebrow">ADVISOR WORKSPACE</span><h1>Good planning starts with clarity.</h1></div>
          <div className="avatar">JL</div>
        </header>

        <section className="welcome-card">
          <div>
            <span className="eyebrow light">FINANCIAL PLANNING WORKSPACE</span>
            <h2>Plan today.<br />Live tomorrow.</h2>
            <p>A clearer view of where your clients are today — and where life could take them next.</p>
          </div>
          <div className="welcome-art"><ChartNoAxesCombined size={76} strokeWidth={1.1} /></div>
        </section>

        <div className="section-heading">
          <div><span className="eyebrow">YOUR WORKSPACE</span><h2>Planning modules</h2></div>
          <button className="quiet-button" type="button"><Plus size={16} /> New client</button>
        </div>

        <div className="module-grid">
          {modules.map(({ label, detail, icon: Icon }) => (
            <article className="module-card" key={label}>
              <div className="module-icon"><Icon size={20} strokeWidth={1.8} /></div>
              <h3>{label}</h3>
              <p>{detail}</p>
              <span className="card-arrow"><ArrowUpRight size={17} /></span>
            </article>
          ))}
        </div>

        <footer className="page-footer">
          <span><BriefcaseBusiness size={14} /> FinPath · Phase 1 Foundation</span>
          <span>More planning tools are coming.</span>
        </footer>
      </section>
    </main>
  )
}