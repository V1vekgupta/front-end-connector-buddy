import React, { useState } from 'react';
import { ArrowLeft, Mail, User, Building, Phone, Lock, Eye, EyeOff } from 'lucide-react';
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

interface LoginData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<AccessRequestData>({
    fullName: '',
    email: '',
    restaurantName: '',
    phoneNumber: '',
    businessType: 'restaurant',
    message: ''
  });
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (isLoginMode) {
      setLoginData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await authService.login(loginData);
      
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${response.user.name}!`,
      });
      
      // Store token and redirect to dashboard
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Reset form
      setLoginData({
        email: '',
        password: ''
      });
      
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isLoginMode ? 'Login to FoodScan' : 'Request Access'}
            </h1>
            <p className="text-gray-600">
              {isLoginMode 
                ? 'Enter your credentials to access your dashboard'
                : 'Fill out the form below to request access to FoodScan. You\'ll receive an email confirmation once approved.'
              }
            </p>
          </div>

          {isLoginMode ? (
            <form onSubmit={handleLogin} className="space-y-6">
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
                    value={loginData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password *
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          ) : (
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
          )}

          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            
            <div className="mt-6">
              {isLoginMode ? (
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    Don't have an account yet?
                  </p>
                  <button
                    onClick={() => setIsLoginMode(false)}
                    className="text-orange-600 hover:text-orange-700 font-medium text-sm underline"
                  >
                    Request Access Now
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    Already registered?
                  </p>
                  <button
                    onClick={() => setIsLoginMode(true)}
                    className="text-orange-600 hover:text-orange-700 font-medium text-sm underline"
                  >
                    Login Now
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              {isLoginMode 
                ? 'Secure login to access your restaurant dashboard'
                : 'Your request will be reviewed by our team. You\'ll receive confirmation at your email address.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
