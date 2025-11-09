import { HttpError, ResourceNotFound, ServerError } from "../middleware";
import { Vehicle } from "../models/vehicle.model";
import { IVehicle } from "../types";
import Cloudinary from "../utils/cloudinary";
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
            throw new ResourceNotFound("Vehicle not found");
          }

          return { vehicle, message: "Vehicle retrieved successfully" };
        } catch (error) {

          if (error instanceof HttpError) throw error;
          throw new ServerError(error.message || "Unexpected error");
        }
      }
      
    public async delete(id: string): Promise<{ message: string; vehicle: IVehicle }> {
        try {
            const vehicle = await Vehicle.findByIdAndDelete(id);
            if (!vehicle) {
                throw new HttpError(404, "Vehicle not found");
            }
    
            return { vehicle, message: "Vehicle deleted successfully" };
        } catch (error) {
            if (error instanceof HttpError) throw error;
            if (error.name === "CastError") throw new HttpError(400, "Invalid vehicle ID");
            throw new HttpError(500, error?.message || "Unexpected error");
        }
    }
    
    public async uploadMedia(payload): Promise<{
        message: string,
        vehicle: IVehicle;
    }> {
        try {
            const { id, media } = payload;
            const cloudinary = new Cloudinary();
    
            const uploadResults = await cloudinary.uploadMultipleFiles({
                files: media,
                folderName: "vehicle-media"
            });
    
            const mediaData = uploadResults.map((file, index) => ({
                url: file.secure_url,
                type: file.resource_type,
                publicId: file.public_id,
                index,
            }));
    
            const vehicle = await Vehicle.findByIdAndUpdate(
                id,
                { $push: { media: { $each: mediaData } } },
                { new: true, runValidators: true }
            );
    
            return {
                vehicle,
                message: "Vehicle listing updated successfully"
            };
    
        } catch (error) {
            if (error instanceof HttpError) throw error;
            throw new HttpError(error.status || 500, error.message || error);
        }
    }
    

};