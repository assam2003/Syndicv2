import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Proprietaires from './pages/Proprietaires';
import Dashboard from './pages/Dashboard';

function App() {
  // NEW: This state remembers which page you are currently on
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-slate-900 font-sans">
      {/* NEW: We pass the activePage and setActivePage to the Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        <TopNav />
        
        <main className="p-8">
          {/* NEW: Conditional Rendering. Show the page based on activePage state */}
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'proprietaires' && <Proprietaires />}
          {activePage === 'cotisations' && <div className="text-white">Page Cotisations en construction...</div>}
        </main>
      </div>
    </div>
  );
}

export default App;