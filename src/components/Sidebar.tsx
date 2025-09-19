"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronDown, ChevronRight, ShoppingCart } from "lucide-react";
import { FilterState } from "@/types";
import Image from "next/image";
import AppleWatchLogo from "../../public/apple-watch.png";
import AppleWatchSeris7Logo from "../../public/apple-watch-series7-logo.png";

interface SidebarProps {
  onFilterChange: (filters: FilterState) => void;
  filters: FilterState;
}

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange, filters }) => {
  const [openSections, setOpenSections] = useState<string[]>([
    "category",
    "price",
    "brands",
    "tags",
  ]);

  const [priceRangeValue, setPriceRangeValue] = useState<[number, number]>([
    0, 10000,
  ]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false); // ✅ Track first user interaction

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleSingleSelect = (type: keyof FilterState, value: string) => {
    const newFilters = { ...filters };
    newFilters[type] = newFilters[type][0] === value ? [] : [value];
    onFilterChange(newFilters);
  };

  const handleBrandToggle = (brand: string, checked: boolean) => {
    const newFilters = { ...filters };
    newFilters.brands = checked
      ? [...newFilters.brands, brand]
      : newFilters.brands.filter((item) => item !== brand);

    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRangeValue([min, max]);
    hasInteracted.current = true; // ✅ Mark that user changed slider
  };

  /** ✅ Drag logic for price range slider */
  const handleSliderDrag = (index: number, e: MouseEvent) => {
    if (!sliderRef.current) return;

    hasInteracted.current = true; // ✅ Mark interaction when dragging

    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const newX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const newValue = Math.round((newX / rect.width) * 10000);

    setPriceRangeValue((prev) => {
      const updated = [...prev] as [number, number];
      updated[index] = newValue;

      // Ensure min is always <= max
      if (updated[0] > updated[1]) {
        if (index === 0) updated[1] = updated[0];
        else updated[0] = updated[1];
      }

      return updated;
    });
  };

  /** Sync slider values with filters ONLY after first interaction */
  useEffect(() => {
    if (!hasInteracted.current) return; // ⛔ Prevent initial auto-trigger

    const newFilters = { ...filters };
    newFilters.priceRange = [`${priceRangeValue[0]}-${priceRangeValue[1]}`];
    onFilterChange(newFilters);
  }, [priceRangeValue]);

  const categoryItems = [
    { name: "Electronics" },
    { name: "Jewelery" },
    { name: "Men's Clothing" },
    { name: "Women's Clothing" },
    { name: "Computer & Laptop" },
    { name: "Computer Accessories" },
    { name: "SmartPhone" },
    { name: "HeadPhone" },
    { name: "Mobile Accessories" },
    { name: "Gaming Console" },
    { name: "Camera & Photo" },
    { name: "TV & Home Appliances" },
    { name: "Watches & Accessories" },
    { name: "GPS & Navigation" },
    { name: "Wearable Technology" },
  ];

  const priceRanges = [
    { label: "All Price", value: "all" },
    { label: "Under $20", value: "0-20" },
    { label: "$25 to $100", value: "25-100" },
    { label: "$100 to $300", value: "100-300" },
    { label: "$300 to $500", value: "300-500" },
    { label: "$500 to $1,000", value: "500-1000" },
    { label: "$1000 to $10,000", value: "1000-10000" },
  ];

  const brands = [
    "Apple",
    "Google",
    "Microsoft",
    "Samsung",
    "Dell",
    "HP",
    "Symphony",
    "Xiaomi",
    "Sony",
    "PanaSonic",
    "LG",
    "Intel",
    "OnePlus",
  ];

  const popularTags = [
    "Game",
    "iPhone",
    "TV",
    "Asus Laptops",
    "Macbook",
    "SSD",
    "Graphics Card",
    "Power Bank",
    "Smart TV",
    "Speaker",
    "Tablet",
    "Microwave",
    "Samsung",
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4 space-y-6">
        {/* === Categories === */}
        <div>
          <button
            onClick={() => toggleSection("category")}
            className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-4 text-sm"
          >
            CATEGORY
            {openSections.includes("category") ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          {openSections.includes("category") && (
            <div className="space-y-2">
              {categoryItems.map((item, index) => (
                <label key={index} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.categories[0] === item.name}
                    onChange={() => handleSingleSelect("categories", item.name)}
                    className="w-5 h-5 mr-2 accent-[#22A24F] cursor-pointer"
                  />
                  <span
                    className={`text-sm ${
                      filters.categories[0] === item.name
                        ? "text-green-600 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
        <hr className="my-6 h-[1px] text-[#E4E7E9]" />
        {/* === Price Range === */}
        <div>
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-4 text-sm"
          >
            PRICE RANGE
            {openSections.includes("price") ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {openSections.includes("price") && (
            <div className="space-y-4">
              {/* === Custom Price Slider === */}
              <div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>${priceRangeValue[0]}</span>
                  <span>${priceRangeValue[1]}</span>
                </div>

                <div
                  ref={sliderRef}
                  className="relative w-full h-[2px] bg-gray-200 rounded-full mb-4"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {/* Active track */}
                  <div
                    className="absolute h-[2px] bg-[#22A24F] rounded-full"
                    style={{
                      left: `${(priceRangeValue[0] / 10000) * 100}%`,
                      width: `${
                        ((priceRangeValue[1] - priceRangeValue[0]) / 10000) *
                        100
                      }%`,
                    }}
                  ></div>

                  {/* Min Handle */}
                  <div
                    className="absolute w-4 h-4 border-[2px] border-[#22A24F] rounded-full top-1/2 cursor-pointer"
                    style={{
                      left: `${(priceRangeValue[0] / 10000) * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onMouseDown={() => {
                      const move = (event: MouseEvent) =>
                        handleSliderDrag(0, event);
                      const up = () => {
                        window.removeEventListener("mousemove", move);
                        window.removeEventListener("mouseup", up);
                      };
                      window.addEventListener("mousemove", move);
                      window.addEventListener("mouseup", up);
                    }}
                  ></div>

                  {/* Max Handle */}
                  <div
                    className="absolute w-4 h-4 border-[2px] border-[#22A24F] rounded-full top-1/2 cursor-pointer"
                    style={{
                      left: `${(priceRangeValue[1] / 10000) * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onMouseDown={() => {
                      const move = (event: MouseEvent) =>
                        handleSliderDrag(1, event);
                      const up = () => {
                        window.removeEventListener("mousemove", move);
                        window.removeEventListener("mouseup", up);
                      };
                      window.addEventListener("mousemove", move);
                      window.addEventListener("mouseup", up);
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-3 gap-[24px]">
                <div className="py-3 px-2 border border-[#E4E7E9] w-full rounded">Min price</div>
                <div className="py-3 px-2 border border-[#E4E7E9] w-full rounded">Max price</div>
              </div>

              {/* Preset Price Ranges */}
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <label
                    key={index}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceRange[0] === range.value}
                      onChange={() =>
                        handleSingleSelect("priceRange", range.value)
                      }
                      className="w-5 h-5 mr-2 accent-[#22A24F] cursor-pointer"
                    />
                    <span
                      className={`text-sm ${
                        filters.priceRange[0] === range.value
                          ? "text-green-600 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <hr className="my-6 h-[1px] text-[#E4E7E9]" />

        {/* === Brands (multi-select) === */}
        <div>
          <button
            onClick={() => toggleSection("brands")}
            className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-4 text-sm"
          >
            POPULAR BRANDS
            {openSections.includes("brands") ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          {openSections.includes("brands") && (
            <div className="grid grid-cols-2 gap-2">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center text-xs cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={(e) => handleBrandToggle(brand, e.target.checked)}
                    className="w-5 h-5 mr-2 accent-[#22A24F] text-[#22A24F]    focus:ring-[#22A24F] cursor-pointer"
                  />
                  <span className="text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <hr className="my-6 h-[1px] text-[#E4E7E9]" />

        {/* === Popular Tags (single-select) === */}
        <div>
          <button
            onClick={() => toggleSection("tags")}
            className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-4 text-sm"
          >
            POPULAR TAG
            {openSections.includes("tags") ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          {openSections.includes("tags") && (
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSingleSelect("tags", tag)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                    filters.tags[0] === tag
                      ? "bg-[#FFF3EB] text-[#22A24F] border-green-600"
                      : "bg-white text-black border-gray-300 hover:border-green-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
         <div className="max-w-[260px] mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center flex flex-col items-center">
      {/* Product Image */}
      <div className="relative w-32 h-32 mb-6">
        <Image
          src={AppleWatchLogo}
          alt="Apple Watch Series 7"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Product Text */}
      <div className="mb-3">
        <Image
          src={AppleWatchSeris7Logo}
          alt="Apple Logo"
          width={132}
          height={51}
          className="mx-auto mb-2"
          priority
        />

        <p className="text-gray-800 text-[20px] font-semibold mt-3">
          Heavy on Features. <br /> Light on Price.
        </p>
      </div>

      {/* Price Section */}
      <div className="mb-4 flex flex-row gap-2 items-center flex-wrap">
        <span className="text-sm text-gray-600 block">Only for:</span>
        <span className="mt-1 inline-block px-3 py-1 bg-[#CACACA] rounded text-gray-700 font-semibold">
          $299 USD
        </span>
      </div>

      {/* Buttons */}
      <div className="w-full space-y-2">
        <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">
          <ShoppingCart className="w-4 h-4" />
          ADD TO CART
        </button>

        <button className="w-full flex items-center justify-center gap-2 border border-green-600 text-green-600 hover:bg-green-50 text-sm font-medium py-2 rounded-lg transition-colors">
          VIEW DETAILS
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Sidebar;
