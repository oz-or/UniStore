"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

// Dummy fetch function (replace with your real API endpoint)
async function fetchProducts(query: string) {
  if (!query) return [];
  const res = await fetch(
    `/api/products/search?q=${encodeURIComponent(query)}`
  );
  if (!res.ok) return [];
  return res.json();
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch on initial load if query param is present
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
    // eslint-disable-next-line
  }, []);

  // Debounced instant search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query) {
      setResults([]);
      setShowSuggestions(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const data = await fetchProducts(query);
      setResults(data);
      setLoading(false);
      setShowSuggestions(true);
    }, 300);
    // eslint-disable-next-line
  }, [query]);

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    const data = await fetchProducts(searchQuery);
    setResults(data);
    setLoading(false);
    setShowSuggestions(false);
    // Update URL
    router.replace(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleSuggestionClick = async (product: any) => {
    setShowSuggestions(false);

    // Fetch the product from the database by name
    const res = await fetch(
      `/api/products/by-name?name=${encodeURIComponent(product.name)}`
    );
    if (!res.ok) {
      // Optionally show an error
      return;
    }
    const foundProduct = await res.json();

    // If found, navigate to the product page by ID
    if (foundProduct && foundProduct.id) {
      router.push(`/product/${foundProduct.id}`);
    } else {
      // Optionally show a "not found" message
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4 pb-16">
      {" "}
      {/* Add pb-16 for bottom padding */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        className="relative"
        autoComplete="off"
      >
        <input
          type="text"
          className="w-full border rounded px-4 py-2"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowSuggestions(true)}
        />
        {showSuggestions && results.length > 0 && (
          <div className="absolute left-0 right-0 bg-white border rounded shadow z-10 mt-1 max-h-60 overflow-y-auto">
            {results.map((product) => (
              <div
                key={product.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                onClick={() => handleSuggestionClick(product)}
              >
                <img
                  src={product.img || "/products/placeholder.png"}
                  alt={product.name}
                  className="w-8 h-8 object-contain"
                />
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        )}
      </form>
      <div className="mt-8">
        {loading && <div>Loading...</div>}
        {!loading && results.length === 0 && query && (
          <div>No products found for &quot;{query}&quot;.</div>
        )}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((product) => (
              <div
                key={product.id}
                className="border rounded p-4 flex flex-col items-center"
              >
                <img
                  src={product.img || "/products/placeholder.png"}
                  alt={product.name}
                  className="w-24 h-24 object-contain mb-2"
                />
                <div className="font-semibold">{product.name}</div>
                <div className="text-green-600 font-bold mt-1">
                  ${Number(product.price).toFixed(2)}
                </div>
                <button
                  className="mt-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
