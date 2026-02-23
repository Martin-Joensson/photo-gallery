import cloudinary from "./cloudinary.js";

export async function handler() {
  try {
    const tags = await cloudinary.api.tags();
    return { statusCode: 200, body: JSON.stringify(tags.tags || []) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
