import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
const app = express();
app.use(cors());

dotenv.config();

// Configure AWS S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION, // Your AWS region
  credentials: {
    accessKeyId: process.env.AWSACCESS,
    secretAccessKey: process.env.AWSACCESSSECRET,
  },
});

// Endpoint to generate a presigned URL
app.get("/generate-presigned-url", async (req, res) => {
  const bucketName = process.env.S3_BUCKET_NAME;

  console.log(bucketName);
  const key = req.query.key || `uploads/${Date.now()}.png`;
  const contentType = req.query.contentType || "image/png";

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // URL expires in 5 minutes

    const publicUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    res.json({ url, key, publicUrl });
  } catch (err) {
    console.error("Error generating presigned URL:", err);
    res.status(500).json({ error: "Could not generate presigned URL" });
  }
});
// Serve the script as a static file
// app.use("/script", express.static(path.resolve("./script.js")));

// Or create a route that sends the script content
app.get("/script/:userId/:clientId", (req, res) => {
  const { userId, clientId } = req.params;

  // Read the script.js file
  const scriptPath = path.resolve("./script.js");
  fs.readFile(scriptPath, "utf-8", (err, scriptContent) => {
    if (err) {
      console.error("Error reading script:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Replace placeholders with actual userId and clientId
    const updatedScript = scriptContent
      .replace("{{userId}}", userId)
      .replace("{{clientId}}", clientId);

    // Send the modified script
    res.type("application/javascript");
    res.send(updatedScript);
  });
});

app.listen(3002, () => {
  console.log("Running on port 3002");
});
