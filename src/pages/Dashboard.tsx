import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  Clock,
  Eye,
  AlertCircle,
  Clipboard,
  Utensils,
  QrCode
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { analyticsService, orderService } from '../services/api';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const restaurantId = user.restaurantId || '1'; // Fallback for demo

  // Mock data for now since we don't have the analytics endpoints yet
  const todayStats = {
    revenue: 1250.50,
    orders: 23,
    averageOrderValue: 54.37,
    activeOrders: 5
  };

  const recentOrders = [
    { id: '1', tableNumber: '5', total: 45.50, status: 'PREPARING', time: '5 min ago' },
    { id: '2', tableNumber: '3', total: 78.25, status: 'READY', time: '8 min ago' },
    { id: '3', tableNumber: '7', total: 32.00, status: 'PENDING', time: '12 min ago' },
  ];

  const popularItems = [
    { name: 'Classic Burger', sold: 12, revenue: 180.00 },
    { name: 'Margherita Pizza', sold: 8, revenue: 120.00 },
    { name: 'Caesar Salad', sold: 6, revenue: 78.00 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'PREPARING': return 'bg-blue-100 text-blue-800';
      case 'READY': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${todayStats.revenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.orders}</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${todayStats.averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+8% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.activeOrders}</div>
            <Link to="/dashboard/orders">
              <Button variant="link" className="p-0 text-xs">
                View all orders →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link to="/dashboard/orders">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Table {order.tableNumber}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.time}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium">${order.total.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Popular Items */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Popular Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {popularItems.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.sold} sold</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${item.revenue.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/dashboard/orders">
              <Button className="w-full" variant="outline">
                <Clipboard className="h-4 w-4 mr-2" />
                Manage Orders
              </Button>
            </Link>
            <Link to="/dashboard/menu">
              <Button className="w-full" variant="outline">
                <Utensils className="h-4 w-4 mr-2" />
                Update Menu
              </Button>
            </Link>
            <Link to="/dashboard/qr-codes">
              <Button className="w-full" variant="outline">
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Code
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
