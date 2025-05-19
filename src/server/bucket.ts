'server-only'

import { getFileURL } from "@/lib/utils"
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
    region: "auto",
    endpoint: `https:${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY
    }
})

export async function uploadFileToBucket(
    bucketFilePath: string,
    fileBody: Buffer | ReadableStream | string,
    contentType: string
): Promise<string> {
    try {
        const command = new PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET,
            Key: bucketFilePath,
            Body: fileBody,
            ContentType: contentType
        })
        await s3Client.send(command)
        const publicUrl = getFileURL(bucketFilePath)
        console.log(`File sucessfully sent to: ${publicUrl}`)
        return publicUrl
    } catch (error) {
        console.error("Something went wrong while uploading file to bucket:", error)
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

        console.log(`File deleted sucessfuly: ${bucketFilePath}`);
        return {
            success: true,
            message: "Arquivo removido com sucesso",
            path: bucketFilePath
        }
    } catch (error) {
        console.error("Failed to delete file from bucket:", error);
        return {
            success: false,
            message: "Erro ao remover o arquivo",
            path: bucketFilePath
        };
    }
}

export async function updateFileInBucket(
    bucketFilePath: string,
    fileBody: Buffer | ReadableStream | string,
    contentType: string
): Promise<string> {
    console.log(`Updating file: ${bucketFilePath}`)
    return uploadFileToBucket(bucketFilePath, fileBody, contentType)
}