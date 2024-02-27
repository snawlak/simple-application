import {sendPostRequestExpectResponse} from "./apiService";

const PATH = "name/is-valid";

export const isNameValid = async (base: string, fieldName: string) : Promise<boolean> => {
    return await sendPostRequestExpectResponse(`/${base}/${PATH}`, {name: fieldName});
}
