import {postData} from "../services/StaffServices";

export const SendSuperStatus = async (obj) => {
    await postData('/123', obj)
}