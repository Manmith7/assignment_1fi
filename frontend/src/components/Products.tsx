import { useEffect, useState } from 'react'
import ProductCard from '../ui/ProductCard'
import { useNavigate } from 'react-router'
import axios from 'axios'
interface Product {
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
    emiStartsFrom?: number;
    createdAt?: string;
    updatedAt?: string;
}

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        const res = await axios.get('http://localhost:8000/api/products/');
        console.log("Products", res.data)
        setProducts(res.data.products);
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div className="m-6">

            <h1 className="text-center text-5xl md:text-6xl font-bold mb-12 text-gray-800">
                Our Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {
                    products?.map((product) => {
                        return (
                            <div
                                key={product._id}
                                onClick={() => navigate(`/${product._id}`)}
                            >
                                <ProductCard product={product} />
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default Products
