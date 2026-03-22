import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Proprietaires from './pages/Proprietaires';
import Dashboard from './pages/Dashboard';
import Cotisations from './pages/Cotisations'; // NEW: Imported the Cotisations page

function App() {
  // This state remembers which page you are currently on
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-slate-900 font-sans">
      {/* We pass the activePage and setActivePage to the Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        <TopNav />
        
        <main className="p-8">
          {/* Conditional Rendering. Show the page based on activePage state */}
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'proprietaires' && <Proprietaires />}
          
          {/* UPDATED: Now showing the real Cotisations page instead of text! */}
          {activePage === 'cotisations' && <Cotisations />}
        </main>
      </div>
    </div>
  );
}

export default App;