import * as myDatabase from 'mysql2'

const mysql: myDatabase.Connection = myDatabase.createConnection({
  host: process.env.HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: 'crypto_app'
})

mysql.connect((err: myDatabase.QueryError | null) => {
  if (err) console.error(err)
  console.log('mysql database was connected.')
})

export default mysql;