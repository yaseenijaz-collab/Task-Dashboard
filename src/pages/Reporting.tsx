import { useEffect, useState } from 'react';
import { mockApi } from '../services/mockApi';
import type { User, Task } from '../types';
import {
  FileText,
  UserCheck,
  Zap,
  BarChart as BarChartIcon,
  Filter,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Reporting = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([mockApi.getUsers(), mockApi.getTasks()]).then(([u, t]) => {
      setUsers(u);
      setTasks(t);
      setLoading(false);
    });
  }, []);

  const COLORS = ['#00f0ff', '#7000ff', '#3b82f6', '#10b981', '#f59e0b'];

  const workloadData = users.slice(0, 5).map(u => ({
    name: u.name.split(' ')[0],
    tasks: tasks.filter(t => t.assignedTo === u.id).length,
    hours: tasks.filter(t => t.assignedTo === u.id).reduce((acc, t) => acc + t.loggedHours, 0)
  }));

  const completionData = [
    { name: 'Completed', value: tasks.filter(t => t.status === 'Done').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length },
    { name: 'Remaining', value: tasks.filter(t => t.status === 'To Do' || t.status === 'Blocked').length },
  ];

  if (loading) return <div className="text-white animate-pulse flex items-center justify-center h-full font-bold uppercase tracking-widest text-xl">Analyzing Productivity...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 text-foreground">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-display">Team Productivity Analytics</h1>
          <p className="text-muted-foreground mt-1 font-medium">Monitor and optimize team efficiency across enterprise projects.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="glass px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all text-foreground border border-white/5 active:scale-95">
            <Filter size={16} />
            Filter
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all border border-white/10 shadow-lg active:scale-95">
            <FileText size={18} />
            Export PDF
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Top Performer', value: 'Sarah Jenkins', sub: '+12% vs last week', icon: UserCheck, color: 'text-cyan-400' },
          { title: 'Avg Velocity', value: '14.2 pts/sprint', sub: '+0.5 increase', icon: Zap, color: 'text-purple-400' },
          { title: 'Total Logged Hours', value: '4,820 Hrs', sub: 'Project CSI', icon: BarChartIcon, color: 'text-blue-400' },
          { title: 'Active Contributors', value: '24/28', sub: '86% engagement', icon: BarChartIcon, color: 'text-green-400' },
        ].map((stat, i) => (
          <div key={i} className="dashboard-card border border-white/5 group hover:border-primary/50 transition-all cursor-default">
            <div className="flex items-start justify-between mb-4">
               <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10 border border-current/20 group-hover:scale-110 transition-transform`}>
                 <stat.icon size={20} />
               </div>
               <button className="text-muted-foreground hover:text-white transition-colors"><MoreVertical size={16} /></button>
            </div>
            <div className="text-xl font-black text-white tracking-tight">{stat.value}</div>
            <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest font-black opacity-80">{stat.title}</div>
            <div className={`text-[10px] mt-2 font-black ${stat.color} flex items-center gap-1`}>
               <span className="w-1 h-1 rounded-full bg-current animate-ping"></span>
               {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="dashboard-card border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">Workload per Employee</h3>
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Hours logged per week</div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={workloadData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2633" horizontal={false} />
                <XAxis type="number" stroke="#4B5563" fontSize={10} tickLine={false} axisLine={false} fontVariant="bold" />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} width={80} fontWeight="bold" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0c0e12', border: '1px solid #1E2633', borderRadius: '8px' }}
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                />
                <Bar dataKey="hours" fill="#00f0ff" radius={[0, 4, 4, 0]} barSize={24}>
                   {workloadData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#00f0ff' : 'rgba(0, 240, 255, 0.4)'} />
                   ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card relative border border-white/5">
           <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">System Task Distribution</h3>
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Current Sprint Cycle</div>
          </div>
          <div className="h-80 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={completionData}
                   cx="50%"
                   cy="50%"
                   innerRadius={80}
                   outerRadius={100}
                   paddingAngle={5}
                   dataKey="value"
                   animationDuration={1500}
                 >
                   {completionData.map((_entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0.05)" strokeWidth={2} />
                   ))}
                 </Pie>
                 <Tooltip
                  contentStyle={{ backgroundColor: '#0c0e12', border: '1px solid #1E2633', borderRadius: '8px' }}
                />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute flex flex-col items-center pointer-events-none">
                <div className="text-3xl font-black text-white">350</div>
                <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-60">Total Tasks</div>
             </div>
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="glass rounded-xl overflow-hidden border border-white/5 shadow-2xl">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
          <h3 className="text-lg font-bold text-white font-display uppercase tracking-widest">Employee Performance Breakdown</h3>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-muted-foreground">
             Sort by: <span className="text-primary font-black flex items-center gap-1 cursor-pointer underline underline-offset-4 hover:text-primary/80 transition-colors">Productivity Score <ChevronDown size={12} /></span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/5">
              <tr>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Team Member</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Strategic Role</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Velocity</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Utilization</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Efficacy Index</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-foreground font-display">
              {users.slice(0, 10).map((user) => {
                const score = Math.floor(Math.random() * 20) + 80;
                return (
                  <tr key={user.id} className="hover:bg-primary/5 transition-all group cursor-default">
                    <td className="px-6 py-5 flex items-center gap-4">
                      <img src={user.avatar} className="w-9 h-9 rounded-xl border border-primary/20 p-0.5 group-hover:border-primary transition-all shadow-xl" alt="" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{user.name}</span>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">{user.team}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                       <span className="text-[10px] text-primary/80 font-black uppercase tracking-widest bg-primary/5 px-2 py-1 rounded border border-primary/10">{user.role}</span>
                    </td>
                    <td className="px-6 py-5 text-center font-mono">
                       <span className="text-sm font-black text-white">{Math.floor(Math.random() * 50) + 10} pts</span>
                    </td>
                    <td className="px-6 py-5 text-center text-sm font-bold text-primary font-mono bg-white/2 cursor-help" title="Billable hours vs Capacity">
                       {Math.floor(Math.random() * 20) + 90}%
                    </td>
                    <td className="px-6 py-5 text-right">
                       <div className="flex items-center justify-end gap-4">
                          <div className="w-32 h-1.5 bg-secondary rounded-full overflow-hidden border border-white/5 p-[1px]">
                             <div className="h-full bg-gradient-to-r from-primary via-cyan-400 to-purple-500 shadow-[0_0_12px_rgba(0,240,255,0.6)] rounded-full transition-all duration-1000 ease-out group-hover:brightness-125" style={{ width: `${score}%` }}></div>
                          </div>
                          <span className="text-xs font-black text-primary font-mono w-8">{score}%</span>
                       </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-white/2 text-center">
           <button className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all">View All Enterprise Personnel</button>
        </div>
      </div>
    </div>
  );
};

export default Reporting;
