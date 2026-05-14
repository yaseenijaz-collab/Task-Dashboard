import { useEffect, useState } from 'react';
import { mockApi } from '../services/mockApi';
import type { Task, User, Project, Sprint } from '../types';
import {
  Search,
  Filter,
  Plus,
  Download,
  Paperclip,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import TaskDetailModal from '../components/TaskDetailModal';
import { exportToCSV } from '../utils/export';

const StatusBadge = ({ status }: { status: string }) => {
  const colors: any = {
    'Done': 'bg-green-500/10 text-green-400 border-green-500/20',
    'In Progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'To Do': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    'Blocked': 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  return (
    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${colors[status]}`}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const colors: any = {
    'Critical': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'High': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'Medium': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'Low': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };
  return (
    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${colors[priority]}`}>
      {priority}
    </span>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    Promise.all([
      mockApi.getTasks(),
      mockApi.getUsers(),
      mockApi.getProjects(),
      mockApi.getSprints()
    ]).then(([t, u, p, s]) => {
      setTasks(t);
      setUsers(u);
      setProjects(p);
      setSprints(s);
      setLoading(false);
    });
  }, []);

  const getUser = (id: string) => users.find(u => u.id === id);
  const getProject = (id: string) => projects.find(p => p.id === id);
  const getSprint = (id: string) => sprints.find(s => s.id === id);

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 15);

  const handleExport = () => {
    exportToCSV(tasks, 'azure-task-flow-inventory');
  };

  if (loading) return <div className="text-white animate-pulse flex items-center justify-center h-full font-bold uppercase tracking-widest text-xl">Synchronizing Task Inventory...</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-foreground">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-display">Task Inventory</h1>
          <p className="text-muted-foreground mt-1 font-medium">Manage and track enterprise-level task distribution.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="bg-secondary text-foreground px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-secondary/80 transition-all border border-white/5 active:scale-95"
          >
            <Download size={18} />
            Export to CSV
          </button>
          <button className="bg-primary text-background px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
            <Plus size={18} />
            Create New Task
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass rounded-xl p-4 flex flex-wrap items-center gap-4 border border-white/5">
        <div className="relative flex-1 min-w-[200px] group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search tasks by ID or name..."
            className="w-full bg-background/40 border border-white/5 rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-primary outline-none text-sm transition-all text-white font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-background/40 border border-white/5 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider outline-none focus:ring-1 focus:ring-primary text-foreground cursor-pointer transition-all hover:bg-background/60">
            <option>All Projects</option>
            {projects.map(p => <option key={p.id}>{p.name}</option>)}
          </select>
          <select className="bg-background/40 border border-white/5 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider outline-none focus:ring-1 focus:ring-primary text-foreground cursor-pointer transition-all hover:bg-background/60">
            <option>All Statuses</option>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
            <option>Blocked</option>
          </select>
        </div>
        <button className="p-2 bg-secondary rounded-lg text-muted-foreground hover:text-white transition-all border border-white/5 active:scale-95">
          <Filter size={20} />
        </button>
      </div>

      {/* Data Table */}
      <div className="glass rounded-xl overflow-hidden border border-white/5 shadow-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none opacity-30"></div>
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-foreground font-display">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground text-center">ID</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">Task Detail</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">Project</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">Assignee</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">Priority</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground text-center">Worklog</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground text-right">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTasks.map((task) => {
                const assignee = getUser(task.assignedTo);
                const project = getProject(task.projectId);
                return (
                  <tr
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className="hover:bg-primary/5 transition-all cursor-pointer group text-foreground"
                  >
                    <td className="px-6 py-4 text-center font-mono">
                      <span className="text-primary font-bold text-xs">#{task.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{task.title}</span>
                        {task.attachments.length > 0 && <Paperclip size={14} className="text-muted-foreground/50" />}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-white/5 px-2 py-1 rounded border border-white/5">{project?.key}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <img src={assignee?.avatar} alt="" className="w-7 h-7 rounded-lg border border-primary/20 p-0.5 group-hover:border-primary transition-colors shadow-lg" />
                        <span className="text-xs font-bold text-white opacity-80 group-hover:opacity-100">{assignee?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <PriorityBadge priority={task.priority} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-6 py-4 text-center">
                       <div className="flex flex-col gap-1.5 items-center">
                          <div className="text-[10px] font-black text-primary font-mono">{task.loggedHours}h / {task.estimatedHours}h</div>
                          <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden border border-white/5">
                             <div className="h-full bg-primary shadow-[0_0_8px_rgba(0,240,255,0.5)]" style={{ width: `${Math.min(100, (task.loggedHours / task.estimatedHours) * 100)}%` }}></div>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className="text-xs text-muted-foreground font-black tracking-tight">{task.dueDate}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white/5 flex items-center justify-between border-t border-white/10 relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Showing 1-15 of 350 tasks</p>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg bg-secondary/50 text-muted-foreground hover:text-white transition-all border border-white/5 hover:border-white/10 active:scale-95">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-background text-xs font-black shadow-lg shadow-primary/20 scale-110">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-white/10 text-xs font-bold text-foreground transition-all">2</button>
            <button className="w-8 h-8 rounded-lg hover:bg-white/10 text-xs font-bold text-foreground transition-all">3</button>
            <button className="p-1.5 rounded-lg bg-secondary/50 text-muted-foreground hover:text-white transition-all border border-white/5 hover:border-white/10 active:scale-95">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          user={getUser(selectedTask.assignedTo)}
          project={getProject(selectedTask.projectId)}
          sprint={getSprint(selectedTask.sprintId)}
        />
      )}
    </div>
  );
};

export default Tasks;
