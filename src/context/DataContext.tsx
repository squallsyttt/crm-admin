'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Project, Client, Order, DashboardStats } from '@/types';
import { mockProjects, mockClients, mockOrders, generateId } from '@/lib/mock-data';

interface DataState {
  projects: Project[];
  clients: Client[];
  orders: Order[];
  stats: DashboardStats;
  loading: boolean;
}

type DataAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_DATA'; payload: { projects: Project[]; clients: Client[]; orders: Order[] } }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'ADD_CLIENT'; payload: Client }
  | { type: 'UPDATE_CLIENT'; payload: Client }
  | { type: 'DELETE_CLIENT'; payload: string }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER'; payload: Order }
  | { type: 'DELETE_ORDER'; payload: string };

const calculateStats = (projects: Project[], clients: Client[], orders: Order[]): DashboardStats => {
  const completedOrders = orders.filter(order => order.status === 'completed');
  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.budget, 0);

  return {
    totalProjects: projects.length,
    totalClients: clients.length,
    totalOrders: orders.length,
    totalRevenue,
    projectsGrowth: 12.5,
    clientsGrowth: 8.3,
    ordersGrowth: 15.2,
    revenueGrowth: 23.1
  };
};

const dataReducer = (state: DataState, action: DataAction): DataState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'LOAD_DATA': {
      const { projects, clients, orders } = action.payload;
      return {
        ...state,
        projects,
        clients,
        orders,
        stats: calculateStats(projects, clients, orders),
        loading: false
      };
    }
    
    case 'ADD_PROJECT': {
      const newProjects = [...state.projects, action.payload];
      return {
        ...state,
        projects: newProjects,
        stats: calculateStats(newProjects, state.clients, state.orders)
      };
    }
    
    case 'UPDATE_PROJECT': {
      const newProjects = state.projects.map(project =>
        project.id === action.payload.id ? action.payload : project
      );
      return {
        ...state,
        projects: newProjects,
        stats: calculateStats(newProjects, state.clients, state.orders)
      };
    }
    
    case 'DELETE_PROJECT': {
      const newProjects = state.projects.filter(project => project.id !== action.payload);
      return {
        ...state,
        projects: newProjects,
        stats: calculateStats(newProjects, state.clients, state.orders)
      };
    }
    
    case 'ADD_CLIENT': {
      const newClients = [...state.clients, action.payload];
      return {
        ...state,
        clients: newClients,
        stats: calculateStats(state.projects, newClients, state.orders)
      };
    }
    
    case 'UPDATE_CLIENT': {
      const newClients = state.clients.map(client =>
        client.id === action.payload.id ? action.payload : client
      );
      return {
        ...state,
        clients: newClients,
        stats: calculateStats(state.projects, newClients, state.orders)
      };
    }
    
    case 'DELETE_CLIENT': {
      const newClients = state.clients.filter(client => client.id !== action.payload);
      return {
        ...state,
        clients: newClients,
        stats: calculateStats(state.projects, newClients, state.orders)
      };
    }
    
    case 'ADD_ORDER': {
      const newOrders = [...state.orders, action.payload];
      return {
        ...state,
        orders: newOrders,
        stats: calculateStats(state.projects, state.clients, newOrders)
      };
    }
    
    case 'UPDATE_ORDER': {
      const newOrders = state.orders.map(order =>
        order.id === action.payload.id ? action.payload : order
      );
      return {
        ...state,
        orders: newOrders,
        stats: calculateStats(state.projects, state.clients, newOrders)
      };
    }
    
    case 'DELETE_ORDER': {
      const newOrders = state.orders.filter(order => order.id !== action.payload);
      return {
        ...state,
        orders: newOrders,
        stats: calculateStats(state.projects, state.clients, newOrders)
      };
    }
    
    default:
      return state;
  }
};

interface DataContextType extends DataState {
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOrder: (order: Order) => void;
  deleteOrder: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'crm_projects',
  CLIENTS: 'crm_clients',
  ORDERS: 'crm_orders'
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    projects: [],
    clients: [],
    orders: [],
    stats: {
      totalProjects: 0,
      totalClients: 0,
      totalOrders: 0,
      totalRevenue: 0,
      projectsGrowth: 0,
      clientsGrowth: 0,
      ordersGrowth: 0,
      revenueGrowth: 0
    },
    loading: true
  });

  useEffect(() => {
    const loadData = () => {
      try {
        const storedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
        const storedClients = localStorage.getItem(STORAGE_KEYS.CLIENTS);
        const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);

        const projects = storedProjects ? JSON.parse(storedProjects) : mockProjects;
        const clients = storedClients ? JSON.parse(storedClients) : mockClients;
        const orders = storedOrders ? JSON.parse(storedOrders) : mockOrders;

        if (!storedProjects) localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(mockProjects));
        if (!storedClients) localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(mockClients));
        if (!storedOrders) localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(mockOrders));

        dispatch({ type: 'LOAD_DATA', payload: { projects, clients, orders } });
      } catch (error) {
        console.error('加载数据失败:', error);
        dispatch({ type: 'LOAD_DATA', payload: { projects: mockProjects, clients: mockClients, orders: mockOrders } });
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!state.loading) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(state.projects));
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(state.clients));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));
    }
  }, [state.projects, state.clients, state.orders, state.loading]);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProject: Project = {
      ...projectData,
      id: generateId(),
      createdAt: now,
      updatedAt: now
    };
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
  };

  const updateProject = (project: Project) => {
    const updatedProject = {
      ...project,
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: 'UPDATE_PROJECT', payload: updatedProject });
  };

  const deleteProject = (id: string) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id });
  };

  const addClient = (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newClient: Client = {
      ...clientData,
      id: generateId(),
      createdAt: now,
      updatedAt: now
    };
    dispatch({ type: 'ADD_CLIENT', payload: newClient });
  };

  const updateClient = (client: Client) => {
    const updatedClient = {
      ...client,
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: 'UPDATE_CLIENT', payload: updatedClient });
  };

  const deleteClient = (id: string) => {
    dispatch({ type: 'DELETE_CLIENT', payload: id });
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...orderData,
      id: generateId(),
      createdAt: now,
      updatedAt: now
    };
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
  };

  const updateOrder = (order: Order) => {
    const updatedOrder = {
      ...order,
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: 'UPDATE_ORDER', payload: updatedOrder });
  };

  const deleteOrder = (id: string) => {
    dispatch({ type: 'DELETE_ORDER', payload: id });
  };

  return (
    <DataContext.Provider
      value={{
        ...state,
        addProject,
        updateProject,
        deleteProject,
        addClient,
        updateClient,
        deleteClient,
        addOrder,
        updateOrder,
        deleteOrder
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};