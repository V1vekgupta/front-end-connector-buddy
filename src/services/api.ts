
import { 
  Restaurant, 
  MenuItem, 
  Order, 
  CreateOrderRequest, 
  QRCode, 
  RestaurantStats,
  AccessVerificationResponse,
  CreatePasswordRequest,
  LoginResponse 
} from '../types';

// CORRECTED: The backend is running on port 8081
const API_BASE_URL = 'http://localhost:8081/api';

// Generic API request function
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      // We can add the auth token here for secured endpoints later
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Better error handling to parse JSON error messages from the backend
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    // Handle cases where the response might be empty (e.g., for a 204 No Content response)
    const text = await response.text();
    return text ? JSON.parse(text) : null;

  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

// Restaurant API
export const restaurantService = {
  getAll: (): Promise<Restaurant[]> => apiRequest('/restaurants'),
  getById: (id: string): Promise<Restaurant> => apiRequest(`/restaurants/${id}`),
  create: (data: any): Promise<Restaurant> => apiRequest('/restaurants', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any): Promise<Restaurant> => apiRequest(`/restaurants/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string): Promise<void> => apiRequest(`/restaurants/${id}`, {
    method: 'DELETE',
  }),
};

// Menu API
export const menuService = {
  getRestaurant: (restaurantId: string): Promise<Restaurant> => 
    apiRequest(`/restaurants/${restaurantId}`),
    
  getMenuItems: (restaurantId: string): Promise<MenuItem[]> => 
    apiRequest(`/restaurants/${restaurantId}/menu-items`),
    
  getMenuItem: (restaurantId: string, itemId: string): Promise<MenuItem> => 
    apiRequest(`/restaurants/${restaurantId}/menu-items/${itemId}`),
    
  createMenuItem: (restaurantId: string, data: any): Promise<MenuItem> => 
    apiRequest(`/restaurants/${restaurantId}/menu-items`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  updateMenuItem: (restaurantId: string, itemId: string, data: any): Promise<MenuItem> => 
    apiRequest(`/restaurants/${restaurantId}/menu-items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  deleteMenuItem: (restaurantId: string, itemId: string): Promise<void> => 
    apiRequest(`/restaurants/${restaurantId}/menu-items/${itemId}`, {
      method: 'DELETE',
    }),
};

// Order API
export const orderService = {
  createOrder: (data: CreateOrderRequest): Promise<Order> => apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getOrder: (orderId: string): Promise<Order> => apiRequest(`/orders/${orderId}`),
  
  updateOrderStatus: (orderId: string, status: string): Promise<Order> => 
    apiRequest(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
    
  getOrdersByRestaurant: (restaurantId: string): Promise<Order[]> => 
    apiRequest(`/restaurants/${restaurantId}/orders`),
    
  getAllOrders: (): Promise<Order[]> => apiRequest('/orders'),
};

// QR Code API
export const qrCodeService = {
  generateQR: (restaurantId: string, tableNumber?: string): Promise<QRCode> => 
    apiRequest('/qr-codes/generate', {
      method: 'POST',
      body: JSON.stringify({ restaurantId, tableNumber }),
    }),
    
  getQRInfo: (qrId: string): Promise<QRCode> => apiRequest(`/qr-codes/${qrId}`),
};

// Analytics API
export const analyticsService = {
  getRestaurantStats: (restaurantId: string): Promise<RestaurantStats> => 
    apiRequest(`/analytics/restaurants/${restaurantId}`),
    
  getOrderStats: (restaurantId: string, startDate?: string, endDate?: string): Promise<any> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    return apiRequest(`/analytics/restaurants/${restaurantId}/orders?${params.toString()}`);
  },
  
  getPopularItems: (restaurantId: string): Promise<any> => 
    apiRequest(`/analytics/restaurants/${restaurantId}/popular-items`),
};

// Authentication API (Simplified)
export const authService = {
  signUp: (data: any): Promise<{ message: string }> => 
    apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  login: (credentials: { email: string; password: string; }): Promise<LoginResponse> => 
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
};

// Export all services
export default {
  restaurant: restaurantService,
  menu: menuService,
  order: orderService,
  qrCode: qrCodeService,
  analytics: analyticsService,
  auth: authService,
};
