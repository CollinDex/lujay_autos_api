import { HttpError } from "../middleware";
import { Vehicle } from "../models/vehicle.model";
import { IVehicle } from "../types";
import { filterUndefined } from "../utils/filterUndefined";


export class VehicleService {
    public async create(payload: IVehicle): Promise<{
        message: string,
        vehicle: IVehicle;
    }> {

        try {
            const { make, model, year, price, posterId, quantity, media } = payload;

            const vehicle = await Vehicle.create({ make, model, year, price, posterId, quantity, media });

            return {
                vehicle,
                message: "Vehicle listing created Succesfully"
            };

        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(error.status || 500, error.message || error);
        }
    };

    public async update(payload: Partial<IVehicle>): Promise<{
        message: string,
        vehicle: IVehicle;
    }> {

        try {

            const { _id, ...data } = payload;

            const updateData = filterUndefined(data);
    

            const vehicle = await Vehicle.findByIdAndUpdate(
                _id,
                updateData,
                { new: true, runValidators: true }
            );

            return {
                vehicle,
                message: "Vehicle listing updated Succesfully"
            };

        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(error.status || 500, error.message || error);
        }
    };

    public async getAll(): Promise<{
        message: string,
        vehicles: IVehicle[];
    }> {

        try {
            const vehicles = await Vehicle.find();
            return { vehicles, message: "Vehicles retrieved successfully" };

        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(error.status || 500, error.message || error);
        }
    };

    public async getOne(id: string): Promise<{ message: string; vehicle: IVehicle }> {
        try {
            const vehicle = await Vehicle.findById(id);
            if (!vehicle) {
                throw new HttpError(404, "Vehicle not found");
            }
            return { vehicle, message: "Vehicle retrieved successfully" };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(error.status || 500, error.message || error);
        }
    };

    public async delete(id: string): Promise<{ message: string; vehicle: IVehicle }> {
        try {
            const vehicle = await Vehicle.findByIdAndDelete(id);
            if (!vehicle) {
                throw new HttpError(404, "Vehicle not found");
            }
            return { vehicle, message: "Vehicle Deleted successfully" };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(error.status || 500, error.message || error);
        }
    };

};