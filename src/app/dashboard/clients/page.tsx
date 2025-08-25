'use client'

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  Mail, 
  Phone,
  Building,
  User,
  Calendar,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Client } from '@/types';

const ClientCard = ({ client }: { client: Client }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    potential: 'bg-yellow-100 text-yellow-800'
  };

  const statusLabels = {
    active: 'Active',
    inactive: 'Inactive',
    potential: 'Potential Client'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {client.name}
              </CardTitle>
              {client.company && (
                <p className="text-sm text-gray-600 mt-1">{client.company}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={cn(
              'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
              statusColors[client.status]
            )}>
              {statusLabels[client.status]}
            </span>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 联系信息 */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{client.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{client.phone}</span>
            </div>
            {client.company && (
              <div className="flex items-center space-x-2 text-sm">
                <Building className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{client.company}</span>
              </div>
            )}
          </div>

          {/* 日期信息 */}
          <div className="flex items-center space-x-1 text-xs text-gray-500 pt-2 border-t border-gray-200">
            <Calendar className="w-3 h-3" />
            <span>Joined {formatDate(client.createdAt)}</span>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Mail className="w-3 h-3 mr-1" />
                Email
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="w-3 h-3 mr-1" />
                Call
              </Button>
            </div>
            <Button size="sm">View Details</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ClientsPage() {
  const { clients } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Client['status']>('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // 计算客户统计
  const getClientStats = () => {
    return {
      total: clients.length,
      active: clients.filter(c => c.status === 'active').length,
      inactive: clients.filter(c => c.status === 'inactive').length,
      potential: clients.filter(c => c.status === 'potential').length,
    };
  };

  const stats = getClientStats();

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-2">Manage and view detailed information for all clients</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Client
        </Button>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Filter by status:</span>
          <div className="flex space-x-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={statusFilter === 'potential' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('potential')}
            >
              Potential
            </Button>
            <Button
              variant={statusFilter === 'inactive' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('inactive')}
            >
              Inactive
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
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Clients</p>
                <p className="text-lg font-semibold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">A</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Clients</p>
                <p className="text-lg font-semibold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 font-semibold text-sm">P</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Potential Clients</p>
                <p className="text-lg font-semibold">{stats.potential}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 font-semibold text-sm">I</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Inactive Clients</p>
                <p className="text-lg font-semibold">{stats.inactive}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 客户列表 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
        {filteredClients.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <User className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No matching clients found' : 'No clients yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search terms or filters' 
                : 'Start by adding your first client'
              }
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Client
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}