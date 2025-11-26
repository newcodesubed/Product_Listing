import {  useEffect, useState } from 'react'
import ProductCard from './productCard';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getData= async ()=>{
        setLoading(true);
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            setProducts(data.products);
        } catch (err) {
            console.log(err);
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [])
  return (
    <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className='grid grid-cols-6 gap-4'>
            {!loading && !error && products.map(product=>ProductCard({product}))}
            </div>
    </div>
  )
}
