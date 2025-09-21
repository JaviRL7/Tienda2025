"use client";

import dynamic from "next/dynamic";

const ProductShowcase = dynamic(() => import("@/components/ProductShowcase"), {
  ssr: false,
});

export default ProductShowcase;
