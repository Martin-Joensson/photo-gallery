export const PhotoCard = ({ image }) => {
  console.log("PhotoCard input:", image);

  // I need image.alttext, image.path
  return (
    <div className="border border-gray-600 m-4 p-4">
      <img className="mb-6 h-80 w-full object-cover" src={image.path} alt={image.alttext} />
      <hr className="text-gray-600"></hr>
      <p>{image.title}</p>
    </div>
  );
};
