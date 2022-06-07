export const getSearchItems = (arr, search) => {
    return arr.filter(item => {
        return item.userEmail.toLowerCase().includes(search.toLowerCase())
    })
}