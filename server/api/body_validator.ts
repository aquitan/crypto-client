
export default async function bodyValidator(body: any, length: number) {
  console.log('full request body => ', body);
  console.log('request object length => ', length);
  if (Object.keys(body).length < length) return false
  for (let i in body) {
    console.log(' request body element => ', body[i]);
    if (body[i] === undefined) {
      return false
    }
  }
  return true
}