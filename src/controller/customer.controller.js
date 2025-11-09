// import CustomerModel from '../models/customer.model.js';

// export const getAllCustomer = async (req, res, next) => {
//     try {

//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 10;
//         const search = req.query.search?.trim() || "";

//         const searchQuery = {
//             $or: [
//                 // { name: { $regex: search, $options: "i" } },
//                 { email: { $regex: search, $options: "i" } }
//             ]
//         };

//         const skip = (page - 1) * limit;

//         const customers = await CustomerModel.find(searchQuery)
//             .skip(skip)
//             .limit(limit)
//             .sort({ createdAt: -1 });

//         const total = await CustomerModel.countDocuments(searchQuery);

//         res.status(200).send({
//             success: true,
//             page,
//             limit,
//             total,
//             totalPages: Math.ceil(total / limit),
//             data: customers
//         });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };

// export const getOneCustomer = async (req, res, next) => {
//     try {
//         const { id } = req.params; 

//         const customer = await CustomerModel.findById(id);

//         if (!customer) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Customer not found."
//             });
//         }

//         res.status(200).send({
//             success: true,
//             data: customer
//         });

//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };

// export const updateCustomer = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const updated = await CustomerModel.findByIdAndUpdate(id, req.body, {
//             new: true,
//         });
//         res.status(200).send(updated);
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };

// export const deleteCustomer = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         await CustomerModel.findByIdAndDelete(id);
//         res.status(200).send({ message: 'Deleted successfully!' });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };


