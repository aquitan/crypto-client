import mysql from '../config/mysql_config';


class Database {

  async CreateUser(email: string, password: string, isUser: boolean, isAdmin: boolean, isStaff: boolean, name?: string,) {
    mysql.query(`
        INSERT INTO task 
        (name, email, password, isUser, isAdmin, isStaff ) 
        VALUES ("${name}", "${email}", "${password}", "${isUser}", "${isAdmin}", "${isStaff}")`,
      (err, result) => {
        if (err) console.error(err);
        console.log('done')
      })
  }

  async GetUserById(id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT * 
        FROM Users 
        WHERE id = ${id}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }


  async GetUserByEmail(email: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT * 
        FROM Users 
        WHERE email = ${email}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  //
  // token queries ------------------------------------------------------------------
  //  

  async CreateAndSaveToken(userID: number, refresh_token: string) {
    mysql.query(`
        INSERT INTO auth_tokens (user_id, refresh_token, ) 
        VALUES ("${userID}", "${refresh_token}")`,
      (err) => {
        if (err) console.error(err);
        console.log('done')
      })
  }


  async GetAuthTokenForCurrentUser(id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT * 
        FROM auth_tokens
        WHERE user_id = ${id}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async UpdateAuthTokenForCurrentUser(userID: number, token: string) {
    mysql.query(`
      UPDATE auth_tokens 
      SET refresh_token = "${token}",
      WHERE ID = ${userID} `,
      (err) => {
        if (err) console.error(err);
        console.log('done')
      })
  }

  async FindAuthToken(refresh_token: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT * 
        FROM auth_tokens
        WHERE refresh_token = ${refresh_token}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async FindAuthTokenAndDelete(refresh_token: string) {
    mysql.query(
      `DELETE FROM auth_tokens 
      WHERE refresh_token = ${refresh_token} `,
      (err) => {
        if (err) console.error(err)
        console.log('done');
      })
  }




}

export default new Database()