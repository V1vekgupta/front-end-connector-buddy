
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import OrderManagement from "./pages/OrderManagement";
import Kitchen from "./pages/Kitchen";
import Tables from "./pages/Tables";
import MenuManagement from "./pages/MenuManagement";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import DashboardLayout from "./components/DashboardLayout";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/menu/:restaurantId" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="kitchen" element={<Kitchen />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="tables" element={<Tables />} />
              <Route path="menu" element={<MenuManagement />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="customers" element={<Customers />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
