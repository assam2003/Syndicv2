import { Home, Users, ArrowDownToLine, CalendarCheck, Wrench, Wallet, FileText } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { name: 'Tableau de Bord', icon: Home, active: true },
    { name: 'Propriétaires', icon: Users, active: false },
    { name: 'Cotisations', icon: ArrowDownToLine, active: false },
    { name: 'Bilan Annuel', icon: CalendarCheck, active: false },
    { name: 'Fonds de Réparation', icon: Wrench, active: false },
    { name: 'Dépenses', icon: Wallet, active: false },
    { name: 'Rapports', icon: FileText, active: false },
  ];

  return (
    <div className="w-64 h-screen bg-slate-950 text-slate-300 flex flex-col fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-violet-600 rounded flex items-center justify-center text-white font-bold">
          SG
        </div>
        <h1 className="text-xl font-bold text-white">Syndic <span className="text-violet-500">Gravity</span></h1>
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              item.active 
                ? 'bg-violet-600 text-white' 
                : 'hover:bg-slate-900 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}