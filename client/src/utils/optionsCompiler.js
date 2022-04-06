export const optionsCompiler = (arr) => {
    let newArr = []
    let obj = {}
    arr.forEach(item => {
        let obj = {
            value: item.full_domain_name,
            text: item.full_domain_name
        }
        newArr.push(obj)
    })
    return newArr
}