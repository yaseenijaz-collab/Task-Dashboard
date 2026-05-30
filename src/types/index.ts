export type Role = 'Admin' | 'Manager' | 'Employee';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  department: string;
  team: string;
}

export type TaskStatus = 'To Do' | 'In Progress' | 'Done' | 'Blocked';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface TimeLog {
  id: string;
  userId: string;
  hours: number;
  date: string;
  comment: string;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  sprintId: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: string; // userId
  createdBy: string; // userId
  estimatedHours: number;
  loggedHours: number;
  dueDate: string;
  createdAt: string;
  tags: string[];
  attachments: Attachment[];
  comments: Comment[];
  timeLogs: TimeLog[];
}

export interface Sprint {
  id: string;
  name: string;
  projectId: string;
  startDate: string;
  endDate: string;
  status: 'Past' | 'Current' | 'Future';
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
}

export interface MockData {
  projects: Project[];
  sprints: Sprint[];
  users: User[];
  tasks: Task[];
}
