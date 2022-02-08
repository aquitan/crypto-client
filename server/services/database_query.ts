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

  async CreateUser(email: string, password: string, activationLink: string, self_registration: string, promocode: string, agreement: boolean, domainName: string, dateOfEntry: string, name?: string) {
    mysql.query(`
      INSERT INTO user_auth 
      ( email, password, activationLink, self_registration, promocode, agreement, domain_name, date_of_entry, name) 
      VALUES 
      ( "${email}", "${password}", "${activationLink}", "${self_registration}", "${promocode}", ${agreement},"${domainName}", "${dateOfEntry}", "${name || ''}" )`,
      (err, result) => {
        if (err) console.error(err)
        console.log('done')
        console.log('user was created');
      })
  }

  async GetUserLogs(ipAddress: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT ip_address
        FROM user_logs
        WHERE ip_address = "${ipAddress}"`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async SaveIpMatch(user_email: string, user_ip_address: string, login_date: string, browser: string) {
    mysql.query(`
      INSERT INTO user_ip_match
      ( user_email, user_ip_address, login_date, browser) 
      VALUES 
      ( "${user_email}", "${user_ip_address}", "${login_date}", "${browser}" )`,
      (err, result) => {
        if (err) console.error(err)
        console.log('done')
        console.log('ip match logs was saved');
      })
  }

  async GetIpMatch(user_email: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM user_ip_match
        WHERE user_email = "${user_email}"`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async DeleteIpMatchLogs(ipAddress: string) {
    mysql.query(`
      DELETE FROM  user_ip_match
      WHERE user_ip_address = "${ipAddress}"`,
      (err) => {
        if (err) return console.error(err)
        console.log('done');
      })
  }

  async SaveBaseUserParams(double_deposit: boolean, swap_ban: boolean, internal_ban: boolean, isUser: boolean, isStaff: boolean,
    isAdmin: boolean, isBanned: boolean, isActivated: boolean, premium_status: boolean, two_step_status: boolean, agreement: boolean, user_id: number) {

    mysql.query(`
      INSERT INTO user_params 
      ( double_deposit, swap_ban, internal_ban, isUser, isStaff, isAdmin, isBanned, isActivated, premium_status, two_step_status, agreement, user_id) 
      VALUES 
      ( ${double_deposit}, ${swap_ban}, ${internal_ban}, ${isUser}, ${isStaff}, ${isAdmin}, ${isBanned}, ${isActivated}, ${premium_status}, ${two_step_status}, ${agreement}, ${user_id})`,
      (err, result) => {
        if (err) console.error(err)
        console.log('done')
        console.log('user params was saved');
      })
  }

  async UpdateActivatedStatus(user_id: number) {
    mysql.query(`
      UPDATE user_params
      SET isActivated = ${true}
      WHERE user_id = ${user_id}`,
      (e: any, result) => {
        if (e) return console.error(new Error(e))
        console.log('update isActivated status - success');
      })
  }

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

  async UpdatePremiumStatus(user_id: number, status: boolean) {
    mysql.query(`
      UPDATE user_params
      SET premium_status = ${status}
      WHERE user_id = ${user_id}`,
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

  async GetUserById(user_id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM user_auth
        WHERE ID = ${user_id}`,
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

  async GetBaseUserParamsById(user_id: number | false,) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT user_auth.ID, user_auth.name, user_auth.email, user_params.isActivated, user_params.isUser, 
        user_params.double_deposit, user_params.swap_ban, user_params.internal_ban, user_params.isBanned, 
        user_params.isStaff, user_params.isAdmin,user_params.isBanned,
        user_params.two_step_status, user_params.premium_status 
        FROM user_params
        JOIN user_auth
        ON user_params.user_id = user_auth.ID
        WHERE user_auth.ID = ${user_id}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async GetBaseUserParamsByEmail(email: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT user_auth.ID, user_auth.name, user_auth.email, user_params.isActivated, user_params.isUser, 
        user_params.isStaff, user_params.isAdmin,user_params.isBanned,
        user_params.two_step_status, user_params.premium_status 
        FROM user_params
        JOIN user_auth
        ON user_params.user_id = user_auth.ID
        WHERE user_auth.email = "${email}"`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  // SELECT user_auth.ID, user_auth.name, user_auth.email, user_params.isActivated, user_params.isUser, user_params.isStaff, user_params.isAdmin, user_params.isBanned, user_params.two_step_status, user_params.premium_status FROM user_params JOIN user_auth ON user_params.user_id = user_auth.ID  WHERE user_auth.ID = 9;


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
      ( email, ip_address, request_city, country_name, location, browser, action_date, user_action, user_domain, user_id )
      VALUES
      ( "${email}", "${ipAddress}", "${city}", "${countryName}", "${coordinates}", "some browsr", "${currentDate}", "${user_action}", "${user_domain}", ${user_id} )`,
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
        JOIN user_params
        ON user_auth.ID = user_params.user_id
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
        SELECT user_kyc.ID, user_params.user_id, user_auth.date_of_entry, user_auth.name, user_auth.email, user_kyc.document_type, user_kyc.country_name, user_kyc.city, user_kyc.zip_code, user_kyc.state, user_kyc.kyc_status
        FROM user_kyc
        JOIN user_auth 
        ON user_kyc.user_id = user_auth.ID
        JOIN user_params
        ON user_params.user_id = user_kyc.user_id
        WHERE user_auth.domain_name = "${user_domain}"
        AND user_params.isAdmin = ${false}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async GetKycForUpdate(kyc_id: number) {
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

  async UpdateSwapBanStatus(user_id: number, status: boolean) {
    mysql.query(`
      UPDATE user_params
      SET swap_ban = ${status}
      WHERE user_id = ${user_id} `,
      (err) => {
        if (err) return console.error(err);
        console.log('status was updated')
      })
  }

  async UpdateInternalBanStatus(user_id: number, status: boolean) {
    mysql.query(`
      UPDATE user_params
      SET internal_ban = ${status}
      WHERE user_id = ${user_id} `,
      (err) => {
        if (err) return console.error(err);
        console.log('status was updated')
      })
  }

  async UpdateFullBanStatus(user_id: number, status: boolean) {
    mysql.query(`
      UPDATE user_params
      SET isBanned = ${status}
      WHERE user_id = ${user_id} `,
      (err) => {
        if (err) return console.error(err);
        console.log('status was updated')
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

  async GetKycBeforeDelete(kyc_id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM user_kyc
        WHERE ID = ${kyc_id}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async SaveStaffParams(staff_email: string, payment_fee: number, support_name: string, get_staff_access_date: string, user_who_give_access: number) {
    mysql.query(`
      INSERT INTO staff_params
      (staff_email, payment_fee, support_name, get_staff_access_date, user_who_give_access )
      VALUES
      ( "${staff_email}", ${payment_fee}, "${support_name}", "${get_staff_access_date}", ${user_who_give_access})`,
      (e: any, result) => {
        if (e) return console.error(new Error(e));
        console.log('db res: ', result);

      })

  }

  async GetStaffParamsById(staff_email: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM staff_params
        WHERE staff_email = "${staff_email}"`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async UpdateStaffSupportName(staff_email: string, updated_name: string) {
    mysql.query(`
      UPDATE staff_params
      SET support_name = "${updated_name}"
      WHERE staff_email = "${staff_email}" `,
      (err) => {
        if (err) return console.error(err);
        console.log('support name was updated')
      })
  }

  async UpdateDoubleDepositStatus(user_id: number, status: boolean) {
    mysql.query(`
      UPDATE user_params
      SET double_deposit = ${status}
      WHERE user_id = ${user_id} `,
      (err) => {
        if (err) return console.error(err);
        console.log('status was updated')
      })
  }


  async DeleteKyc(kyc_id: number) {
    mysql.query(`
      DELETE FROM user_kyc
      WHERE ID = ${kyc_id} `,
      (err) => {
        if (err) return console.error(err);
        console.log('kyc was delete')
      })
  }


  async SavePromocode(newCode: string, date: string, value: number, currency: string, notif: string, staff_user_id: number, domain: string) {
    mysql.query(`
      INSERT INTO user_promocode
      ( code, date, value, currency, notification_text, staff_user_id, domain_name)
      VALUES 
      ( "${newCode}", "${date}", ${value}, "${currency}", "${notif}", ${staff_user_id}, "${domain}" ) `,
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


  async SaveUsedPromocode(code: string, date: string, value: number, currency: string, notification_text: string, staff_id: number, domain_name: string, user_email: string) {
    mysql.query(`
      INSERT INTO used_promocode
      ( code, date, value, currency, notification_text, staff_user_id, domain_name, used_by_user)
      VALUES 
      ( "${code}", "${date}", ${value}, "${currency}", "${notification_text}", ${staff_id}, "${domain_name}", "${user_email}" )`,
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


  async CreateNewDomain(baseDomainData: any) {
    mysql.query(`
      INSERT INTO domain_list
      ( full_domain_name, domain_name, company_address, company_phone_number, company_email, company_owner_name, company_year, company_country, domain_owner)
      VALUES 
      ( "${baseDomainData.fullDomainName}", "${baseDomainData.domainName}", "${baseDomainData.companyAddress}", "${baseDomainData.companyPhoneNumber}",
       "${baseDomainData.companyEmail}", "${baseDomainData.companyOwnerName}", "${baseDomainData.companyYear}", "${baseDomainData.companyCountry}", "${baseDomainData.domainOwnerEmail}" )`,
      (err) => {
        if (err) return console.error(err)
        console.log('done');
      })
  }

  async GetBaseDomainInfo(domain_name: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM domain_list
        WHERE full_domain_name = "${domain_name}"`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async SaveDomainDetailInfo(object: any) {
    mysql.query(`
      INSERT INTO domain_detail
      ( show_news, double_deposit, deposit_fee, rate_correct_sum, min_deposit_sum, 
        min_withdrawal_sum, currency_swap_fee, internal_swap_fee, date_of_create, domain_id)
      VALUES 
      ( "${object.showNews}", "${object.double_deposit}", "${object.depositFee}", "${object.rateCorrectSum}",
       "${object.minDepositSum}", "${object.minWithdrawalSum}", "${object.currencySwapFee}", "${object.internalSwapFee}", 
        "${object.dateOfDomainCreate}", "${object.domainId}" )`,
      (err) => {
        if (err) return console.error(err)
        console.log('done');
      })
  }

  async GetDomainListForStaff(staff_email: string) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT domain_list.ID, domain_list.full_domain_name, domain_list.domain_owner, domain_detail.date_of_create
        FROM domain_list
        JOIN domain_detail
        ON domain_list.ID = domain_detail.domain_id
        WHERE domain_list.domain_owner = "${staff_email}"
        MAX (domain_list.ID)
        desc`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }


  async SaveDomainErrors(full_domain_name: string, error_name: string, error_title: string, error_text: string, error_btn: string) {
    mysql.query(`
      INSERT INTO domain_withdrawal_error
      ( domain_name, error_name, error_title, error_text, error_btn )
      VALUES 
      ( "${full_domain_name}", "${error_name}", "${error_title}", "${error_text}","${error_btn}" )`,
      (err) => {
        if (err) return console.error(err)
        console.log('done');
      })
  }

  async GetDomainErrorsList(domain_id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM domain_withdrawal_error
        WHERE domain_id = ${domain_id}`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

  async SaveUserNotification(text: string, user_email: string) {
    mysql.query(`
      INSERT INTO user_notification
      ( text, user_email)
      VALUES 
      ( "${text}", "${user_email}" )`,
      (err) => {
        if (err) return console.error(err)
        console.log('done');
      })
  }

  async GetUserNotification(user_id: number) {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT *
        FROM user_notification
        WHERE user_id = ${user_id}`,
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

  async UpdateStaffStatus(user_id: number, status: boolean) {
    mysql.query(`
      UPDATE user_params
      SET isStaff = ${status}
      WHERE user_id = ${user_id} `,
      (err) => {
        if (err) return console.error(err);
        console.log('status was updated')
      })
  }

  async GetDomainListForAdmin() {
    return new Promise((resolve, reject) => {
      mysql.query(`
        SELECT domain_list.ID, domain_list.full_domain_name, domain_list.domain_owner, domain_detail.date_of_create
        FROM domain_list
        JOIN domain_detail
        ON domain_list.ID = domain_detail.domain_id
        MAX (domain_list.ID)
        desc`,
        (e: any, result) => {
          if (e) reject(new Error(e))
          resolve(result)
        })
    })
  }

}

export default new Database()