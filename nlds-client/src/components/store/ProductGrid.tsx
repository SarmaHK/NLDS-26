"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/data/merchandise";
import type { Product } from "@/data/merchandise";
import ProductCard from "@/components/store/ProductCard";
import ProductModal from "@/components/store/ProductModal";

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Centered Flex Grid with balanced spacing & automatic centering on all rows */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-9 w-full max-w-[1100px] mx-auto">
        {PRODUCTS.map((product, index) => (
          <div
            key={product.id}
            className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.5rem)] min-w-[260px] max-w-[315px] flex flex-col"
          >
            <ProductCard
              product={product}
              index={index}
              onClick={setSelectedProduct}
            />
          </div>
        ))}
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
