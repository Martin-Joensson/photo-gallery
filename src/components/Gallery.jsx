
export const Gallery = ({ category }) => {
    console.log(category)

    // Return images that correspond to chosen category.
    // Get gallery information fråm JSON?

    
  return (
      <div className=" font-headerFont">
          <h3 className="mt-2 text-3xl">
              {category} Gallery
          </h3>
      </div>
      // Map over all images and place in grid. change grid size responsively
      // pressing image will show lightroom version, arrows to move to next image
  )
}
