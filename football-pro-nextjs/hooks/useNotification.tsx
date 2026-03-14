'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircleIcon, InfoCircleIcon } from '@/components/ui/Icons';

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'info';
}

interface NotificationContextType {
  showNotification: (message: string, type?: 'success' | 'info') => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  let idCounter = 0;

  const showNotification = useCallback((message: string, type: 'success' | 'info' = 'info') => {
    const id = ++idCounter;
    setNotifications(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="notification-container">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`notification notification-${notification.type}`}
          >
            {notification.type === 'success' ? <CheckCircleIcon /> : <InfoCircleIcon />}
            <span>{notification.message}</span>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
