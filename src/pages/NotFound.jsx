import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

const camera = <FontAwesomeIcon icon={faCameraRetro} />;

export const NotFound = () => {
  return (
    <div className="font-headerFont">
      <h3 className="my-6 text-3xl">Not a valid category</h3>
      <p className="text-xl">Choose a category above.</p>
      <p className="my-10 text-9xl">{camera}</p>
    </div>
  );
};
