import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    otp: { type: String, required: true, trim: true }, 
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } 
  },
  { timestamps: true }
);

export const OtpModel = mongoose.model("Otp", otpSchema);
