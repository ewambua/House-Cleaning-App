import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const updateUnreadNotifications = (newNotifications) => {
    setUnreadNotifications(newNotifications);
  };

  return (
    <NotificationContext.Provider value={{ unreadNotifications, updateUnreadNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
