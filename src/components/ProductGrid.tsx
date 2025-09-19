"use client";
import React, { useState, useMemo } from "react";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
} from "@/store/api/productsApi";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { FilterState } from "@/types";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ProductGridBanner from "./ProductGridBanner";

interface ProductGridProps {
  searchQuery?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery = "" }) => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const {
    data: productscat,
    isLoading: isLoadingCat,
    error: errorCat,
  } = useGetCategoriesQuery();
  const [sortBy, setSortBy] = useState("popular");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [],
    brands: [],
    tags: [],
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const removeFilter = (type: keyof FilterState, value: string) => {
    const newFilters = { ...filters };
    newFilters[type] = newFilters[type].filter((item) => item !== value);
    setFilters(newFilters);
    setCurrentPage(1); // reset to first page when filters change
  };

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(
        (product) =>
          filters.categories.includes(product.category) ||
          filters.categories.some((cat) =>
            product.category.toLowerCase().includes(cat.toLowerCase())
          )
      );
    }

    // Apply price range filter
    if (filters.priceRange.length > 0 && !filters.priceRange.includes("all")) {
      filtered = filtered.filter((product) => {
        return filters.priceRange.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return (
            product.price >= min &&
            (max === 10000 ? true : product.price <= max)
          );
        });
      });
    }

    // Apply tag filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter((product) =>
        filters.tags.some(
          (tag) =>
            product.title.toLowerCase().includes(tag.toLowerCase()) ||
            product.category.toLowerCase().includes(tag.toLowerCase())
        )
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        filtered.sort((a, b) => b.rating.count - a.rating.count);
    }

    return filtered;
  }, [products, searchQuery, filters, sortBy]);

  // === Pagination logic ===
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load products" />;
  if (products?.length === 0)
    return <ErrorMessage message="Product not found" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between w-full flex-1 mb-4 md:mb-6">
            <div className="w-full">
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2 md:mb-[16px]">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
              <div className="flex flex-wrap items-center justify-between w-full text-sm text-gray-600 bg-[#F9F9F9] py-[8px] md:py-[12px] px-[12px] md:px-[24px] shadow gap-2">
                <span className="whitespace-nowrap">Active Filters</span>
                {/* Filter Chips */}
                <div className="flex flex-wrap gap-2">
                  {filters.categories.map((cat) => (
                    <div
                      key={cat}
                      className="flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                    >
                      {cat}
                      <X
                        className="h-4 w-4 ml-2 cursor-pointer"
                        onClick={() => removeFilter("categories", cat)}
                      />
                    </div>
                  ))}
                  {filters.priceRange.map((range) => (
                    <div
                      key={range}
                      className="flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                    >
                      {range === "all"
                        ? "All Price"
                        : `$${range.replace("-", " - $")}`}
                      <X
                        className="h-4 w-4 ml-2 cursor-pointer"
                        onClick={() => removeFilter("priceRange", range)}
                      />
                    </div>
                  ))}
                  {filters.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                      <X
                        className="h-4 w-4 ml-2 cursor-pointer"
                        onClick={() => removeFilter("tags", tag)}
                      />
                    </div>
                  ))}
                </div>
                {searchQuery.length > 0 ||
                  (sortBy && filters && (
                    <span className="rounded text-xs ml-auto whitespace-nowrap">
                      {filteredAndSortedProducts.length} Results found.
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* No Results */}
          {filteredAndSortedProducts.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="text-red-600 text-xl mb-2">⚠️</div>
                <p className="text-gray-600">No results found</p>
              </div>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {currentProducts.map((product, index) => (
                  <React.Fragment key={product.id}>
                    <ProductCard product={product} />

                    {/* Inject Banner After Every 8 Products */}
                    {(index + 1) % 12 === 0 && (
                      <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                        <ProductGridBanner />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Dynamic page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-full text-sm transition-colors border border-[#E4E7E9] ${
                        page === currentPage
                          ? "bg-green-600 text-white"
                          : "bg-white hover:bg-gray-200"
                      }`}
                    >
                      {"0" + page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full border border-[#E4E7E9] bg-white hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
