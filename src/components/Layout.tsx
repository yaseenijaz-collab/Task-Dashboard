import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, BarChart3, Users, Settings, Bell, Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Notifications from './Notifications';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Tasks', icon: CheckSquare, path: '/tasks' },
    { name: 'Reports', icon: BarChart3, path: '/reports' },
    { name: 'Team', icon: Users, path: '/team' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-white/5 flex flex-col relative z-20">
        <div className="p-6">
          <div className="flex items-center gap-3 text-primary font-bold text-xl tracking-tight">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-background shadow-lg shadow-primary/20 rotate-3">
              <span className="text-xl font-black">A</span>
            </div>
            TaskFlow
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary text-background shadow-lg shadow-primary/20 scale-[1.02]'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground hover:translate-x-1'
                }`}
              >
                <item.icon size={20} className={isActive ? '' : 'group-hover:text-primary transition-colors'} />
                <span className="font-semibold text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
         {/* Decorative background light */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -mr-48 -mt-48"></div>

        {/* Top bar */}
        <header className="h-16 bg-card/50 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between shrink-0 relative z-10">
          <div className="relative w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
            <input
              type="text"
              placeholder="Quick search (CMD + K)"
              className="w-full bg-secondary/50 border border-white/5 rounded-xl pl-10 pr-4 py-2 focus:ring-1 focus:ring-primary focus:bg-background outline-none text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-lg transition-colors ${showNotifications ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-card animate-pulse"></span>
              </button>
              {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
            </div>

            <div className="h-8 w-px bg-white/5"></div>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-white tracking-tight">{user?.name}</div>
                <div className="text-[10px] text-primary font-black uppercase tracking-widest">{user?.role}</div>
              </div>
              <div className="relative group cursor-pointer">
                <img
                  src={user?.avatar}
                  alt="Avatar"
                  className="w-9 h-9 rounded-xl border border-primary/20 p-0.5 group-hover:border-primary transition-colors"
                />
                <div className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
