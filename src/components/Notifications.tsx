import React from 'react';
import { AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'success' | 'info';
  timestamp: string;
}

const notifications: Notification[] = [
  { id: '1', title: 'Overdue Task', message: 'TASK-1024 is 2 days overdue.', type: 'alert', timestamp: new Date().toISOString() },
  { id: '2', title: 'Task Completed', message: 'Sarah completed TASK-1088.', type: 'success', timestamp: new Date().toISOString() },
  { id: '3', title: 'New Comment', message: 'Marcus commented on TASK-1102.', type: 'info', timestamp: new Date().toISOString() },
];

const Notifications: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="absolute right-0 top-12 w-80 glass rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-300">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Notifications</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors"><X size={16} /></button>
      </div>
      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        {notifications.map(n => (
          <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex gap-3 text-foreground">
              <div className={`p-2 rounded-lg h-fit ${
                n.type === 'alert' ? 'bg-red-500/10 text-red-400' :
                n.type === 'success' ? 'bg-green-500/10 text-green-400' :
                'bg-blue-500/10 text-blue-400'
              }`}>
                {n.type === 'alert' ? <AlertTriangle size={16} /> :
                 n.type === 'success' ? <CheckCircle size={16} /> :
                 <Clock size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold group-hover:text-primary transition-colors truncate">{n.title}</div>
                <div className="text-[11px] text-muted-foreground mt-1 break-words">{n.message}</div>
                <div className="text-[10px] text-muted-foreground/50 mt-2">{format(new Date(n.timestamp), 'HH:mm')}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 text-center bg-white/5">
        <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline transition-all">Mark all as read</button>
      </div>
    </div>
  );
};

export default Notifications;
