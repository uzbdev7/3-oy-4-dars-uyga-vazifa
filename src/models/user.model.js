import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["client", "admin"], default: "client" },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema); 
export default UserModel;
