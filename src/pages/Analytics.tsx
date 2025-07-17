import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users } from 'lucide-react';

const Analytics = () => {
  // Mock analytics data
  const salesData = {
    thisWeek: 1250.50,
    lastWeek: 1100.30,
    thisMonth: 5420.75,
    lastMonth: 4890.20
  };

  const topSellingItems = [
    { name: 'Classic Burger', sold: 45, revenue: 674.55, change: '+12%' },
    { name: 'Margherita Pizza', sold: 32, revenue: 415.68, change: '+8%' },
    { name: 'French Fries', sold: 67, revenue: 334.33, change: '+15%' },
    { name: 'Caesar Salad', sold: 23, revenue: 206.77, change: '-3%' },
    { name: 'Coca Cola', sold: 89, revenue: 266.11, change: '+22%' }
  ];

  const customerData = {
    totalCustomers: 234,
    newCustomers: 45,
    returningCustomers: 189,
    avgOrderValue: 23.45
  };

  const weeklyStats = [
    { day: 'Mon', orders: 12, revenue: 280.50 },
    { day: 'Tue', orders: 18, revenue: 420.75 },
    { day: 'Wed', orders: 15, revenue: 350.25 },
    { day: 'Thu', orders: 22, revenue: 510.80 },
    { day: 'Fri', orders: 28, revenue: 650.90 },
    { day: 'Sat', orders: 35, revenue: 820.45 },
    { day: 'Sun', orders: 25, revenue: 580.30 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Insights and performance metrics</p>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED {salesData.thisWeek}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +13.6% from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED {salesData.thisMonth}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +10.8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerData.totalCustomers}</div>
            <div className="flex items-center text-xs text-blue-600">
              <span>{customerData.newCustomers} new this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED {customerData.avgOrderValue}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.2% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Items */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topSellingItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                  <div className="font-medium">AED {item.revenue}</div>
                  <Badge className={item.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {item.change}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyStats.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 text-center font-medium">{day.day}</div>
                  <div>
                    <div className="font-medium">{day.orders} orders</div>
                    <div className="text-sm text-gray-600">AED {day.revenue}</div>
                  </div>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: `${(day.revenue / 820.45) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Customer Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{customerData.newCustomers}</div>
              <div className="text-sm text-blue-800">New Customers</div>
              <div className="text-xs text-blue-600 mt-1">This month</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{customerData.returningCustomers}</div>
              <div className="text-sm text-green-800">Returning Customers</div>
              <div className="text-xs text-green-600 mt-1">80.8% retention rate</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">4.7</div>
              <div className="text-sm text-purple-800">Average Rating</div>
              <div className="text-xs text-purple-600 mt-1">Based on 156 reviews</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;