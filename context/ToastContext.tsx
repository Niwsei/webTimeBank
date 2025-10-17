
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastIcon: React.FC<{ type: ToastType }> = ({ type }) => {
    switch (type) {
        case 'success':
            return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
        case 'error':
            return <XCircleIcon className="w-6 h-6 text-red-500" />;
        case 'info':
            return <InformationCircleIcon className="w-6 h-6 text-blue-500" />;
        default:
            return null;
    }
}

const Toast: React.FC<{ toast: ToastMessage; onClose: () => void }> = ({ toast, onClose }) => {
    return (
        <div className={`flex items-start w-full max-w-xs p-4 rounded-xl shadow-lg bg-surface border border-border-color animate-subtle-enter`} role="alert">
            <div className="flex-shrink-0">
                <ToastIcon type={toast.type} />
            </div>
            <div className="ml-3 text-sm font-medium text-primary-text">
                {toast.message}
            </div>
            <button type="button" className="ml-auto -mx-1.5 -my-1.5 text-secondary-text hover:text-primary-text rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-accent p-1.5 inline-flex h-8 w-8" onClick={onClose} aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
    );
};


export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts(prevToasts => [{ id, message, type }, ...prevToasts]);
    setTimeout(() => {
      removeToast(id);
    }, 5000); // Auto-remove after 5 seconds
  }, []);
  
  const removeToast = (id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 z-[100] space-y-3">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
