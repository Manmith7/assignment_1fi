import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

interface EMIPlan {
  _id: number;
  tenure: number;
  rate: number;
  cashback?: number;
  perMonth: number;
}

interface ProductType {
  _id: string;
  p_name: string;
  p_desc: string;
  p_price: string;
  p_images: {
    color: string;
    images: string[];
    _id: string;
  }[];
  p_varients: {
    storage: number;
    ram: number;
    _id?: string;
  }[];
  soldBy: string;
  screenSize: string;
}

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [emiPlans, setEmiPlans] = useState<EMIPlan[]>([]);
  const [selectedColor, setSelectedColor] = useState<ProductType['p_images'][0] | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<ProductType['p_varients'][0] | null>(null);

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return price;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(numPrice);
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/products/${id}`);
      const fetchedProduct: ProductType = res.data.product;
      const fetchedEmiPlans: EMIPlan[] = res.data.emiPlans || [];

      setProduct(fetchedProduct);
      setEmiPlans(fetchedEmiPlans);

      setSelectedColor(fetchedProduct.p_images[0]);
      setSelectedImage(fetchedProduct.p_images[0].images[0]);
      setSelectedVariant(fetchedProduct.p_varients[0]);
    } catch (err) {
      console.error('Error fetching product:', err);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  if (!product || !selectedColor) return <div className="text-center mt-20">Loading product...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-12 mt-10">

      <div className="flex-1">
        <img
          src={selectedImage}
          alt={product.p_name}
          className="w-full h-[400px] object-contain rounded-xl shadow-md mb-4 p-4"
        />

        <div className="flex gap-4">
          {selectedColor.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              className={`w-20 h-30 object-contain rounded-lg cursor-pointer border-2 transition p-2 ${
                img === selectedImage ? 'border-blue-600' : 'border-gray-200 hover:border-blue-400'
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        <div className="flex gap-4 mt-4">
          {product.p_images.map((colorObj, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                colorObj.color === selectedColor.color
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => {
                setSelectedColor(colorObj);
                setSelectedImage(colorObj.images[0]);
              }}
            >
              {colorObj.color}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-800">{product.p_name}</h1>
        <p className="text-gray-600">{product.p_desc}</p>

        <div className="flex gap-6 items-center mt-2">
          <span className="text-2xl font-semibold text-gray-900">{formatPrice(product.p_price)}</span>
          <span className="text-gray-500">Screen: {product.screenSize}</span>
        </div>

        <div>
          <h3 className="font-medium mb-2">Variants</h3>
          <div className="flex gap-4">
            {product.p_varients.map((variant, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-lg border transition ${
                  variant === selectedVariant
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.ram}GB RAM | {variant.storage}GB Storage
              </button>
            ))}
          </div>
        </div>

        {emiPlans.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">EMI Options</h3>
            <div className="flex flex-col gap-2">
              {emiPlans.map((emi) => (
                <div
                  key={emi._id}
                  className="flex justify-between px-4 py-2 bg-gray-50 rounded-lg shadow-sm"
                >
                  <span>
                    {emi.tenure} months @ {emi.rate}% interest
                  </span>
                  <span>
                    {formatPrice(emi.perMonth)}/month{' '}
                    {emi.cashback && (
                      <span className="text-green-600 font-semibold">
                        (Cashback {formatPrice(emi.cashback)})
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-6">
          <p className="text-gray-600">
            Sold By: <span className="font-medium">{product.soldBy}</span>
          </p>
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-md">
              Add to Cart
            </button>
            <button className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition shadow-sm">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
