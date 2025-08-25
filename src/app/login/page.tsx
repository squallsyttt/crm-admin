'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Eye, EyeOff, ExternalLink, Globe } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.message);
      }
    } catch {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo和标题 */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">CRM</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-slate-800">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to your CRM Management System
          </p>
        </div>

        {/* 登录表单 */}
        <Card className="card-shadow-lg border-0 backdrop-blur-sm bg-white/95">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Please enter your login credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 邮箱输入 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full"
                />
              </div>

              {/* 密码输入 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* 错误信息 */}
              {error && (
                <div className="bg-red-50/80 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm backdrop-blur-sm">
                  {error}
                </div>
              )}

              {/* 登录按钮 */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* 测试账户信息 */}
            {/* 作品集链接 */}
            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-indigo-900 mb-1">💼 View Developer Portfolio</h4>
                  <p className="text-xs text-indigo-700">Discover more projects and skills</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://griffithportfolio.vercel.app/', '_blank')}
                  className="flex items-center space-x-1 bg-white/80 hover:bg-white border-indigo-300 text-indigo-700 hover:text-indigo-800"
                >
                  <Globe className="w-3 h-3" />
                  <span className="text-xs">Visit</span>
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* 测试账户信息 */}
            <div className="mt-4 p-4 bg-blue-50/80 border border-blue-200 rounded-xl backdrop-blur-sm">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Test Account</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p><span className="font-medium">Email:</span> admin@example.com</p>
                <p><span className="font-medium">Password:</span> 123456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 底部信息 */}
        <div className="text-center space-y-2">
          <p className="text-xs text-slate-500">
            CRM Management System © 2024 | 
            <a 
              href="https://griffithportfolio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 ml-1 inline-flex items-center gap-1"
            >
              Griffith Portfolio
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <p className="text-xs text-slate-400">
            Need custom development? Click the link above to learn more
          </p>
        </div>
      </div>
    </div>
  );
}