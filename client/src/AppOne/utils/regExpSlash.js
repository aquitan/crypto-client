export const splitLocation = (location) => {
    let userLocation = location.pathname.split(/[\\\/]/)
   return userLocation[userLocation.length - 1]
}
