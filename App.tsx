import { useEffect, useMemo, useState } from 'react'
import {
  Activity, ArrowLeft, ArrowUpRight, BriefcaseBusiness, ChartNoAxesCombined,
  FileText, HeartPulse, Plus, ShieldCheck, Target, Users, Wallet, Search,
  X, Save, UserRound, CalendarDays, Mail, Phone, ChevronRight
} from 'lucide-react'
import { db, type Client } from './database'

const modules = [
  { label: 'Clients & Families', detail: 'Manage client profiles and family groups', icon: Users, page: 'clients' },
  { label: 'Financial Profile', detail: 'Income, expenses, assets and liabilities', icon: Wallet, page: 'financial' },
  { label: 'Goals & Scenarios', detail: 'Plan life goals and explore what-if events', icon: Target, page: 'goals' },
  { label: 'Simulations', detail: 'Explore long-term cash flow projections', icon: ChartNoAxesCombined, page: 'simulations' },
  { label: 'Insurance & Protection', detail: 'Review protection and planning assumptions', icon: HeartPulse, page: 'insurance' },
  { label: 'Reports', detail: 'Prepare clear, bilingual client reports', icon: FileText, page: 'reports' },
] as const

type Page = 'overview' | 'clients' | 'new-client' | 'client-detail' | 'financial' | 'goals' | 'simulations' | 'insurance' | 'reports'
type ClientForm = { fullName: string; email: string; phone: string; dateOfBirth: string; notes: string }
const emptyForm: ClientForm = { fullName: '', email: '', phone: '', dateOfBirth: '', notes: '' }

