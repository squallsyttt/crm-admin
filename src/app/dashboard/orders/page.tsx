'use client'

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  DollarSign,
  Clock,
  User,
  AlertCircle,
  Calendar,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Order } from '@/types';

const OrderCard = ({ order }: { order: Order }) => {
  const { clients } = useData();
  const client = clients.find(c => c.id === order.clientId);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    pending: '待处理',
    in_progress: '进行中',
    completed: '已完成',
    cancelled: '已取消'
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const priorityLabels = {
    low: '低',
    medium: '中',
    high: '高'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  };

  const getDaysUntilDue = () => {
    if (!order.dueDate) return null;
    const now = new Date();
    const due = new Date(order.dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = getDaysUntilDue();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
              {order.projectType}
            </CardTitle>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{client?.name || '未知客户'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={cn(
              'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
              statusColors[order.status]
            )}>
              {statusLabels[order.status]}
            </span>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 预算和优先级 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-lg text-gray-900">
                {formatCurrency(order.budget)}
              </span>
            </div>
            <span className={cn(
              'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
              priorityColors[order.priority]
            )}>
              优先级: {priorityLabels[order.priority]}
            </span>
          </div>

          {/* 需求描述 */}
          <div>
            <p className="text-sm text-gray-600 line-clamp-3">
              {order.requirements}
            </p>
          </div>

          {/* 日期信息 */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>创建于 {formatDate(order.createdAt)}</span>
              </div>
              {order.dueDate && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>截止 {formatDate(order.dueDate)}</span>
                </div>
              )}
            </div>
            {daysUntilDue !== null && (
              <div className={cn(
                'flex items-center space-x-1 text-xs',
                daysUntilDue < 0 ? 'text-red-600' : 
                daysUntilDue <= 7 ? 'text-yellow-600' : 'text-gray-500'
              )}>
                <AlertCircle className="w-3 h-3" />
                <span>
                  {daysUntilDue < 0 ? `已逾期 ${Math.abs(daysUntilDue)} 天` : 
                   daysUntilDue === 0 ? '今日截止' :
                   `剩余 ${daysUntilDue} 天`
                  }
                </span>
              </div>
            )}
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex space-x-2">
              {order.status === 'pending' && (
                <Button variant="outline" size="sm">
                  开始处理
                </Button>
              )}
              {order.status === 'in_progress' && (
                <Button variant="outline" size="sm">
                  标记完成
                </Button>
              )}
              <Button variant="outline" size="sm">
                联系客户
              </Button>
            </div>
            <Button size="sm">查看详情</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function OrdersPage() {
  const { orders, clients } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | Order['priority']>('all');

  const filteredOrders = orders.filter(order => {
    const client = clients.find(c => c.id === order.clientId);
    const matchesSearch = order.projectType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.requirements.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (client && client.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // 计算订单统计
  const getOrderStats = () => {
    const totalRevenue = orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.budget, 0);

    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      inProgress: orders.filter(o => o.status === 'in_progress').length,
      completed: orders.filter(o => o.status === 'completed').length,
      totalRevenue
    };
  };

  const stats = getOrderStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">订单管理</h1>
          <p className="text-gray-600 mt-2">管理和跟踪所有客户订单</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          新建订单
        </Button>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex items-center space-x-4 flex-wrap gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜索订单..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">状态:</span>
          <div className="flex space-x-1">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              全部
            </Button>
            <Button
              variant={statusFilter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('pending')}
            >
              待处理
            </Button>
            <Button
              variant={statusFilter === 'in_progress' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('in_progress')}
            >
              进行中
            </Button>
            <Button
              variant={statusFilter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('completed')}
            >
              已完成
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">优先级:</span>
          <div className="flex space-x-1">
            <Button
              variant={priorityFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPriorityFilter('all')}
            >
              全部
            </Button>
            <Button
              variant={priorityFilter === 'high' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPriorityFilter('high')}
            >
              高
            </Button>
            <Button
              variant={priorityFilter === 'medium' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPriorityFilter('medium')}
            >
              中
            </Button>
            <Button
              variant={priorityFilter === 'low' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPriorityFilter('low')}
            >
              低
            </Button>
          </div>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">总</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">总订单</p>
                <p className="text-lg font-semibold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">待处理</p>
                <p className="text-lg font-semibold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">进</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">进行中</p>
                <p className="text-lg font-semibold">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">完</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">已完成</p>
                <p className="text-lg font-semibold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">总收入</p>
                <p className="text-lg font-semibold">{formatCurrency(stats.totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 订单列表 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
        {filteredOrders.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' ? '未找到匹配的订单' : '还没有订单'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                ? '尝试调整搜索条件或筛选器' 
                : '开始创建您的第一个订单吧'
              }
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新建订单
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}