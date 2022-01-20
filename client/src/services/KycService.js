import $api from "../API";

export default class KycService {
    static async sendKyc() {
        return $api.post('/personal_area/verification/')
    }
}