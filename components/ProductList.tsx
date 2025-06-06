import React from "react";
import ProductCard from "@/components/ui/ProductCard";

interface ProductListProps {
  products: ProductsType[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">No products found.</div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-6 750:grid-cols-3 1024:grid-cols-4 1200:grid-cols-5">
      {products.slice(0, 30).map((product, i) => (
        <ProductCard
          key={product.id}
          i={i}
          img={product.img}
          name={product.name}
          price={product.price}
          discount={product.discount}
          oldPrice={product.old_price}
          inStock={product.in_stock}
          hovered={-1} // You may want to manage hovered state in parent for hover effects
          setHovered={() => {}} // Dummy function if not used
        />
      ))}
    </div>
  );
};

export default ProductList;
