import { useState } from "react";
import { Modal } from "./Modal";

export const PhotoCard = ({ image }) => {
  const [visible, setVisible] = useState(false);

  // Build Cloudinary URL with transformations
  const transformedUrl = image.url.replace(
    "/upload/",
    "/upload/c_fill,h_400,w_300,q_auto,f_auto/",
  );

  console.log(image);
  return (
    <div key={image.id} className="border border-gray-600 m-4 p-4">
      <img
        onClick={() => setVisible(true)}
        src={transformedUrl}
        alt={image.alt}
        loading="lazy"
        className="mb-6 h-80 w-full object-cover cursor-pointer"
      />

      <hr className="text-gray-600" />

      <p className="font-headerFont mt-2">{image.caption || "Untitled"}</p>

      <Modal
        image={image.url} // full-res for modal
        alttext={image.alt || image.id}
        title={image.caption || "Untitled"}
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  );
};
