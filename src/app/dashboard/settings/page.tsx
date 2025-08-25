'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, ExternalLink, Mail, Github, Globe, Code } from 'lucide-react';

export default function SettingsPage() {
  const handleContactClick = () => {
    window.open('https://griffithportfolio.vercel.app/', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center space-x-3">
        <Settings className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-slate-800">系统设置</h1>
      </div>

      {/* 主要内容卡片 */}
      <Card className="max-w-4xl">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Code className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl">CRM 管理系统 - 演示版</CardTitle>
          <CardDescription className="text-base">
            这是一个功能完整的现代化客户关系管理系统演示
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* 功能介绍 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">已实现功能</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>用户登录认证系统</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>现代化响应式界面</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>客户管理模块</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>项目管理系统</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>订单管理功能</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>数据可视化仪表板</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">技术栈</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Next.js 15 + React 18</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>TypeScript</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Tailwind CSS v4</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Lucide React Icons</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>现代化 UI 组件库</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>响应式设计</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 分割线 */}
          <div className="border-t border-slate-200"></div>

          {/* 联系信息 */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-slate-800">需要完整版本？</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                如果您对这个CRM系统感兴趣，需要完整的商业版本或定制开发服务，
                欢迎访问我的作品集网站了解更多信息。
              </p>
            </div>

            {/* 联系按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleContactClick}
                className="flex items-center space-x-2 min-w-48"
                size="lg"
              >
                <Globe className="w-5 h-5" />
                <span>访问我的作品集</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>

            {/* 额外信息 */}
            <div className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">专业服务</span>
              </div>
              <p className="text-blue-800 text-sm">
                提供 Web 应用开发、系统集成、UI/UX 设计等专业服务
              </p>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="text-center pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              CRM 管理系统演示版 © 2024 | 
              <a 
                href="https://griffithportfolio.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 ml-1"
              >
                Griffith Portfolio
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}