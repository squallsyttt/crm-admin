'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { mockUser } from '@/lib/mock-data';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        loading: false
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      };
    
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'crm_auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    const initAuth = () => {
      try {
        const storedAuth = localStorage.getItem(STORAGE_KEY);
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          if (authData.user && authData.isAuthenticated) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: authData.user });
            return;
          }
        }
      } catch (error) {
        console.error('认证初始化失败:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
      
      dispatch({ type: 'SET_LOADING', payload: false });
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (!state.loading) {
      if (state.isAuthenticated && state.user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          user: state.user,
          isAuthenticated: state.isAuthenticated
        }));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [state.user, state.isAuthenticated, state.loading]);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === '123456') {
          dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
          resolve({ success: true, message: '登录成功' });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
          resolve({ success: false, message: '用户名或密码错误' });
        }
      }, 1000);
    });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};