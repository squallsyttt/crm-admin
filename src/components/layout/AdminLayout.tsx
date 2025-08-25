'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { requireAuth } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    requireAuth();
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* 侧边栏 */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      {/* 主要内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航 */}
        <Header title={title} />
        
        {/* 主要内容 */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* 移动端遮罩层 */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};