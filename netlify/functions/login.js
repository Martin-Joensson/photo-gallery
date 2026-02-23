
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function handler(event) {
  const { password } = JSON.parse(event.body);

  const isValid = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH,
  );

  if (!isValid) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid password" }),
    };
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return { statusCode: 200, body: JSON.stringify({ token }) };
}
