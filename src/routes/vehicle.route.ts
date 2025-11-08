import { Router } from "express";
import { createVehicle, deleteVehicle, getAllVehicles, getVehicleById, updateVehicle } from "../controllers";
import { validateData } from "../middleware/validationMiddleware";
import { createVehicleSchema, getVehicleByIdSchema, updateVehicleSchema } from "../validation-schema/vehicle.schema";
import { authMiddleware } from "../middleware";
import { checkRole } from "../middleware/role";
import { UserRole } from "../types";
import { checkVehicleOwnership } from "../utils/checkVehicleOwnerShip";

const vehicleRoute = Router();

vehicleRoute.post("/vehicles", authMiddleware, checkRole(UserRole.ADMIN),validateData(createVehicleSchema), createVehicle);

vehicleRoute.get("/vehicles/:id", authMiddleware, validateData(getVehicleByIdSchema, ["params"]), getVehicleById);

vehicleRoute.get("/vehicles", authMiddleware, getAllVehicles);

vehicleRoute.put(
    "/vehicles/:id",
    authMiddleware,
    validateData(getVehicleByIdSchema, ["params"]),
    validateData(updateVehicleSchema, ["body"]),
    checkVehicleOwnership,
    updateVehicle
);

vehicleRoute.delete(
    "/vehicles/:id",
    authMiddleware,
    validateData(getVehicleByIdSchema, ["params"]),
    checkVehicleOwnership,
    deleteVehicle
);
  


export { vehicleRoute };