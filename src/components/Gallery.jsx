import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CapitalizeFirstLetter } from "./CapitalizeFirstLetter";
import { PhotoCard } from "./PhotoCard";
import { NotFound } from "../pages/NotFound";
import { fetchCategory } from "../helper/fetchCategory";

export const Gallery = () => {
  const { category } = useParams();
  const galleryTitle = CapitalizeFirstLetter(category);

  // Optional: define valid categories
  const validCategoryList = [
    "wildlife",
    "landscape",
    "street",
    "portrait",
    "pixelart",
  ];

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [validCategory, setValidCategory] = useState(true);

  useEffect(() => {
    // Check if category is valid
    if (!validCategoryList.includes(category)) {
      setValidCategory(false);
      setLoading(false);
      return;
    }

    setValidCategory(true);
    setLoading(true);

    // Fetch images from Cloudinary by tag
    fetchCategory(category)
      .then((fetchedImages) => {
        setImages(fetchedImages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching images:", err);
        setImages([]);
        setLoading(false);
      });
  }, [category]);

  if (!validCategory) {
    return <NotFound />;
  }
console.log(images)
  return (
    <div>
      <div className="font-headerFont">
        <h3 className="mt-2 text-3xl">{galleryTitle} Gallery</h3>
      </div>

      {loading ? (
        <p>Loading images...</p>
      ) : images.length === 0 ? (
        <p>No images found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-4">
          {images.map((image) => (
            <PhotoCard image={image} key={image.id} />
          ))}
        </div>
      )}
    </div>
  );
};
