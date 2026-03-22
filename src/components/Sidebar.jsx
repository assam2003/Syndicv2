import { Home, Users, ArrowDownToLine, CalendarCheck, Wrench, Wallet, FileText } from 'lucide-react';

export default function Sidebar({ activePage, setActivePage }) {
  // We added 'id' to each item to match the state in App.jsx
  const menuItems = [
    { id: 'dashboard', name: 'Tableau de Bord', icon: Home },
    { id: 'proprietaires', name: 'Propriétaires', icon: Users },
    { id: 'cotisations', name: 'Cotisations', icon: ArrowDownToLine },
    { id: 'bilan', name: 'Bilan Annuel', icon: CalendarCheck },
    { id: 'fonds', name: 'Fonds de Réparation', icon: Wrench },
    { id: 'depenses', name: 'Dépenses', icon: Wallet },
    { id: 'rapports', name: 'Rapports', icon: FileText },
  ];

  return (
    <div className="w-64 h-screen bg-slate-950 text-slate-300 flex flex-col fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-violet-600 rounded flex items-center justify-center text-white font-bold shadow-lg shadow-violet-900/50">
          SG
        </div>
        <h1 className="text-xl font-bold text-white">Syndic <span className="text-violet-500">Gravity</span></h1>
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activePage === item.id 
                ? 'bg-violet-600 text-white shadow-md shadow-violet-900/20' 
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <item.icon size={20} className={activePage === item.id ? "text-white" : "text-slate-500"} />
            <span className="font-medium text-sm">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}