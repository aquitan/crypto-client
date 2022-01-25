import $api from "../API";

export default class KycService {
    static async sendKyc(data) {
        return $api.post('/personal_area/verification/', data)
    }
}