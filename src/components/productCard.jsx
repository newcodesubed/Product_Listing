import React from 'react'

export default function ProductCard({product}) {
  return (
    <div className='w-[304px] h-[490px] flex flex-col border border-gray-300 '>
        <div className='w-[304px] h-[304px]'><img src={product?.thumbnail} alt={product?.title} /></div>
        <div>
            <div className='text-1.5'>{product?.title}</div>
            <div className='stroke-stone-500 text-sm'>{product?.category}</div>
            <div className='flex gap-2'>
                <div className='bg-green-500 text-lg'>{product?.discountPercentage}</div>
                <div className='stroke-stone-700 line-through'>{product?.price}</div>
            </div>
            <span className='bg-yellow-400'>{product?.rating}</span>
        </div>
    </div>
  )
}
