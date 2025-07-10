
import React from 'react';
import { ShoppingCart, Menu as MenuIcon, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">FoodScan</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
          <Link to="/features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</Link>
          <Link to="/support" className="text-gray-700 hover:text-blue-600 transition-colors">Support</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link 
            to="/login" 
            className="hidden md:flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </Link>
          
          <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2 text-gray-700">
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
