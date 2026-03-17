import { useState, useEffect, useCallback, useRef } from 'react';

// ─── useDebounce ─────────────────────────────────────────────────────────────
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// ─── useLocalStorage ─────────────────────────────────────────────────────────
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);
  return [storedValue, setValue] as const;
}

// ─── useFetch ────────────────────────────────────────────────────────────────
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(url: string, options?: RequestInit): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null });
  const abortRef = useRef<AbortController>();

  useEffect(() => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setState({ data: null, loading: true, error: null });

    fetch(url, { ...options, signal: abortRef.current.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: null, loading: false, error });
      });

    return () => abortRef.current?.abort();
  }, [url]);

  return state;
}

// ─── usePagination ───────────────────────────────────────────────────────────
interface PaginationOptions {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

export function usePagination({ totalItems, itemsPerPage = 10, initialPage = 1 }: PaginationOptions) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;

  return {
    currentPage,
    totalPages,
    offset,
    itemsPerPage,
    goToPage: (page: number) => setCurrentPage(Math.min(Math.max(1, page), totalPages)),
    nextPage: () => setCurrentPage((p) => Math.min(p + 1, totalPages)),
    prevPage: () => setCurrentPage((p) => Math.max(p - 1, 1)),
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}

// ─── useTable ────────────────────────────────────────────────────────────────
type SortDirection = 'asc' | 'desc';

export function useTable<T extends Record<string, unknown>>(data: T[]) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>('asc');
  const [filter, setFilter] = useState('');

  const filtered = data.filter((row) =>
    Object.values(row).some((v) => String(v).toLowerCase().includes(filter.toLowerCase()))
  );

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        const cmp = av < bv ? -1 : av > bv ? 1 : 0;
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : filtered;

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  return { rows: sorted, filter, setFilter, sortKey, sortDir, toggleSort };
}

// ─── useToast ────────────────────────────────────────────────────────────────
type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

// ─── useForm ─────────────────────────────────────────────────────────────────
type Validator<T> = (value: T) => string | null;

export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  validators?: Partial<Record<keyof T, Validator<T[keyof T]>>>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const setValue = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (validators?.[key]) {
      const error = validators[key]!(value);
      setErrors((prev) => ({ ...prev, [key]: error ?? undefined }));
    }
  }, [validators]);

  const setFieldTouched = useCallback((key: keyof T) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }, []);

  const validate = useCallback(() => {
    if (!validators) return true;
    const newErrors: Partial<Record<keyof T, string>> = {};
    let valid = true;
    for (const key in validators) {
      const error = validators[key]!(values[key]);
      if (error) { newErrors[key] = error; valid = false; }
    }
    setErrors(newErrors);
    return valid;
  }, [validators, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return { values, errors, touched, setValue, setFieldTouched, validate, reset };
}
