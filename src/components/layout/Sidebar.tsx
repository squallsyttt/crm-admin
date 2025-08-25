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
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: FolderOpen
  },
  {
    title: 'Clients',
    href: '/dashboard/clients',
    icon: Users
  },
  {
    title: 'Orders',
    href: '/dashboard/orders',
    icon: ShoppingCart
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings
  }
];

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className={cn(
      'relative flex flex-col h-full bg-white/90 backdrop-blur-md border-r border-slate-200/80 card-shadow transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo区域 */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200/60">
        <div className={cn(
          'flex items-center space-x-2 transition-opacity duration-200',
          collapsed && 'opacity-0'
        )}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">CRM</span>
          </div>
          <span className="font-semibold text-slate-800">Admin</span>
        </div>
        
        <button
          onClick={onToggle}
          className="p-1 rounded-lg hover:bg-slate-100/80 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-slate-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-slate-600" />
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
                'flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                'hover:bg-slate-100/80 hover:shadow-sm',
                isActive 
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-sm border-l-4 border-blue-500' 
                  : 'text-slate-700 hover:text-slate-900',
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
      <div className="p-4 border-t border-slate-200/60">
        <div className={cn(
          'flex items-center space-x-3 px-3 py-2',
          collapsed && 'justify-center'
        )}>
          <div className="w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex-shrink-0 shadow-sm" />
          <div className={cn(
            'transition-opacity duration-200',
            collapsed && 'opacity-0 w-0 overflow-hidden'
          )}>
            <p className="text-sm font-medium text-slate-800">System Admin</p>
            <p className="text-xs text-slate-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};