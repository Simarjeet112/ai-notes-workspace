import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TOAST NOTIFICATION SYSTEM
 * Non-intrusive notifications for user feedback
 */

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

let toastId = 0;
const toasts = new Set<Toast>();
const listeners = new Set<(toasts: Toast[]) => void>();

const getToastIcon = (type: ToastType): string => {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'warning':
      return '⚠️';
    case 'info':
      return 'ℹ️';
    default:
      return '•';
  }
};

const getToastColor = (type: ToastType): string => {
  switch (type) {
    case 'success':
      return 'bg-green-500/10 border-green-400/30 text-green-300';
    case 'error':
      return 'bg-red-500/10 border-red-400/30 text-red-300';
    case 'warning':
      return 'bg-yellow-500/10 border-yellow-400/30 text-yellow-300';
    case 'info':
      return 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300';
  }
};

export const showToast = (message: string, type: ToastType = 'info', duration = 3000) => {
  const id = String(++toastId);
  const toast: Toast = { id, message, type, duration };

  toasts.add(toast);
  notifyListeners();

  if (duration > 0) {
    setTimeout(() => {
      toasts.delete(toast);
      notifyListeners();
    }, duration);
  }

  return id;
};

const notifyListeners = () => {
  listeners.forEach((listener) => listener(Array.from(toasts)));
};

export const useToasts = () => {
  const [toastList, setToastList] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (newToasts: Toast[]) => setToastList(newToasts);
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  return toastList;
};

/**
 * TOAST CONTAINER COMPONENT
 * Render this once in your layout
 */
const ToastContainer: React.FC = () => {
  const toasts = useToasts();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 10, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10, x: 100 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border pointer-events-auto backdrop-blur-lg ${getToastColor(toast.type)}`}
          >
            <span className="text-lg">{getToastIcon(toast.type)}</span>
            <span className="text-sm font-medium">{toast.message}</span>
            {toast.duration !== 0 && (
              <motion.div
                className="w-1 h-1 rounded-full bg-current"
                animate={{ scale: [1, 0] }}
                transition={{ duration: (toast.duration || 3000) / 1000, ease: 'linear' }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
