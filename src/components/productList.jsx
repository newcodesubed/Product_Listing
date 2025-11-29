import { useEffect, useState, useCallback } from 'react'
import ProductCard from './productCard';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  
  const LIMIT = 20; 

  const fetchProducts = useCallback(async (isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setProducts([]);
      setSkip(0);
    }
    
    const currentSkip = isLoadMore ? skip : 0;
    
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${currentSkip}`);
      const data = await response.json();
      
      if (isLoadMore) {
        setProducts(prev => [...prev, ...data.products]);
      } else {
        setProducts(data.products);
      }
      
      setTotal(data.total);
      setSkip(currentSkip + LIMIT);
      setHasMore(currentSkip + LIMIT < data.total);
      
    } catch (err) {
      console.log(err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [skip, LIMIT]);

  useEffect(() => {
    fetchProducts();
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        !loading &&
        !loadingMore &&
        hasMore
      ) {
        fetchProducts(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, loadingMore, hasMore, fetchProducts]);

  return (
    <div className="px-4 md:px-6 py-6 w-full">
      
      {!loading && !error && products.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">All Products</h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Showing {products.length} of {total} products
          </p>
        </div>
      )}

      {loading && products.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading products...</span>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!error && products.length > 0 && (
        <div
          className="grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          xl:grid-cols-6 
          gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {loadingMore && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading more products...</span>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You've reached the end! No more products to load.</p>
        </div>
      )}

    </div>
  );
}
