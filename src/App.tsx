import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Billing from './pages/Billing';
import Reports from './pages/Reports';
import Customers from './pages/Customers';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {/* Simple Sidebar Navigation for Base Code */}
        <aside className="w-64 bg-white border-r p-4">
          <nav className="space-y-2">
            <Link to="/" className="block p-2 hover:bg-gray-100 rounded">Dashboard</Link>
            <Link to="/billing" className="block p-2 hover:bg-gray-100 rounded">Billing</Link>
            <Link to="/inventory" className="block p-2 hover:bg-gray-100 rounded">Inventory</Link>
            <Link to="/customers" className="block p-2 hover:bg-gray-100 rounded">Customers</Link>
            <Link to="/reports" className="block p-2 hover:bg-gray-100 rounded">Reports</Link>
          </nav>
        </aside>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
