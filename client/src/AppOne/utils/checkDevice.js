
export const checkDeviece = () => {
    if (window.innerWidth < 768) return 'Mobile'
    return 'Desktop'
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