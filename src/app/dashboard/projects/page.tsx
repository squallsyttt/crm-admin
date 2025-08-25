'use client'

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  ExternalLink, 
  Github, 
  Calendar,
  Tag
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Project } from '@/types';

const ProjectCard = ({ project }: { project: Project }) => {
  const statusColors = {
    active: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800'
  };

  const statusLabels = {
    active: '进行中',
    completed: '已完成',
    paused: '暂停'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
              {project.title}
            </CardTitle>
            <p className="text-sm text-gray-600 line-clamp-2">
              {project.description}
            </p>
          </div>
          <span className={cn(
            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-4',
            statusColors[project.status]
          )}>
            {statusLabels[project.status]}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 技术栈 */}
          <div>
            <div className="flex items-center space-x-1 mb-2">
              <Tag className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">技术栈</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 日期信息 */}
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>创建于 {formatDate(project.createdAt)}</span>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex space-x-2">
              {project.githubUrl && (
                <Button variant="outline" size="sm">
                  <Github className="w-3 h-3 mr-1" />
                  代码
                </Button>
              )}
              {project.demoUrl && (
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  演示
                </Button>
              )}
            </div>
            <Button size="sm">查看详情</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ProjectsPage() {
  const { projects } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Project['status']>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">项目管理</h1>
          <p className="text-gray-600 mt-2">管理和查看所有项目的详细信息</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          新建项目
        </Button>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜索项目..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">状态筛选:</span>
          <div className="flex space-x-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              全部
            </Button>
            <Button
              variant={statusFilter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('active')}
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
            <Button
              variant={statusFilter === 'paused' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('paused')}
            >
              暂停
            </Button>
          </div>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">全</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">总项目</p>
                <p className="text-lg font-semibold">{projects.length}</p>
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
                <p className="text-lg font-semibold">
                  {projects.filter(p => p.status === 'active').length}
                </p>
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
                <p className="text-lg font-semibold">
                  {projects.filter(p => p.status === 'completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 font-semibold text-sm">停</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">已暂停</p>
                <p className="text-lg font-semibold">
                  {projects.filter(p => p.status === 'paused').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 项目列表 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || statusFilter !== 'all' ? '未找到匹配的项目' : '还没有项目'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? '尝试调整搜索条件或筛选器' 
                : '开始创建您的第一个项目吧'
              }
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新建项目
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}