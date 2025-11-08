import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    postalCode: { type: Number, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true } // Added timestamps instead of minimize
);

export default mongoose.models.Address || mongoose.model("Address", addressSchema);