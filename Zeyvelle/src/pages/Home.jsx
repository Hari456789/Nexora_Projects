import React from 'react';
import { Hero } from '../components/Hero';
import { CategorySection } from '../components/CategorySection';
import { ProductsSection } from '../components/ProductsSection';

export const Home = () => {
  return (
    <main>
      <Hero />
      <CategorySection />
      <ProductsSection />
    </main>
  );
};
