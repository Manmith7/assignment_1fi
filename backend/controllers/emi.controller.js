import Emi from "../models/Emi.js";

export const createEmiPlan = async (req, res) => {
  const { tenure, rate, cashback } = req.body;

  const Emiplan = { tenure, rate };
  if (cashback) Emiplan.cashback = cashback;

  try {
    const newEmiPlan = await Emi.create(Emiplan);
    console.log("Created EMI plan successfully");

    return res.status(200).json({
      success: true,
      message: "Created EMI Plan Successfully",
      emi: newEmiPlan
    });
  } catch (error) {
    console.error("Error while creating EMI plan:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error creating EMI plan",
      error: error.message
    });
  }
};
