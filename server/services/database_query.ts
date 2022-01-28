import mysql from '../config/mysql_config';


class Database {

  async GetPromocodeListBeforeSignup(domain_name: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT code 
        FROM user_promocode
        WHERE domain_name = "${domain_name}"
        GROUP BY ID
        ORDER BY MAX (ID)
        desc`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async CreateUser(email: string, password: string, isUser: boolean, isAdmin: boolean, isStaff: boolean, isBanned: boolean, isActivated: boolean, activationLink: string, self_registration: string, promocode: string, agreement: boolean, premium_status: boolean, two_step_status: boolean, domainName: string, dateOfEntry: string, name?: string) {

    mysql.query(`
        INSERT INTO user_auth 
        ( email, password, isUser, isAdmin, isStaff, isBanned, isActivated, activationLink, self_registration, promocode, agreement, premium_status, two_step_status, domain_name, date_of_entry, name) 
        VALUES 
        ( "${email}", "${password}", ${isUser}, ${isAdmin}, ${isStaff}, ${isBanned}, ${isActivated}, "${activationLink}", "${self_registration}", "${promocode}", ${agreement} ${premium_status}, ${two_step_status}, "${domainName}", "${dateOfEntry}", "${name || ''}")`,
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

  async DisableTwoStep(user_id: number) {
    mysql.query(`
      UPDATE user_auth
      SET two_step_status = ${true}
      WHERE ID = ${user_id}`,
      (e: any, result) => {
        if (e) return console.error(new Error(e))
        console.log('2fa status was update');

      })
  }

  async EnablePremiumStatus(user_id: number, status: boolean) {
    mysql.query(`
      UPDATE user_auth
      SET premium_status = ${status}
      WHERE ID = ${user_id}`,
      (e: any, result) => {
        if (e) return console.error(new Error(e))
        console.log('premium status was update');

      })
  }

  async ChangeUserName(user_id: number, userName: string) {
    mysql.query(`
      UPDATE user_auth
      SET name = "${userName}"
      WHERE ID = ${user_id}`,
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

  async SaveUserKyc(first_name: string, last_name: string, email: string, phone_number: number, date_of_birth: string, document_number: string, main_address: string, city: string, country_name: string, zip_code: number, document_type: string, status: string, user_id: number, state?: string, sub_address?: string) {

    mysql.query(`
      INSERT INTO user_kyc
      ( first_name, last_name, email, phone_number, date_of_birth, document_number, main_address, city, country_name, zip_code, document_type, kyc_status, user_id, state, sub_address)
      VALUES
      ( "${first_name}", "${last_name}", "${email}", ${phone_number}, "${date_of_birth}", "${document_number}", "${main_address}", "${city}", "${country_name}", ${zip_code}, "${document_type}", "${status}", ${user_id}, "${state || ''}", "${sub_address || ''}" )`,
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
      })
  }

  async GetLogsForUser(user_id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT ip_address, action_date
        FROM user_logs
        WHERE user_id = ${user_id}
        GROUP BY ID
        ORDER BY MAX (ID)
        desc`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
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
        WHERE isAdmin = ${false} AND domain_name = "${domain_name}"
        GROUP BY ID
        ORDER BY MAX (ID)
        desc`,
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
        WHERE user_id = ${user_id}
        GROUP BY ID
        ORDER BY MAX (ID)
        desc`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async GetUsersByIp(ip_address: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT DISTINCT email, ip_address
        FROM user_logs
        WHERE user_logs.ip_address = "${ip_address}"
        GROUP BY ID`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async GetKycForStaff(user_domain: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT user_kyc.ID, user_auth.date_of_entry, user_auth.name, user_auth.email, user_kyc.document_type, user_kyc.country_name, user_kyc.city, user_kyc.zip_code, user_kyc.state, user_kyc.kyc_status
        FROM user_kyc
        JOIN user_auth 
        ON user_kyc.user_id = user_auth.ID
        WHERE user_auth.domain_name = "${user_domain}"
        AND user_auth.isAdmin = ${false}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async getKycForUpdate(kyc_id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT kyc_status
        FROM user_kyc
        WHERE ID = ${kyc_id}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async ChangeKycStatus(status: string, kyc_id: number) {
    mysql.query(`
      UPDATE user_kyc
      SET kyc_status = "${status}"
      WHERE ID = ${kyc_id} `,
      (err) => {
        if (err) return console.error(err);
        console.log('status was updated')
      })
  }


  async SavePromocode(newCode: string, date: string, value: number, staff_user_id: number, domain: string) {
    mysql.query(`
      INSERT INTO user_promocode
      ( code, date, value, staff_user_id, domain_name)
      VALUES 
      ( "${newCode}", "${date}", ${value}, ${staff_user_id}, "${domain}" ) `,
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
        GROUP BY ID
        ORDER BY MAX (ID)
        desc`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async GetPromocodeToDelete(code: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM user_promocode
        WHERE code = "${code}"`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async DeletePromocodeFromUserPromocode(code: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        DELETE FROM user_promocode
        WHERE code = "${code}"`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }


  async SaveUsedPromocode(code: string, date: string, value: number, staff_id: number, domain_name: string, user_email: string) {
    mysql.query(`
      INSERT INTO used_promocode
      ( code, date, value, staff_user_id, domain_name, used_by_user)
      VALUES 
      ( "${code}", "${date}", ${value}, ${staff_id}, "${domain_name}", "${user_email}" )`,
      (err) => {
        if (err) return console.error(err)
        console.log('done');
      })
  }

  async GetUsedPromocode(code: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM used_promocode
        WHERE code = "${code}"
        GROUP BY ID
        ORDER BY MAX (ID)
        desc`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async GetUsedPromocodeListForStaff(staff_id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM used_promocode
        WHERE staff_user_id = ${staff_id}
        GROUP BY ID
        ORDER BY MAX (ID)
        desc`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async SaveStaffLogs(staff_email: string, staff_action: string, staff_domain: string, staff_id: number) {
    mysql.query(`
      INSERT INTO staff_logs
      ( staff_email, staff_action, staff_domain, staff_id)
      VALUES 
      ( "${staff_email}", "${staff_action}", "${staff_domain}", ${staff_id} )`,
      (err) => {
        if (err) return console.error(err)
        console.log('done');
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
        FROM user_auth
        GROUP BY ID
        ORDER BY MAX (ID)
        desc`,
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
        FROM user_kyc
        JOIN user_auth 
        ON user_kyc.email = user_auth.email
        GROUP BY ID
        ORDER BY MAX (ID)
        desc`,
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
        FROM user_promocode
        GROUP BY ID
        ORDER BY MAX (ID)
        desc`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async GetUsedPromocodeListForAdmin() {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM used_promocode
        GROUP BY ID
        ORDER BY MAX (ID)
        desc`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

}

export default new Database()