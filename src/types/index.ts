import { Types } from "mongoose";

export enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
  
export interface Base {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export interface IUser extends Base {
    _id: Types.ObjectId;
    username: string;
    password: string;
    email: string;
    role: UserRole;
} 

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserSignUp {
    username: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface JwtPayload {
    user_id: string;
    role?: UserRole;
}

export interface IVehicle extends Base {
    _id: Types.ObjectId;
    make: string;
    model: string;
    year: number;
    price: number;
    posterId: Types.ObjectId;
    quantity: number;
    media?: {
        url: string;
        type: string;
        publicId: string;
        index: number;
    }[];
};