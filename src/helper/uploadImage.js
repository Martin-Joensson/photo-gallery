export async function uploadImage({ file, folder, tags, caption, alt }) {
  const token = localStorage.getItem("admin_token");

  // Ask backend for a signed upload
  const res = await fetch("/.netlify/functions/signUpload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ folder, tags, caption, alt }),
  });

  const data = await res.json();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", data.apiKey);
  formData.append("timestamp", data.timestamp);
  formData.append("signature", data.signature);

  formData.append("folder", folder);
  formData.append("tags", tags);

  // 🔴 THIS must come from backend, not rebuilt
  formData.append("context", data.context);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`,
    { method: "POST", body: formData },
  );

  return await uploadRes.json();
}
