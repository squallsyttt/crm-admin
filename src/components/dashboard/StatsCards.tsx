'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/context/DataContext';
import { 
  FolderOpen, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const StatCard = ({ title, value, change, icon, trend }: StatCardProps) => {
  const isPositive = trend === 'up';
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {isPositive ? (
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
          )}
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
            {Math.abs(change)}%
          </span>
          <span className="ml-1">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export const StatsCards = () => {
  const { stats } = useData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Projects"
        value={stats.totalProjects}
        change={stats.projectsGrowth}
        trend="up"
        icon={<FolderOpen className="h-4 w-4" />}
      />
      <StatCard
        title="Total Clients"
        value={stats.totalClients}
        change={stats.clientsGrowth}
        trend="up"
        icon={<Users className="h-4 w-4" />}
      />
      <StatCard
        title="Total Orders"
        value={stats.totalOrders}
        change={stats.ordersGrowth}
        trend="up"
        icon={<ShoppingCart className="h-4 w-4" />}
      />
      <StatCard
        title="Total Revenue"
        value={formatCurrency(stats.totalRevenue)}
        change={stats.revenueGrowth}
        trend="up"
        icon={<TrendingUp className="h-4 w-4" />}
      />
    </div>
  );
};