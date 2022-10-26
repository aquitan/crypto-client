
const chars =
  [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'
  ]

async function decripting(param) {
  let index = param - 1
  if (param <= 0) index = 0
  return chars[index]
}

export async function DataDecripting(data) {
  const arrData = data.split('/')

  let word = []
  let phrase = []

  for (let x = 0; x <= arrData.length - 1; x++) {
    const array = arrData[x].split(' ')

    for (let j = 0; j < array.length; j++) {

      if (array[j] !== '') {
        const char = await decripting(+array[j])
        word.push(char)
        if (word.length === array.length) {
          phrase.push(word.join().replaceAll(',', ' ').replaceAll(';', '').replaceAll(' ', ''))
          word = []
          continue;
        }
      }
    }
  }

  let curPh = phrase.join().replaceAll(',', ' ')
  let fxx = curPh.toString()
  return fxx
}

async function encrypting(letter) {
  for (let i = 0; i < chars.length - 1; i++) {
    if (chars[i] !== letter) {
      continue;
    } else {
      return i + 1
    }
  }
}


export async function DataEncripting(data) {
  const array = data.split(' ')

  let numElem = []
  let phrase = []
  for (let x = 0; x <= array.length - 1; x++) {
    const wordArr = array[x].split('')
    for (let i = 0; i < wordArr.length; i++) {
      let char = await encrypting(wordArr[i])
      if (char < 0) {
        numElem.push('0')
      } else {
        numElem.push(char.toString())
      }

      if (numElem.length === array[x].length) {
        phrase.push(numElem.join().replaceAll(',', ' '))
        phrase.push(';')
        numElem = []
        continue;
      }
    }
  }
  let curPhrs = phrase.join().replaceAll(',', '').replaceAll(';', '/')
  let encPrase = curPhrs.toString()
  return encPrase
}

