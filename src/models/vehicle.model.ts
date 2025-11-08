import { Schema, model, SchemaTypes } from 'mongoose';
import { IVehicle } from '../types';

const vehicleSchema = new Schema<IVehicle>({
    make: {type: SchemaTypes.String, required: true},
    model: {type: SchemaTypes.String, required: true},
    year: {type: SchemaTypes.Number, required: true},
    price: {type: SchemaTypes.Number, min:0 ,required: true},
    quantity: {type: SchemaTypes.Number, min:0 ,required: true},
    posterId: { type: SchemaTypes.ObjectId, ref: "User", required: true },
    media: {
        type: [{
          url: { type: SchemaTypes.String },
          type: { type: SchemaTypes.String },
          publicId: { type: SchemaTypes.String },
          index: { type: SchemaTypes.Number },
        }],
      default: []}
    },
    {
        timestamps: true
    }
);

export const Vehicle = model<IVehicle>('Vehicle', vehicleSchema);