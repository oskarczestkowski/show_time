import { FiMusic } from "react-icons/fi"
import { Form } from "./Form"

export const Details = () => {
    return (
        <>
            <div className="flex text-2xl justify-start m-auto pl-4 gap-2 text-amber-200">
                Place Owner Details <FiMusic size={16} />

            </div>
            <Form />
        </>
    )
}