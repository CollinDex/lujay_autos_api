import { Response, Request, NextFunction } from "express";
import { vehicleService } from "../controllers";

export const checkVehicleOwnership = async (req: Request, res: Response, next: NextFunction) => {
    const {vehicle} = await vehicleService.getOne(req.params.id);
    if (vehicle.posterId.toString() !== req.user.user_id.toString()) {
      return res.status(403).json({ message: "You cannot update this vehicle, Access Denied" });
    }
    next();
  };
  