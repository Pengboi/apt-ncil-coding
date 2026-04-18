import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, Type, Palette } from 'lucide-react';
import { getProductById, products } from '../../data/products';
import AddToCartButton from './AddToCartButton';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/shop"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Product Image</span>
          </div>

          {/* Product Details */}
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4 capitalize">
              {product.category}
            </span>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <p className="text-3xl font-bold text-blue-600 mb-6">
              ${product.price.toFixed(2)}
            </p>
            
            <p className="text-gray-600 mb-8">
              {product.description}
            </p>

            <AddToCartButton product={product} />
          </div>
        </div>

        {/* Product Information */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <Upload className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Custom Design Upload</h3>
            <p className="text-gray-600 text-sm">
              Upload your logo, artwork, or design. We support PNG, JPG, and SVG files up to 10MB.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <Type className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Text Personalization</h3>
            <p className="text-gray-600 text-sm">
              Add custom text, names, dates, or messages. Choose from various fonts and colors.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <Palette className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
            <p className="text-gray-600 text-sm">
              Premium materials and professional printing ensure your design looks great and lasts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
