import React from 'react';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  message: string;
  icon?: React.ReactNode;
  isAlertSoft?: boolean;
}

const alertTypes: Record<string, string> = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
};

const Alert: React.FC<AlertProps> = ({ type = 'info', message, icon, isAlertSoft = true }) => {
  return (
    <div role="alert" className={`alert ${alertTypes[type]} ${isAlertSoft && `alert-soft`}`}>
      {icon}
      <span>{message}</span>
    </div>
  );
};

export default Alert;
