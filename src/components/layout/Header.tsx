'use client'

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  User,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  title?: string;
}

export const Header = ({ title }: HeaderProps) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 card-shadow relative z-[9000]">
      <div className="flex items-center justify-between">
        {/* 左侧：标题和面包屑 */}
        <div className="flex items-center space-x-4">
          {title && (
            <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
          )}
        </div>

        {/* 右侧：搜索、通知、用户菜单 */}
        <div className="flex items-center space-x-4">
          {/* 搜索框 */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索..."
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* 通知按钮 */}
          <div className="relative z-[9999]">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center shadow-sm">
                3
              </span>
            </Button>

            {/* 通知下拉菜单 */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-xl card-shadow-lg border border-slate-200/80 z-[9999]">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-medium text-slate-800">通知</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-800">新订单创建</p>
                    <p className="text-sm text-slate-600 mt-1">赵敏创建了数据分析平台开发订单</p>
                    <p className="text-xs text-slate-400 mt-2">2小时前</p>
                  </div>
                  <div className="p-4 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-800">项目状态更新</p>
                    <p className="text-sm text-slate-600 mt-1">移动端APP开发项目进度更新</p>
                    <p className="text-xs text-slate-400 mt-2">4小时前</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-slate-800">新客户注册</p>
                    <p className="text-sm text-slate-600 mt-1">赵敏完成了客户资料注册</p>
                    <p className="text-xs text-slate-400 mt-2">1天前</p>
                  </div>
                </div>
                <div className="p-4 border-t border-slate-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    查看所有通知
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 设置按钮 */}
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>

          {/* 用户菜单 */}
          <div className="relative z-[9999]">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-slate-50/80 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {/* 用户下拉菜单 */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl card-shadow-lg border border-slate-200/80 z-[9999]">
                <div className="p-2">
                  <button className="flex items-center space-x-2 w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50/80 rounded-lg">
                    <User className="w-4 h-4" />
                    <span>个人资料</span>
                  </button>
                  <button className="flex items-center space-x-2 w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50/80 rounded-lg">
                    <Settings className="w-4 h-4" />
                    <span>账户设置</span>
                  </button>
                  <div className="border-t border-slate-200 mt-2 pt-2">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50/80 rounded-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>退出登录</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 点击其他地方关闭下拉菜单的背景层 */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-[9998]" 
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};