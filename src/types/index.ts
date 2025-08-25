export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'inactive' | 'potential';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  clientId: string;
  projectType: string;
  budget: number;
  requirements: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface DashboardStats {
  totalProjects: number;
  totalClients: number;
  totalOrders: number;
  totalRevenue: number;
  projectsGrowth: number;
  clientsGrowth: number;
  ordersGrowth: number;
  revenueGrowth: number;
}

export interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

export interface ActivityItem {
  id: string;
  type: 'project' | 'client' | 'order';
  title: string;
  description: string;
  timestamp: string;
  status?: string;
}