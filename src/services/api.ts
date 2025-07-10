
const API_BASE_URL = 'http://localhost:8080/api';

// Generic API request function
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

// Restaurant API
export const restaurantService = {
  getAll: () => apiRequest('/restaurants'),
  getById: (id: string) => apiRequest(`/restaurants/${id}`),
  create: (data: any) => apiRequest('/restaurants', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/restaurants/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/restaurants/${id}`, {
    method: 'DELETE',
  }),
};

// Menu API
export const menuService = {
  getRestaurant: (restaurantId: string) => 
    apiRequest(`/restaurants/${restaurantId}`),
    
  getMenuItems: (restaurantId: string) => 
    apiRequest(`/restaurants/${restaurantId}/menu-items`),
    
  getMenuItem: (restaurantId: string, itemId: string) => 
    apiRequest(`/restaurants/${restaurantId}/menu-items/${itemId}`),
    
  createMenuItem: (restaurantId: string, data: any) => 
    apiRequest(`/restaurants/${restaurantId}/menu-items`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  updateMenuItem: (restaurantId: string, itemId: string, data: any) => 
    apiRequest(`/restaurants/${restaurantId}/menu-items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  deleteMenuItem: (restaurantId: string, itemId: string) => 
    apiRequest(`/restaurants/${restaurantId}/menu-items/${itemId}`, {
      method: 'DELETE',
    }),
};

// Order API
export const orderService = {
  createOrder: (data: any) => apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getOrder: (orderId: string) => apiRequest(`/orders/${orderId}`),
  
  updateOrderStatus: (orderId: string, status: string) => 
    apiRequest(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
    
  getOrdersByRestaurant: (restaurantId: string) => 
    apiRequest(`/restaurants/${restaurantId}/orders`),
    
  getAllOrders: () => apiRequest('/orders'),
};

// QR Code API
export const qrCodeService = {
  generateQR: (restaurantId: string, tableNumber?: string) => 
    apiRequest('/qr-codes/generate', {
      method: 'POST',
      body: JSON.stringify({ restaurantId, tableNumber }),
    }),
    
  getQRInfo: (qrId: string) => apiRequest(`/qr-codes/${qrId}`),
};

// Analytics API
export const analyticsService = {
  getRestaurantStats: (restaurantId: string) => 
    apiRequest(`/analytics/restaurants/${restaurantId}`),
    
  getOrderStats: (restaurantId: string, startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    return apiRequest(`/analytics/restaurants/${restaurantId}/orders?${params.toString()}`);
  },
  
  getPopularItems: (restaurantId: string) => 
    apiRequest(`/analytics/restaurants/${restaurantId}/popular-items`),
};

// Export all services
export default {
  restaurant: restaurantService,
  menu: menuService,
  order: orderService,
  qrCode: qrCodeService,
  analytics: analyticsService,
};
