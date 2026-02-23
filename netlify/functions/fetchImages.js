import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function handler(event, context) {
  const tag = event.queryStringParameters?.tag;
  if (!tag) return { statusCode: 400, body: "Missing tag" };

  try {
    const result = await cloudinary.search
      .expression(`resource_type:image AND tags:${tag}`)
      .with_field("context")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    const images = result.resources.map((img) => ({
      id: img.public_id,
      url: img.secure_url,
      caption: img.context?.caption || "",
      alt: img.context?.alt || "",
    }));

    return { statusCode: 200, body: JSON.stringify(images) };
  } catch (err) {
    console.error("Cloudinary fetchImages error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
