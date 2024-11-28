import { useParams } from "react-router-dom";
import { useState } from "react";
import { CapitalizeFirstLetter } from "./CapitalizeFirstLetter";
import { PhotoCard } from "./PhotoCard";
import images from "../assets/images.json";

export const Gallery = () => {
  let { category } = useParams();
  let galleryTitle = CapitalizeFirstLetter(category);
  let validCategoryList = ["wildlife", "landscape", "street", "portrait"];
  const [validCategory, setValidCategory] = useState(false);
  console.log(category);

  console.log(images);

  const validCategoryCheck = () => {
    if (validCategoryList.includes(category)) {
      setValidCategory(true);
    }
    else setValidCategory(false);
  }

  const checkCategory = (image) => {
    if (image.category.includes(category)) {
      
      return <PhotoCard image={image} />
    }
    else return null;
  }
  // Return images that correspond to chosen category.
  // Get gallery information fråm JSON?


  validCategoryCheck;

  return (
    <div>
      {validCategory ? <p>"Hej"</p> : null}
      <div className=" font-headerFont">
        <h3 className="mt-2 text-3xl">{galleryTitle} Gallery</h3>
      </div>
      <div className="flex">
        {images.map((image, index) => (
          <div key={index}>{checkCategory(image)}</div>
        ))}
      </div>
    </div>
    // Map over all images and place in grid. change grid size responsively
    // pressing image will show lightroom version, arrows to move to next image
  );
};
