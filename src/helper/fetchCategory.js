export async function fetchCategory(tag) {
  const res = await fetch(
    `/.netlify/functions/fetchImages?tag=${encodeURIComponent(tag)}`,
  );
  return res.json();
}
