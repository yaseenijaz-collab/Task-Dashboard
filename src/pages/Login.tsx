import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-700">
        <div className="glass rounded-2xl p-8 border border-white/10 shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-background mb-4 shadow-lg shadow-primary/30 rotate-3">
              <ShieldCheck size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Azure TaskFlow</h1>
            <p className="text-muted-foreground text-sm">Enterprise Reporting Suite</p>
          </div>

          <h2 className="text-xl font-semibold mb-6 text-center">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="email"
                  required
                  placeholder="name@enterprise.com"
                  className="w-full bg-black/40 border border-white/5 rounded-xl pl-10 pr-4 py-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/5 rounded-xl pl-10 pr-4 py-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-black/40 accent-primary" />
                Remember me
              </label>
              <a href="#" className="text-primary hover:underline font-medium">Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-background font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 group active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 space-y-4 text-center">
            <button className="w-full bg-white/5 hover:bg-white/10 text-white py-2 rounded-xl text-sm font-medium transition-colors border border-white/5">
              Sign in with Azure SSO
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-6 text-xs text-muted-foreground relative z-10">
          <span>© 2024 Azure TaskFlow</span>
          <a href="#" className="hover:text-primary transition-colors">Help Center</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
