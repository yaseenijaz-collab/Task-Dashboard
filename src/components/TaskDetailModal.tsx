import React from 'react';
import type { Task, User, Project, Sprint } from '../types';
import {
  X,
  Edit2,
  Paperclip,
  Tag,
  MessageSquare,
  Calendar,
  Layers,
  Plus
} from 'lucide-react';
import { format } from 'date-fns';

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
  user: User | undefined;
  project: Project | undefined;
  sprint: Sprint | undefined;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, onClose, user, project, sprint }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="glass w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl flex flex-col shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5 text-foreground">
          <div className="flex items-center gap-4">
             <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Projects / {project?.key} / {task.id}</span>
             <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition-colors lg:hidden"><X size={20} /></button>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-all text-foreground border border-white/5">
              <Edit2 size={16} /> Edit Task
            </button>
            <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors hidden lg:block text-muted-foreground hover:text-white"><X size={20} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex flex-col lg:flex-row gap-8 custom-scrollbar text-foreground">
          {/* Left Column */}
          <div className="flex-[2] space-y-8 min-w-0">
            <div>
              <h2 className="text-2xl font-bold mb-4 break-words">{task.title}</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase">{task.status}</span>
                <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold uppercase">{task.priority}</span>
              </div>
            </div>

            <section>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                <Layers size={16} /> Description
              </h3>
              <div className="text-sm text-foreground/80 leading-relaxed bg-white/5 p-6 rounded-xl border border-white/5">
                {task.description}
              </div>
            </section>

            <section>
               <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                <MessageSquare size={16} /> Activity & Comments
              </h3>
              <div className="space-y-6 ml-4 border-l-2 border-white/5 pl-8">
                 {task.comments.map(c => (
                   <div key={c.id} className="relative">
                      <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-background"></div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-primary">Task Reporter</span>
                            <span className="text-[10px] text-muted-foreground">{format(new Date(c.timestamp), 'MMM dd, HH:mm')}</span>
                         </div>
                         <p className="text-sm">{c.text}</p>
                      </div>
                   </div>
                 ))}
                 <div className="relative">
                    <div className="absolute -left-[41px] top-2 w-5 h-5 rounded-full bg-secondary border-4 border-background"></div>
                    <div className="flex gap-3">
                       <input
                         type="text"
                         placeholder="Add a comment..."
                         className="flex-1 bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary text-white"
                       />
                       <button className="bg-primary text-background px-4 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-all">Send</button>
                    </div>
                 </div>
              </div>
            </section>

            <section>
               <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                <Paperclip size={16} /> Attachments
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {task.attachments.length > 0 ? task.attachments.map(a => (
                    <div key={a.id} className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-primary/30 transition-all cursor-pointer group">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                             <FileIcon type={a.type} />
                          </div>
                          <div className="min-w-0">
                             <div className="text-xs font-bold truncate">{a.name}</div>
                             <div className="text-[10px] text-muted-foreground">{a.size}</div>
                          </div>
                       </div>
                    </div>
                 )) : (
                   <div className="col-span-full py-8 text-center border-2 border-dashed border-white/5 rounded-xl text-muted-foreground text-xs font-medium">
                      No documents attached to this task.
                   </div>
                 )}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-6">
             <div className="bg-white/5 rounded-2xl border border-white/5 p-6 space-y-6">
                <div>
                   <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-3">Assigned To</label>
                   <div className="flex items-center gap-3">
                      <img src={user?.avatar} className="w-10 h-10 rounded-full border border-primary/20" alt="" />
                      <div>
                         <div className="text-sm font-bold text-white">{user?.name}</div>
                         <div className="text-[10px] text-muted-foreground font-medium">{user?.team}</div>
                      </div>
                   </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Project</label>
                         <div className="text-sm font-medium truncate">{project?.name}</div>
                      </div>
                      <div>
                         <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Sprint</label>
                         <div className="text-sm font-medium truncate">{sprint?.name}</div>
                      </div>
                      <div className="col-span-2 mt-2">
                         <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Due Date</label>
                         <div className="text-sm font-medium flex items-center gap-2">
                            <Calendar size={14} className="text-primary" />
                            {task.dueDate}
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-white/5 rounded-2xl border border-white/5 p-6 space-y-4 text-foreground">
                <div className="flex items-center justify-between">
                   <h4 className="text-xs font-bold uppercase text-muted-foreground">Time Tracking</h4>
                   <button className="text-primary hover:text-primary/80 transition-colors"><Plus size={16} /></button>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-2">
                      <span className="font-bold text-primary">{task.loggedHours}h Logged</span>
                      <span className="text-muted-foreground">Est: {task.estimatedHours}h</span>
                   </div>
                   <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(task.loggedHours / task.estimatedHours) * 100}%` }}
                      ></div>
                   </div>
                </div>
                <div className="pt-4 space-y-3">
                   {task.timeLogs.map(l => (
                      <div key={l.id} className="flex justify-between items-center text-[11px]">
                         <span className="text-muted-foreground">{format(new Date(l.date), 'MMM dd')}</span>
                         <span className="font-bold">{l.hours}h logged</span>
                      </div>
                   ))}
                </div>
                <button className="w-full bg-primary text-background font-bold py-2 rounded-lg text-sm mt-2 hover:bg-primary/90 transition-all active:scale-[0.98]">
                   Log Time
                </button>
             </div>

             <div className="bg-white/5 rounded-2xl border border-white/5 p-6">
                <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-3 flex items-center gap-2">
                   <Tag size={12} /> Tags
                </label>
                <div className="flex flex-wrap gap-2">
                   {task.tags.map(t => (
                      <span key={t} className="px-2 py-1 bg-secondary/50 rounded text-[10px] text-foreground/80 hover:text-primary transition-colors cursor-pointer border border-white/5">#{t}</span>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FileIcon = ({ type }: { type: string }) => {
  if (type === 'pdf') return <Layers size={18} />;
  return <Paperclip size={18} />;
};

export default TaskDetailModal;
