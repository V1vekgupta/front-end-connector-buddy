import React from 'react';
import { QrCode, Smartphone, ShoppingBag, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'Scan QR Code',
    description: 'Customer scans the QR code at their table using their smartphone.',
    icon: QrCode,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    number: '02',
    title: 'Browse Menu',
    description: 'The digital menu instantly appears - explore all available items with prices.',
    icon: Smartphone,
    color: 'bg-green-100 text-green-600'
  },
  {
    number: '03',
    title: 'Select Items',
    description: 'Browse categories and select your desired menu items and quantities.',
    icon: ShoppingBag,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    number: '04',
    title: 'Place Order',
    description: 'Place your order - your selections are sent directly to the restaurant.',
    icon: Clock,
    color: 'bg-orange-100 text-orange-600'
  }
];

const HowItWorks = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Simple Steps - Visual Guide to Seamless Smart Ordering Experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Restaurant?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of restaurants already using Smart Order to enhance their customer experience 
            and streamline operations.
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
