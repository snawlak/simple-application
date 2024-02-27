import {externalGet, sendDeleteRequest, sendGetRequest, sendPostRequest, sendPutRequest} from "./apiService";
import {ContractorDto} from "../models/contractor/ContractorDto";

export const CONTRACTORS_URI = 'contractors';

export const getContractors = async () : Promise<ContractorDto []> => {
    return await sendGetRequest(`/${CONTRACTORS_URI}`);
}

export const addContractor = async (newContractor: ContractorDto) : Promise<boolean> => {
    return await sendPostRequest(`/${CONTRACTORS_URI}`, newContractor);
}

export const editContractor = async (id: string, newContractor: ContractorDto) : Promise<boolean> => {
    return await sendPutRequest(`/${CONTRACTORS_URI}/${id}`, newContractor);
}

export const removeContractor = async (id: number) : Promise<boolean> => {
    return await sendDeleteRequest(`/${CONTRACTORS_URI}/${id}`);
}

export const getByNip = async (nip: string) : Promise<any> => {
    let now = new Date();
    return await externalGet(`https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=${now.toISOString().split('T')[0]}`);
}
