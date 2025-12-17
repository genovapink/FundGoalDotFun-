import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { CreateToken } from './components/CreateToken';
import { Marketplace } from './components/Marketplace';
import { ProjectDetail } from './components/ProjectDetail';
import { Dashboard } from './components/Dashboard';
import { StarBackground } from './components/StarBackground';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white relative">
        <StarBackground />
        <div className="relative z-10">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<CreateToken />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}