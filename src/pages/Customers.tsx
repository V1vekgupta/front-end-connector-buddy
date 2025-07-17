import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, Search, MessageSquare, Phone, Mail } from 'lucide-react';

const Customers = () => {
  const [customers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+971 50 123 4567',
      totalOrders: 15,
      totalSpent: 450.75,
      lastOrder: '2024-01-15',
      rating: 4.8,
      status: 'VIP'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      phone: '+971 50 987 6543',
      totalOrders: 8,
      totalSpent: 220.50,
      lastOrder: '2024-01-14',
      rating: 4.5,
      status: 'Regular'
    },
    {
      id: 3,
      name: 'Ahmed Al-Rashid',
      email: 'ahmed@example.com',
      phone: '+971 50 555 1234',
      totalOrders: 23,
      totalSpent: 680.25,
      lastOrder: '2024-01-16',
      rating: 4.9,
      status: 'VIP'
    }
  ]);

  const [reviews] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      rating: 5,
      comment: 'Amazing food quality and fast service! The burger was perfectly cooked.',
      date: '2024-01-15',
      orderItems: ['Classic Burger', 'French Fries']
    },
    {
      id: 2,
      customerName: 'Sarah Smith',
      rating: 4,
      comment: 'Good food but delivery was a bit slow. Overall satisfied with the experience.',
      date: '2024-01-14',
      orderItems: ['Margherita Pizza', 'Caesar Salad']
    },
    {
      id: 3,
      customerName: 'Ahmed Al-Rashid',
      rating: 5,
      comment: 'Excellent service and delicious food. Will definitely order again!',
      date: '2024-01-16',
      orderItems: ['Classic Burger', 'Coca Cola']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('customers');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP': return 'bg-gold-100 text-gold-800';
      case 'Regular': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customers & Reviews</h1>
        <p className="text-gray-600 mt-1">Manage customer relationships and feedback</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <Button
          variant={activeTab === 'customers' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('customers')}
          className="flex-1"
        >
          Customers
        </Button>
        <Button
          variant={activeTab === 'reviews' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('reviews')}
          className="flex-1"
        >
          Reviews & Feedback
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={activeTab === 'customers' ? 'Search customers...' : 'Search reviews...'}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Tab */}
      {activeTab === 'customers' && (
        <div className="space-y-4">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{customer.name}</h3>
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                      <div className="flex items-center">
                        {renderStars(Math.floor(customer.rating))}
                        <span className="ml-1 text-sm text-gray-600">({customer.rating})</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {customer.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {customer.phone}
                      </div>
                      <div>
                        <span className="font-medium">{customer.totalOrders}</span> orders
                      </div>
                      <div>
                        Total spent: <span className="font-medium">AED {customer.totalSpent}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Last order: {customer.lastOrder}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{review.customerName}</h3>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  
                  <p className="text-gray-700">{review.comment}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Order items:</span>
                    {review.orderItems.map((item, index) => (
                      <Badge key={index} variant="outline">{item}</Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    <Button size="sm" variant="outline">
                      Mark as Resolved
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Customer Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{customers.length}</div>
              <div className="text-sm text-blue-800">Total Customers</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {customers.filter(c => c.status === 'VIP').length}
              </div>
              <div className="text-sm text-green-800">VIP Customers</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">4.7</div>
              <div className="text-sm text-yellow-800">Average Rating</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{reviews.length}</div>
              <div className="text-sm text-purple-800">Total Reviews</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;