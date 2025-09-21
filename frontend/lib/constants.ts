// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  TIMEOUT: 10000,
} as const;

// Application Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  TIENDA: '/tienda',
  PERFIL: '/perfil',
  PRODUCTO: (id: number) => `/tienda/${id}`,
} as const;

// UI Constants
export const UI_CONSTANTS = {
  TOAST_DURATION: 4000,
  LOADING_DELAY: 300,
  ANIMATION_DURATION: 200,
} as const;

// Validation Constants
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_NAME_LENGTH: 2,
  MAX_SEARCH_LENGTH: 100,
} as const;

// Business Constants
export const BUSINESS = {
  NAME: 'Doña Araña',
  LOCATION: 'Sanlúcar de Barrameda',
  EMAIL: 'Jrlsanlucar11@gmail.com',
  DEVELOPER: 'Javier Rodríguez López',
} as const;

// Product Grid Configuration
export const GRID_CONFIG = {
  FEATURED_PRODUCTS_LIMIT: 8,
  PRODUCTS_PER_PAGE: 12,
  MOBILE_COLUMNS: 1,
  TABLET_COLUMNS: 2,
  DESKTOP_COLUMNS: 3,
  LARGE_DESKTOP_COLUMNS: 4,
} as const;

// Images and Assets
export const ASSETS = {
  BACKGROUNDS: {
    CORK: '/fondo/Fondoladrillo.jpg',
  },
  POLAROIDS: {
    POLAROID_1: '/conocenos/Polaroid1.png',
    POLAROID_2: '/conocenos/Polaroid2.png',
  },
  INSTAGRAM: {
    CAPTURE: '/instagram/captura.png',
  },
  LOGOS: {
    HORIZONTAL: '/logos/logohorizontal.png',
  }
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  AOS: {
    DURATION: 1200,
    OFFSET: 100,
    ONCE: true,
  },
  DELAYS: {
    SHORT: 300,
    MEDIUM: 600,
    LONG: 1000,
  }
} as const;