export default function ProductCard({ product }) {
  return (
    <div className="w-full flex flex-col border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition">
      
      
      <div className="aspect-square w-full bg-gray-100">
        <img
          src={product?.thumbnail}
          alt={product?.title}
          className="w-full h-full object-cover"
        />
      </div>

      
      <div className="p-3 flex flex-col gap-1">
        <div className="text-base font-semibold line-clamp-1">{product?.title}</div>
        <div className="text-gray-500 text-sm capitalize">{product?.category}</div>

        <div className="flex gap-2 text-sm items-center">
          <div className="font-bold">${product?.discountPercentage}</div>
          <div className="line-through text-gray-400">${product?.price}</div>
        </div>

        <span className="bg-yellow-400 px-2 py-0.5 text-xs w-fit rounded">
          ⭐ {product?.rating}
        </span>
      </div>
    </div>
  );
}
