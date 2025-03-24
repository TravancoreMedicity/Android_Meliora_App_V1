import { axiosApi } from "../../../../config/Axiox";

export const getNotAssinedTicket = async (id) => {
    let retrunData = { message: 0, data: [] }
    const result = await axiosApi.get(`/complaintassign/${id}`);
    const { success, data, message } = result.data;
    if (success === 1) {
        return { ...retrunData, message: 1, data: data }
    } else {
        return retrunData
    }
}