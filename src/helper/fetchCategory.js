export async function fetchCategory(tag) {
  const res = await fetch("/.netlify/functions/tags");
  return res.json();
}
