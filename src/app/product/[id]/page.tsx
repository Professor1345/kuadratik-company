'use client';

import { use } from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { useGetProductByIdQuery } from '@/store/api/productsApi';
import { useAppDispatch } from '@/hooks/redux';
import { addToCart } from '@/store/slices/cartSlice';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import Header from '@/components/Header';
import toast from 'react-hot-toast';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const { data: product, isLoading, error } = useGetProductByIdQuery(parseInt(id));
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success(`${product.title} added to cart!`, {
         icon: "🛒",
        position: 'top-right',
        style: {
          background: "#22A24F",
        color: "#fff",
        fontWeight: "500",
        },
      });
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < Math.floor(rating) ? 'text-[#22A24F] fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-gray-600">
          ({product?.rating.count} reviews)
        </span>
      </div>
    );
  };

  if (isLoading)
    return (
      <>
        <Header onSearch={() => {}} />
        <LoadingSpinner />
      </>
    );

  if (error)
    return (
      <>
        <Header onSearch={() => {}} />
        <ErrorMessage message="Failed to load product" />
      </>
    );

  if (!product)
    return (
      <>
        <Header onSearch={() => {}} />
        <ErrorMessage message="Product not found" />
      </>
    );

  return (
    <div>
      <Header onSearch={() => {}} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="relative">
            <div className="aspect-square bg-white rounded-lg border border-[#E4E7E9] p-8">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                {renderStars(product.rating.rate)}
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-[#22A24F]">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  Save 20%
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="border-t pt-6">
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              {/* Extra Details */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Truck className="h-5 w-5" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <RotateCcw className="h-5 w-5" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Shield className="h-5 w-5" />
                  <span>2-year warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
