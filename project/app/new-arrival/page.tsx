'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
  id: number;
  name: string;
  priceINR: number;
  image: string;
  category: string;
  description?: string;
}

const NewArrivalPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  const products: Product[] = [
    { 
      id: 1, 
      name: 'Cotton Punjabi', 
      priceINR: 2000, 
      image: 'new1.jpg', 
      category: 'Punjabi',
      description: 'Comfortable cotton punjabi for everyday wear'
    },
    { 
      id: 2, 
      name: 'CO-Ord', 
      priceINR: 3000, 
      image: 'new2.jpg', 
      category: 'Coord',
      description: 'Matching set for a coordinated look'
    },
    { 
      id: 3, 
      name: 'Saree', 
      priceINR: 1000, 
      image: 'new3.jpg', 
      category: 'Sarees',
      description: 'Traditional saree with modern design'
    },
    { 
      id: 4, 
      name: 'Saree', 
      priceINR: 1000, 
      image: 'new4.jpg', 
      category: 'Sarees',
      description: 'Elegant saree for special occasions'
    },
    { 
      id: 5, 
      name: 'Saree 3', 
      priceINR: 1000, 
      image: 'new5.jpg', 
      category: 'Sarees',
      description: 'Contemporary saree with unique patterns'
    },
    { 
      id: 6, 
      name: 'Saree 4', 
      priceINR: 1000, 
      image: 'new6.jpg', 
      category: 'Sarees',
      description: 'Classic saree with intricate embroidery'
    },
  ];

  const categories = ['all', ...Array.from(new Set(products.map(product => product.category)))];
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    // Simulate loading state for better UX
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <main className="min-h-screen p-6 md:p-12 lg:p-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">New Arrivals</h1>
          <p className="text-gray-600">Discover our latest collection of traditional and modern wear</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative h-64 w-full">
                  <Image
                    src={`/images/${product.image}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{product.category}</span>
                    <span className="text-lg font-semibold">₹{product.priceINR.toLocaleString('en-IN')}</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NewArrivalPage;