import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle } from 'lucide-react';

const Kitchen = () => {
  // Mock active orders for kitchen
  const activeOrders = [
    {
      id: 'ORD-001',
      tableNumber: '5',
      items: [
        { name: 'Classic Burger', quantity: 2, notes: 'No onions' },
        { name: 'French Fries', quantity: 2, notes: '' },
        { name: 'Coca Cola', quantity: 2, notes: 'Extra ice' }
      ],
      orderTime: '10:30 AM',
      status: 'PREPARING',
      estimatedTime: '15 min'
    },
    {
      id: 'ORD-002',
      tableNumber: '3',
      items: [
        { name: 'Margherita Pizza', quantity: 1, notes: 'Extra cheese' },
        { name: 'Caesar Salad', quantity: 1, notes: 'Dressing on side' }
      ],
      orderTime: '10:25 AM',
      status: 'PENDING',
      estimatedTime: '20 min'
    }
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kitchen Dashboard</h1>
        <p className="text-gray-600 mt-1">Active orders and preparation status</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Orders */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-yellow-600">Pending Orders</h2>
          {activeOrders.filter(order => order.status === 'PENDING').map((order) => (
            <Card key={order.id} className="border-yellow-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Table {order.tableNumber}</CardTitle>
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {order.orderTime} • Est. {order.estimatedTime}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.quantity}x {item.name}</span>
                    </div>
                    {item.notes && (
                      <p className="text-sm text-gray-600 mt-1">Note: {item.notes}</p>
                    )}
                  </div>
                ))}
                <Button className="w-full" size="sm">
                  Start Preparing
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Preparing Orders */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-600">Preparing</h2>
          {activeOrders.filter(order => order.status === 'PREPARING').map((order) => (
            <Card key={order.id} className="border-blue-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Table {order.tableNumber}</CardTitle>
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {order.orderTime} • Est. {order.estimatedTime}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.quantity}x {item.name}</span>
                    </div>
                    {item.notes && (
                      <p className="text-sm text-gray-600 mt-1">Note: {item.notes}</p>
                    )}
                  </div>
                ))}
                <Button className="w-full" variant="outline" size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Ready
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ready Orders */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-green-600">Ready for Pickup</h2>
          <div className="text-gray-500 text-center py-8">
            No orders ready yet
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kitchen;