import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function handler() {
  try {
    const result = await cloudinary.search
      .expression("resource_type:image")
      .sort_by("created_at", "desc")
      .max_results(500)
      .execute();

    const folders = [
      ...new Set(
        result.resources
          .map((img) => img.folder)
          .filter((folder) => folder && folder.trim() !== ""),
      ),
    ];

    return { statusCode: 200, body: JSON.stringify(folders) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
