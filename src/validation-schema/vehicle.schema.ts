import mongoose from 'mongoose';
import { z } from 'zod';

const createVehicleSchema = z.object({
    make: z.string().min(1, { message: "Enter a valid make" }),
    model: z.string().min(1, { message: "Enter a valid model" }),
    year: z.number().min(1999, { message: "Enter a valid date." }),
    price: z.number().min(1, { message: "Enter a valid price" }),
    quantity: z.number().min(1, { message: "Invalid Quantity" }),
    media: z
        .array(z.custom<Express.Multer.File>())
        .min(1, "You must upload at least 1 media file")
        .max(6, "Maximum of 6 media files allowed")
        .optional(),
});

const getVehicleByIdSchema = z.object({
    id: z.string().min(1, { message: "invalid vehicleId" })
        .refine((vehicleId) => mongoose.Types.ObjectId.isValid(vehicleId), {
            message: "Invalid vehicleId",
        }),
});

const updateVehicleSchema = z.object({
    make: z.string().min(1, { message: "Enter a valid make" }).optional(),
    model: z.string().min(1, { message: "Enter a valid model" }).optional(),
    year: z.number().min(1999, { message: "Enter a valid date." }).optional(),
    price: z.number().min(1, { message: "Enter a valid price" }).optional(),
    quantity: z.number().min(1, { message: "Invalid Quantity" }).optional(),
    media: z
        .array(z.custom<Express.Multer.File>())
        .min(1, "You must upload at least 1 media file")
        .max(6, "Maximum of 6 media files allowed")
        .optional(),
});

export { createVehicleSchema, getVehicleByIdSchema, updateVehicleSchema };