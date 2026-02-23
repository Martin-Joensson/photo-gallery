
import cloudinary from "./cloudinary.js";

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
