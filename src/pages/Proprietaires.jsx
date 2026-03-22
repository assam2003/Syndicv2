import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Plus, Search, Trash2, Edit, X, Users } from 'lucide-react'; // NEW: Imported Users icon

export default function Proprietaires() {
  const [owners, setOwners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // We use this same state for both Adding and Editing
  const [newOwner, setNewOwner] = useState({ unit_number: '', owner_name: '', monthly_fee: '' });
  
  // NEW: Track if we are editing an existing owner (stores their ID)
  const [editingId, setEditingId] = useState(null); 
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOwners();
  }, []);

  async function fetchOwners() {
    const { data } = await supabase.from('units').select('*').order('unit_number', { ascending: true });
    if (data) setOwners(data);
  }

  // Silent Delete
  async function handleDeleteOwner(id) {
    const { error } = await supabase.from('units').delete().eq('id', id);
    if (!error) {
      fetchOwners(); 
    } else {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression");
    }
  }

  // NEW: Function to open modal for ADDING
  function openAddModal() {
    setEditingId(null); // Clear the editing ID
    setNewOwner({ unit_number: '', owner_name: '', monthly_fee: '' }); // Clear the form
    setIsModalOpen(true);
  }

  // NEW: Function to open modal for EDITING
  function openEditModal(owner) {
    setEditingId(owner.id); // Save the ID of the person we are editing
    setNewOwner({ 
      unit_number: owner.unit_number, 
      owner_name: owner.owner_name, 
      monthly_fee: owner.monthly_fee 
    }); // Fill the form with their current data
    setIsModalOpen(true);
  }

  // UPDATED: This function now handles BOTH Adding and Updating
  async function handleSaveOwner(e) {
    e.preventDefault();
    
    const payload = { 
      unit_number: newOwner.unit_number, 
      owner_name: newOwner.owner_name, 
      monthly_fee: parseFloat(newOwner.monthly_fee) 
    };

    let error;

    if (editingId) {
      // If we have an editingId, UPDATE the existing row
      const { error: updateError } = await supabase
        .from('units')
        .update(payload)
        .eq('id', editingId);
      error = updateError;
    } else {
      // Otherwise, INSERT a new row
      const { error: insertError } = await supabase
        .from('units')
        .insert([payload]);
      error = insertError;
    }

    if (!error) {
      setNewOwner({ unit_number: '', owner_name: '', monthly_fee: '' });
      setEditingId(null);
      setIsModalOpen(false);
      fetchOwners(); // Refresh the list
    } else {
      console.error("Error saving:", error);
      alert("Erreur lors de l'enregistrement");
    }
  }

  const filteredOwners = owners.filter(owner => 
    owner.owner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.unit_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between">
        <div className="bg-slate-800/50 flex items-center gap-3 px-4 py-2 rounded-xl border border-slate-700 w-96">
          <Search size={18} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-white w-full text-sm" 
          />
        </div>
        <button 
          onClick={openAddModal} // UPDATED
          className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-violet-900/20"
        >
          <Plus size={20} /> Ajouter
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-slate-800/30 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-8 py-5">Appartement</th>
              <th className="px-8 py-5">Propriétaire</th>
              <th className="px-8 py-5">Frais Mensuels (MAD)</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 text-slate-200">
            {filteredOwners.length > 0 ? filteredOwners.map((owner) => (
              <tr key={owner.id} className="hover:bg-slate-700/20 transition-all duration-300 hover:scale-[1.002]">
                <td className="px-8 py-5 font-bold">{owner.unit_number}</td>
                <td className="px-8 py-5">{owner.owner_name}</td>
                <td className="px-8 py-5 text-emerald-400 font-bold">{owner.monthly_fee} MAD</td>
                <td className="px-8 py-5 text-right space-x-2">
                   {/* UPDATED: Edit Button is now wired up */}
                   <button 
                     onClick={() => openEditModal(owner)}
                     className="p-2 text-slate-500 hover:text-violet-400 transition-colors"
                   >
                     <Edit size={18} />
                   </button>
                   {/* Delete Button */}
                   <button 
                     onClick={() => handleDeleteOwner(owner.id)} 
                     className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                   >
                     <Trash2 size={18} />
                   </button>
                </td>
              </tr>
            )) : (
              // NEW: Beautiful Empty State Illustration
              <tr>
                <td colSpan="4" className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-500 space-y-4 animate-in fade-in duration-500">
                    <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center border border-slate-700/50 shadow-inner">
                      <Users size={32} className="text-slate-400" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-300 mb-1">Aucun propriétaire trouvé</p>
                      <p className="text-sm">Cliquez sur "Ajouter" pour commencer à gérer vos résidents.</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* SMART ADD/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
              {/* UPDATED: Title changes based on mode */}
              <h3 className="text-xl font-bold text-white">
                {editingId ? "Modifier le Propriétaire" : "Nouveau Propriétaire"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveOwner} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Nom Complet</label>
                <input required value={newOwner.owner_name} onChange={e => setNewOwner({...newOwner, owner_name: e.target.value})} type="text" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Appartement</label>
                <input required value={newOwner.unit_number} onChange={e => setNewOwner({...newOwner, unit_number: e.target.value})} type="text" placeholder="Ex: Apt 04" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Frais Mensuels (MAD)</label>
                <input required value={newOwner.monthly_fee} onChange={e => setNewOwner({...newOwner, monthly_fee: e.target.value})} type="number" placeholder="Ex: 400" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none transition-all" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition">Annuler</button>
                {/* UPDATED: Button text changes based on mode */}
                <button type="submit" className="flex-1 bg-violet-600 text-white font-bold py-3 rounded-xl hover:bg-violet-700 transition shadow-lg shadow-violet-900/40">
                  {editingId ? "Mettre à jour" : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}