'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  ShoppingCart, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  {
    title: '仪表板',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: '项目管理',
    href: '/dashboard/projects',
    icon: FolderOpen
  },
  {
    title: '客户管理',
    href: '/dashboard/clients',
    icon: Users
  },
  {
    title: '订单管理',
    href: '/dashboard/orders',
    icon: ShoppingCart
  },
  {
    title: '系统设置',
    href: '/dashboard/settings',
    icon: Settings
  }
];

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className={cn(
      'relative flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo区域 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className={cn(
          'flex items-center space-x-2 transition-opacity duration-200',
          collapsed && 'opacity-0'
        )}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CRM</span>
          </div>
          <span className="font-semibold text-gray-900">管理系统</span>
        </div>
        
        <button
          onClick={onToggle}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                'hover:bg-gray-100',
                isActive 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-700 hover:text-gray-900',
                collapsed && 'justify-center'
              )}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0', collapsed && 'mx-auto')} />
              <span className={cn(
                'transition-opacity duration-200',
                collapsed && 'opacity-0 w-0 overflow-hidden'
              )}>
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* 底部用户信息 */}
      <div className="p-4 border-t border-gray-200">
        <div className={cn(
          'flex items-center space-x-3 px-3 py-2',
          collapsed && 'justify-center'
        )}>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0" />
          <div className={cn(
            'transition-opacity duration-200',
            collapsed && 'opacity-0 w-0 overflow-hidden'
          )}>
            <p className="text-sm font-medium text-gray-900">系统管理员</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};