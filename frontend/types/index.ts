// Import and re-export from API types
import type {
  Usuario,
  Producto,
  Categoria,
  Tipo,
  Apartado,
  LoginRequest,
  RegisterRequest,
  AuthResponse
} from '@/lib/api';

export type {
  Usuario,
  Producto,
  Categoria,
  Tipo,
  Apartado,
  LoginRequest,
  RegisterRequest,
  AuthResponse
};

// UI Component Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  className?: string;
}

// Layout Props
export interface LayoutProps extends BaseComponentProps {
  showHeader?: boolean;
  showFooter?: boolean;
}

// Section Props
export interface SectionProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

// Product Props
export interface ProductCardProps {
  producto: Producto;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
  showQuickActions?: boolean;
}

export interface ProductGridProps {
  productos: Producto[];
  loading?: boolean;
  className?: string;
}

// Cart Props
export interface CartItem {
  id: number;
  producto: Producto;
  cantidad: number;
  fechaApartado: Date;
}

// Auth Props
export interface AuthFormProps {
  className?: string;
  onSuccess?: () => void;
}