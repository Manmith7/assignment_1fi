import React from 'react';

interface ProductCardProps {
  product: {
    _id: string;
    p_name: string;
    p_desc: string;
    p_price: string;
    p_images: { color: string; images: string[] }[];
    emiStartsFrom?: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const mainImage = product.p_images?.[0]?.images?.[0] || '/placeholder.png';

  // ✅ Use Intl.NumberFormat for clean currency formatting
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return price; // fallback if invalid
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  return (
    <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer">
      {/* Product Image */}
      <div className="relative">
        <img
          src={mainImage}
          alt={product.p_name}
          className="w-full h-64 object-contain"
        />
        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
          New
        </span>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.p_name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.p_desc}</p>

        {/* ✅ EMI starts from */}
        {product.emiStartsFrom && (
          <p className="text-sm text-gray-600">
            EMI starts from:{' '}
            <span className="font-medium">
              {formatPrice(product.emiStartsFrom)}/month
            </span>
          </p>
        )}

        {/* ✅ Formatted Price */}
        <h3 className="text-xl font-bold text-gray-900 mt-2">
          {formatPrice(product.p_price)}
        </h3>

        {/* Action buttons */}
        <div className="mt-4 flex gap-3">
          <button className="flex-1 bg-blue-600 text-white text-sm font-medium py-2 rounded hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
          <button className="flex-1 border border-blue-600 text-blue-600 text-sm font-medium py-2 rounded hover:bg-blue-50 transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
