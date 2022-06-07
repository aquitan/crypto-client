export const optionsCompiler = (arr) => {
    let newArr = []
    let obj = {}
    arr.forEach(item => {
        let obj = {
            value: item.domainName,
            text: item.domainName
        }
        newArr.push(obj)
    })
    return newArr
}