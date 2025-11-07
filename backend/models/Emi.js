import mongoose from "mongoose";

const EMISchema = new mongoose.Schema({
  tenure: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  cashback: {
    type: Number
  }
}, { timestamps: true });

export default mongoose.model("Emi", EMISchema);
