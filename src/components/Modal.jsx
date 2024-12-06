export const Modal = ({ image, alttext, title, visible, setVisible }) => {
  const handleClick = () => {
    if (visible) {
      setVisible(!visible);
    }
  };

  return (
    <>
      {visible ? (
        <div
          onClick={handleClick}
          className="bg-gray-950  backdrop-blur-sm bg-opacity-80 fixed flex min-h-full items-center w-full left-0 top-0"
        >
          <div className="flex flex-col p-8 h-screen mx-auto place-content-center">
            <span className="text-3xl cursor-pointer text-right">&times;</span>
            <img
              className="max-w-full max-h-[90vh] margin-auto"
              src={image}
              alt={alttext}
            />
            <p>{title}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};
