import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import logoImage from 'src/assets/fundgoaldotfun.png'

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-black/80 border-b border-gray-800"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logoImage} alt="FundGoal.fun" className="h-6" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/marketplace"
            className={`transition-colors text-sm ${
              isActive('/marketplace') ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Marketplace
          </Link>
          <Link
            to="/create"
            className={`transition-colors text-sm ${
              isActive('/create') ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Create Project
          </Link>
          <Link
            to="/dashboard"
            className={`transition-colors text-sm ${
              isActive('/dashboard') ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Dashboard
          </Link>
        </div>

        <Button className="bg-white text-black hover:bg-gray-100 text-sm">
          Connect Wallet
        </Button>
      </nav>
    </motion.header>
  );
}