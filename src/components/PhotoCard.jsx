export const PhotoCard = ({ image, index }) => {
  console.log("PhotoCard input:", image);

  // I need image.alttext, image.path
  return (
    <>
      <a target="_blank" href={image.path} rel="noreferrer">
        <div key={index} className="border border-gray-600 m-4 p-4">
          <img
            className="mb-6 h-80 w-full object-cover"
            src={image.path}
            alt={image.alttext}
          />
          <hr className="text-gray-600"></hr>
          <p className="font-headerFont mt-2">{image.title}</p>
        </div>
      </a>
    </>
  );
};
