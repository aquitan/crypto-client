import * as db from 'mysql2'

const mysql = db.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'crypto_app'
})

mysql.connect((e: any) => {
  if (e) console.error(new Error(e))
  console.log('mysql database was connected.')

})

export default mysql;