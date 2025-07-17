import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { QrCode, Plus, Edit, Trash2 } from 'lucide-react';

const Tables = () => {
  const [tables, setTables] = useState([
    { id: 1, number: '1', seats: 4, status: 'available', qrCode: 'QR-001' },
    { id: 2, number: '2', seats: 2, status: 'occupied', qrCode: 'QR-002' },
    { id: 3, number: '3', seats: 6, status: 'available', qrCode: 'QR-003' },
    { id: 4, number: '4', seats: 4, status: 'reserved', qrCode: 'QR-004' },
    { id: 5, number: '5', seats: 8, status: 'occupied', qrCode: 'QR-005' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTable, setNewTable] = useState({ number: '', seats: '' });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddTable = () => {
    if (newTable.number && newTable.seats) {
      const table = {
        id: tables.length + 1,
        number: newTable.number,
        seats: parseInt(newTable.seats),
        status: 'available',
        qrCode: `QR-${String(tables.length + 1).padStart(3, '0')}`
      };
      setTables([...tables, table]);
      setNewTable({ number: '', seats: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteTable = (id: number) => {
    setTables(tables.filter(table => table.id !== id));
  };

  const toggleTableStatus = (id: number) => {
    setTables(tables.map(table => 
      table.id === id 
        ? { ...table, status: table.status === 'available' ? 'occupied' : 'available' }
        : table
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tables Management</h1>
          <p className="text-gray-600 mt-1">Manage restaurant tables and QR codes</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Table
        </Button>
      </div>

      {/* Add Table Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Table</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Table Number</label>
                <Input
                  placeholder="e.g., 1, A1, Patio-1"
                  value={newTable.number}
                  onChange={(e) => setNewTable({...newTable, number: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Number of Seats</label>
                <Input
                  type="number"
                  placeholder="4"
                  value={newTable.seats}
                  onChange={(e) => setNewTable({...newTable, seats: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddTable}>Add Table</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tables.map((table) => (
          <Card key={table.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Table {table.number}</CardTitle>
                <Badge className={getStatusColor(table.status)}>
                  {table.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{table.seats} seats</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <QrCode className="h-4 w-4" />
                QR Code: {table.qrCode}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => toggleTableStatus(table.id)}
                  className="flex-1"
                >
                  {table.status === 'available' ? 'Mark Occupied' : 'Mark Available'}
                </Button>
                <Button size="sm" variant="outline">
                  <QrCode className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDeleteTable(table.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* QR Code Generation Section */}
      <Card>
        <CardHeader>
          <CardTitle>QR Code Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full h-16 flex flex-col items-center justify-center space-y-2" variant="outline">
              <QrCode className="h-6 w-6" />
              <span>Generate All QR Codes</span>
            </Button>
            <Button className="w-full h-16 flex flex-col items-center justify-center space-y-2" variant="outline">
              <QrCode className="h-6 w-6" />
              <span>Print QR Codes</span>
            </Button>
            <Button className="w-full h-16 flex flex-col items-center justify-center space-y-2" variant="outline">
              <QrCode className="h-6 w-6" />
              <span>Download QR Codes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tables;