import * as myDatabase from 'mysql2'

export const mysql: myDatabase.Connection = myDatabase.createConnection({
  host: process.env.HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: 'crypto_app'
})

export async function mysqlConnect() {
  mysql.connect((err: myDatabase.QueryError | null) => {
    if (err) return console.error(err)
    return console.log('mysql database was connected.')
  })
}