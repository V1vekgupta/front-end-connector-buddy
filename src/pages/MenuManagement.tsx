import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Classic Burger', category: 'Burgers', price: 15.99, available: true, description: 'Juicy beef patty with lettuce, tomato, onion' },
    { id: 2, name: 'Margherita Pizza', category: 'Pizza', price: 12.99, available: true, description: 'Fresh mozzarella, tomato sauce, basil' },
    { id: 3, name: 'Caesar Salad', category: 'Salads', price: 8.99, available: false, description: 'Romaine lettuce, croutons, parmesan, caesar dressing' },
    { id: 4, name: 'French Fries', category: 'Sides', price: 4.99, available: true, description: 'Crispy golden fries' },
    { id: 5, name: 'Coca Cola', category: 'Beverages', price: 2.99, available: true, description: 'Classic Coca Cola' },
  ]);

  const [categories] = useState(['Burgers', 'Pizza', 'Salads', 'Sides', 'Beverages', 'Desserts']);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.price) {
      const item = {
        id: menuItems.length + 1,
        name: newItem.name,
        category: newItem.category,
        price: parseFloat(newItem.price),
        available: true,
        description: newItem.description
      };
      setMenuItems([...menuItems, item]);
      setNewItem({ name: '', category: '', price: '', description: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const toggleAvailability = (id: number) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600 mt-1">Manage your restaurant menu items</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Menu Item
        </Button>
      </div>

      {/* Add Item Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Menu Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Item Name</label>
                <Input
                  placeholder="e.g., Classic Burger"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Price (AED)</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="15.99"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="Describe the menu item..."
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddItem}>Add Item</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search menu items..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <select
                className="p-2 border rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <Badge variant="outline">{item.category}</Badge>
                    <Badge className={item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {item.available ? 'Available' : 'Out of Stock'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <p className="text-xl font-bold text-orange-600 mt-2">AED {item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Available</span>
                    <Switch
                      checked={item.available}
                      onCheckedChange={() => toggleAvailability(item.id)}
                    />
                  </div>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No menu items found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MenuManagement;