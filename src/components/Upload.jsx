import { useState, useEffect } from "react";

export const Upload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [folder, setFolder] = useState("");
  const [tags, setTags] = useState("");
  const [caption, setCaption] = useState("");
  const [alt, setAlt] = useState("");
  const [loading, setLoading] = useState(false);

  const [existingTags, setExistingTags] = useState([]);
  const [existingFolders, setExistingFolders] = useState([]);

  /** Fetch folders and tags from Netlify Functions */
  useEffect(() => {
    // Fetch existing tags
    fetch("/.netlify/functions/tags")
      .then((res) => res.json())
      .then((data) => setExistingTags(data || []))
      .catch((err) => console.error("Failed to fetch tags:", err));

    // Fetch existing folders
    fetch("/.netlify/functions/folders")
      .then((res) => res.json())
      .then((data) => setExistingFolders(data || []))
      .catch((err) => console.error("Failed to fetch folders:", err));
  }, []);

  /** Generate thumbnail preview */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewUrl(ev.target.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  /** Add existing tag when clicked */
  const addTag = (tag) => {
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (!tagList.includes(tag)) {
      tagList.push(tag);
      setTags(tagList.join(","));
    }
  };

  /** Upload image via signed URL */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");
    if (!caption.trim()) return alert("Caption is required");

    setLoading(true);

    const finalFolder = folder.trim() || "Photographs/uploads";

    try {
      // 1️⃣ Request signature from serverless function
      const signRes = await fetch("/.netlify/functions/signUpload", {
        method: "POST",
        body: JSON.stringify({
          folder: finalFolder,
          tags: tags.trim(),
          caption: caption.trim(),
          alt: alt.trim(),
        }),
      });

      const signData = await signRes.json();

      // 2️⃣ Create FormData to upload directly to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", signData.timestamp);
      formData.append("signature", signData.signature);
      formData.append("folder", finalFolder);
      if (tags.trim()) formData.append("tags", tags.trim());
      if (signData.context) formData.append("context", signData.context);

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${signData.cloudName}/auto/upload`;

      const uploadRes = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const result = await uploadRes.json();
      console.log("Upload result:", result);

      // Reset form
      setFile(null);
      setPreviewUrl(null);
      setFolder("");
      setTags("");
      setCaption("");
      setAlt("");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl">
      <form className="flex flex-col gap-3" onSubmit={handleUpload}>
        {/* Live preview */}
        {previewUrl && (
          <div className="mt-2 m-auto">
            <p className="font-semibold">Preview:</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-60 object-cover border-4 rounded"
            />
          </div>
        )}

        {/* File */}
        <input type="file" onChange={handleFileChange} required />

        {/* Caption */}
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption (shown under image)"
          required
        />

        {/* Alt text */}
        <input
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="Alt text (for accessibility / SEO)"
          required
        />

        {/* Folder */}
        <input
          type="text"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          placeholder="Folder (default: Photographs/uploads)"
        />
        {existingFolders.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            <p className="w-full font-semibold">Existing folders:</p>
            {existingFolders.map((folderPath) => {
              const depth = folderPath.split("/").length - 1;
              return (
                <span
                  key={folderPath}
                  onClick={() => setFolder(folderPath)}
                  style={{ paddingLeft: depth * 10 }}
                  className="px-2 py-1 border rounded cursor-pointer hover:bg-gray-200"
                >
                  {folderPath}
                </span>
              );
            })}
          </div>
        )}

        {/* Tags */}
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma-separated)"
        />
        {existingTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            <p className="w-full font-semibold">Existing tags:</p>
            {existingTags.map((tag) => (
              <span
                key={tag}
                onClick={() => addTag(tag)}
                className="px-2 py-1 border rounded cursor-pointer hover:bg-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Submit */}
        {loading ? (
          <p>Uploading...</p>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Upload
          </button>
        )}
      </form>
    </div>
  );
};
