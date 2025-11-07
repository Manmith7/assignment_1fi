import Product from "../models/Product.js";
import Emi from "../models/Emi.js";
import mongoose from "mongoose";

// Helper to calculate lowest perMonth EMI for a given product price
const calculatePerMonth = async (productPrice) => {
  const emis = await Emi.aggregate([
    {
      $addFields: {
        perMonth: { $divide: [productPrice, "$tenure"] } // simple EMI calc
      }
    },
    {
      $group: {
        _id: null,
        minimum: { $min: "$perMonth" }
      }
    }
  ]);

  // emis = [{ _id: null, minimum: <value> }]
  return emis.length > 0 ? emis[0].minimum : null;
};

// Create Product
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    console.log("✅ Product created successfully");

    return res.status(200).json({
      success: true,
      message: "Created Product Successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("❌ Error creating product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

// Get Product + EMI Plans
export const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const productPrice = parseFloat(product.p_price);

    const emis = await Emi.aggregate([
      {
        $addFields: {
          perMonth: { $divide: [productPrice, "$tenure"] },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Fetched product and EMI plans successfully",
      product,
      emiPlans: emis,
    });
  } catch (error) {
    console.error("❌ Error while getting product details:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching product or EMIs",
      error: error.message,
    });
  }
};

// Get All Products + EMI starts from (lowest)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithEmi = await Promise.all(
      products.map(async (product) => {
        const productPrice = parseFloat(product.p_price);
        const emiStartsFrom = await calculatePerMonth(productPrice);
        return {
          ...product.toObject(),
          emiStartsFrom,
        };
      })
    );

    console.log("✅ Fetched all products with EMI info");

    return res.status(200).json({
      success: true,
      message: "Fetched all products successfully",
      products: productsWithEmi,
    });
  } catch (error) {
    console.error("❌ Error fetching all products:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};
