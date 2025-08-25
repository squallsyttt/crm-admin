'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockActivities } from '@/lib/mock-data';
import { FolderOpen, Users, ShoppingCart, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'project':
      return <FolderOpen className="h-4 w-4" />;
    case 'client':
      return <Users className="h-4 w-4" />;
    case 'order':
      return <ShoppingCart className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'active':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatRelativeTime = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return '刚刚';
  } else if (diffInHours < 24) {
    return `${diffInHours}小时前`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}天前`;
  }
};

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>最近活动</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                {getActivityIcon(activity.type)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <span className="text-xs text-gray-500">
                  {formatRelativeTime(activity.timestamp)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {activity.description}
              </p>
              {activity.status && (
                <span className={cn(
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2',
                  getStatusColor(activity.status)
                )}>
                  {activity.status === 'completed' && '已完成'}
                  {activity.status === 'in_progress' && '进行中'}
                  {activity.status === 'pending' && '待处理'}
                  {activity.status === 'active' && '活跃'}
                </span>
              )}
            </div>
          </div>
        ))}
        
        <div className="text-center pt-4 border-t border-gray-200">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            查看所有活动
          </button>
        </div>
      </CardContent>
    </Card>
  );
};