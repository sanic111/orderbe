import axios, { AxiosResponse } from "axios";
import { QueryResponse } from "../../../utils/model/models";
import { ID } from "../../../../_metronic/helpers";
import { Staff } from "./models";

const API_URL = process.env.REACT_APP_API_URL
const STAFF_URL = `${API_URL}/staffs`
const GET_STAFFS_URL = `${API_URL}/staffs/query`
export const getStaffs = (query: string): Promise<QueryResponse> => {
    return axios.get(`${GET_STAFFS_URL}?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}
export const deleteStaff = (staffIds: Array<ID>): Promise<QueryResponse> => {
    return axios
        .delete(`${STAFF_URL}/delete`, {
            data: { ids: staffIds } // Chuyển mảng ID trong payload (nếu API yêu cầu)
        })
        .then((response: AxiosResponse<QueryResponse>) => response.data);
};

export const getStaff = (id: string): Promise<QueryResponse> => {
    return axios
        .get(`${STAFF_URL}/${id}`)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const updateStaff = (id: string, staff: Staff): Promise<QueryResponse> => {
    return axios
        .post(`${STAFF_URL}/${id}`, staff)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const createStaff = (staff: Staff): Promise<QueryResponse> => {
    return axios
        .post(`${STAFF_URL}/create`, staff)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const getRoles = (): Promise<QueryResponse> => {
    return axios
        .get(`${API_URL}/roles`)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const getShowroom = (): Promise<QueryResponse> => {
    return axios
        .get(`${API_URL}/showroom`)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const updateStaffAvatar = (id: string | undefined, formData: FormData): Promise<QueryResponse> => {
    return axios
        .post(`${STAFF_URL}/${id}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}