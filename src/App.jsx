import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Proprietaires from './pages/Proprietaires';

function App() {
  return (
    <div className="flex min-h-screen bg-slate-900 font-sans">
      {/* Sidebar - Fixed on the left */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        <TopNav />
        
        <main className="p-8">
          {/* We have swapped the dashboard cards for the dynamic Owners table */}
          <Proprietaires />
        </main>
      </div>
    </div>
  );
}

export default App;