import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Search, CheckCircle2, Clock, CreditCard } from 'lucide-react';

export default function Cotisations() {
  const [units, setUnits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Get the current month and year for the header
  const currentMonth = new Date().toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

  useEffect(() => {
    fetchUnits();
  }, []);

  // For now, we fetch the units. Later, we will link this to the "payments" table!
  async function fetchUnits() {
    const { data } = await supabase.from('units').select('*').order('unit_number', { ascending: true });
    if (data) setUnits(data);
  }

  // Placeholder function for our next step
  function handleMarkAsPaid(unitId, ownerName) {
    alert(`Bientôt: Enregistrement du paiement pour ${ownerName}`);
  }

  const filteredUnits = units.filter(unit => 
    unit.owner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.unit_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white capitalize">Cotisations de {currentMonth}</h2>
          <p className="text-slate-400 text-sm mt-1">Gérez les paiements mensuels des résidents.</p>
        </div>
        <div className="bg-slate-800/50 flex items-center gap-3 px-4 py-2 rounded-xl border border-slate-700 w-80">
          <Search size={18} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Rechercher un résident..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-white w-full text-sm" 
          />
        </div>
      </div>

      {/* PAYMENTS TABLE */}
      <div className="bg-slate-800/30 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-8 py-5">Appartement</th>
              <th className="px-8 py-5">Propriétaire</th>
              <th className="px-8 py-5">Montant</th>
              <th className="px-8 py-5">Statut</th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 text-slate-200">
            {filteredUnits.length > 0 ? filteredUnits.map((unit) => (
              <tr key={unit.id} className="hover:bg-slate-700/20 transition-all duration-300">
                <td className="px-8 py-5 font-bold">{unit.unit_number}</td>
                <td className="px-8 py-5">{unit.owner_name}</td>
                <td className="px-8 py-5 font-bold text-white">{unit.monthly_fee} MAD</td>
                <td className="px-8 py-5">
                  {/* For now, we hardcode everyone as 'Pending'. We will make this dynamic next! */}
                  <div className="flex items-center gap-2 text-amber-500 bg-amber-500/10 w-fit px-3 py-1.5 rounded-lg text-sm font-bold border border-amber-500/20">
                    <Clock size={16} /> En attente
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                   <button 
                     onClick={() => handleMarkAsPaid(unit.id, unit.owner_name)}
                     className="bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-500 border border-emerald-500/20 px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ml-auto"
                   >
                     <CreditCard size={18} /> Payer
                   </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="px-8 py-10 text-center text-slate-500">
                  Aucun résident trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}