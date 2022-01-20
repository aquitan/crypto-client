import KycService from "../services/KycService";

export const sendKycData = async (data) => {
    try {
        const response = await KycService.sendKyc(data)
        console.log('res kyc', response)
        console.log('kyc-data', data)
    } catch (e) {
        console.log('geo api error', e)
    }
}