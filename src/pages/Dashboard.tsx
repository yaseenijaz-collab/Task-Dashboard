import { useEffect, useState } from 'react';
import { mockApi } from '../services/mockApi';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  TrendingUp,
  MoreHorizontal,
  FileDown,
  Calendar
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }: any) => (
  <div className="dashboard-card group border border-white/5">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-2 rounded-lg ${color} bg-opacity-20 text-white border border-current/20`}>
        <Icon size={24} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {trend === 'up' ? <TrendingUp size={14} /> : <TrendingUp size={14} className="rotate-180" />}
          {trendValue}
        </div>
      )}
    </div>
    <div className="text-3xl font-bold mb-1 tracking-tight text-white">{value}</div>
    <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{title}</div>
    <div className={`mt-4 h-1 w-full bg-secondary rounded-full overflow-hidden border border-white/5`}>
       <div className={`h-full ${color.replace('text-', 'bg-')} w-2/3 group-hover:w-full transition-all duration-700 shadow-[0_0_8px_rgba(0,240,255,0.4)]`}></div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getDashboardStats().then(s => {
      setStats(s);
      setLoading(false);
    });
  }, []);

  const burndownData = [
    { day: 'Day 1', ideal: 100, actual: 100 },
    { day: 'Day 3', ideal: 80, actual: 85 },
    { day: 'Day 5', ideal: 60, actual: 70 },
    { day: 'Day 7', ideal: 40, actual: 45 },
    { day: 'Day 9', ideal: 20, actual: 30 },
    { day: 'Day 11', ideal: 0, actual: 10 },
  ];

  const workloadData = [
    { name: 'Sarah J.', tasks: 12 },
    { name: 'David M.', tasks: 18 },
    { name: 'Elena R.', tasks: 15 },
    { name: 'Marcus T.', tasks: 10 },
    { name: 'Jessica W.', tasks: 22 },
  ];

  if (loading) return <div className="animate-pulse text-white flex items-center justify-center h-full font-bold uppercase tracking-widest text-xl">Loading System Diagnostics...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-display">Executive Overview</h1>
          <p className="text-muted-foreground mt-1">Real-time Azure TaskFlow performance analytics.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-card border border-white/5 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-bold text-foreground">
             <Calendar size={16} className="text-primary" />
             Last 30 Days
           </div>
           <button className="bg-primary text-background px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
             <FileDown size={18} />
             Export Report
           </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard title="Total Tasks" value={stats.totalTasks} icon={CheckCircle2} trend="up" trendValue="+8%" color="text-cyan-400" />
        <StatCard title="Completed" value={stats.completedTasks} icon={TrendingUp} trend="up" trendValue="+12%" color="text-green-400" />
        <StatCard title="Pending" value={stats.pendingTasks} icon={Clock} trend="down" trendValue="-5%" color="text-purple-400" />
        <StatCard title="Logged Hours" value={stats.totalHours} icon={Clock} trend="up" trendValue="+15%" color="text-blue-400" />
        <StatCard title="Active Users" value={stats.activeUsers} icon={Users} trend="up" trendValue="+2%" color="text-indigo-400" />
        <StatCard title="Sprint Progress" value={`${stats.sprintProgress}%`} icon={TrendingUp} trend="up" trendValue="+4%" color="text-pink-400" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="dashboard-card border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-white font-display uppercase tracking-wider">Sprint Burndown</h3>
            <button className="text-muted-foreground hover:text-white transition-colors"><MoreHorizontal size={20} /></button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={burndownData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2633" vertical={false} />
                <XAxis dataKey="day" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0c0e12', border: '1px solid #1E2633', borderRadius: '8px' }}
                  itemStyle={{ color: '#00f0ff' }}
                />
                <Area type="monotone" dataKey="actual" stroke="#00f0ff" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="ideal" stroke="#7000ff" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-white font-display uppercase tracking-wider">Workload Distribution</h3>
            <button className="text-muted-foreground hover:text-white transition-colors"><MoreHorizontal size={20} /></button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2633" vertical={false} />
                <XAxis dataKey="name" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0c0e12', border: '1px solid #1E2633', borderRadius: '8px' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="tasks" radius={[4, 4, 0, 0]}>
                  {workloadData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00f0ff' : '#7000ff'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activity & Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 dashboard-card border border-white/5">
          <h3 className="text-lg font-semibold mb-6 text-white font-display uppercase tracking-wider">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex gap-4 group cursor-default">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-primary/20 p-0.5">
                    <img src={`https://i.pravatar.cc/150?u=a${i}`} className="rounded-full shadow-lg" alt="" />
                  </div>
                  {i < 4 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-border opacity-50"></div>}
                </div>
                <div className="text-foreground">
                  <div className="text-sm font-medium">
                    <span className="text-primary font-bold">Sarah Jenkins</span> completed task <span className="text-white bg-secondary/50 px-2 py-0.5 rounded cursor-pointer hover:bg-primary/20 border border-white/5 transition-all font-mono text-xs">#TASK-1042</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 tracking-tight font-medium opacity-80">{i} hours ago • Cloud Synergy Project</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card border border-white/5">
          <h3 className="text-lg font-semibold mb-6 text-white font-display uppercase tracking-wider">High Priority Alerts</h3>
          <div className="space-y-4 text-foreground">
            {[
              { id: '1024', title: 'API Auth Failure', priority: 'Critical', color: 'text-red-400' },
              { id: '1056', title: 'Database Migration', priority: 'High', color: 'text-orange-400' },
              { id: '1088', title: 'SSL Certificate Expiry', priority: 'High', color: 'text-orange-400' },
            ].map((alert, i) => (
              <div key={i} className="p-4 rounded-lg bg-secondary/20 border border-white/5 hover:border-primary/50 transition-all flex items-center justify-between group cursor-pointer active:scale-95">
                <div className="flex items-center gap-3">
                  <AlertCircle size={18} className={alert.color} />
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white group-hover:text-primary transition-colors truncate">{alert.title}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 font-black uppercase tracking-widest">TASK-{alert.id}</div>
                  </div>
                </div>
                <div className={`text-[9px] shrink-0 uppercase font-black px-2 py-1 rounded bg-opacity-10 ${alert.color.replace('text-', 'bg-')} ${alert.color} border border-current/20`}>
                  {alert.priority}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
