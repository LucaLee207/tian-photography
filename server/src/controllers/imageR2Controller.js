// api/get-upload-url.js
import { S3Client, PutObjectCommand,DeleteObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

export async function uploadImg(req, res) {
  const { fileName, category } = req.body;
  try{
    if (!req.file){
        return res.status(400).json({error:"No file uploaded"});
    }
    const image = sharp(req.file.buffer);
    const metadata = await image.metadata();
    const optimizedImageBuffer = await image
        .resize(1600, null, {withoutEnlargement: true})
        .webp({ quality: 80 })
        .toBuffer();
    
      const newFileName = `${category}/${Date.now()}-${fileName.split('.')[0]}.webp`;
      const command = new PutObjectCommand({
        Bucket: "tianphotography",
        Key: newFileName,
        Body: optimizedImageBuffer,
        ContentType: "image/webp",
    });

    await r2.send(command);

    res.status(200).json({
        url: 'https://img.tians-photography.com/' + newFileName,
        width: Math.floor(Math.min(metadata.width, 1600)),
        height: Math.floor(metadata.height * (Math.min(metadata.width, 1600) / metadata.width)),
        fileName: newFileName
    });
  }
  

    catch (err) {
        console.error("Error uploading image to R2:", err);
        next(err);
    }

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