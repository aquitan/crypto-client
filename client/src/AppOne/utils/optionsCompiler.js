export const optionsCompiler = (arr) => {
    let newArr = []
    arr.forEach(item => {
        let obj = {
            value: item.domainName,
            text: item.domainName
        }
        newArr.push(obj)
    })
    return newArr
}