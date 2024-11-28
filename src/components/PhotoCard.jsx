
export const PhotoCard = ({ image }) => {

    console.log("PhotoCard input:", image)

    // I need image.alttext, image.path 
  return (
      <div className="border">
          <img src={image.path} alt={image.alttext} />
          <p>{image.title}</p>
    </div>
  )
}
