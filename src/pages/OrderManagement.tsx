
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  User, 
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { orderService } from '../services/api';
import { useToast } from '@/hooks/use-toast';

const OrderManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Mock orders data - replace with actual API call
  const mockOrders = [
    {
      id: '1',
      tableNumber: '5',
      customerInfo: { name: 'John Doe', phone: '+1234567890' },
      items: [
        { menuItem: { name: 'Classic Burger' }, quantity: 2, price: 15.99 },
        { menuItem: { name: 'French Fries' }, quantity: 1, price: 4.99 }
      ],
      totalAmount: 36.97,
      status: 'PENDING',
      specialRequests: 'No onions please',
      createdAt: new Date(Date.now() - 300000).toISOString() // 5 minutes ago
    },
    {
      id: '2',
      tableNumber: '3',
      customerInfo: { name: 'Jane Smith', phone: '+1234567891' },
      items: [
        { menuItem: { name: 'Margherita Pizza' }, quantity: 1, price: 18.99 }
      ],
      totalAmount: 18.99,
      status: 'PREPARING',
      createdAt: new Date(Date.now() - 900000).toISOString() // 15 minutes ago
    },
    {
      id: '3',
      tableNumber: '7',
      customerInfo: { name: 'Bob Johnson', phone: '+1234567892' },
      items: [
        { menuItem: { name: 'Caesar Salad' }, quantity: 1, price: 12.99 },
        { menuItem: { name: 'Grilled Chicken' }, quantity: 1, price: 22.99 }
      ],
      totalAmount: 35.98,
      status: 'READY',
      createdAt: new Date(Date.now() - 1200000).toISOString() // 20 minutes ago
    }
  ];

  const updateOrderMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      orderService.updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({ title: "Order status updated successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to update order", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderMutation.mutate({ orderId, status: newStatus });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'PREPARING': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'READY': return 'bg-green-100 text-green-800 border-green-200';
      case 'DELIVERED': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const orderTime = new Date(timestamp);
    const diffMs = now.getTime() - orderTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ${diffMins % 60}m ago`;
  };

  const getStatusActions = (order: any) => {
    switch (order.status) {
      case 'PENDING':
        return (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={() => handleStatusChange(order.id, 'CONFIRMED')}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => handleStatusChange(order.id, 'CANCELLED')}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        );
      case 'CONFIRMED':
        return (
          <Button 
            size="sm" 
            onClick={() => handleStatusChange(order.id, 'PREPARING')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Start Preparing
          </Button>
        );
      case 'PREPARING':
        return (
          <Button 
            size="sm" 
            onClick={() => handleStatusChange(order.id, 'READY')}
            className="bg-green-600 hover:bg-green-700"
          >
            Mark as Ready
          </Button>
        );
      case 'READY':
        return (
          <Button 
            size="sm" 
            onClick={() => handleStatusChange(order.id, 'DELIVERED')}
            variant="outline"
          >
            Mark as Delivered
          </Button>
        );
      default:
        return null;
    }
  };

  const ordersByStatus = {
    PENDING: mockOrders.filter(o => o.status === 'PENDING'),
    PREPARING: mockOrders.filter(o => o.status === 'PREPARING'),
    READY: mockOrders.filter(o => o.status === 'READY'),
    DELIVERED: mockOrders.filter(o => o.status === 'DELIVERED')
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        <p className="text-gray-600 mt-1">Manage incoming orders in real-time</p>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(ordersByStatus).map(([status, orders]) => (
          <div key={status} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg capitalize">{status.toLowerCase()}</h2>
              <Badge variant="secondary">{orders.length}</Badge>
            </div>
            
            <div className="space-y-3">
              {orders.map((order) => (
                <Card key={order.id} className={`border-l-4 ${getStatusColor(order.status)}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Table {order.tableNumber}</CardTitle>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {getTimeAgo(order.createdAt)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-2" />
                      {order.customerInfo.name}
                    </div>
                    
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm flex justify-between">
                          <span>{item.quantity}x {item.menuItem.name}</span>
                          <span>${(item.quantity * item.price).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    {order.specialRequests && (
                      <div className="flex items-start text-sm text-amber-700 bg-amber-50 p-2 rounded">
                        <MessageSquare className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{order.specialRequests}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="font-medium">Total: ${order.totalAmount.toFixed(2)}</span>
                    </div>
                    
                    <div className="pt-2">
                      {getStatusActions(order)}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {orders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                  <p>No {status.toLowerCase()} orders</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
