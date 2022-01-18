import mysql from '../config/mysql_config';


class Database {

  async CreateUser(email: string, password: string, isUser: boolean, isAdmin: boolean, isStaff: boolean, name?: string,) {
    mysql.query(`
        INSERT INTO user_auth 
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
        WHERE ID = ${id}`,
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



  async GetUserKycById(id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM users_kyc 
        WHERE user_id = ${id}`,
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


  async GetAllUsersForAdmin(isAdmin: boolean) {

    if (isAdmin === true) {
      return new Promise((resolve, reject) => {
        mysql.query(
          `SELECT id, joinDate, name, email, userOwner
           FROM users`
          ,
          (e: any, result) => {
            if (e) reject(new Error(e))
            resolve(result)
          })
      })
    }

  }


  async GetAllUsersForStaff(isStaff: boolean, domainOwner: string) {


    if (isStaff === true) {
      const getDomainsList: any = new Promise((resolve, reject) => {
        mysql.query(
          `SELECT * 
          FROM domains
          WHERE domainOwner = ${domainOwner}`,
          (e: any, result) => {
            if (e) reject(new Error(e))
            resolve(result)
          })
      })
      await getDomainsList;
      console.log(getDomainsList);


      for (let i = 0; i <= getDomainsList.length; i++) {
        return new Promise((resolve, reject) => {
          mysql.query(
            `SELECT * 
            FROM users
            WHERE userDomain = ${i}`
            ,
            (e: any, result) => {
              if (e) reject(new Error(e))
              resolve(result)
            })
        })
      }



    }

    mysql.query(
      `SELECT * FROM users;`
    )
  }
}

export default new Database()