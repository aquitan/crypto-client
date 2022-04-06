export const getSearchItems = (arr, search) => {
    return arr.filter(item => {
        return item.email.toLowerCase().includes(search.toLowerCase())
    })
}