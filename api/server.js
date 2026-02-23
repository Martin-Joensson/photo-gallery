import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load ENV first
dotenv.config({ path: path.join(__dirname, ".env") });

// Only import Cloudinary AFTER env is ready
const cloudinary = (await import("./cloudinary.js")).default;

const app = express();
app.use(cors());
app.use(express.json());

// Fetch images by tag
app.get("/Photographs/:tag", async (req, res) => {
  const { tag } = req.params;

  try {
    const result = await cloudinary.search
      .expression(`resource_type:image AND tags:${tag}`)
      .with_field("context")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    // 👇 DEBUG HERE
    console.log("Cloudinary raw resource:");
    console.log(JSON.stringify(result.resources[0], null, 2));

    const images = result.resources.map((img) => ({
      id: img.public_id,
      url: img.secure_url,
      caption: img.context?.caption || "",
      alt: img.context?.alt || "",
    }));

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/tags", requireAuth, async (req, res) => {
  try {
    // List all tags in your Cloudinary account
    const tags = await cloudinary.api.tags();

    // cloudinary.api.tags() returns an object like { tags: ["wedding","portrait",...] }
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


app.get("/folders", async (req, res) => {
  try {
    // Fetch up to 500 images (adjust max_results if needed)
    const result = await cloudinary.search
      .expression("resource_type:image")
      .sort_by("created_at", "desc")
      .max_results(500)
      .execute();

    // Extract unique folders, ignoring null/empty
    const folders = [
      ...new Set(
        result.resources
          .map((img) => img.folder)
          .filter((folder) => folder && folder.trim() !== ""),
      ),
    ];

    res.json(folders);
  } catch (err) {
    console.error("Error fetching folders:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/sign-upload", requireAuth, (req, res) => {
  const { folder, tags, caption, alt } = req.body;

  const timestamp = Math.round(Date.now() / 1000);

  // IMPORTANT: build context safely
  const context = {
    caption,
    alt,
  };

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

  res.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,

    // send the SAME STRING back to frontend!
    context: paramsToSign.context,
  });
});

app.post("/login", async (req, res) => {
  const { password } = req.body;

  const isValid = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH,
  );

  if (!isValid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.json({ token });
});

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing auth header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
