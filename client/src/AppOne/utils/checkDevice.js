import {isMobile} from 'react-device-detect';

export const checkDeviece = () => {
    return isMobile ? 'Mobile' : 'Desktop'
    // let detect = new MobileDetect(window.navigator.userAgent);
    //
    // if (detect.phone()) {
    //     return "Mobile"
    // } else if (detect.tablet()) {
    //     return 'tablet'
    // } else if (detect.os()) {
    //     return 'Desktop'
    // } else {
    //     return 'Other device'
    // }
};