import { FiMusic } from "react-icons/fi";
import { Form } from "../components/ArtistForm";

function Details(){
    return (
        <>
            <div className="flex text-2xl justify-start m-auto pl-4 gap-2 text-amber-200">
                Artist Details <FiMusic size={16} />
            </div>
            <Form />
        </>
    );
};
export default Details;