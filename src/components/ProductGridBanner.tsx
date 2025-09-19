"use client";

import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import AppleLogo from "../../public/apple-logo.png";
import ApplePhone from "../../public/apple-phone.png";
import RealmeLogo from "../../public/realme-logo.png";
import RealmePhone from "../../public/realme-phone.png";
import XiaomiLogo from "../../public/xiaomi-logo.png";
import XiaomiPhone from "../../public/xiaomi-phone.png";

interface BannerItem {
  id: number;
  brand: string;
  logo: StaticImageData;
  bgColor: string;
  textHeaderBgColor: string;
  textColor: string;
  offer: string;
  productImage: StaticImageData;
  circleColor: string;
}

const banners: BannerItem[] = [
  {
    id: 1,
    brand: "IPHONE",
    logo: AppleLogo,
    bgColor: "bg-[#313131]",
    textHeaderBgColor: "bg-[#494949]",
    textColor: "text-white",
    offer: "UP TO 80% OFF",
    productImage: ApplePhone,
    circleColor: "bg-[#404040]",
  },
  {
    id: 2,
    brand: "REALME",
    logo: RealmeLogo,
    bgColor: "bg-yellow-100",
    textHeaderBgColor: "bg-[#F6DE8D]",
    textColor: "text-gray-900",
    offer: "UP TO 80% OFF",
    productImage: RealmePhone,
    circleColor: "bg-yellow-200/50",
  },
  {
    id: 3,
    brand: "XIAOMI",
    logo: XiaomiLogo,
    bgColor: "bg-orange-50",
    textHeaderBgColor: "bg-[#FFD1B0]",
    textColor: "text-gray-900",
    offer: "UP TO 80% OFF",
    productImage: XiaomiPhone,
    circleColor: "bg-orange-100/50",
  },
];

export default function ProductGridBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Responsive Grid */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          xl:grid-cols-3 
          gap-4
        "
      >
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "relative flex items-center justify-between rounded-xl p-4 w-full min-h-[152px] transition-transform duration-300 shadow-md overflow-hidden",
              banner.bgColor,
              banner.id === banners.length - 1 && "hidden sm:flex",
              banner.id === banners.length && "hidden xl:flex",
              index === activeIndex ? "scale-100" : "scale-100"
            )}
          >
            {/* Left Section */}
            <div className="flex flex-col justify-between h-full">
              {/* Brand Name Badge */}
              <div
                className={cn(
                  "text-[10px] sm:text-xs text-center font-medium rounded px-2 py-1",
                  banner.textColor,
                  banner.textHeaderBgColor
                )}
              >
                {banner.brand}
              </div>

              <div className="mt-3">
                {/* Brand Logo */}
                <div
                  className={cn(
                    "h-auto flex items-center justify-center mb-4",
                    banner.brand === "REALME" ? "max-w-[80px]" : "max-w-[45px]"
                  )}
                >
                  <Image
                    src={banner.logo}
                    alt={`${banner.brand} Logo`}
                    width={70}
                    height={52}
                    className="object-contain w-full"
                  />
                </div>

                {/* Offer Text */}
                <div
                  className={cn(
                    "font-semibold text-sm sm:text-base",
                    banner.textColor
                  )}
                >
                  {banner.offer}
                </div>
              </div>
            </div>

            {/* Right Section - Product Image */}
            <div className="relative w-[152px] h-16 flex items-center justify-center">
              <Image
                src={banner.productImage}
                alt={banner.brand}
                className=" object-bottom z-10 drop-shadow-lg h-auto"
                priority
              />
            </div>

            {/* Circle Background */}
            <div
              className={cn(
                "absolute rounded-full -z-10 w-20 h-20 sm:w-30 sm:h-30 -top-2 -right-2",
                banner.circleColor
              )}
            ></div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-3 space-x-1">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === activeIndex ? "bg-blue-500 w-4" : "bg-gray-300 w-2"
            )}
          />
        ))}
      </div>
    </div>
  );
}
