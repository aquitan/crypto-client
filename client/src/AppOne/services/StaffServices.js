import {$api, BASE_URL} from '../API';

// export const postData = (path, data) => {
//     return $api.post(path, data)
// }
// export const putData = (path, data) => {
//     return $api.put(path, data)
// }
// export const patchData = (path, data) => {
//     return $api.patch(path, data)
// }
// export const getData = (path) => {
//     return $api.get(path)
// }
// export const deleteData = (path, data) => {
//     return $api.delete(path, data)
// }

export const postData = async (path, data) => {
    const res = await fetch(BASE_URL + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await res.json()
}

export const putData = (path, data) => {
    return $api.put(path, data)
}
export const patchData = (path, data) => {
    return $api.patch(path, data)
}
export const getData = (path) => {
    return $api.get(path)
}
export const deleteData = (path, data) => {
    return $api.delete(path, data)
}