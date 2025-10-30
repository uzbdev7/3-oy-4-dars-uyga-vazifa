import { model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        fullName: { type: String },
        email: { type: String, required: true, unique: true },
        phone: { type: String, optional: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['client', 'admin, delivery_staff'],
            default: 'client',
        },
        refreshToken: { type: String },
    },
    { timestamps: true }
);

const UserModel = model('user', userSchema);

export default UserModel;
