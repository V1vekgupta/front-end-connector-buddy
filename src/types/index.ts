// Restaurant Types
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Menu Item Types
export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  available: boolean;
  preparationTime?: number; // in minutes
  allergens?: string[];
  nutritionalInfo?: NutritionalInfo;
  createdAt: string;
  updatedAt: string;
}

export interface NutritionalInfo {
  calories?: number;
  protein?: number; // in grams
  carbs?: number; // in grams
  fat?: number; // in grams
  fiber?: number; // in grams
  sugar?: number; // in grams
}

// Order Types
export interface Order {
  id: string;
  restaurantId: string;
  restaurant?: Restaurant;
  items: OrderItem[];
  customerInfo: CustomerInfo;
  status: OrderStatus;
  totalAmount: number;
  tableNumber?: string;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  menuItem?: MenuItem;
  quantity: number;
  price: number; // price at time of order
  specialRequests?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  tableNumber?: string;
  specialRequests?: string;
}

export type OrderStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'PREPARING' 
  | 'READY' 
  | 'DELIVERED' 
  | 'CANCELLED';

// QR Code Types
export interface QRCode {
  id: string;
  restaurantId: string;
  restaurant?: Restaurant;
  tableNumber?: string;
  qrCodeUrl: string;
  isActive: boolean;
  scannedCount: number;
  createdAt: string;
  updatedAt: string;
}

// Analytics Types
export interface RestaurantStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  todayOrders: number;
  todayRevenue: number;
  popularItems: PopularItem[];
  orderStatusBreakdown: OrderStatusCount[];
  revenueByDay: RevenueByDay[];
}

export interface PopularItem {
  menuItem: MenuItem;
  orderCount: number;
  totalRevenue: number;
}

export interface OrderStatusCount {
  status: OrderStatus;
  count: number;
}

export interface RevenueByDay {
  date: string;
  revenue: number;
  orderCount: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Form Types
export interface CreateRestaurantRequest {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  imageUrl?: string;
}

export interface CreateMenuItemRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  available?: boolean;
  preparationTime?: number;
  allergens?: string[];
  nutritionalInfo?: NutritionalInfo;
}

export interface CreateOrderRequest {
  restaurantId: string;
  items: {
    menuItemId: string;
    quantity: number;
    price: number;
    specialRequests?: string;
  }[];
  customerInfo: CustomerInfo;
  totalAmount: number;
  tableNumber?: string;
  specialRequests?: string;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

// Utility Types
export interface MenuItem_Cart extends MenuItem {
  quantity: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  search?: string;
}

export interface SortOptions {
  field: 'name' | 'price' | 'category' | 'createdAt';
  direction: 'asc' | 'desc';
}

// Authentication Types (updated)
export interface AccessVerificationResponse {
  hasAccess: boolean;
  isFirstLogin: boolean;
  userId?: string;
  message?: string;
}

export interface CreatePasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    restaurantName: string;
  };
  message?: string;
}