export default function App() {
  const [page, setPage] = useState<Page>('overview')
  const [clients, setClients] = useState<Client[]>([])
  const [form, setForm] = useState<ClientForm>(emptyForm)
  const [search, setSearch] = useState('')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [notice, setNotice] = useState('')
  const [saving, setSaving] = useState(false)

  async function loadClients() {
    const rows = await db.clients.orderBy('createdAt').reverse().toArray()
    setClients(rows)
  }

  useEffect(() => { void loadClients() }, [])

  const filteredClients = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return clients
    return clients.filter(c => [c.fullName, c.email, c.phone].some(v => (v ?? '').toLowerCase().includes(q)))
  }, [clients, search])

  function openNewClient() {
    setForm(emptyForm)
    setNotice('')
    setPage('new-client')
  }

  async function saveClient() {
    if (!form.fullName.trim()) {
      setNotice('Please enter the client’s full name.')
      return
    }
    setSaving(true)
    try {
      const now = new Date().toISOString()
      await db.clients.add({
        id: crypto.randomUUID(),
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        dateOfBirth: form.dateOfBirth,
        notes: form.notes.trim(),
        createdAt: now,
        updatedAt: now,
      })
      await loadClients()
      setNotice('Client saved successfully on this device.')
      setForm(emptyForm)
      setPage('clients')
    } catch {
      setNotice('Unable to save this client. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  function openModule(next: Page) {
    if (next === 'clients') {
      void loadClients()
    }
    setNotice('')
    setPage(next)
  }

  const pageTitle: Record<Page, string> = {
    overview: 'Good planning starts with clarity.',
    clients: 'Clients & Families',
    'new-client': 'Add a new client',
    'client-detail': selectedClient?.fullName ?? 'Client profile',
    financial: 'Financial Profile',
    goals: 'Goals & Scenarios',
    simulations: 'Simulations',
    insurance: 'Insurance & Protection',
    reports: 'Reports',
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <button className="brand brand-button" onClick={() => setPage('overview')} type="button">
          <div className="brand-mark">F</div>
          <div><strong>FinPath</strong><span>Planning workspace</span></div>
        </button>
        <div className="nav-label">WORKSPACE</div>
        <button className={`nav-item ${page === 'overview' ? 'active' : ''}`} onClick={() => setPage('overview')}><Activity size={18} /> Overview</button>
        <button className={`nav-item ${page === 'clients' || page === 'new-client' || page === 'client-detail' ? 'active' : ''}`} onClick={() => openModule('clients')}><Users size={18} /> Clients</button>
        <button className={`nav-item ${page === 'financial' || page === 'goals' || page === 'simulations' ? 'active' : ''}`} onClick={() => setPage('goals')}><Target size={18} /> Planning</button>
        <button className={`nav-item ${page === 'reports' ? 'active' : ''}`} onClick={() => setPage('reports')}><FileText size={18} /> Reports</button>
        <div className="sidebar-bottom"><ShieldCheck size={17} /><span>Local-first foundation</span></div>
      </aside>

      <section className="main-panel">
        {page === 'overview' ? (
          <>
            <header className="topbar">
              <div><span className="eyebrow">ADVISOR WORKSPACE</span><h1>{pageTitle[page]}</h1></div>
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
              <button className="quiet-button" type="button" onClick={openNewClient}><Plus size={16} /> New client</button>
            </div>
            <div className="module-grid">
              {modules.map(({ label, detail, icon: Icon, page: target }) => (
                <button className="module-card module-button" key={label} type="button" onClick={() => openModule(target as Page)}>
                  <div className="module-icon"><Icon size={20} strokeWidth={1.8} /></div>
                  <h3>{label}</h3><p>{detail}</p><span className="card-arrow"><ArrowUpRight size={17} /></span>
                </button>
              ))}
            </div>
            <footer className="page-footer"><span><BriefcaseBusiness size={14} /> FinPath · Phase 1 Foundation</span><span>{clients.length} client{clients.length === 1 ? '' : 's'} saved on this device</span></footer>
          </>
        ) : (
          <>
            <header className="subpage-header">
              <button className="back-button" type="button" onClick={() => setPage('overview')}><ArrowLeft size={18} /> Overview</button>
              <div className="avatar">JL</div>
            </header>
            <div className="subpage-title"><span className="eyebrow">ADVISOR WORKSPACE</span><h1>{pageTitle[page]}</h1></div>

            {page === 'clients' && (
              <section className="content-card">
                <div className="section-heading compact">
                  <div><h2>Client directory</h2><p>{clients.length} saved client{clients.length === 1 ? '' : 's'}</p></div>
                  <button className="primary-button" type="button" onClick={openNewClient}><Plus size={16} /> New client</button>
                </div>
                <label className="search-box"><Search size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email or phone" /></label>
                {filteredClients.length === 0 ? (
                  <div className="empty-state"><UserRound size={30} /><h3>{clients.length ? 'No matching clients' : 'No clients yet'}</h3><p>{clients.length ? 'Try another search term.' : 'Add your first client to start building a financial plan.'}</p>{!clients.length && <button className="primary-button" onClick={openNewClient}><Plus size={16} /> Add first client</button>}</div>
                ) : (
                  <div className="client-list">{filteredClients.map(client => (
                    <button className="client-row" key={client.id} onClick={() => { setSelectedClient(client); setPage('client-detail') }}>
                      <div className="client-avatar">{client.fullName.trim().charAt(0).toUpperCase()}</div>
                      <div className="client-row-main"><strong>{client.fullName}</strong><span>{client.phone || client.email || 'No contact details'}</span></div>
                      <ChevronRight size={18} />
                    </button>
                  ))}</div>
                )}
              </section>
            )}

            {page === 'new-client' && (
              <section className="content-card form-card">
                <div className="section-heading compact"><div><h2>Basic information</h2><p>Fields marked * are required.</p></div><button className="icon-button" onClick={() => setPage('clients')} aria-label="Close"><X size={19} /></button></div>
                <div className="form-grid">
                  <label className="field full"><span>Full name *</span><input value={form.fullName} onChange={e => setForm({...form, fullName:e.target.value})} placeholder="Enter client's full name" autoComplete="name" /></label>
                  <label className="field"><span><Mail size={14} /> Email</span><input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="name@example.com" autoComplete="email" /></label>
                  <label className="field"><span><Phone size={14} /> Phone</span><input type="tel" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} placeholder="+60" autoComplete="tel" /></label>
                  <label className="field full"><span><CalendarDays size={14} /> Date of birth</span><input type="date" value={form.dateOfBirth} onChange={e => setForm({...form, dateOfBirth:e.target.value})} /></label>
                  <label className="field full"><span>Notes</span><textarea rows={3} value={form.notes} onChange={e => setForm({...form, notes:e.target.value})} placeholder="Optional planning notes" /></label>
                </div>
                {notice && <p className="form-notice">{notice}</p>}
                <div className="form-actions"><button className="secondary-button" onClick={() => setPage('clients')}>Cancel</button><button className="primary-button" onClick={() => void saveClient()} disabled={saving}><Save size={16} /> {saving ? 'Saving…' : 'Save client'}</button></div>
                <p className="privacy-note"><ShieldCheck size={14} /> Client details are currently stored locally in this browser on this device.</p>
              </section>
            )}

            {page === 'client-detail' && selectedClient && (
              <section className="content-card">
                <div className="section-heading compact"><div><h2>Client details</h2><p>Saved locally on this device</p></div><button className="secondary-button" onClick={() => setPage('clients')}>Back to clients</button></div>
                <div className="profile-summary"><div className="client-avatar large">{selectedClient.fullName.charAt(0).toUpperCase()}</div><div><h2>{selectedClient.fullName}</h2><p>Client profile</p></div></div>
                <div className="detail-list">
                  <div><span>Email</span><strong>{selectedClient.email || 'Not provided'}</strong></div>
                  <div><span>Phone</span><strong>{selectedClient.phone || 'Not provided'}</strong></div>
                  <div><span>Date of birth</span><strong>{selectedClient.dateOfBirth || 'Not provided'}</strong></div>
                  <div><span>Notes</span><strong>{selectedClient.notes || 'No notes'}</strong></div>
                </div>
              </section>
            )}

            {!['clients','new-client','client-detail'].includes(page) && (
              <section className="content-card coming-soon">
                <div className="module-icon"><Target size={22} /></div>
                <h2>{pageTitle[page]}</h2>
                <p>This module is planned for a later milestone. Its data model and workflows will be implemented before it is used for real client planning.</p>
                <button className="secondary-button" onClick={() => setPage('overview')}><ArrowLeft size={16} /> Back to overview</button>
              </section>
            )}
          </>
        )}
      </section>
    </main>
  )
}
