import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from '@/components/layout/Navbar';

import BankHome from '@/pages/bank/BankHome';

function App() {
  return (
    <div className="min-h-screen px-32 bg-gray-50">
      <Navbar></Navbar>
      <Router>
        <Routes>
          <Route path="/bank" element={<BankHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
