import { Bell, ChevronDown, Languages } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Vue d'ensemble</h2>
        <p className="text-slate-400 text-sm">Résidence Les Oliviers • Mars 2026</p>
      </div>

      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full hover:bg-slate-700 transition">
          <Languages size={16} />
          <span className="text-sm font-medium">AR / FR</span>
        </button>

        <button className="relative text-slate-300 hover:text-white transition">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3 bg-slate-800/50 pl-2 pr-4 py-1.5 rounded-full border border-slate-700 cursor-pointer">
          <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            AS
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">Résident</p>
            <p className="text-[10px] text-slate-400 leading-tight">Lecture Seule</p>
          </div>
          <ChevronDown size={16} className="text-slate-400 ml-2" />
        </div>
      </div>
    </header>
  );
}