import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ChevronLeft } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  priceINR: number;
  image: string;
  category: string;
  description: string;
  additionalImages: string[];
}

interface Props {
  params: { id: string };
}

const ProductDetailPage = async ({ params }: Props) => {
  const { id } = params;
  const productId = parseInt(id);

  const product: Product | undefined = await getProductDetails(productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">This product is no longer available.</p>
          <Link 
            href="/new-arrival"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Return to New Arrivals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="/new-arrival"
          className="inline-flex items-center text-pink-600 hover:text-blue-800 mb-8"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to New Arrivals
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Image and Additional Images */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={`/images/${product.image}`}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {product.additionalImages.map((image, index) => (
                <div key={index} className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={`/images/${image}`}
                    alt={`${product.name} - Detail ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 33vw, 16vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <span className="text-pink-600 font-medium">{product.category}</span>
              <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
            </div>

            <div className="border-t border-b py-4">
              <div className="text-3xl font-bold text-pink-600">
                ₹{product.priceINR.toLocaleString('en-IN')}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Inclusive of all taxes
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 pt-6">
              <button 
                className="w-full flex items-center justify-center gap-2 bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-white-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              
              <button 
                className="w-full border-2 border-pink-600 text-pink-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Buy Now
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <h3 className="font-semibold mb-2">Free Delivery</h3>
              <p className="text-sm text-gray-600">
                Free standard shipping on orders over ₹999
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const getProductDetails = async (id: number): Promise<Product | undefined> => {
  const products: Product[] = [
    {
      id: 1,
      name: 'Punjabi',
      priceINR: 2000,
      image: 'new1.jpg',
      category: 'Punjabi',
      description: 'Premium quality cotton punjabi with perfect fitting and comfortable fabric. Ideal for both casual and formal occasions. Features traditional design with modern touches.',
      additionalImages: ['punjabi.jpg', 'punjabi1.jpg', 'punjabi2.jpg'],
    },
    {
      id: 2,
      name: 'CO-Ord Set',
      priceINR: 3000,
      image: 'new2.jpg',
      category: 'Coord',
      description: 'Stylish and trendy co-ord set that combines comfort with fashion. Perfect for a contemporary look. Made with high-quality fabric for lasting comfort.',
      additionalImages: ['product2_detail1.jpg', 'product2_detail2.jpg'],
    },
    {
      id: 3,
      name: 'Designer Saree',
      priceINR: 1500,
      image: 'new3.jpg',
      category: 'Sarees',
      description: 'Elegantly crafted designer saree with intricate embroidery work. Comes with matching blouse piece. Perfect for special occasions.',
      additionalImages: ['product3_detail1.jpg', 'product3_detail2.jpg'],
    },
  ];

  await new Promise(resolve => setTimeout(resolve, 50));
  return products.find((product) => product.id === id);
};

export async function generateStaticParams() {
  const products: Product[] = [
    {
      id: 1,
      name: 'Punjabi',
      priceINR: 2000,
      image: 'new1.jpg',
      category: 'Punjabi',
      description: 'A great comfort for your needs.',
      additionalImages: ['punjabi.jpg', 'punjabi1.jpg', 'punjabi2.jpg'],
    },
    {
      id: 2,
      name: 'CO-Ord Set',
      priceINR: 3000,
      image: 'new2.jpg',
      category: 'Coord',
      description: 'Stylish and comfortable clothing set.',
      additionalImages: ['product2_detail1.jpg', 'product2_detail2.jpg'],
    },
    {
      id: 3,
      name: 'Designer Saree',
      priceINR: 1500,
      image: 'new3.jpg',
      category: 'Sarees',
      description: 'Elegant designer saree with intricate details.',
      additionalImages: ['product3_detail1.jpg', 'product3_detail2.jpg'],
    },
  ];

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default ProductDetailPage;