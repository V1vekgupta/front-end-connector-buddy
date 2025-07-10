
import React, { useState } from 'react';
import { ArrowLeft, Mail, User, Building, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { authService } from '../services/api';

interface AccessRequestData {
  fullName: string;
  email: string;
  restaurantName: string;
  phoneNumber: string;
  businessType: string;
  message: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<AccessRequestData>({
    fullName: '',
    email: '',
    restaurantName: '',
    phoneNumber: '',
    businessType: 'restaurant',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await authService.requestAccess(formData);
      
      toast({
        title: "Access Request Sent!",
        description: "Your request has been sent to the administrator. You'll receive an email once your access is approved.",
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        restaurantName: '',
        phoneNumber: '',
        businessType: 'restaurant',
        message: ''
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send access request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Request Access</h1>
            <p className="text-gray-600">
              Fill out the form below to request access to FoodScan. 
              You'll receive an email confirmation once approved.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name *
              </Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address *
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="restaurantName" className="text-sm font-medium text-gray-700">
                Restaurant/Business Name *
              </Label>
              <div className="relative mt-1">
                <Building className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="restaurantName"
                  name="restaurantName"
                  type="text"
                  required
                  value={formData.restaurantName}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Enter your business name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                Phone Number *
              </Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="businessType" className="text-sm font-medium text-gray-700">
                Business Type
              </Label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="restaurant">Restaurant</option>
                <option value="cafe">Cafe</option>
                <option value="fast-food">Fast Food</option>
                <option value="bar">Bar/Pub</option>
                <option value="food-truck">Food Truck</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                Additional Message (Optional)
              </Label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Tell us more about your business..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
            >
              {isSubmitting ? 'Sending Request...' : 'Request Access'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Your request will be reviewed by our team.
              <br />
              You'll receive confirmation at your email address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
