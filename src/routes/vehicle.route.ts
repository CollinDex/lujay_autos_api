import { Router } from "express";
import { createVehicle, deleteVehicle, getAllVehicles, getVehicleById, updateVehicle, uploadMedia } from "../controllers";
import { validateData } from "../middleware/validationMiddleware";
import { createVehicleSchema, getVehicleByIdSchema, updateVehicleSchema } from "../validation-schema/vehicle.schema";
import { authMiddleware } from "../middleware";
import { checkRole } from "../middleware/role";
import { UserRole } from "../types";
import { checkPermission } from "../middleware/checkPermission";
import { upload } from "../middleware/uploadfile";

const vehicleRoute = Router();

vehicleRoute.post(
    "/vehicles", 
    authMiddleware, 
    checkRole(UserRole.ADMIN),
    validateData(createVehicleSchema), 
    createVehicle
);

vehicleRoute.get(
    "/vehicles/:id", 
    authMiddleware, 
    validateData(getVehicleByIdSchema, ["params"]), 
    getVehicleById
);

vehicleRoute.get("/vehicles", authMiddleware, getAllVehicles);

vehicleRoute.put(
    "/vehicles/:id",
    authMiddleware,
    checkRole(UserRole.ADMIN),
    validateData(getVehicleByIdSchema, ["params"]),
    validateData(updateVehicleSchema, ["body"]),
    checkPermission,
    updateVehicle
);

vehicleRoute.delete(
    "/vehicles/:id",
    authMiddleware,
    checkRole(UserRole.ADMIN),
    validateData(getVehicleByIdSchema, ["params"]),
    checkPermission,
    deleteVehicle
);

vehicleRoute.post(
    "/vehicles/:id/images",
    authMiddleware,
    checkRole(UserRole.ADMIN),
    validateData(getVehicleByIdSchema, ["params"]),
    upload.array("media"),
    checkPermission,
    uploadMedia
);
  


export { vehicleRoute };