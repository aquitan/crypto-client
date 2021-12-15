import * as db from 'mysql2'

const mysql = db.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'task_manager'
})

mysql.connect((e: any) => {
  if (e) console.error(new Error(e))
  console.log('database was connected')

})

export default mysql;