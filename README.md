# 🛍️ E-commerce Next.js Application  

A **modern, fully functional e-commerce application** built with **Next.js 15**, **Redux Toolkit**, and **Tailwind CSS v4**, designed for **pixel-perfect UI** and optimized performance.  

This project implements **real-world e-commerce features**, including advanced filters, cart persistence, dynamic banner ads in product grids, and a seamless responsive design that perfectly matches the provided Figma design.

---

## ✨ Features

- 🛍️ **Product Listing**: Fully functional product grid with filters, ads, and sorting  
- 🔍 **Real-time Search**: Instant product filtering as you type  
- 📱 **Responsive Design**: Mobile-first and adaptive across all devices  
- 🛒 **Shopping Cart**:
  - Add, remove, update quantities  
  - **Cart persistence** using Redux Persist (data stays after refresh)  
- 🎯 **Advanced Filters**: Categories, brands, price ranges, and tags  
- 🎨 **Pixel-perfect UI**: Matches Figma design exactly  
- ⚡ **Performance Optimized**:
  - Turbopack for lightning-fast builds  
  - Lazy loading and code splitting  
  - Optimized images with Next.js  
- 🔄 **State Management**: Redux Toolkit + RTK Query for API caching  
- 🎁 **In-Grid Ads System**: Banners dynamically displayed inside product grids  
- ✅ **TypeScript Ready**: End-to-end type safety  

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js 18+
- npm or yarn

---

### **Install Dependencies**
```bash
npm install @reduxjs/toolkit react-redux lucide-react clsx redux-persist
```

### **Run Development Server**
```bash
npm run dev
```
Visit the app at: [http://localhost:3000](http://localhost:3000)

---

## 🎯 Key Implemented Features

### **Header & Navigation**
- Company logo with brand color theme
- Functional search bar with real-time filtering
- Shopping cart icon with dynamic badge
- Location and language selector
- Category-based navigation menu

### **Hero Section**
- Smartwatch hero banner with gradient background
- Smooth transitions with navigation arrows
- Pagination dots for better UX
- Fully responsive layout

### **Sidebar Filters**
- **Categories**: Hierarchical category filtering
- **Price Range**: Dynamic slider with preset ranges
- **Popular Brands**: Branded grid with clickable logos
- **Tags**: Quick filtering with tag buttons

### **Product Grid**
- Responsive 1-4 column grid layout
- Product cards featuring:
  - Dynamic badges (SALE, NEW OFFER, BEST DEAL, etc.)
  - Ratings and review counts
  - Price breakdown (original vs discounted)
  - Wishlist button
  - Add to cart button with smooth animations
- **Dynamic in-grid ads** with `<ProductGridBanner />`

> **Example:** A banner automatically appears after every 6th product, seamlessly integrated into the grid.

### **Shopping Cart**
- Slide-out sidebar with smooth transitions
- Add, remove, and update items in real-time
- Total calculation with auto-update
- **Redux Persist Integration**: Cart items remain saved even after refreshing

### **ProductGridBanner Component**
- Banners dynamically display between product grids like sponsored ads
- Fully responsive with smooth animations
- Custom brand-based banners with logos and offers
- Adaptive hiding/showing behavior depending on screen size

### **Functional Features**
- 🔍 **Real-time Search**
- 🧭 **Advanced Filtering** by multiple criteria
- 🗂️ **Sorting Options**: Price, popularity, ratings
- 📄 **Pagination** with smooth navigation
- 🛒 **Cart Management** with CRUD
- 🖼️ **Individual Product Details** page

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | Framework with App Router |
| **React 19** | Latest concurrent React features |
| **Redux Toolkit** | State management |
| **RTK Query** | API data caching and fetching |
| **Tailwind CSS v4** | Styling and responsive design |
| **Lucide React** | Icon system |
| **Redux Persist** | Persist cart and app state |
| **TypeScript** | Type safety |
| **Fake Store API** | Simulated backend with realistic data |

---

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── globals.css          # Tailwind v4 config
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── product/[id]/        # Product detail pages
│
├── components/              # UI Components
│   ├── Header.tsx           # Navigation with search
│   ├── Hero.tsx             # Hero banner
│   ├── Sidebar.tsx          # Sidebar filters
│   ├── ProductGrid.tsx      # Product grid + pagination
│   ├── ProductCard.tsx      # Individual product cards
│   ├── ProductGridBanner.tsx # Banner ads for product grid
│   ├── Cart.tsx             # Shopping cart sidebar
│   └── ...
│
├── store/                   # Redux store
│   ├── api/                  # RTK Query API slices
│   └── slices/               # Redux slices (cart, filters, etc.)
│
├── hooks/                    # Custom hooks
├── types/                    # TypeScript interfaces
└── providers/                # Context providers
```

---

## 🎨 Design Fidelity

This implementation precisely matches the provided Figma design, including:

- ✅ Exact color scheme (primary red: `#DC2626`)
- ✅ Typography, spacing, and padding
- ✅ Product card layout with badges and pricing
- ✅ Smartwatch hero banner with pagination and arrows
- ✅ Sidebar filter alignment and visuals
- ✅ Pixel-perfect grid alignment
- ✅ Cart sidebar UX

---

## 🧩 In-Grid Ads Example

The `ProductGridBanner` component is dynamically injected into the product grid.
Example implementation:

```tsx
<React.Fragment key={product.id}>
  <ProductCard product={product} />

  {/* Insert banner after every 6 products */}
  {((index + 1) % 6 === 0) && (
    <div className="col-span-full">
      <ProductGridBanner />
    </div>
  )}
</React.Fragment>
```

---

## 🔧 API Integration

Uses the **Fake Store API** for dynamic and realistic product data:

- Product images, categories, and ratings
- Category-based product filtering
- Real-world pricing and discount simulation
- Star ratings with review counts

---

## 🚢 Deployment

### **Deploy on Vercel (Recommended)**
1. Push code to GitHub
2. Import repository into Vercel
3. Deploy with one click

### **Build Locally**
```bash
npm run build
npm start
```

---

## 📊 Performance Highlights

- **Next.js 15 + Turbopack** for ultra-fast builds
- **Lazy-loaded components** for improved initial load speed
- **Image optimization** with `next/image`
- **RTK Query caching** for efficient data fetching
- **Mobile-first responsive images**

---

## 🎯 Key Highlights

1. **Pixel-perfect design fidelity** – matches Figma exactly
2. **Dynamic banner ads** integrated into the product grid
3. **Cart persistence** with Redux Persist
4. **Fully functional filtering and sorting** system
5. **Production-ready performance optimizations**
6. **TypeScript-first implementation**

---

## 🏆 Final Words

This project is a **real-world, production-ready e-commerce platform** that demonstrates:

- Advanced Next.js and React patterns
- State management best practices
- Pixel-perfect front-end engineering
- Scalable and optimized architecture

Perfect for **portfolios**, **live projects**, or as a **foundation for a fully fledged e-commerce store**! 🎉