import { useState, useEffect } from "react";
import { Modal } from "./Modal";

export const PhotoCard = ({ image, index }) => {
  const [visible, setVisible] = useState(false);
  console.log("PhotoCard input:", image);

  const handleClick = () => {
    setVisible(!visible);
  };

  // Send setVisible to Modal 
  // Right now you need to press twice to open the same image a second time.
  return (
    <>
      <Modal
        shown={visible}
        image={image.path}
        alttext={image.alttext}
        title={image.title}
      />
      <div key={index} className="border border-gray-600 m-4 p-4">
        <img
          onClick={handleClick}
          className="mb-6 h-80 w-full object-cover cursor-pointer"
          src={image.path}
          alt={image.alttext}
        />
        <hr className="text-gray-600"></hr>
        <p className="font-headerFont mt-2">{image.title}</p>
      </div>
    </>
  );
};
