'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FolderPlus, UserPlus, ShoppingCartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const QuickActionCard = ({ title, description, icon, onClick }: QuickActionProps) => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <Button onClick={onClick} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Create
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const QuickActions = () => {
  const router = useRouter();

  const actions = [
    {
      title: 'New Project',
      description: 'Create a new project and start managing',
      icon: <FolderPlus className="w-6 h-6" />,
      onClick: () => router.push('/dashboard/projects?action=create')
    },
    {
      title: 'Add Client',
      description: 'Add a new client to the system',
      icon: <UserPlus className="w-6 h-6" />,
      onClick: () => router.push('/dashboard/clients?action=create')
    },
    {
      title: 'Create Order',
      description: 'Create a new order for clients',
      icon: <ShoppingCartIcon className="w-6 h-6" />,
      onClick: () => router.push('/dashboard/orders?action=create')
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, index) => (
          <QuickActionCard
            key={index}
            title={action.title}
            description={action.description}
            icon={action.icon}
            onClick={action.onClick}
          />
        ))}
      </CardContent>
    </Card>
  );
};