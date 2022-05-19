import userLogs from '../models/User_logs.model'

export default async function saveUserLogs(email: string, ipAddress: string, city: string, countryName: string, coordinates: string, browser: string, currentDate: string, userAction: string, userDomain: string) {

  const logs: any = {
    email: email,
    ip_address: ipAddress,
    user_city: city,
    country_name: countryName,
    location_on_map: coordinates,
    browser: browser,
    date_time: currentDate,
    user_action: userAction,
    domain: userDomain
  }
  console.log('received logs is: ', logs)

  if (Object.keys(logs).length < 9) return false

  for (let i = 0; i < logs.length; i++) {
    if (logs.i === undefined) return false

  }
  await userLogs.create({
    userEmail: email,
    ipAddress: ipAddress,
    requestCity: city,
    countryName: countryName,
    location: coordinates,
    browser: browser,
    actionDate: currentDate,
    userAction: userAction,
    userDomain: userDomain
  })

  return logs
}