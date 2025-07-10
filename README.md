
# FoodScan - QR Code Restaurant Ordering System

A modern, responsive frontend application for QR code-based restaurant ordering, built with React, TypeScript, and Tailwind CSS. This frontend is designed to work seamlessly with a Spring Boot backend running PostgreSQL.

## 🚀 Features

- **QR Code Menu Access**: Customers scan QR codes to access digital menus
- **Interactive Menu Browsing**: Browse items by category with search and filtering
- **Smart Cart Management**: Add, remove, and modify items with real-time updates
- **Order Management**: Place orders with customer information and special requests
- **Order Tracking**: Real-time order status updates and confirmation
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Professional UI**: Clean, modern interface matching restaurant industry standards

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Lucide React
- **Build Tool**: Vite
- **UI Components**: Custom components with shadcn/ui integration

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Spring Boot backend running on `http://localhost:8080`
- PostgreSQL database (via Docker)

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd foodscan-frontend

# Install dependencies
npm install
```

### 2. Environment Setup

The application is pre-configured to connect to your Spring Boot backend at `http://localhost:8080`. If your backend runs on a different port, update the `API_BASE_URL` in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:YOUR_PORT/api';
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080` (or the next available port).

## 🏗 Backend Integration

This frontend is designed to work with the following Spring Boot API endpoints:

### Restaurant Endpoints
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/{id}` - Get restaurant by ID
- `POST /api/restaurants` - Create new restaurant
- `PUT /api/restaurants/{id}` - Update restaurant
- `DELETE /api/restaurants/{id}` - Delete restaurant

### Menu Endpoints
- `GET /api/restaurants/{restaurantId}/menu-items` - Get menu items
- `GET /api/restaurants/{restaurantId}/menu-items/{itemId}` - Get specific item
- `POST /api/restaurants/{restaurantId}/menu-items` - Create menu item
- `PUT /api/restaurants/{restaurantId}/menu-items/{itemId}` - Update menu item
- `DELETE /api/restaurants/{restaurantId}/menu-items/{itemId}` - Delete menu item

### Order Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders/{orderId}` - Get order details
- `PUT /api/orders/{orderId}/status` - Update order status
- `GET /api/restaurants/{restaurantId}/orders` - Get restaurant orders

### QR Code Endpoints
- `POST /api/qr-codes/generate` - Generate QR code
- `GET /api/qr-codes/{qrId}` - Get QR code information

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Main navigation header
│   ├── Hero.tsx        # Landing page hero section
│   ├── HowItWorks.tsx  # Process explanation section
│   └── Footer.tsx      # Site footer
├── pages/              # Page components
│   ├── Index.tsx       # Landing page
│   ├── MenuPage.tsx    # Restaurant menu display
│   ├── CartPage.tsx    # Shopping cart and checkout
│   └── OrderConfirmation.tsx # Order success page
├── context/            # React Context providers
│   └── CartContext.tsx # Cart state management
├── services/           # API service layer
│   └── api.ts          # Backend API integration
├── types/              # TypeScript type definitions
│   └── index.ts        # All application types
└── hooks/              # Custom React hooks
```

## 🔧 API Configuration

### Base Configuration

The API service is configured in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:8080/api';

// Generic API request function with error handling
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Implementation includes:
  // - Automatic JSON headers
  // - Error handling
  // - Response parsing
}
```

### Service Modules

- **Restaurant Service**: CRUD operations for restaurants
- **Menu Service**: Menu item management
- **Order Service**: Order creation and tracking
- **QR Code Service**: QR code generation and management
- **Analytics Service**: Business intelligence data

## 🎨 Styling & Design

### Tailwind Configuration

The application uses a custom Tailwind configuration with:

- **Custom Color Palette**: Professional restaurant industry colors
- **Responsive Breakpoints**: Mobile-first design approach
- **Custom Animations**: Smooth transitions and micro-interactions
- **Design System**: Consistent spacing, typography, and components

### Component Design Principles

- **Mobile-First**: All components are designed for mobile and scale up
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized images and lazy loading
- **User Experience**: Intuitive navigation and clear CTAs

## 📱 Usage Flow

### Customer Journey

1. **QR Code Scan**: Customer scans QR code at restaurant table
2. **Menu Access**: Digital menu loads instantly with categories
3. **Item Selection**: Browse items, view descriptions and prices
4. **Cart Management**: Add items, adjust quantities, review selections
5. **Order Placement**: Enter customer details and special requests
6. **Order Confirmation**: Receive order confirmation with tracking ID

### Restaurant Management

1. **Menu Management**: Add, edit, and remove menu items
2. **Order Processing**: Receive and update order status
3. **QR Code Generation**: Create QR codes for tables
4. **Analytics**: View sales data and popular items

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
```

### Deployment Options

1. **Static Hosting**: Deploy to Netlify, Vercel, or similar
2. **Container Deployment**: Use Docker with nginx
3. **CDN Distribution**: Optimize with CloudFront or similar

### Environment Variables

For production, create a `.env.production` file:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_APP_TITLE=FoodScan
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

## 📈 Performance Optimization

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Use `npm run analyze` to check bundle size
- **Caching Strategy**: Service worker for offline functionality

## 🔒 Security Considerations

- **XSS Protection**: All user inputs are sanitized
- **API Security**: Proper error handling without exposing internals
- **Content Security Policy**: Configured for production builds
- **HTTPS Only**: All API calls use secure connections

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Verify backend is running on correct port
   - Check CORS configuration in Spring Boot
   - Ensure database is accessible

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check for TypeScript errors
   - Update dependencies if needed

3. **Styling Issues**
   - Verify Tailwind CSS is properly configured
   - Check for conflicting CSS rules
   - Clear browser cache

### Development Tools

- **React Developer Tools**: Browser extension for debugging
- **Network Tab**: Monitor API calls and responses
- **Console Logs**: Extensive logging for debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

For support and questions:

- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Built with ❤️ for modern restaurant experiences**
