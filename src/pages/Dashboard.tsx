import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  ShoppingCart, 
  Users,
  UtensilsCrossed,
  ClipboardList,
  QrCode,
  MenuSquare
} from 'lucide-react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning!' : currentHour < 17 ? 'Good Afternoon!' : 'Good Evening!';

  // Mock data - will be replaced when backend is ready
  const stats = {
    totalSales: 62.96,
    totalOrders: 1,
    totalCustomers: 0,
    totalMenuItems: 0
  };

  const featuredItems = [
    { name: 'Potato Pancakes', image: '/lovable-uploads/092bbb4a-c2cc-4829-a89d-a01b1ef038c8.png' },
    { name: 'Plant Based Bacon', image: '/lovable-uploads/092bbb4a-c2cc-4829-a89d-a01b1ef038c8.png' },
    { name: 'Iced Coffee', image: '/lovable-uploads/092bbb4a-c2cc-4829-a89d-a01b1ef038c8.png' },
    { name: 'Plant Based Whopper', image: '/lovable-uploads/092bbb4a-c2cc-4829-a89d-a01b1ef038c8.png' }
  ];

  const popularItems = [
    { name: 'Mojito', category: 'Beverages', price: 'AED2.00' },
    { name: 'Baked Potato', category: 'Side Orders', price: 'AED1.50' },
    { name: 'Homemade Mashed Potato', category: 'Side Orders', price: 'AED1.50' },
    { name: 'Vegan Hum-Burger With Che...', category: 'Vegetarian & Plant Based Burgers', price: 'AED2.50' },
    { name: 'French Fries', category: 'Side Orders', price: 'AED1.00' },
    { name: 'Cappuccino', category: 'Beverages', price: 'AED1.50' }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">{greeting}</h1>
        <p className="text-blue-100">{user.name || 'John Doe'}</p>
      </div>

      {/* Overview - Colorful Metric Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <div className="text-sm text-gray-500">07/01/2025 - 07/31/2025</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Sales - Pink */}
          <Card className="bg-gradient-to-br from-pink-400 to-pink-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Total Sales</p>
                  <p className="text-2xl font-bold">AED{stats.totalSales}</p>
                </div>
                <DollarSign className="h-8 w-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>

          {/* Total Orders - Blue */}
          <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          {/* Total Customers - Blue */}
          <Card className="bg-gradient-to-br from-indigo-400 to-indigo-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Total Customers</p>
                  <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                </div>
                <Users className="h-8 w-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          {/* Total Menu Items - Purple */}
          <Card className="bg-gradient-to-br from-purple-400 to-purple-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Menu Items</p>
                  <p className="text-2xl font-bold">{stats.totalMenuItems}</p>
                </div>
                <UtensilsCrossed className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured Items */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {featuredItems.map((item, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No Image Found!</span>
                  </div>
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Most Popular Items */}
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {popularItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg"></div>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>
                <p className="font-semibold text-sm">{item.price}</p>
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
            <Button className="w-full h-16 flex flex-col items-center justify-center space-y-2" variant="outline">
              <ClipboardList className="h-6 w-6" />
              <span>Manage Orders</span>
            </Button>
            <Button className="w-full h-16 flex flex-col items-center justify-center space-y-2" variant="outline">
              <MenuSquare className="h-6 w-6" />
              <span>Update Menu</span>
            </Button>
            <Button className="w-full h-16 flex flex-col items-center justify-center space-y-2" variant="outline">
              <QrCode className="h-6 w-6" />
              <span>Generate QR Code</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;