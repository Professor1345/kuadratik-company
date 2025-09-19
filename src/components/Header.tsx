"use client";
import { useEffect, useState } from "react";
import type React from "react";

import Link from "next/link";
import {
  ShoppingCart,
  Search,
  Menu,
  MapPin,
  User,
  Heart,
  ChevronDown,
  Zap,
  Star,
  Percent,
  Gift,
  Store,
  Headphones,
  X,
  Megaphone,
} from "lucide-react";
import { useAppSelector } from "@/hooks/redux";
import Cart from "./Cart";
import Image from "next/image";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    if (isCartOpen || isMobileSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      // Clean up in case the component unmounts
      document.body.style.overflow = "";
    };
  }, [isCartOpen, isMobileSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsMobileSearchOpen(false);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        {/* Main Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center flex-shrink-0">
                <Image
                  src="/Logo.svg"
                  alt="Company Logo"
                  width={120}
                  height={40}
                  priority
                />
              </Link>

              {/* Location - Hidden on mobile */}
              <div className="hidden lg:flex items-center text-gray-600 ml-6">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">61 Hopper Street...</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>

              <div className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8 bg-[rgba(245,245,245,1)]">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex w-full border border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* Button first */}
                  <button
                    type="submit"
                    className="pl-3 flex items-center justify-center text-gray-400 hover:text-red-600"
                  >
                    <Search className="h-4 w-4" />
                  </button>

                  {/* Input after */}
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={handleSearchInput}
                    className="flex-1 px-3 py-2 focus:outline-none text-sm"
                  />
                </form>
              </div>

              {/* Right Side Icons */}
              <div className="flex items-center space-x-3 ">
                {/* Language Selector - Hidden on mobile */}
                <div className="hidden md:flex items-center text-gray-600 py-2 px-[10px] hover:text-gray-900 lg:bg-[rgba(245,245,245,1)] rounded-lg text-sm">
                  <span>EN</span>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </div>

                <button
                  onClick={() => setIsMobileSearchOpen(true)}
                  className="py-2 px-[10px] text-gray-600 hover:text-gray-900 lg:bg-[rgba(245,245,245,1)] rounded-lg md:hidden"
                >
                  <Search className="h-5 w-5 lg:h-4 lg:w-4" />
                </button>

                {/* User Icon */}
                <button className="py-2 px-[10px] text-gray-600 hover:text-gray-900 lg:bg-[rgba(245,245,245,1)] rounded-lg hidden sm:block">
                  <User className="h-5 w-5 lg:h-4 lg:w-4" />
                </button>

                {/* Wishlist Icon */}
                <button className="py-2 px-[10px] text-gray-600 hover:text-gray-900 lg:bg-[rgba(245,245,245,1)] rounded-lg hidden sm:block">
                  <Heart className="h-5 w-5 lg:h-4 lg:w-4" />
                </button>

                {/* Cart */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative py-2 px-[10px] text-gray-600 hover:text-gray-900 lg:bg-[rgba(245,245,245,1)] rounded-lg"
                >
                  <ShoppingCart className="h-5 w-5 lg:h-4 lg:w-4" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 h-12 overflow-x-auto">
              <button className="text-gray-700 hover:text-red-600 whitespace-nowrap flex items-center text-sm font-medium">
                <Menu className="h-4 w-4 mr-2" />
                All Categories
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>

              <Link
                href="/"
                className="text-gray-700 hover:text-red-600 whitespace-nowrap flex items-center text-sm"
              >
                <Zap className="h-4 w-4 mr-2" />
                Today&#39;s Deals
              </Link>

              <Link
                href="/"
                className="text-gray-700 hover:text-red-600 whitespace-nowrap flex items-center text-sm"
              >
                <Star className="h-4 w-4 mr-2" />
                New Arrivals
              </Link>

              <Link
                href="/"
                className="text-gray-700 hover:text-red-600 whitespace-nowrap flex items-center text-sm"
              >
                <Percent className="h-4 w-4 mr-2" />
                Clearance Deals
              </Link>

              <Link
                href="/"
                className="text-gray-700 hover:text-red-600 whitespace-nowrap flex items-center text-sm"
              >
                <Megaphone className="h-4 w-4 mr-2" />
                Promotions
              </Link>

              <Link
                href="/"
                className="text-gray-700 hover:text-red-600 whitespace-nowrap flex items-center text-sm"
              >
                <Gift className="h-4 w-4 mr-2" />
                Gift Cards
              </Link>

              <Link
                href="/"
                className="text-gray-700 hover:text-red-600 whitespace-nowrap flex items-center text-sm"
              >
                <Store className="h-4 w-4 mr-2" />
                Sell on BAZAR
              </Link>

              <Link
                href="/"
                className="text-gray-700 hover:text-red-600 whitespace-nowrap flex items-center text-sm"
              >
                <Headphones className="h-4 w-4 mr-2" />
                Customer Service
              </Link>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="lg:hidden py-4 border-t border-gray-100">
                <div className="space-y-3">
                  {/* Location for mobile */}
                  <div className="flex items-center text-gray-600 py-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">61 Hopper Street...</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>

                  <button className="text-gray-700 hover:text-red-600 flex items-center text-sm font-medium py-2">
                    <Menu className="h-4 w-4 mr-2" />
                    All Categories
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>

                  <Link
                    href="/"
                    className="text-gray-700 hover:text-red-600 flex items-center text-sm py-2"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Today&#39;s Deals
                  </Link>

                  <Link
                    href="/"
                    className="text-gray-700 hover:text-red-600 flex items-center text-sm py-2"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    New Arrivals
                  </Link>

                  <Link
                    href="/"
                    className="text-gray-700 hover:text-red-600 flex items-center text-sm py-2"
                  >
                    <Percent className="h-4 w-4 mr-2" />
                    Clearance Deals
                  </Link>

                  <Link
                    href="/"
                    className="text-gray-700 hover:text-red-600 flex items-center text-sm py-2"
                  >
                    <Megaphone className="h-4 w-4 mr-2" />
                    Promotions
                  </Link>

                  <Link
                    href="/"
                    className="text-gray-700 hover:text-red-600 flex items-center text-sm py-2"
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    Gift Cards
                  </Link>

                  <Link
                    href="/"
                    className="text-gray-700 hover:text-red-600 flex items-center text-sm py-2"
                  >
                    <Store className="h-4 w-4 mr-2" />
                    Sell on BAZAR
                  </Link>

                  <Link
                    href="/"
                    className="text-gray-700 hover:text-red-600 flex items-center text-sm py-2"
                  >
                    <Headphones className="h-4 w-4 mr-2" />
                    Customer Service
                  </Link>

                  {/* Mobile-only user actions */}
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-gray-900 text-sm">
                        <User className="h-4 w-4 mr-2" />
                        Account
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-gray-900 text-sm">
                        <Heart className="h-4 w-4 mr-2" />
                        Wishlist
                      </button>
                      <div className="flex items-center text-gray-600 text-sm">
                        <span>EN</span>
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>

      {isMobileSearchOpen && (
        <div
          onClick={() => setIsMobileSearchOpen(false)}
          className="fixed inset-0 pt-16 z-50 md:hidden"
        >
          <div className="bg-white p-2 m-2 rounded-lg shadow-lg">
            {/* <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Search Products</h3>
              <button onClick={() => setIsMobileSearchOpen(false)} className="p-1 text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div> */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleSearchInput}
                className="w-full px-2 py-[6px] pr-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-sm"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                <Search className="h-3 w-3" />
              </button>
            </form>
          </div>
        </div>
      )}

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;