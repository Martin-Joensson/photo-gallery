import { useParams } from "react-router-dom";
import { CapitalizeFirstLetter } from "./CapitalizeFirstLetter";
import images from "../assets/images.json";

export const Gallery = () => {
  let { category } = useParams();
  let galleryTitle = CapitalizeFirstLetter(category);
  console.log(category);

  console.log(images);
  // Return images that correspond to chosen category.
  // Get gallery information fråm JSON?

  return (
    <div>
      <div className=" font-headerFont">
        <h3 className="mt-2 text-3xl">{galleryTitle} Gallery</h3>
      </div>
      <div>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.path} />
            <p>{image.title}</p>
          </div>
        ))}
      </div>
    </div>
    // Map over all images and place in grid. change grid size responsively
    // pressing image will show lightroom version, arrows to move to next image
  );
};
