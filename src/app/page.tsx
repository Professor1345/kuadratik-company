'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Header onSearch={setSearchQuery} />
      <Hero />
      <ProductGrid searchQuery={searchQuery} />
    </div>
  );
}