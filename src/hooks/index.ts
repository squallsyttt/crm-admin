'use client'

import { useState, useCallback, useEffect } from 'react';

export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setItemsPerPage: (count: number) => void;
}

export function usePagination<T>(
  data: T[],
  initialItemsPerPage: number = 10
): PaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const items = data.slice(startIndex, startIndex + itemsPerPage);

  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const setItemsPerPage = useCallback((count: number) => {
    setItemsPerPageState(count);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return {
    items,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNext,
    hasPrev,
    goToPage,
    nextPage,
    prevPage,
    setItemsPerPage
  };
}

export interface FilterResult<T> {
  filteredData: T[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: Record<string, unknown>;
  setFilter: (key: string, value: unknown) => void;
  clearFilters: () => void;
}

export function useFilter<T>(
  data: T[],
  searchFields: (keyof T)[],
  filterFunctions?: Record<string, (item: T, value: unknown) => boolean>
): FilterResult<T> {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, unknown>>({});

  const setFilter = useCallback((key: string, value: unknown) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setFilters({});
  }, []);

  const filteredData = data.filter(item => {
    const matchesSearch = searchTerm === '' || searchFields.some(field => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (!matchesSearch) return false;

    if (filterFunctions) {
      return Object.entries(filters).every(([key, value]) => {
        if (value === '' || value === null || value === undefined) return true;
        const filterFn = filterFunctions[key];
        return filterFn ? filterFn(item, value) : true;
      });
    }

    return true;
  });

  return {
    filteredData,
    searchTerm,
    setSearchTerm,
    filters,
    setFilter,
    clearFilters
  };
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue
  };
}

export function useAsync<T, P extends unknown[]>(
  asyncFunction: (...params: P) => Promise<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (...params: P) => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction(...params);
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset
  };
}