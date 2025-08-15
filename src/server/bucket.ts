'server-only'

import { getFileURL } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { v6 } from "uuid"

const s3Client = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY
    }
})

async function uploadFileToBucket(
    bucketFilePath: string,
    fileBody: Buffer | ReadableStream | string,
    contentType: string
): Promise<string> {
    try {
        logger.info(`Uploading file to bucket: ${bucketFilePath}`);
        const command = new PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET,
            Key: bucketFilePath,
            Body: fileBody,
            ContentType: contentType
        })
        await s3Client.send(command)
        const publicUrl = getFileURL(bucketFilePath)
        logger.info(`File successfully uploaded to: ${publicUrl}`);
        return publicUrl
    } catch (error) {
        logger.error("Failed to upload file to bucket", error);
        throw error
    }
}

export async function deleteFileFromBucket(bucketFilePath: string): Promise<{ success: boolean, message: string, path: string }> {
    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET,
            Key: bucketFilePath,
        })

        await s3Client.send(command)

        logger.info(`File deleted successfully: ${bucketFilePath}`);
        return {
            success: true,
            message: "Arquivo removido com sucesso",
            path: bucketFilePath
        }
    } catch (error) {
        logger.error("Failed to delete file from bucket", error);
        return {
            success: false,
            message: "Erro ao remover o arquivo",
            path: bucketFilePath
        };
    }
}

export async function updateFileInBucket(
    bucketFilePathToDelete: string,
    newFileToUpload: File | null | undefined,
    folder: string
): Promise<string | null | undefined> {
    try {
        await deleteFileFromBucket(bucketFilePathToDelete)
        logger.info(`Attempted to delete old file at: ${bucketFilePathToDelete}`)
    } catch (error) {
        logger.error(`Could not delete file at ${bucketFilePathToDelete}`, error)
    }
    const newFileUrl = await storeFileUrl(newFileToUpload, folder)
    return newFileUrl
}

export async function storeFileUrl(file: File | null | undefined, bucketFolder: string) {
    let photoUrl: string | undefined | null = null
    if (file instanceof File) {
        try {
            const fileExtension = file.name.split('.').pop()
            const uniqueFileName = `${v6()}.${fileExtension}`
            const bucketFilePath = `images/${bucketFolder}/${uniqueFileName}`
            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            photoUrl = await uploadFileToBucket(bucketFilePath, buffer, file.type)
            return photoUrl
        } catch (uploadError) {
            logger.error("Error uploading file", uploadError)
            throw new Error("Something went wrong while trying to store a file")
        }
    }
    return null
}