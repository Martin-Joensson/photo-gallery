import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function handler(event) {
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

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET,
  );

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
}
