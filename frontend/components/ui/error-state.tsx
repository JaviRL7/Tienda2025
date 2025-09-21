'use client';

import { Button } from './button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  className?: string;
}

export default function ErrorState({
  title = 'Algo salió mal',
  message = 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.',
  onRetry,
  showRetry = true,
  className = ''
}: ErrorStateProps) {
  return (
    <div className={`text-center py-16 ${className}`}>
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
        <AlertTriangle className="h-12 w-12 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">
        {title}
      </h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {message}
      </p>
      {showRetry && onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Intentar de nuevo
        </Button>
      )}
    </div>
  );
}