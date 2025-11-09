import path from "path";
import streamifier from "streamifier";
import cloudinary from "cloudinary";
import { error as logError } from "./monitoring";

interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
    url: string;
    [key: string]: any;
}

interface CloudinaryDestroyResult {
    result: string;
    [key: string]: any;
}

interface FileUpload {
    originalname: string;
    buffer: Buffer;
    mimetype?: string;
    [key: string]: any;
}

interface TransformationOptions {
    width?: number;
    height?: number;
    quality?: string | number;
    fetch_format?: string;
    crop?: string;
    format?: string;
    resource_type?: "image" | "video" | "raw" | "auto";
    [key: string]: any;
}

const extractPublicIdFromUrl = (url: string): string => {
    const urlSegments = url.split("/");
    const fileName = urlSegments[urlSegments.length - 1];
    const publicId = fileName.split(".")[0];
    return publicId;
};

class Cloudinary {
    private cloudinary: typeof cloudinary.v2;

    constructor() {
        this.cloudinary = cloudinary.v2;
        if (!process.env.CLOUDINARY_CLOUD_NAME) {
            throw new Error("CLOUDINARY_CLOUD_NAME is not set");
        }
        if (!process.env.CLOUDINARY_API_KEY) {
            throw new Error("CLOUDINARY_API_KEY is not set");
        }
        if (!process.env.CLOUDINARY_API_SECRET) {
            throw new Error("CLOUDINARY_API_SECRET is not set");
        }
        this.cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    removeImageByUrl = async (
        url: string,
    ): Promise<CloudinaryDestroyResult> => {
        try {
            const publicId = extractPublicIdFromUrl(url);
            const result = await this.cloudinary.uploader.destroy(publicId);
            return result;
        } catch (error) {
            logError("Error removing image", error as Error);
            throw error;
        }
    };

    uploadSingleFile = async ({
        file,
        folderName,
        transformationOptions,
    }: {
        file: FileUpload;
        folderName: string;
        transformationOptions?: TransformationOptions;
    }): Promise<CloudinaryUploadResult> => {
        try {
            const timestamp = Date.now();
            const fileName = path.basename(
                file.originalname,
                path.extname(file.originalname),
            );
            return this.uploadBuffer({
                buffer: file.buffer,
                publicId: `${fileName}_${timestamp}`,
                folderName,
                transformationOptions,
                resourceType: this.determineResourceType(file),
            });
        } catch (error) {
            logError("Error uploading single file", error as Error);
            throw error;
        }
    };

    uploadMultipleFiles = async ({
        files,
        folderName,
        transformationOptions,
    }: {
        files: FileUpload[];
        folderName: string;
        transformationOptions?: TransformationOptions;
    }): Promise<CloudinaryUploadResult[]> => {
        try {
            const uploadPromises = files.map(async (file) => {
                const timestamp = Date.now();
                const fileName = path.basename(
                    file.originalname,
                    path.extname(file.originalname),
                );

                return this.uploadBuffer({
                    buffer: file.buffer,
                    publicId: `${fileName}_${timestamp}`,
                    folderName,
                    transformationOptions,
                    resourceType: this.determineResourceType(file),
                });
            });
            const results = await Promise.all(uploadPromises);
            return results;
        } catch (error) {
            logError("Error uploading multiple files", error as Error);
            throw error;
        }
    };

    determineResourceType(
        file: FileUpload,
    ): "image" | "video" | "raw" | "auto" {
        if (!file.mimetype) return "auto";

        if (file.mimetype.startsWith("image/")) {
            return "image";
        } else if (file.mimetype.startsWith("video/")) {
            return "video";
        } else {
            return "raw";
        }
    }

    getDefaultTransformationOptions(
        resourceType: "image" | "video" | "raw" | "auto",
    ): TransformationOptions {
        const baseOptions: TransformationOptions = {
            resource_type: resourceType,
        };

        switch (resourceType) {
            case "image":
                return {
                    ...baseOptions,
                    width: 1024,
                    height: 1024,
                    quality: "auto",
                    fetch_format: "webp",
                    crop: "limit",
                };
            case "video":
                return {
                    ...baseOptions,
                    quality: "auto",
                    fetch_format: "mp4",
                    width: 1920,
                    height: 1080,
                    crop: "limit",
                };
            case "raw":
                return {
                    ...baseOptions,
                    quality: "auto",
                };
            default:
                return {
                    ...baseOptions,
                    quality: "auto",
                };
        }
    }

    uploadBuffer = ({
        buffer,
        publicId,
        folderName,
        transformationOptions,
        resourceType = "auto",
    }: {
        buffer: Buffer;
        publicId: string;
        folderName: string;
        transformationOptions?: TransformationOptions;
        resourceType?: "image" | "video" | "raw" | "auto";
    }): Promise<CloudinaryUploadResult> => {
        return new Promise((resolve, reject) => {
            const defaultOptions =
                this.getDefaultTransformationOptions(resourceType);

            const { resource_type, ...cleanTransformationOptions } =
                transformationOptions || {};

            const mergedOptions = cleanTransformationOptions
                ? {
                      ...defaultOptions,
                      ...cleanTransformationOptions,
                  }
                : defaultOptions;

            const uploadStream = this.cloudinary.uploader.upload_stream(
                {
                    folder: folderName,
                    public_id: publicId,
                    resource_type: resourceType,
                    transformation: mergedOptions,
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result as CloudinaryUploadResult);
                    }
                },
            );
            streamifier.createReadStream(buffer).pipe(uploadStream);
        });
    };
}

export default Cloudinary;
