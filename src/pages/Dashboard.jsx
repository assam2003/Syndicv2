export default function Dashboard() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
        {/* SOLDE ACTUEL CARD */}
        <div className="bg-violet-600 p-8 rounded-3xl text-white relative overflow-hidden group transition-all hover:scale-[1.01] shadow-xl shadow-violet-900/20">
          <div className="relative z-10">
            <p className="text-violet-100 font-medium mb-1">Solde Actuel</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-5xl font-black">0</h3>
              <span className="text-xl font-bold opacity-80">MAD</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-violet-100 bg-white/10 w-fit px-3 py-1 rounded-full text-sm">
              <span>↗ +12.5% vs mois dernier</span>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
        </div>
  
        {/* REVENUS CARD */}
        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-lg">
          <p className="text-slate-400 font-medium mb-1">Revenus (Ce mois)</p>
          <div className="flex items-baseline gap-2 mb-6">
            <h3 className="text-4xl font-bold text-white">0</h3>
            <span className="text-lg font-bold text-slate-500">MAD</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>Taux de recouvrement</span>
              <span>85%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[85%] rounded-full shadow-[0_0_12px_rgba(16,185,129,0.3)]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }