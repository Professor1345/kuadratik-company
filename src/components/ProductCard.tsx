"use client";
import Image from "next/image";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/types";
import { useAppDispatch } from "@/hooks/redux";
import { addToCart } from "@/store/slices/cartSlice";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [showActions, setShowActions] = useState(false);

  // Add to Cart with Toast Notification
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    dispatch(addToCart(product));

    // ✅ Show toast
    toast.success(`${product.title} added to cart!`, {
      icon: "🛒",
      style: {
        background: "#22A24F",
        color: "#fff",
        fontWeight: "500",
      },
    });
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center mb-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < Math.floor(rating)
              ? "text-[#22A24F] fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-xs text-gray-600 ml-1">
        ({product.rating.count})
      </span>
    </div>
  );

  const badges = ["SALE", "NEW OFFER", "BEST DEAL", "25% OFF", "", "HOT"];
  const randomBadge = badges[product.id % badges.length];
  const badgeColors = {
    SALE: "bg-[#2DB224]",
    "NEW OFFER": "bg-orange-600",
    "BEST DEAL": "bg-[#22A24F]",
    "": "bg-transparent",
    "25% OFF": "bg-[#EFD33D] text-black",
    HOT: "bg-[#EE5858]",
  };

  return (
    <div
      className="relative bg-white rounded-2xl border hover:border-[#27C840] border-[#E4E7E9] hover:shadow-lg transition-all duration-300 group overflow-hidden cursor-pointer"
      onClick={() => setShowActions((prev) => !prev)}
    >
      {/* Badge */}
      {randomBadge && (
        <div
          className={`absolute top-3 left-3 md:top-4 md:left-4 ${
            badgeColors[randomBadge as keyof typeof badgeColors]
          } text-white text-xs font-semibold px-2 py-1 rounded z-10`}
        >
          {randomBadge}
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-3 md:p-4 group-hover:scale-95 transition-transform duration-300"
        />

        {/* Dark Overlay */}
        <div
          className={`absolute inset-0 bg-black/20 m-3 md:m-4 rounded transition-opacity duration-300 ${
            showActions ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        ></div>

        {/* Action Buttons */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 z-10 ${
            showActions ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {/* Wishlist */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          >
            <Heart className="w-5 h-5 text-gray-700" />
          </button>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </button>

          {/* Navigate to Product Detail */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/product/${product.id}`;
            }}
            className="bg-[#22A24F] shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-700 transition"
          >
            <Eye className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {renderStars(product.rating.rate)}

        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-[#22A24F]">
          {product.title}
        </h3>

        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-[#22A24F]">
            ${product.price.toFixed(2)}
          </span>
          {randomBadge === "25% OFF" && (
            <span className="text-sm text-gray-500 line-through">
              ${(product.price * 1.25).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
