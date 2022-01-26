import mysql from '../config/mysql_config';


class Database {

  async CreateUser(email: string, password: string, isUser: boolean, isAdmin: boolean, isStaff: boolean, isBanned: boolean, isActivated: boolean, activationLink: string, self_registration: string, promocode: string, domainName: string, dateOfEntry: string, name?: string) {

    mysql.query(`
        INSERT INTO user_auth 
        ( email, password, isUser, isAdmin, isStaff, isBanned, isActivated, activationLink, self_registration, promocode, domain_name, date_of_entry, name) 
        VALUES 
        ( "${email}", "${password}", ${isUser}, ${isAdmin}, ${isStaff}, ${isBanned}, ${isActivated}, "${activationLink}", "${self_registration}", "${promocode}", "${domainName}", "${dateOfEntry}", "${name || ''}")`,
      (err, result) => {
        if (err) return console.error(err);
        console.log('done')
        console.log('user was created');

      })
  }

  async UpdateUserPassword(email: string, password: string) {

    mysql.query(`
      UPDATE user_auth
      SET password = "${password}"
      WHERE email = "${email}"`,
      (e: any, result) => {
        if (e) return console.error(new Error(e))
        console.log('password was update');

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
        SELECT email, password
        FROM user_auth
        WHERE email = "${email}", password = "${password}"`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }


  async GetUserKycByUserId(user_id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM user_kyc 
        WHERE user_id = ${user_id}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async SaveUserKyc(first_name: string, last_name: string, email: string, phone_number: number, date_of_birth: string, document_number: string, main_address: string, city: string, zip_code: number, document_type: string, status: string, user_id: number, state?: string, sub_address?: string) {

    mysql.query(`
      INSERT INTO user_kyc
      ( first_name, last_name, email, phone_number, date_of_birth, document_number, main_address, city, zip_code, document_type, kyc_status, user_id, state, sub_address)
      VALUES
      ( "${first_name}", "${last_name}", "${email}", ${phone_number}, "${date_of_birth}", "${document_number}", "${main_address}", "${city}", ${zip_code}, "${document_type}", "${status}", ${user_id}, "${state || ''}", "${sub_address || ''}" )`,
      (e: any, result) => {
        if (e) return console.error(new Error(e));
        console.log('db res: ', result);

        console.log('done')
        console.log('user ' + `${email} ` + 'kyc was saved.')
      })

  }

  async SaveUserLogs(user_id: number, email: string, ipAddress: string, city: string, countryName: string, coordinates: string, currentDate: string, user_action: string, user_domain: string) {

    mysql.query(`
      INSERT INTO user_logs
      ( email, ip_address, request_city, country_name, location, action_date, user_action, user_domain, user_id )
      VALUES
      ( "${email}", "${ipAddress}", "${city}", "${countryName}", "${coordinates}", "${currentDate}", "${user_action}", "${user_domain}", ${user_id} )`,
      (e: any, result) => {
        if (e) return console.error(new Error(e));
        console.log('done')
        console.log('user ' + `${email} ` + 'kyc was saved.')
      })
  }

  async ChangeUserPassword(user_id: number, password: string) {
    mysql.query(`
        UPDATE user_auth
        SET password = "${password}"
        WHERE ID = ${user_id}`,
      (err, result) => {
        if (err) return console.error(err);
        console.log('update password in auth table is done')
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
        if (err) return console.error(err);
        console.log('update isActivated status in auth table is done')
      })
  }

  async CreateAndSaveToken(user_id: number, refresh_token: string) {
    mysql.query(`
        UPDATE auth_token
        SET refresh_token = "${refresh_token}"
        WHERE user_id = ${user_id}
        `,
      (err) => {
        if (err) return console.error(err);
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
        if (err) return console.error(err);
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
    mysql.query(`
      DELETE FROM auth_token 
      WHERE refresh_token = "${refresh_token}" `,
      (err) => {
        if (err) return console.error(err)
        console.log('done');
      })
  }

  //
  // staff pages ------------------------------------------------------------------
  //  

  async GetAllUsersForStaff(domain_name: string) {

    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM user_auth
        WHERE isAdmin = ${false} AND domain_name = "${domain_name}"`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async GetLogsByUserId(user_id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM user_logs
        WHERE user_id = ${user_id}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async GetKycForStaff(user_domain: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM user_kyc
        WHERE domain_name = "${user_domain}"
        JOIN user_auth 
        ON user_auth.email = user_kyc.email
        WHERE user_auth.isAdmin = ${false}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async SavePromocode(newCode: string, date: string, value: number, staff_user_id: number, domain: string) {
    mysql.query(`
      INSERT INTO user_promocode
      ( newCode, date, value, staff_user_id, domain)
      VALUES 
      ( "${newCode}", "${date}", ${value}, ${staff_user_id}, "${domain}",) `,
      (err) => {
        if (err) return console.error(err)
        console.log('done');
      })
  }

  async GetPromocodeListForStaff(staff_id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM user_promocode
        WHERE staff_user_id = ${staff_id}
        JOIN domains_list
        ON user_promocode.staff_user_id = domains_list.domain_owner`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }


  // async GetAllUserInfo(user_id: number) { 
  //   return new Promise((resolve, reject) => {
  //     mysql.query(`
  //       SELECT *
  //       FROM user_kyc
  //       WHERE isAdmin = "${false}"
  //       RIGHT JOIN user_auth
  //       ON (user_auth.ID = ${user_id}) 

  //       `,
  //       (e: any, result) => {
  //         if (e) reject(new Error(e))
  //         resolve(result)
  //       })
  //   })
  // }

  //
  // admin pages ------------------------------------------------------------------
  // 

  async GetAllUsersForAdmin() {

    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM user_auth`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async GetKycForAdmin() {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM user_kyc`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async GetPromocodeListForAdmin() {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM user_promocode`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

}

export default new Database()