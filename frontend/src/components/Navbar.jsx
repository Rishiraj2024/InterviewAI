import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Briefcase } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 px-6 py-4 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-serif text-2xl font-bold tracking-tight text-indigo-400">
          <Briefcase className="h-6 w-6 text-indigo-400" />
          <span>Interv<span className="text-white">AI</span></span>
        </Link>

        {user && (
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
              Dashboard
            </Link>
            <div className="flex items-center gap-4 border-l border-slate-800 pl-6">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                  {user.firstName[0]}
                </div>
                <span className="text-sm font-medium text-slate-200">{user.firstName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
