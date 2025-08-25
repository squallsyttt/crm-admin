import { Project, Client, Order, User, ActivityItem } from '@/types';

export const mockUser: User = {
  id: '1',
  email: 'admin@example.com',
  name: '系统管理员',
  role: 'admin'
};

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce 电商平台',
    description: '基于React和Node.js的现代化电商解决方案，包含用户管理、商品管理、订单处理等完整功能。',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
    image: '/images/ecommerce-project.jpg',
    githubUrl: 'https://github.com/example/ecommerce',
    demoUrl: 'https://ecommerce-demo.vercel.app',
    status: 'completed',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-02-28T16:30:00Z'
  },
  {
    id: '2',
    title: '企业管理系统',
    description: '为中小企业量身定制的管理系统，涵盖员工管理、项目跟踪、财务报表等核心业务模块。',
    techStack: ['Vue.js', 'Laravel', 'MySQL', 'Element UI'],
    image: '/images/enterprise-system.jpg',
    githubUrl: 'https://github.com/example/enterprise',
    status: 'active',
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-03-15T14:20:00Z'
  },
  {
    id: '3',
    title: '移动端APP开发',
    description: '跨平台移动应用开发，支持iOS和Android，具备离线同步、推送通知等功能。',
    techStack: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
    image: '/images/mobile-app.jpg',
    demoUrl: 'https://app-demo.example.com',
    status: 'active',
    createdAt: '2024-03-01T10:30:00Z',
    updatedAt: '2024-03-20T11:45:00Z'
  },
  {
    id: '4',
    title: '数据可视化平台',
    description: '实时数据分析和可视化平台，支持多种图表类型和自定义仪表盘配置。',
    techStack: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
    image: '/images/dashboard-project.jpg',
    githubUrl: 'https://github.com/example/analytics',
    status: 'paused',
    createdAt: '2024-01-20T13:00:00Z',
    updatedAt: '2024-02-15T16:00:00Z'
  },
  {
    id: '5',
    title: '内容管理系统',
    description: '灵活的内容管理系统，支持多站点管理、SEO优化、用户权限控制等功能。',
    techStack: ['Next.js', 'Strapi', 'PostgreSQL', 'Tailwind CSS'],
    image: '/images/cms-project.jpg',
    githubUrl: 'https://github.com/example/cms',
    demoUrl: 'https://cms-demo.vercel.app',
    status: 'completed',
    createdAt: '2023-12-01T08:30:00Z',
    updatedAt: '2024-01-30T17:00:00Z'
  }
];

