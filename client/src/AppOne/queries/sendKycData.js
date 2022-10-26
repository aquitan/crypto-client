import KycService from "../services/KycService";

export const sendKycData = async (data) => {
    try {
        const response = await KycService.sendKyc(data)

    } catch (e) {
        console.log('geo api error', e)
    }
}