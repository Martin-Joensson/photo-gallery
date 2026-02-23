import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function handler(event) {
  try {
    // 1️⃣ Check for JWT in Authorization header
    const authHeader = event.headers.authorization;
    if (!authHeader) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Missing token" }),
      };
    }

    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid token" }),
      };
    }

    // 2️⃣ Parse request body
    const { folder, tags, caption, alt } = JSON.parse(event.body);

    const timestamp = Math.round(Date.now() / 1000);
    const context = { caption, alt };

    const paramsToSign = {
      timestamp,
      folder,
      tags,
      context: Object.entries(context)
        .map(([k, v]) => `${k}=${v}`)
        .join("|"),
    };

    // 3️⃣ Sign the upload request
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET,
    );

    // 4️⃣ Return signed params
    return {
      statusCode: 200,
      body: JSON.stringify({
        timestamp,
        signature,
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        context: paramsToSign.context,
      }),
    };
  } catch (err) {
    console.error("signUpload error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
