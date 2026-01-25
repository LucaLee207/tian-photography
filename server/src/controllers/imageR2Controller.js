// api/get-upload-url.js
import { S3Client, PutObjectCommand,DeleteObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

export async function uploadImg(req, res) {
  const { fileName, fileType } = req.body;

  const command = new PutObjectCommand({
    Bucket: "tianphotography",
    Key: fileName,
    ContentType: fileType,
  });

  // Generate a URL that is valid for 60 seconds
  const signedUrl = await getSignedUrl(r2, command, { expiresIn: 60 });

  res.status(200).json({ url: signedUrl });
}

export async function deleteImg(req, res) {
    const { key } = req.body; // Receive the key from the frontend

    try{
        const deleteParams = {
            Bucket: "tianphotography",
            Key: key,
        };

        await r2.send(new DeleteObjectCommand(deleteParams));
        res.status(200).json({ message: `Successfully deleted all object ${key}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete object from R2" });
    }
    
}

export const deleteFolderByPrefix = async (req, res) => {
    const { prefix } = req.body; 

    try {
        const listParams = {
            Bucket: "tianphotography",
            Prefix: prefix,
        };
        const listedObjects = await r2.send(new ListObjectsV2Command(listParams));
        if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
            return res.status(200).json({ message: `No objects found with prefix ${prefix}` });
        }
        
        const deleteParams = {
            Bucket: "tianphotography",
            Delete: {
                Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
            },
        };

        // 3. Execute batch delete
        await r2.send(new DeleteObjectsCommand(deleteParams));

        res.status(200).json({ message: `Successfully deleted all objects in ${prefix}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete objects from R2" });
    }
};