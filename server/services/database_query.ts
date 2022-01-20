import mysql from '../config/mysql_config';


class Database {

  async CreateUser(email: string, password: string, isUser: boolean, isAdmin: boolean, isStaff: boolean, isBanned: boolean, isActivated: boolean, activationLink: string, domainName: string, dateOfEntry: string, name?: string) {

    mysql.query(`
        INSERT INTO user_auth 
        ( email, password, isUser, isAdmin, isStaff, isBanned, isActivated, activationLink, domainName, dateOfEntry, name) 
        VALUES 
        ( "${email}", "${password}", ${isUser}, ${isAdmin}, ${isStaff}, ${isBanned}, ${isActivated}, "${activationLink}", "${domainName}", "${dateOfEntry}", "${name || ''}")`,
      (err, result) => {
        if (err) return console.error(err);
        console.log('done')
        console.log('user was created');

      })
  }

  async GetUserById(id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT * 
        FROM user_auth
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
        FROM user_auth
        WHERE email = "${email}"`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async GetUserByEmailAndPassword(email: string, password: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT password
        FROM user_auth
        WHERE email = "${email}", password = "${password}"`,
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


  async ChangeUserPassword(user_id: number, password: string) {
    mysql.query(`
        UPDATE user_auth
        SET password = "${password}"
        WHERE user_id = ${user_id}`,
      (err, result) => {
        if (err) console.error(err);
        console.log('update password in auth table is done')
      })

    mysql.query(`
        UPDATE user_kyc
        SET password = "${password}"
        WHERE user_id = ${user_id}`,
      (err, result) => {
        if (err) console.error(err);
        console.log('update password in kyc table is done')
      })
  }

  //
  // token queries ------------------------------------------------------------------
  //  

  async FindActivationLink(activationLink: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT activationLink
        FROM user_auth
        WHERE activationLink = "${activationLink}"`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async ActivateUserByLink(activationLink: string) {
    mysql.query(`
        UPDATE user_auth
        SET isActivated = ${true}
        WHERE activationLink = "${activationLink}"`,
      (err, result) => {
        if (err) console.error(err);
        console.log('update isActivated status in auth table is done')
      })
  }

  async CreateAndSaveToken(user_id: number, refresh_token: string) {
    mysql.query(`
        UPDATE auth_token
        SET refresh_token = "${refresh_token}"
        WHERE user_id = "${user_id}"
        `,
      (err) => {
        if (err) console.error(err);
        console.log('done')
      })
  }


  async GetAuthTokenForCurrentUser(id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT * 
        FROM auth_token
        WHERE user_id = ${id}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async UpdateAuthTokenForCurrentUser(userID: number, token: string) {
    mysql.query(`
      UPDATE auth_token
      SET refresh_token = "${token}"
      WHERE ID = ${userID} `,
      (err) => {
        if (err) console.error(err);
        console.log('done')
      })
  }

  async FindAuthTokenByUserId(user_id: number,) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM auth_token
        WHERE user_id = ${user_id}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async FindAuthTokenByRefreshToken(refresh_token: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM auth_token
        WHERE refresh_token = "${refresh_token}"`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async FindAuthTokenAndDelete(refresh_token: string) {
    mysql.query(
      `DELETE FROM auth_token 
      WHERE refresh_token = "${refresh_token}" `,
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