export const mockClients: Client[] = [
  {
    id: '1',
    name: '张伟',
    email: 'zhangwei@techcorp.com',
    phone: '+86 138-0013-8000',
    company: '科技创新有限公司',
    status: 'active',
    avatar: '/images/avatars/zhang-wei.jpg',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-03-15T16:30:00Z'
  },
  {
    id: '2',
    name: '李娜',
    email: 'lina@startup.io',
    phone: '+86 139-0013-9000',
    company: '初创科技工作室',
    status: 'active',
    avatar: '/images/avatars/li-na.jpg',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-10T14:20:00Z'
  },
  {
    id: '3',
    name: '王强',
    email: 'wangqiang@enterprise.com',
    phone: '+86 137-0013-7000',
    company: '传统制造企业集团',
    status: 'potential',
    avatar: '/images/avatars/wang-qiang.jpg',
    createdAt: '2024-02-01T11:00:00Z',
    updatedAt: '2024-03-05T13:45:00Z'
  },
  {
    id: '4',
    name: '陈美丽',
    email: 'chenmeili@retail.com',
    phone: '+86 136-0013-6000',
    company: '连锁零售企业',
    status: 'active',
    avatar: '/images/avatars/chen-meili.jpg',
    createdAt: '2024-02-10T08:15:00Z',
    updatedAt: '2024-03-12T15:30:00Z'
  },
  {
    id: '5',
    name: '刘建国',
    email: 'liujianguo@consulting.com',
    phone: '+86 135-0013-5000',
    company: '管理咨询公司',
    status: 'inactive',
    avatar: '/images/avatars/liu-jianguo.jpg',
    createdAt: '2023-12-15T14:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '6',
    name: '赵敏',
    email: 'zhaomin@fintech.com',
    phone: '+86 134-0013-4000',
    company: '金融科技公司',
    status: 'active',
    avatar: '/images/avatars/zhao-min.jpg',
    createdAt: '2024-02-20T09:30:00Z',
    updatedAt: '2024-03-18T16:45:00Z'
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    clientId: '1',
    projectType: 'E-commerce平台开发',
    budget: 150000,
    requirements: '需要开发一个完整的B2C电商平台，包括用户注册登录、商品展示、购物车、订单管理、支付集成、后台管理等功能。要求响应式设计，支持移动端访问。',
    status: 'completed',
    priority: 'high',
    createdAt: '2024-01-10T09:30:00Z',
    updatedAt: '2024-02-28T17:00:00Z',
    dueDate: '2024-03-01T00:00:00Z'
  },
  {
    id: '2',
    clientId: '2',
    projectType: '移动端APP开发',
    budget: 200000,
    requirements: '开发一款跨平台移动应用，支持iOS和Android。功能包括用户管理、内容浏览、社交互动、离线同步、推送通知等。需要现代化UI设计。',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
    dueDate: '2024-04-15T00:00:00Z'
  },
  {
    id: '3',
    clientId: '3',
    projectType: '企业官网重构',
    budget: 80000,
    requirements: '重新设计和开发企业官网，提升用户体验和SEO效果。需要包含公司介绍、产品展示、新闻动态、联系我们等页面。要求加载速度快，SEO友好。',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-03-01T08:45:00Z',
    updatedAt: '2024-03-15T11:20:00Z',
    dueDate: '2024-04-30T00:00:00Z'
  },
  {
    id: '4',
    clientId: '4',
    projectType: '库存管理系统',
    budget: 120000,
    requirements: '开发一套完整的库存管理系统，包括商品入库、出库、库存查询、报表统计、预警提醒等功能。需要支持条码扫描和多仓库管理。',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-02-20T09:00:00Z',
    updatedAt: '2024-03-18T16:00:00Z',
    dueDate: '2024-04-20T00:00:00Z'
  },
  {
    id: '5',
    clientId: '6',
    projectType: '数据分析平台',
    budget: 300000,
    requirements: '构建一个实时数据分析和可视化平台，支持多数据源接入、自定义报表、实时监控、预警通知等功能。需要高性能和可扩展性。',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-03-10T11:15:00Z',
    updatedAt: '2024-03-20T13:45:00Z',
    dueDate: '2024-06-10T00:00:00Z'
  },
  {
    id: '6',
    clientId: '5',
    projectType: '内容管理系统',
    budget: 90000,
    requirements: '开发一个灵活的内容管理系统，支持多用户、权限管理、内容编辑、发布流程、SEO优化等功能。界面要求简洁易用。',
    status: 'cancelled',
    priority: 'low',
    createdAt: '2024-01-05T14:30:00Z',
    updatedAt: '2024-01-25T09:00:00Z'
  }
];

export const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'order',
    title: '新订单创建',
    description: '赵敏创建了数据分析平台开发订单',
    timestamp: '2024-03-20T13:45:00Z',
    status: 'pending'
  },
  {
    id: '2',
    type: 'project',
    title: '项目状态更新',
    description: '移动端APP开发项目进度更新',
    timestamp: '2024-03-20T11:30:00Z',
    status: 'in_progress'
  },
  {
    id: '3',
    type: 'client',
    title: '新客户注册',
    description: '赵敏完成了客户资料注册',
    timestamp: '2024-03-18T16:45:00Z',
    status: 'active'
  },
  {
    id: '4',
    type: 'order',
    title: '订单状态更新',
    description: '库存管理系统订单进入开发阶段',
    timestamp: '2024-03-18T16:00:00Z',
    status: 'in_progress'
  },
  {
    id: '5',
    type: 'project',
    title: '项目完成',
    description: 'E-commerce电商平台项目已交付完成',
    timestamp: '2024-02-28T17:00:00Z',
    status: 'completed'
  }
];

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};