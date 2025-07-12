
import React, { useState } from 'react';
import { ArrowLeft, Mail, User, Building, Lock, Eye, EyeOff, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { authService } from '../services/api';

const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    restaurantName: '',
    location: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await authService.login(loginData);
      toast({ title: "Login Successful!", description: `Welcome back, ${response.user.name}!` });
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error: any) {
      toast({ title: "Login Failed", description: error.message || "Invalid credentials.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpData.password.length < 8) {
      toast({ title: "Error", description: "Password must be at least 8 characters long.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await authService.signUp(signUpData);
      toast({ title: "Sign Up Successful!", description: "You can now log in with your new account." });
      setIsLoginView(true); // Switch to login view after successful sign up
    } catch (error: any) {
      toast({ title: "Sign Up Failed", description: error.message || "Could not create account.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isLoginView ? 'Welcome Back!' : 'Create Your Account'}
            </h1>
            <p className="text-gray-600">
              {isLoginView ? 'Log in to access your restaurant dashboard.' : 'Sign up to get started with FoodScan.'}
            </p>
          </div>

          {isLoginView ? (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input id="email" name="email" type="email" required value={loginData.email} onChange={handleLoginChange} className="pl-10" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} required value={loginData.password} onChange={handleLoginChange} className="pl-10 pr-10" placeholder="Enter your password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3">
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input id="name" name="name" type="text" required value={signUpData.name} onChange={handleSignUpChange} className="pl-10" placeholder="John Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input id="email" name="email" type="email" required value={signUpData.email} onChange={handleSignUpChange} className="pl-10" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} required value={signUpData.password} onChange={handleSignUpChange} className="pl-10 pr-10" placeholder="Min. 8 characters" minLength={8}/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="restaurantName">Restaurant Name</Label>
                <div className="relative mt-1">
                  <Building className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input id="restaurantName" name="restaurantName" type="text" required value={signUpData.restaurantName} onChange={handleSignUpChange} className="pl-10" placeholder="e.g., The Code Cafe" />
                </div>
              </div>
               <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input id="location" name="location" type="text" required value={signUpData.location} onChange={handleSignUpChange} className="pl-10" placeholder="e.g., Lucknow, India" />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3">
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button onClick={() => setIsLoginView(!isLoginView)} className="text-sm text-orange-600 hover:underline">
              {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
