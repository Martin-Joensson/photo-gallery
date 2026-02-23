import cloudinary from "./cloudinary.js";
console.log("Cloudinary object:", cloudinary);

export async function handler(event) {
  const tag = event.queryStringParameters?.tag;

  if (!tag) return { statusCode: 400, body: JSON.stringify([]) };

  try {
    const result = await cloudinary.search
      .expression(`resource_type:image AND tags:${tag}`)
      .with_field("context")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    console.log("Cloudinary result:", JSON.stringify(result, null, 2));

    const resources = result.resources || []; // 🔹 fallback

    const images = resources.map((img) => ({
      id: img.public_id,
      url: img.secure_url,
      caption: img.context?.caption || "",
      alt: img.context?.alt || "",
    }));

    return { statusCode: 200, body: JSON.stringify(images) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify([]) }; // 🔹 always return array
  }
}
