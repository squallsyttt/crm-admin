'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, ExternalLink, Mail, Globe, Code } from 'lucide-react';

export default function SettingsPage() {
  const handleContactClick = () => {
    window.open('https://griffithportfolio.vercel.app/', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center space-x-3">
        <Settings className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-slate-800">System Settings</h1>
      </div>

      {/* 主要内容卡片 */}
      <Card className="max-w-4xl">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Code className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl">CRM Management System - Demo Version</CardTitle>
          <CardDescription className="text-base">
            This is a fully-featured modern customer relationship management system demo
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* 功能介绍 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Implemented Features</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>User Authentication System</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Modern Responsive Interface</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Client Management Module</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Project Management System</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Order Management Features</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Data Visualization Dashboard</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Tech Stack</h3>
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
                  <span>Modern UI Component Library</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Responsive Design</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 分割线 */}
          <div className="border-t border-slate-200"></div>

          {/* 联系信息 */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-slate-800">Need the Full Version?</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                If you're interested in this CRM system and need the complete commercial version or custom development services,
                feel free to visit my portfolio website to learn more.
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
                <span>Visit My Portfolio</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>

            {/* 额外信息 */}
            <div className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Professional Services</span>
              </div>
              <p className="text-blue-800 text-sm">
                Providing professional services including Web application development, system integration, and UI/UX design
              </p>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="text-center pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              CRM Management System Demo © 2024 | 
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