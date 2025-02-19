'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingBag, Heart, Search } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { convertToINR } from "@/lib/currencyConverter";
import Link from "next/link";
//import { Image } from 'lucide-react';

const featuredProducts = [
  {
    id: 1,
    name: 'Katan silk sarees ',
    price: 200,
    image: '/images/katan1.jpg',
    category: 'Sarees'
  },
  {
    id: 2,
    name: 'Bagru Block Printed Shirt',
    price: 249.99,
    image: '/images/jama.jpg',
    category: 'Printed Shirt'
  },
  {
    id: 3,
    name: 'Laptop Bags',
    price: 179.99,
    image: '/images/laptop bag.jpg',
    category: 'Bags'
  },
  {
    id: 4,
    name: 'Pure Cotton Ikkat Blouse',
    price: 89.99,
    image: '/images/blouse.jpg',
    category: 'Tops'
  },
  {
    id: 5,
    name: 'Pure Cotton Punjabi',
    price: 50.99,
    image: '/images/punjabi2.jpg',
    category: 'Punjabi'
  },
];


interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const featuredProductsRef = useRef<HTMLElement>(null);

  const addToCart = (product: typeof featuredProducts[0]) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      // Proceed with checkout
      console.log('Proceeding to checkout...');
    }
  };

  const scrollToFeaturedProducts = () => {
    featuredProductsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header style={{ color: 'pink' }} className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold">MONSIJ</h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-foreground/80 hover:text-foreground">New Arrivals</a>
              <a href="/collection"className="text-foreground/80 hover:text-foreground">Collections</a>
              <a href="#" className="text-foreground/80 hover:text-foreground">Sale</a>
              <a href="#" className="text-foreground/80 hover:text-foreground">About</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(!isCartOpen)} className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
              {!isLoggedIn && (
                <Button variant="outline" size="sm" onClick={() => router.push('/login')}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(false)}>
                Close
              </Button>
            </div>
            {cart.length === 0 ? (
              <p className="text-muted-foreground">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <Button className="w-full" onClick={handleCheckout}>
                    {isLoggedIn ? 'Checkout' : 'Sign in to Checkout'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[90vh] mt-16">
        <Image
          src="/images/banner.png"
          alt="Hero Image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">Summer Collection</h2>
            <p className="text-xl mb-8">Discover the latest trends in fashion</p>
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90"
              onClick={scrollToFeaturedProducts}
            >
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 container mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-8">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: "Punjabi", image: "/images/punjabi.jpg" },
          { name: "Co-ord Set", image: "/images/coord.jpg" },
          { name: "Sarees", image: "/images/sarees2.jpg" },
          { name: "Laptop Bags", image: "/images/bag2.jpg" }
        ].map((category) => (
          <div key={category.name} className="relative h-48 group cursor-pointer rounded-lg overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <p className="text-white font-bold text-lg">{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

      {/* Featured Products */}
      <section ref={featuredProductsRef} className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-8">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer">
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                  <h4 className="font-semibold mb-2">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">${product.price}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-muted-foreground mb-6">
            Stay updated with our latest collections and exclusive offers.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-6">MONSIJ</h4>
              <p className="text-muted-foreground">
                Discover the latest in luxury fashion and accessories.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="https://wa.me/919874534853?text=Hello!%20I'm%20interested%20in%20your%20services." className="text-muted-foreground hover:text-foreground">Contact</a></li>
                <li><a href="https://www.notion.so/FAQ-19ff59b00ca18041872cc0752a5944b5?pvs=4" className="text-muted-foreground hover:text-foreground">FAQs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Shipping</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Categories</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">New Arrivals</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Best Sellers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Sale</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Collections</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/monsijboutique" className="text-muted-foreground hover:text-foreground">Facebook</a>
                <a href="https://www.instagram.com/monsijboutique?igsh=MW1nZGhhZ2Vob2loMQ== " className="text-muted-foreground hover:text-foreground">Instagram</a>
                <a href="https://wa.me/919874534853" className="text-muted-foreground hover:text-foreground">Whatsapp</a>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; Monsij All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}