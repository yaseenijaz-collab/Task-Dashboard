import mockData from '../data/mockData.json';
import type { Task, User, Project, Sprint, MockData } from '../types';

const data = mockData as MockData;

export const mockApi = {
  getTasks: async () => {
    return new Promise<Task[]>((resolve) => {
      setTimeout(() => resolve(data.tasks), 500);
    });
  },
  getTaskById: async (id: string) => {
    return new Promise<Task | undefined>((resolve) => {
      setTimeout(() => resolve(data.tasks.find(t => t.id === id)), 300);
    });
  },
  getUsers: async () => {
    return new Promise<User[]>((resolve) => {
      setTimeout(() => resolve(data.users), 500);
    });
  },
  getProjects: async () => {
    return new Promise<Project[]>((resolve) => {
      setTimeout(() => resolve(data.projects), 300);
    });
  },
  getSprints: async () => {
    return new Promise<Sprint[]>((resolve) => {
      setTimeout(() => resolve(data.sprints), 300);
    });
  },
  getDashboardStats: async () => {
    return new Promise<{
      totalTasks: number;
      completedTasks: number;
      pendingTasks: number;
      totalHours: number;
      activeUsers: number;
      sprintProgress: number;
    }>((resolve) => {
      const totalTasks = data.tasks.length;
      const completedTasks = data.tasks.filter(t => t.status === 'Done').length;
      const pendingTasks = data.tasks.filter(t => t.status !== 'Done').length;
      const totalHours = data.tasks.reduce((acc, t) => acc + t.loggedHours, 0);
      const activeUsers = data.users.length;

      setTimeout(() => resolve({
        totalTasks,
        completedTasks,
        pendingTasks,
        totalHours,
        activeUsers,
        sprintProgress: Math.round((completedTasks / totalTasks) * 100)
      }), 400);
    });
  }
};
