import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
    {
        order_id: {
            type: Schema.Types.ObjectId,
            ref: 'orders',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        order_date: {
            type: Date,
            default: Date.now,
        },
        method: {
            type: String,
            enum: ['cash', 'card', 'online'],
            required: true,
        },
    },
    { timestamps: true }
);

const PaymentModel = model('payments', paymentSchema);

export default PaymentModel;

