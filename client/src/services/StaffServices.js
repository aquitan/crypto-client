import {$usersApi} from "../API";

export const postData = (path, data) => {
    return $usersApi.post(path, data)
}
export const putData = (path, data) => {
    return $usersApi.put(path, data)
}
export const patchData = (path, data) => {
    return $usersApi.patch(path, data)
}
export const getData = (path) => {
    return $usersApi.get(path)
}
export const deleteData = (path, data) => {
    return $usersApi.delete(path, data)
}