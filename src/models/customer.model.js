import { model, Schema } from 'mongoose';

const customerSchema = new Schema(
    {
        name: String,
        phone: Number,
    },
    { timestamps: true }
);

const CustomerModel = model('customer', customerSchema);

export default CustomerModel;

