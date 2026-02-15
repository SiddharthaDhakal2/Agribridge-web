'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products as initialProducts } from '@/lib/mockData';
import type { Product } from '@/lib/mockData';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export default function AdminInventory() {
  const [products, setProducts] = useState(initialProducts);
  const [adjustQuantity, setAdjustQuantity] = useState<{ [key: string]: string }>({});

  const handleAdjust = (productId: string, adjustment: number) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        const newQuantity = Math.max(0, p.quantity + adjustment);
        let newAvailability: Product['availability'] = p.availability;
        
        if (newQuantity === 0) {
          newAvailability = 'out-of-stock';
        } else if (newQuantity < 50) {
          newAvailability = 'low-stock';
        } else {
          newAvailability = 'in-stock';
        }
        
        return { ...p, quantity: newQuantity, availability: newAvailability };
      }
      return p;
    }));
    setAdjustQuantity({ ...adjustQuantity, [productId]: '' });
  };

  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  const outOfStockCount = products.filter(p => p.availability === 'out-of-stock').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
        <p className="text-gray-600">Monitor and manage your product stock levels</p>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Stock Items</p>
            <p className="text-2xl font-bold text-gray-900">{totalStock}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Out of Stock</p>
            <p className="text-2xl font-bold text-gray-900">{outOfStockCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Stock Levels</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-visible">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Current Stock</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Quick Adjust</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.supplier}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 capitalize">
                      {product.category}
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-gray-900">
                        {product.quantity} {product.unit}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        product.availability === 'in-stock' ? 'bg-green-100 text-green-800' :
                        product.availability === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {product.availability.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Input
                          type="number"
                          placeholder="Qty"
                          className="w-20 h-8 text-sm"
                          value={adjustQuantity[product.id] || ''}
                          onChange={(e) => setAdjustQuantity({
                            ...adjustQuantity,
                            [product.id]: e.target.value
                          })}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const qty = parseInt(adjustQuantity[product.id] || '0');
                            if (qty) handleAdjust(product.id, qty);
                          }}
                          disabled={!adjustQuantity[product.id]}
                        >
                          Add
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const qty = parseInt(adjustQuantity[product.id] || '0');
                            if (qty) handleAdjust(product.id, -qty);
                          }}
                          disabled={!adjustQuantity[product.id]}
                        >
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
