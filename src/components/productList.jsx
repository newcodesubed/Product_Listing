import {  useEffect, useState } from 'react'
import ProductCard from './productCard';
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="px-4 py-6">

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div
        className="grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        xl:grid-cols-6 
        gap-6"
      >
        {!loading &&
          !error &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

    </div>
  );
}
