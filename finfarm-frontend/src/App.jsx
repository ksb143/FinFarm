import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import MainHomePage from '@/pages/home/MainHomePage';
import EntrancePage from '@/pages/entrance/EntrancePage';
import RedirectPage from '@/pages/entrance/RedirectPage';
import Bank from '@/router/Bank';
import Entrance from '@/router/Entrance';
import MyFarm from '@/router/MyFarm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 px-32">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<EntrancePage />} />
          <Route path="home" element={<MainHomePage />} />
          <Route path="entrance/*" element={<Entrance />} />
          <Route path="bank/*" element={<Bank />} />
<<<<<<< HEAD
          <Route path="oauth/callback/kakao" element={<RedirectPage />} />
=======
          <Route path="myfarm/*" element={<MyFarm />} />
          <Route path="oauth/callback/kakao" element={<RedirectPage/>} />
>>>>>>> f685b6e16798c80bab65eb8c9000328614f6a646
        </Routes>
      </div>
    </Router>
  );
}

export default App;
