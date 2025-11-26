import React, { useEffect, useState } from 'react'
import ProductCard from '../components/productCard';

export default function Home() {
    const[products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://dummyjson.com/products/')
        .then(res => res.json())
        .then(data=>setProducts(data.products));
        
    }, [])
  return (
   <div>{products.map(product => (
       <ProductCard key={product.id} product={product} />
   ))}</div>
        
  )
}
