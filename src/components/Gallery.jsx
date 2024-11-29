import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CapitalizeFirstLetter } from "./CapitalizeFirstLetter";
import { PhotoCard } from "./PhotoCard";
import images from "../assets/images.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

const camera = <FontAwesomeIcon icon={faCameraRetro} />;
const arch = <FontAwesomeIcon icon="fa-solid fa-archway" />;

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
      console.log("Valid category?:", validCategory);
    } else {
      setValidCategory(false);
      console.log("Valid category?:", validCategory);
    }
  };

  const checkCategory = (image) => {
    if (image.category.includes(category)) {
      return <PhotoCard image={image} />;
    } else return null;
  };
  // Return images that correspond to chosen category.
  // Get gallery information fråm JSON?

  useEffect(() => {
    validCategoryCheck();
  }, [validCategoryCheck, category]);

  return (
    <div>
      {validCategory ? (
        <div>
          {" "}
          <div className=" font-headerFont">
            <h3 className="mt-2 text-3xl">{galleryTitle} Gallery</h3>
          </div>
          <div className="flex">
            {images.map((image, index) => (
              <div key={index}>{checkCategory(image)}</div>
            ))}
          </div>
        </div>
      ) : (
        <div className="font-headerFont">
          <h3 className="my-6 text-3xl">Not a valid category</h3>
          <p className="text-xl">Choose a category above.</p>
          <p className="my-10 text-9xl">{camera}</p>
          
        </div>
      )}
    </div>
    // Map over all images and place in grid. change grid size responsively
    // pressing image will show lightroom version, arrows to move to next image
  );
};
