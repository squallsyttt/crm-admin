'use client'

import { StatsCards } from '@/components/dashboard/StatsCards';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();
  const { projects, clients, orders, loading } = useData();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 欢迎标题 */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || 'Admin'}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's your CRM management system dashboard. Quickly view business overview and latest updates.
        </p>
      </div>

      {/* 统计卡片 */}
      <StatsCards />

      {/* 主要内容区域 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 最近活动 */}
        <RecentActivity />

        {/* 快速操作 */}
        <QuickActions />
      </div>

      {/* 项目概览 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 最新项目 */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{project.title}</h4>
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {project.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status === 'completed' ? 'Completed' : 
                         project.status === 'active' ? 'In Progress' : 'Paused'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {project.techStack.slice(0, 2).join(', ')}
                        {project.techStack.length > 2 && '...'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No projects yet. Create your first project!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 最新订单 */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => {
                const client = clients.find(c => c.id === order.clientId);
                return (
                  <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{order.projectType}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Client: {client?.name || 'Unknown Client'}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status === 'completed' ? 'Completed' : 
                           order.status === 'in_progress' ? 'In Progress' : 
                           order.status === 'pending' ? 'Pending' : 'Cancelled'}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          ¥{order.budget.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {orders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No orders yet. Create your first order!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}