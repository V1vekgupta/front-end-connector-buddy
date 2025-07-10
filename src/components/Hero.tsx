
import React from 'react';
import { QrCode, Smartphone, ShoppingBag, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                QR Code Menu Maker
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                This feature allows restaurants to create digital menus in the form of QR codes.
              </p>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>Restaurants can input menu items, descriptions, prices, and easily images into a system.</p>
              <p>The system generates a QR code for each table or the entire restaurant.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Get Started Today
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-gray-600" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Scan & Order</h3>
                <p className="text-gray-600">Customer scans QR code to access digital menu</p>
              </div>
            </div>
            
            {/* Floating dashboard preview */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
              <div className="w-48 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-sm text-gray-600">Dashboard Preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
