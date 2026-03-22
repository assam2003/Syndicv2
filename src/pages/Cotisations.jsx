import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Search, CheckCircle2, Clock, CreditCard } from 'lucide-react';

export default function Cotisations() {
  const [units, setUnits] = useState([]);
  const [paidUnitIds, setPaidUnitIds] = useState([]); // NEW: Tracks who has paid this month
  const [searchTerm, setSearchTerm] = useState('');

  const currentMonth = new Date().toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

  useEffect(() => {
    fetchData();
  }, []);

  // UPDATED: Now fetches BOTH units and this month's payments
  async function fetchData() {
    // 1. Fetch all units
    const { data: unitsData } = await supabase.from('units').select('*').order('unit_number', { ascending: true });
    if (unitsData) setUnits(unitsData);

    // 2. Fetch payments made THIS month
    const date = new Date();
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    
    const { data: paymentsData } = await supabase
      .from('payments')
      .select('unit_id')
      .gte('created_at', startOfMonth); // Only get payments from the 1st of this month onwards

    if (paymentsData) {
      // Create an array of just the IDs of units that have paid
      const paidIds = paymentsData.map(payment => payment.unit_id);
      setPaidUnitIds(paidIds);
    }
  }

  // NEW: Saves the payment to Supabase
  async function handleMarkAsPaid(unitId, amount, ownerName) {
    const confirm = window.confirm(`Confirmer la réception de ${amount} MAD de la part de ${ownerName} ?`);
    if (!confirm) return;

    // Insert a new record into the 'payments' table
    const { error } = await supabase.from('payments').insert([
      {
        unit_id: unitId,
        amount: amount
      }
    ]);

    if (!error) {
      fetchData(); // Refresh the list to instantly turn the badge green!
    } else {
      console.error("Erreur lors du paiement:", error);
      alert("Erreur: Le paiement n'a pas pu être enregistré.");
    }
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
            {filteredUnits.length > 0 ? filteredUnits.map((unit) => {
              
              // NEW: Check if this specific unit's ID is in our list of paid IDs
              const hasPaid = paidUnitIds.includes(unit.id);

              return (
                <tr key={unit.id} className="hover:bg-slate-700/20 transition-all duration-300">
                  <td className="px-8 py-5 font-bold">{unit.unit_number}</td>
                  <td className="px-8 py-5">{unit.owner_name}</td>
                  <td className="px-8 py-5 font-bold text-white">{unit.monthly_fee} MAD</td>
                  <td className="px-8 py-5">
                    {/* UPDATED: Dynamic Status Badge */}
                    {hasPaid ? (
                      <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 w-fit px-3 py-1.5 rounded-lg text-sm font-bold border border-emerald-500/20">
                        <CheckCircle2 size={16} /> Payé
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-amber-500 bg-amber-500/10 w-fit px-3 py-1.5 rounded-lg text-sm font-bold border border-amber-500/20">
                        <Clock size={16} /> En attente
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    {/* UPDATED: Hide the Payer button if they already paid! */}
                    {!hasPaid ? (
                      <button 
                        onClick={() => handleMarkAsPaid(unit.id, unit.monthly_fee, unit.owner_name)}
                        className="bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-500 border border-emerald-500/20 px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ml-auto"
                      >
                        <CreditCard size={18} /> Payer
                      </button>
                    ) : (
                      <span className="text-slate-500 text-sm italic mr-2">Réglé</span>
                    )}
                  </td>
                </tr>
              );
            }) : (
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