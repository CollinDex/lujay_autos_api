import { Request, Response, NextFunction } from "express";
import { VehicleService } from "../services";
import { sendJsonResponse } from "../utils/send-response";
import mongoose from "mongoose";
import { IVehicle } from "../types";
import { InvalidInput } from "../middleware";

export const vehicleService = new VehicleService();

const createVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body as IVehicle;
        const posterId = new mongoose.Types.ObjectId(req.user.user_id);
        const { message, vehicle } = await vehicleService.create({...payload, posterId });
        sendJsonResponse(res, 201, message, { vehicle });
    } catch (error) {
        next (error);
    }
};

const updateVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body as IVehicle;
        const _id = new mongoose.Types.ObjectId(req.params.id);
        const { message, vehicle } = await vehicleService.update({...payload, _id });
        sendJsonResponse(res, 200, message, { vehicle });
    } catch (error) {
        next (error);
    }
};

const deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { message } = await vehicleService.delete(id);
        sendJsonResponse(res, 204, message);
    } catch (error) {
        next (error);
    }
};

const getAllVehicles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { message, vehicles } = await vehicleService.getAll();
        sendJsonResponse(res, 200, message, { vehicles });
    } catch (error) {
        next (error);
    }
};

const getVehicleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id; 
        const { message, vehicle } = await vehicleService.getOne(id);
        sendJsonResponse(res, 200, message, { vehicle });
    } catch (error) {
        next (error);
    }
};

const uploadMedia = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const media = req.files as Express.Multer.File[];
        
        if (!media || media.length === 0) {
            throw new InvalidInput("You must upload at least 1 media file");
        }
        if (media.length > 6) {
            throw new InvalidInput("Maximum of 6 media files allowed");
        }

        const { vehicle, message } = await vehicleService.uploadMedia({id, media});
        sendJsonResponse(res, 201, message, {vehicle});
    } catch (error) {
        next (error);
    }
};

export { createVehicle, getAllVehicles, getVehicleById, updateVehicle, deleteVehicle, uploadMedia };