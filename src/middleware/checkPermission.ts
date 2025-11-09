import { Response, Request, NextFunction } from "express";
import { vehicleService } from "../controllers";
import { Forbidden } from "./error";


export const checkPermission = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { vehicle } = await vehicleService.getOne(req.params.id);
    if (vehicle.posterId.toString() !== req.user.user_id.toString()) {
      throw new Forbidden("You are not allowed to manage this vehicle");
    }

    next();
  } catch (error) {
    next(error); 
  }
};
