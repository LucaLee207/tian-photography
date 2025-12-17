// api/get-upload-url.js
import { S3Client, PutObjectCommand,DeleteObjectCommand } from "@aws-sdk/client-s3";
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

    const command = new DeleteObjectCommand({
        Bucket: "tianphotography",
        Key: key,
    });

    // Generate a temporary link (valid for 60 seconds)
    const url = await getSignedUrl(r2, command, { expiresIn: 60 });

    res.status(200).json({ deleteUrl: url });
}