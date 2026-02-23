import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Load environment variables
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;

export async function handler(event) {
  try {
    const { password } = JSON.parse(event.body);

    // Compare password with hash
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isValid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid password" }),
      };
    }

    // Generate JWT
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "2h" });

    return { statusCode: 200, body: JSON.stringify({ token }) };
  } catch (err) {
    console.error("Login error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
