"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import BgSvg from "../../public/bg.svg";
import WatchSvg from "../../public/watch.svg";

const slides = [
  {
    subtitle: "Best Deal Online on smart watches",
    title: "SMART WEARABLE.",
    discount: "UP TO 80% OFF",
    description:
      "Explore our latest collection of smartwatches featuring advanced health tracking, sleek designs, and unbeatable deals.",
    image: WatchSvg,
  },
  {
    subtitle: "Track your daily activity seamlessly",
    title: "FITNESS FIRST.",
    discount: "LIMITED TIME DEAL",
    description:
      "Stay active and motivated with fitness tracking, heart rate monitoring, and multi-day battery life.",
    image: WatchSvg,
  },
  {
    subtitle: "Smarter lifestyle made easy",
    title: "TECH ON YOUR WRIST.",
    discount: "SAVE UP TO 50%",
    description:
      "Connect with ease and control your day-to-day schedule with powerful smartwatch features.",
    image: WatchSvg,
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));
  const next = () => setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));

  return (
    <div className="relative w-full px-[32px] sm:px-12 md:px-12 xl:px-[60px] pt-8 max-w-7xl mx-auto">
      {/* === WRAPPER with relative and overflow-hidden === */}
      <div className="relative w-full overflow-hidden rounded-[2rem] bg-[#1F2747] flex items-center z-0">
        {/* === BACKGROUND SVG === */}
        <Image
          src={BgSvg}
          alt="Background Design"
          className="absolute right-0 bottom-0 lg:top-0 h-full object-fill z-0 pointer-events-none"
          priority
        />

        {/* === CONTENT AREA === */}
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-10 py-12 px-6 md:px-18 lg:px-20">
          {/* LEFT SECTION - TEXT */}
          <div className="flex-1 text-center md:text-left text-white max-w-lg">
            <p className="text-sm sm:text-lg text-slate-300">
              {slides[current].subtitle}
            </p>

            <h1 className="mt-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              {slides[current].title}
            </h1>

            <p className="mt-4 text-lg sm:text-xl md:text-2xl font-medium text-white/90">
              {slides[current].discount}
            </p>

            {/* Pagination dots */}
            <div className="mt-8 flex justify-center md:justify-start gap-3">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SECTION - WATCH IMAGE */}
          <div className="flex-1 flex justify-center md:justify-end">
            <Image
              src={slides[current].image}
              alt="smartwatch"
              width={320}
              height={320}
              className="w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
              priority
            />
          </div>
        </div>
      </div>

      {/* === NAVIGATION BUTTONS === */}
      <button
        aria-label="previous"
        onClick={prev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 xl:w-20 xl:h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 z-20"
      >
        <ChevronLeft className="h-6 w-6 xl:h-7 xl:w-7 text-sky-500" />
      </button>

      <button
        aria-label="next"
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 xl:w-20 xl:h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 z-20"
      >
        <ChevronRight className="h-6 w-6 xl:h-7 xl:w-7 text-sky-500" />
      </button>
    </div>
  );
}
