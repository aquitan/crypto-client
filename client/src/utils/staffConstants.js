export const links = [
    {link: '/', text: 'User Dashboard'},
    {link: '/staff', text: 'Главная'},
    {link: '/staff/users', text: 'Пользователи'},
    {link: '/staff/create-user', text: 'Создать пользователя'},
    {link: '/staff/staff-kyc', text: 'KYC'},
    {link: '/staff/promocodes', text: 'Промокоды'},
    {link: '/staff/wallets', text: 'Кошельки'},
    {link: '/staff/staff-errors', text: 'Ошибки'},
    {link: '/staff/domains', text: 'Домены'},
    {link: '/staff/project-support', text: 'Поддержка'},
    {link: '/staff/terms', text: 'Пользовательское соглашение'},
    {link: '/staff/transactions', text: 'Создать транзакцию'},
    {link: '/staff/create-news', text: 'Создать новости'},
    {link: '/staff/group-list', text: 'Список групп'},
]

export const domainsInputs = [
    {name: 'domainName', text: 'Название', type: 'AdminInput', inp: 'text'},
    {name: 'companyAddress', text: 'Адрес', type: 'AdminInput', inp: 'text'},
    {name: 'companyPhoneNumber', text: 'Номер телефона', type: 'AdminInput', inp: 'text'},
    {name: 'companyEmail', text: 'Почта', type: 'AdminInput', inp: 'text'},
    {name: 'companyOwnerName', text: 'Имя владельца', type: 'AdminInput', inp: 'text'},
    {name: 'companyCountry', text: 'Старна создания', type: 'AdminInput', inp: 'text'},
]
export const domainsInputsNums = [
    {name: 'companyYear', text: 'Год создания', type: 'AdminInput', inp: 'number'},
    {name: 'depositFee', text: 'Комиссия при пополнении', type: 'AdminInput', inp: 'text'},
    {name: 'rateCorrectSum', text: 'Корректировка курса в %', type: 'AdminInput', inp: 'text'},
    {name: 'minDepositSum', text: 'Минимальный депозит', type: 'AdminInput', inp: 'text'},
    {name: 'minWithdrawalSum', text: 'Минимальный вывод', type: 'AdminInput', inp: 'text'},
    // {name: 'internalSwapFee', text: 'Коммиссия на интернал свапе', type: 'AdminInput', inp: 'number'},
    {name: 'currencySwapFee', text: 'Коммиссия на свапе', type: 'AdminInput', inp: 'text'},
]

export const domainSelect = [
    {
        name: 'showNews', text: 'Показывать новости?', type: 'Select', options: [
            {value: false, text: 'Нет'},
            {value: true, text: 'Да'},
        ]
    },
    {
        name: 'doubleDeposit', text: 'Удваивать депозит?', type: 'Select', options: [
            {value: false, text: 'Нет'},
            {value: true, text: 'Да'},
        ]
    },
]

export const optionsAction = [
    {value: 'Верификация адреса'},
    {value: 'Верификация документов'},
    {value: 'Страховка'},
    {value: 'Премиум'},
    {value: 'Штраф за мульти акк'},
    {value: 'Кастомная ошибка'}
]
export const optionsButton = [
    {value: 'OK', text: 'OK'},
    {value: 'Close', text: 'Close'},
    {value: 'Support', text: 'Support'},
    {value: 'Без кнопки', text: 'Без кнопки'},
]
export const optionsCurrency = [
    {value: 'BTC', text: 'BTC'},
    {value: 'ETH', text: 'ETH'},
    {value: 'BCH', text: 'BCH'},
    {value: 'USDT', text: 'USDT'},
]
export const optionsUsers = [
    {value: 'super-user'},
]
export const defaultErrors = [
    {
        errorName: 'Верификация адреса',
        name: 'Address Verification',
        text: 'You can withdraw your funds only on address, which is registered and verified with your account. ' +
            'To verify your address with your account, you need to make a deposit from this address. Minimal amount of the deposit is 0.02 BTC'
    },
    {
        errorName: 'Верификация документов',
        name: 'Documents Verification',
        text: 'Dear User, you need to verify your identity in order to withdraw funds. ' +
            'To complete the KYC verification procedure, you have to confirm your identity on the Verification tab and contact the customer support.'
    },
    {
        errorName: 'Страховка',
        name: 'Insurance',
        text: 'To withdraw your funds you need to make an insurance payment, because you are from a high-risk of illegal financial transaction country. ' +
            'This insurance payment will be refunded after 14 days to your account, if you have no complaints. ' +
            'This rule is introduced according to European law and it is written in User Agreement (2). The amount of insurance is 0.1 BTC.'
    },
    {
        errorName: 'Премиум',
        name: 'Premium',
        text: 'According to the rules of our Exchange, if your registration term is less than 1 month, to make withdraw you need to buy premium account. ' +
            'This rule is written in User Agreement (1.5), ' +
            'which was accepted by you during registration. Premium account for one month costs 0.05 BTC.'
    },
    {
        errorName: 'Штраф за мультиакк',
        name: 'Multi-account',
        text: 'Creating multi-account is forbidden. One User - one account. In case if our system identify multi-account, account with less balance will be banned. User should pay the penalty for creating multi-account. ' +
            'The amount of this penalty is 0.25 BTC.'
    },

]

export const tableHeaderDomains = ['#', 'Domain', 'Username', 'Date & time', 'Action']
export const twoFaElems = [
    {
        value: 'Email',
        text: 'Email'
    },
    {
        value: 'Google',
        text: 'Google'
    },
    {
        value: 'Telegram',
        text: 'Telegram'
    }
]



export const textareaTerms = (domainSmall, domainBig, domainSupport) => {
    let term = `<h2>PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY. BY CLICKING THE "CREATE ACCOUNT" BUTTON OR BY ACCESSING OR USING THE SERVICES, YOU AGREE TO BE LEGALLY BOUND hBY THESE TERMS AND CONDITIONS AND ALL TERMS INCORPORATED BY REFERENCE.</h2>
    <p>This summary of our Terms and Conditions offers you an overview of the key terms that apply to your use of our website and trading services. While we hope this summary section is helpful, you should read the complete Terms and Conditions of Service below since they provide important information about how our services work. Please note that we refer to our online service where you can execute trades as "${domainSmall}".</p>
    <h3>Our Services</h3>
    <p>${domainSmall} provides you with a simple and convenient way to trade one type of digital asset for another type of digital asset. Our services do not provide users with the ability to trade one form of legal tender for another form of legal tender. Additionally, the range of services available to you will depend in part upon the countries from which you access ${domainSmall}.</p>
    <h3>Eligibility and Acceptable Use</h3>
    <p>You must meet certain eligibility criteria to use ${domainSmall}. For instance, you must be an adult and there are certain locations from which you may not be able to use some or all of ${domainSmall}. Additionally, there are certain things you cannot do when using ${domainSmall}, such as engage in illegal activities, lie, or do anything that would cause damage to our services or systems. Please see the acceptable use section for more details.</p>
    <h3>Trading Risks</h3>
    <p>Engaging in any trade can be financially risky, and there can be higher financial risks if you engage in any margin transactions, use any other sophisticated trading options, or trade in digital assets that are subject to volatile market price movements. Please don't use ${domainSmall} if you do not understand these risks and enter into trades only when you understand the trading option you are using, the characteristics of the digital asset you intend to trade, and the potential financial risk of loss trading them entails.</p>
    <h3>Other Important Legal Terms</h3>
    <p>There are important legal terms provided below in the complete Terms and Conditions, including your indemnification responsibilities, our limitation of liability and warranty disclaimers, and your agreement to arbitrate most disputes. Please take the time to read these terms carefully. You can always contact us through support if you have any questions at ${domainSupport}</p>
    <h3>1. Complete Terms and Conditions</h3>
    <p>These Terms and Conditions and any terms expressly incorporated herein ("Terms and Conditions") apply to your access to and use of the websites and mobile applications ${domainSmall},  and its wholly owned subsidiaries (collectively, "${domainSmall}", "we", or "us"), and the trading and direct sale services provided by ${domainSmall} as described in these Terms and Conditions (collectively, our "Services").</p>
    <h3>Key Definitions</h3>
    <p>Capitalized terms not otherwise defined in these Terms and Conditions will have the following meaning:</p>
    <p>1.1\t"External Account" means any Financial Account or Digital Asset Account: from which you may load Funds into your ${domainSmall} Account, and to which you may transfer Funds from your ${domainSmall} Account.</p>
    <p>1.2\t"Financial Account" means any financial account of which you are the beneficial owner that is maintained by a third party outside of the Services, including, but not limited to third-party payment service accounts or accounts maintained by third party financial institutions.</p>
    <p>1.3\t"Funds" means Digital Asset and/or Legal Tender.</p>
    <p>1.4\t"Legal Tender" means any national currency, such as U.S. dollars, that may be used as the equivalent to display the comparative value of Digital Assets.</p>
    <p>1.5\t"Premium Account" It's a special Account status provided by the ${domainSmall} Service that have its own activation value and it can be assigned to User(s) if they met special requirements such as Country of Residence and digital assets monthly turnover.</p>
    <p>1.6\t"${domainSmall} Account" means a user account accessible via the Services where Funds may be stored by ${domainSmall} on behalf of a user.</p>
    <p>1.7\t"Digital Asset" means bitcoins, ethereum and other digital assets that may be purchased, sold or traded via the Services.</p>
    <p>1.8\t"Digital Asset Account" means any Digital Asset address or account owned, controlled or operated by you that is maintained outside of the Services, and is not owned, controlled or operated by ${domainSmall}.</p>
    <p>1.9\t"System" means fully automatic software algorithm, which controls all parts and aspects of the exchange’s operations. System defines type of transactions, calculate fees, changes, and monitors status of your account, defines amount of special payments, to reduce the likelihood of the human factor. Any interference with System is prohibited by this document. Any action aimed as disabling System will entail any legitimate consequences.</p>
    <h3>2. Eligibility</h3>
    <p>${domainSmall} may not make the Services available in all markets and jurisdictions and may restrict or prohibit use of the Services from certain U.S. states or foreign jurisdictions ("Restricted Locations"). Certain Locations (“High-risk Locations for illegal financial transactions and fraud”) can impose certain restrictions such as an insurance payment, restriction in using some features, special limits and other restrictions, which can be defined and established by the System. The use of special programs and software to hide the real location will have consequences that will be also determined by the System.</p>
    <p>You further represent and warrant that you: (a) are of legal age to form a binding contract (at least 18 years old in the U.S.); (b) have not previously been suspended or removed from using our Services; (c) have full power and authority to enter into this agreement and in doing so will not violate any other agreement to which you are a party; (d) are not located in, under the control of, or a national or resident of (i) any Restricted Locations, or (ii) any country to which the United States has embargoed goods or services; (e) are not identified as a "Specially Designated National;" (f) are not placed on the Commerce Department’s Denied Persons List; and (g) will not use our Services if any applicable laws in your country prohibit you from doing so in accordance with these Terms and Conditions.</p>
    <h3>3.\t${domainSmall} Account</h3>
    <p>3.1\tNumber of ${domainSmall} Accounts. ${domainSmall} may, in its sole discretion, limit the number of ${domainSmall} Accounts that you may hold, maintain, or acquire. Creating multiple accounts is forbidden and may have consequences due to the blocking of the account, both or all accounts, funds, penalty, and other necessary measures taken by the arbitration this dispute.</p>
    <p>3.2\t${domainSmall} Account information and security. In order to engage in any trades via the Services, you must create a ${domainSmall} Account and provide any requested information. When you create a ${domainSmall} Account, you agree to: (a) create a strong password that you do not use for any other website or online service; (b) provide accurate and truthful information; (c) maintain and promptly update your ${domainSmall} Account information; (d) maintain the security of your ${domainSmall} Account by protecting your password and restricting access to your ${domainSmall} Account; (e) promptly notify us if you discover or otherwise suspect any security breaches related to your ${domainSmall} Account; and (f) take responsibility for all activities that occur under your ${domainSmall} Account and accept all risks of any authorized or unauthorized access to your ${domainSmall} Account, to the maximum extent permitted by law.</p>
    <h3>4.\tPrivacy Policy</h3>
    <p>Please refer to our Privacy Policy for information about how we collect, use and share your information.</p>
    <h3>5.\tGeneral Obligations </h3>
    <p>This Section 5 applies to: (i) all trades completed via the Services, (ii) your purchase and/or sale of Digital Assets directly from ${domainSmall} via the Services, and (iii) any transaction in which you load Funds into your ${domainSmall} Account from your External Account or transfer Funds from your ${domainSmall} Account into an External Account.</p>
    <p>5.1\tConditions and Restrictions. We may, at any time and in our sole discretion, refuse any trade submitted via the Services, impose limits on the trade amount permitted via the Services or impose any other conditions or restrictions upon your use of the Services for funding your ${domainSmall} Account or for trading without prior notice. For example, we may limit the number of open orders that you may establish via the Services or we may restrict trades from certain locations.</p>
    <p>5.2\tAccuracy of Information. You must provide any information required when creating a ${domainSmall} Account or when prompted by any screen displayed within the Services. You represent and warrant that any information you provide via the Services is accurate and complete.</p>
    <p>5.3\tCancellations. You may only cancel an order initiated via the Services if such cancellation occurs before ${domainSmall} executes the transaction. Once your order has been executed, you may not change, withdraw, or cancel your authorization for ${domainSmall} to complete such transaction. If an order has been partially filled, you may cancel the unfilled remainder unless the order relates to a market trade. We reserve the right to refuse any cancellation request associated with a market order once you have submitted such order. In contrast to exchange orders, all trades are irreversible once initiated. While we may, at our sole discretion, reverse a trade under certain extraordinary conditions, a customer does not have a right to a reversal of a trade.</p>
    <p>5.4\tInsufficient Funds. If you have an insufficient amount of Funds in your ${domainSmall} Account to complete an order via the Services, we may cancel the entire order or may fulfill a partial order using the amount of Funds currently available in your ${domainSmall} Account, less any fees owed to ${domainSmall} in connection with our execution of the trade (as described in Section 9).</p>
    <p>5.5\tWallet Address Verification. If you transfer funds to your ${domainSmall} Account from an external service or wallet, your external address is automatically added to the list of verified wallets with your account. Balance withdrawals are allowed only into verified external wallet address.</p>
    <p>5.6\tTaxes. It is your responsibility to determine what, if any, taxes apply to the trades you complete via the Services, and it is your responsibility to report and remit the correct tax to the appropriate tax authority. You agree that ${domainSmall} is not responsible for determining whether taxes apply to your trades or for collecting, reporting, withholding, or remitting any taxes arising from any trades.</p>
    <h3>6.\t${domainSmall} Account Funds</h3>
    <p>6.1\tFunding your ${domainSmall} Account. In order to complete an order or trade via the Services (as described in Section 7), you must first load Funds to your ${domainSmall} Account using one of the approved External Accounts identified via the Services. You may be required to verify that you control the External Account that you use to load Funds to your ${domainSmall} Account. As further described in Section 9, you may be charged fees by the External Account you use to fund your ${domainSmall} Account. ${domainSmall} is not responsible for any External Account fees or for the management and security of any External Account. You are solely responsible for your use of any External Account, and you agree to comply with all Terms and Conditions applicable to any External Account. The timing associated with a load transaction will depend in part upon the performance of third parties responsible for maintaining the applicable External Account, and ${domainSmall} makes no guarantee regarding the amount of time it may take to load Funds into your ${domainSmall} Account. </p>
    <p>6.2\tTransferring Funds to an External Account. Provided that the balance of Funds in your ${domainSmall} Account is greater than any minimum balance requirements needed to satisfy any of your open positions, and subject to the restrictions, you may transfer any amount of Funds, up to the total amount of Funds in your ${domainSmall} Account in excess of such minimum balance requirements, from your ${domainSmall} Account to an External Account, less any fees charged by ${domainSmall} for such transactions (at the time of your request to transfer Funds to an External Account).</p>
    <p>6.3\tLoad/Transfer Authorization. When you request that we load Funds into your ${domainSmall} Account from your External Account or request that we transfer Funds to your External Account from your ${domainSmall} Account, you authorize ${domainSmall} to execute such transaction via the Services.</p>
    <p>6.4\tRejected Transactions. In some cases, an External Account may reject your Funds or may otherwise be unavailable to receive your Funds. You agree that you will not hold ${domainSmall} liable for any damages resulting from such rejected transactions.</p>
    <h3>7.\tExchange Orders and Trades</h3>
    <p>This Section applies only when you use the Services to trade Digital Assets for Legal Tender or vice versa, or to trade Digital Assets for another form of Digital Assets. ${domainSmall} does not purchase, sell, or exchange any Digital Assets on its own behalf.</p>
    <p>7.1\tAuthorization. When you submit a new order via the Services, you authorize ${domainSmall} to execute a transaction in accordance with such order on a spot basis and charge you any applicable fees (as described in Section 10).</p>
    <p>7.2\tIndependent relationship. You acknowledge and agree that: (a) ${domainSmall} is not acting as your broker, intermediary, agent, or advisor or in any fiduciary capacity, and (b) no communication or information provided to you by ${domainSmall} shall be considered or construed as advice.</p>
    <p>7.3\tTrade confirmation. Once the Services execute your trade, a confirmation will be electronically made available via the Services detailing the particulars of the trade. You acknowledge and agree that the failure of the Services to provide such confirmation shall not prejudice or invalidate the terms of such trade.</p>
    <p>7.4\tTrade options. Please refer to the %General_basics%, for information about the terminology used in connection with the trading options made available via the Services. If you do not understand the meaning of any trade option, we strongly encourage you not to utilize any of those options.</p>
    <p>7.5\tMarket rates. If you select a market trade, ${domainSmall} will attempt, on a commercially reasonable basis, to execute the trade on or close to the prevailing market exchange rate, as defined via the Services. You acknowledge and agree that the exchange rate information made available via our Services may differ from prevailing exchange rates made available via other sources outside of the Services.</p>
    <p>7.6\tMarket volatility. Particularly during periods of high volume, illiquidity, fast movement or volatility in the marketplace for any Digital Assets or Legal Tender, the actual market rate at which a market order or trade is executed may be different from the prevailing rate indicated via the Services at the time of your order or trade. You understand that we are not liable for any such price fluctuations. In the event of a market disruption or Force Majeure event (as defined in Section 24), ${domainSmall} may do one or more of the following: (a) suspend access to the Services; or (b) prevent you from completing any actions via the Services, including closing any open positions. Following any such event, when trading resumes, you acknowledge that prevailing market rates may differ significantly from the rates available prior to such event.</p>

    <h3>8.\tRisk Disclosure</h3>
    <p>8.1\tTrading risks. You acknowledge and agree that you shall access and use the Services at your own risk. The risk of loss in trading Digital Asset pairs and Digital Asset and Legal Tender pairs can be substantial. You should, therefore, carefully consider whether such trading is suitable for you your circumstances and financial resources.</p>

    <p>You should be aware of the following points:</p>
    <p>8.2\tYou may sustain a total loss of the Funds in your ${domainSmall} Account, and, in some cases, you may incur losses beyond such Funds.</p>
    <p>8.3\tUnder certain market conditions, you may find it difficult or impossible to liquidate a position. This can occur, for example, when the market reaches a daily price fluctuation limit or there is insufficient liquidity in the market.</p>
    <p>8.3\tPlacing contingent orders, such as "stop-loss" or "stop-limit" orders, will not necessarily limit your losses to the intended amounts, since market conditions may make it impossible to execute such orders.</p>
    <p>8.4\tAll Digital Asset positions involve risk, and a "spread" position may not be less risky than an outright "long" or "short" position.</p>
    <p>8.5\tThe use of leverage can work against you as well as for you and can lead to large losses as well as gains. </p>

    <p>ALL OF THE POINTS NOTED ABOVE APPLY TO ALL DIGITAL ASSET PAIR AND DIGITAL ASSET AND LEGAL TENDER PAIR TRADING. THIS BRIEF STATEMENT CANNOT, OF COURSE, DISCLOSE ALL THE RISKS AND OTHER ASPECTS ASSOCIATED WITH THESE TRADES.</p>

    <p>8.6\tInternet transmission risks. You acknowledge that there are risks associated with utilizing an Internet-based trading system including, but not limited to, the failure of hardware, software, and Internet connections. You acknowledge that ${domainSmall} shall not be responsible for any communication failures, disruptions, errors, distortions or delays you may experience when trading via the Services, however caused.</p>

    <h3>9.\tDigital Asset Terms of Sale</h3>
    <p>This Section applies only when you use the Services to purchase or sell Digital Assets directly from ${domainSmall}, a service available in limited jurisdictions only.</p>

    <p>9.1\tPrices; Availability. All prices reflect the exchange rates applicable to the purchase or sale of Digital Assets using the Legal Tender or alternative form of Digital Assets identified in your purchase order. All Digital Asset sales and purchases by ${domainSmall} are subject to availability, and we reserve the right to discontinue the sale and purchase of Digital Assets without notice.</p>
    <p>9.2\tPurchase Quotes. Prior to completing your purchase or sale of Digital Assets from ${domainSmall}, we will provide notice of the amount of Digital Assets you intend to purchase or sell and the amount of Funds you will be required to pay to ${domainSmall} to receive such Digital Assets or Legal Tender. You agree to comply with any Terms and Conditions provided within such notice to complete your purchase transaction.</p>
    <p>9.3\tErrors. In the event of an error, whether via our Services, in a purchase order confirmation, in processing your purchase, or otherwise, we reserve the right to correct such error and revise your purchase transaction accordingly (including charging the correct price) or to cancel the purchase and refund any amount received. Your sole remedy in the event of an error is to cancel your purchase order and obtain a refund of any amount charged.</p>
    <p>9.4\tPayment Method. Only one valid payment method is Digital Assets. You can pay for one Digital Asset in form of some coin by other Digital Asset in form of another coin according to the common rate, which is defined by ${domainSmall} exchange.</p>
    <p>9.5\tNo Returns or Refunds. All sales and purchases of Digital Assets by ${domainSmall} via the Services are final. We do not accept any returns or provide refunds for your purchase of Digital Assets from ${domainSmall}, except as otherwise provided in these Terms.</p>

    <h3>10.\tFees</h3>
    <p>10.1\tAmount of Fees. You agree to pay ${domainSmall} the fees for trades completed via our Services. You agree to pay %percent% fee from all incoming transactions. You agree to pay fee using Binary Options, which is determined by System.</p>
    <p>10.2\tThird-Party Fees. In addition to the Fees, your External Account may impose fees in connection with your use of your designated External Account via the Services. Any fees imposed by your External Account provider will not be reflected on the transaction screens containing information regarding applicable Fees. You are solely responsible for paying any fees imposed by an External Account provider.</p>
    <p>10.3\tPayment of Fees. You authorize us, or our designated payment processor, to charge or deduct your ${domainSmall} Account Funds for any applicable Fees owed in connection with trades you complete via the Services.</p>
    <p>10.4\tCollection-Related Costs. If you fail to pay Fees or any other amounts owed to ${domainSmall} under these Terms and ${domainSmall} refers your account(s) to a third party for collection, then ${domainSmall} will charge you the lesser of an 18% collection fee or the maximum percentage permitted by applicable law, to cover ${domainSmall}’s collection-related costs.</p>
    <p>10.5\tYou agree to cover a special fee in the amount of 2.5% by obtaining the Premium Account status.</p>

    <h3>11.\tElectronic Notices</h3>
    <p>11.1\tConsent to Electronic Delivery. You agree and consent to receive electronically all communications, agreements, documents, receipts, notices and disclosures (collectively, "Communications") that ${domainSmall} provides in connection with your ${domainSmall} Account and/or use of the ${domainSmall} Services. You agree that ${domainSmall} may provide these Communications to you by posting them via the Services, by emailing them to you at the email address you provide, and/or by sending an SMS or text message to a mobile phone number that you provide. Your carrier's normal, messaging, data and other rates and fees may apply to any mobile Communications. You should maintain copies of electronic Communications by printing a paper copy or saving an electronic copy. You may also contact us through support to request additional electronic copies of Communications or, for a fee, paper copies of Communications (as described below).</p>
    <p>11.2\tHardware and Software Requirements. To access and retain electronic Communications, you will need a computer with an Internet connection that has a current web browser with cookies enabled and 128-bit encryption. You will also need to have a valid email address on file with ${domainSmall} and have sufficient storage space to save past Communications or an installed printer to print them.</p>

    <p>11.3\tWithdrawal of Consent. You may withdraw your consent to receive electronic Communications by sending a withdrawal notice to support. If you decline or withdraw consent to receive electronic Communications, ${domainSmall} may suspend or terminate your use of the Services.</p>
    <p>11.4\tUpdating Contact Information. It is your responsibility to keep your email address and/or mobile phone number on file with ${domainSmall} up to date so that ${domainSmall} can communicate with you electronically. You understand and agree that if ${domainSmall} sends you an electronic Communication but you do not receive it because your email address or mobile phone number on file is incorrect, out of date, blocked by your service provider, or you are otherwise unable to receive electronic Communications, ${domainSmall} will be deemed to have provided the Communication to you. Please note that if you use a spam filter that blocks or re-routes emails from senders not listed in your email address book, you must add ${domainSmall} to your email address book so that you will be able to receive the Communications we send to you. You can update your email address, mobile phone number or street address at any time by logging into your ${domainSmall} Account or by sending such information to support. If your email address or mobile phone number becomes invalid such that electronic Communications sent to you by ${domainSmall} are returned, ${domainSmall} may deem your account to be inactive, and you may not be able to complete any transaction via our Services until we receive a valid, working email address or mobile phone number from you.</p>

    <h3>12.\tUnclaimed Property</h3>
    <p>If for any reason ${domainSmall} is holding Funds in your ${domainSmall} Account on your behalf, and ${domainSmall} is unable to return your Funds to your designated External Account after a period of inactivity, then ${domainSmall} may report and remit such Funds in accordance with applicable state unclaimed property laws.</p>

    <h3>13.\tACCEPTABLE USE</h3>
    <p>When accessing or using the Services, you agree that you will not violate any law, contract, intellectual property or other third-party right or commit a tort, and that you are solely responsible for your conduct while using our Services. Without limiting the generality of the foregoing, you agree that you will not:</p>

    <p>• Use our Services in any manner that could interfere with, disrupt, negatively affect or inhibit other users from fully enjoying our Services, or that could damage, disable, overburden or impair the functioning of our Services in any manner;</p>
    <p>• Use our Services to pay for, support or otherwise engage in any illegal gambling activities; fraud; money-laundering; or terrorist activities; or other illegal activities.</p>
    <p>• Use any robot, spider, crawler, scraper or other automated means or interface not provided by us to access our Services or to extract data.</p>
    <p>• Use or attempt to use another user's account without authorization.</p>
    <p>• Attempt to circumvent any content filtering techniques we employ or attempt to access any service or area of our Services that you are not authorized to access.</p>
    <p>• Develop any third-party applications that interact with our Services without our prior written consent.</p>
    <p>• Provide false, inaccurate, or misleading information; and</p>
    <p>• Encourage or induce any third party to engage in any of the activities prohibited under this Section.</p>


    <h3>14.\tFeedback</h3>
    <p>We will own exclusive rights, including all intellectual property rights, to any feedback, suggestions, ideas or other information or materials regarding ${domainSmall} or our Services that you provide, whether by email, posting through our Services or otherwise ("Feedback"). Any Feedback you submit is non-confidential and shall become the sole property of ${domainSmall}. We will be entitled to the unrestricted use and dissemination of such Feedback for any purpose, commercial or otherwise, without acknowledgment or compensation to you. You waive any rights you may have to the Feedback (including any copyrights or moral rights). Do not send us Feedback if you expect to be paid or want to continue to own or claim rights in them; your idea might be great, but we may have already had the same or a similar idea and we do not want disputes. We also have the right to disclose your identity to any third party who is claiming that any content posted by you constitutes a violation of their intellectual property rights, or of their right to privacy. We have the right to remove any posting you make on our website if, in our opinion, your post does not comply with the content standards set out in this section.</p>

    <h3>15.\tCopyrights and Other Intellectual Property Rights</h3>
    <p>Unless otherwise indicated by us, all copyright and other intellectual property rights in all content and other materials contained on our website or provided in connection with the Services, including, without limitation, the ${domainSmall} logo and all designs, text, graphics, pictures, information, data, software, sound files, other files and the selection and arrangement thereof (collectively, "${domainSmall} Materials") are the proprietary property of ${domainSmall} or our licensors or suppliers and are protected by U.S. and international copyright laws and other intellectual property rights laws.We hereby grant you a limited, nonexclusive and non-sublicensable license to access and use the ${domainSmall} Materials for your personal or internal business use. Such license is subject to these Terms and Conditions and does not permit (a) any resale of the ${domainSmall} Materials; (b) the distribution, public performance or public display of any ${domainSmall} Materials; (c) modifying or otherwise making any derivative uses of the ${domainSmall} Materials, or any portion thereof; or (d) any use of the ${domainSmall} Materials other than for their intended purposes. The license granted under this Section will automatically terminate if we suspend or terminate your access to the Services.</p>

    <h3>16.\tTrademarks</h3>
    <p>"${domainSmall}," the ${domainSmall} logo and any other ${domainSmall} product or service names, logos or slogans that may appear on our Services are trademarks of ${domainSmall}, in the United States and in other countries, and may not be copied, imitated or used, in whole or in part, without our prior written permission. You may not use any trademark, product or service name of ${domainSmall} without our prior written permission, including without limitation any metatags or other "hidden text" utilizing any trademark, product or service name of ${domainSmall}. In addition, the look and feel of our Services, including all page headers, custom graphics, button icons and scripts, is the service mark, trademark and/or trade dress of ${domainSmall} and may not be copied, imitated or used, in whole or in part, without our prior written permission. All other trademarks, registered trademarks, product names and company names or logos mentioned through our Services are the property of their respective owners. Reference to any products, services, processes or other information, by name, trademark, manufacturer, supplier or otherwise does not constitute or imply endorsement, sponsorship or recommendation by us.</p>

    <h3>17.\tSuspension; Termination</h3>
    <p>In the event of any Force Majeure Event, breach of these Terms and Conditions, or any other event that would make provision of the Services commercially unreasonable for ${domainSmall}, we may, in our discretion and without liability to you, with or without prior notice, suspend your access to all or a portion of our Services. We may terminate your access to the Services in our sole discretion, immediately and without prior notice, and delete or deactivate your ${domainSmall} Account and all related information and files in such account without liability to you, including, for instance, in the event that you breach any term of these Terms. In the event of termination, ${domainSmall} will attempt to return any Funds stored in your ${domainSmall} Account not otherwise owed to ${domainSmall}, unless ${domainSmall} believes you have committed fraud, negligence or other misconduct.</p>

    <h3>18.\tDiscontinuance of Services</h3>
    <p>We may, in our sole discretion and without liability to you, with or without prior notice and at any time, modify or discontinue, temporarily or permanently, any portion of our Services.</p>

    <h3>19.\tDisclaimer of Warranties</h3>
    <p>EXCEPT AS EXPRESSLY PROVIDED TO THE CONTRARY IN A WRITING BY US, OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE EXPRESSLY DISCLAIM, AND YOU WAIVE, ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT AS TO OUR SERVICES, INCLUDING THE INFORMATION, CONTENT AND MATERIALS CONTAINED THEREIN. YOU ACKNOWLEDGE THAT INFORMATION YOU STORE OR TRANSFER THROUGH OUR SERVICES MAY BECOME IRRETRIEVABLY LOST OR CORRUPTED OR TEMPORARILY UNAVAILABLE DUE TO A VARIETY OF CAUSES, INCLUDING SOFTWARE FAILURES, PROTOCOL CHANGES BY THIRD PARTY PROVIDERS, INTERNET OUTAGES, FORCE MAJEURE EVENT OR OTHER DISASTERS INCLUDING THIRD PARTY DDOS ATTACKS, SCHEDULED OR UNSCHEDULED MAINTENANCE, OR OTHER CAUSES EITHER WITHIN OR OUTSIDE OUR CONTROL. YOU ARE SOLELY RESPONSIBLE FOR BACKING UP AND MAINTAINING DUPLICATE COPIES OF ANY INFORMATION YOU STORE OR TRANSFER THROUGH OUR SERVICES.</p>

    <p>Some jurisdictions do not allow the disclaimer of implied terms in contracts with consumers, so some or all of the disclaimers in this section may not apply to you.</p>

    <h3>20.\tLimitation of Liability</h3>
    <p>(a) EXCEPT AS OTHERWISE REQUIRED BY LAW, IN NO EVENT SHALL ${domainBig}, OUR DIRECTORS, MEMBERS, EMPLOYEES OR AGENTS BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES, OR ANY OTHER DAMAGES OF ANY KIND, INCLUDING BUT NOT LIMITED TO LOSS OF USE, LOSS OF PROFITS OR LOSS OF DATA, WHETHER IN AN ACTION IN CONTRACT, TORT (INCLUDING BUT NOT LIMITED TO NEGLIGENCE) OR OTHERWISE, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF OR INABILITY TO USE OUR SERVICES OR THE ${domainBig} MATERIALS, INCLUDING WITHOUT LIMITATION ANY DAMAGES CAUSED BY OR RESULTING FROM RELIANCE BY ANY USER ON ANY INFORMATION OBTAINED FROM ${domainBig}, OR THAT RESULT FROM MISTAKES, OMISSIONS, INTERRUPTIONS, DELETION OF FILES OR EMAIL, ERRORS, DEFECTS, VIRUSES, DELAYS IN OPERATION OR TRANSMISSION OR ANY FAILURE OF PERFORMANCE, WHETHER OR NOT RESULTING FROM A FORCE MAJEURE EVENT, COMMUNICATIONS FAILURE, THEFT, DESTRUCTION OR UNAUTHORIZED ACCESS TO ${domainBig}'S RECORDS, PROGRAMS OR SERVICES.</p>




    <p>Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages. Accordingly, some of the limitations of this section may not apply to you.</p>

<p>(b) TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE AGGREGATE LIABILITY OF ${domainBig} (INCLUDING OUR DIRECTORS, MEMBERS, EMPLOYEES AND AGENTS), WHETHER IN CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE, WHETHER ACTIVE, PASSIVE OR IMPUTED), PRODUCT LIABILITY, STRICT LIABILITY OR OTHER THEORY, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, ${domainBig} OR TO THESE TERMS AND CONDITIONS EXCEED THE FEES PAID BY YOU TO ${domainBig} DURING THE 12 MONTHS IMMEDIATELY PRECEDING THE DATE OF ANY CLAIM GIVING RISE TO SUCH LIABILITY.</p>

    <h3>21.\tIndemnity</h3>
    <p>You agree to defend, indemnify and hold harmless ${domainSmall} (and each of our officers, directors, members, employees, agents and affiliates) from any claim, demand, action, damage, loss, cost or expense, including without limitation reasonable attorneys’ fees, arising out or relating to (a) your use of, or conduct in connection with, our Services; (b) any Feedback you provide; (c) your violation of these Terms and Conditions; or (d) your violation of any rights of any other person or entity. If you are obligated to indemnify us, we will have the right, in our sole discretion, to control any action or proceeding (at our expense) and determine whether we wish to settle it.</p>

    <h3>22.\tApplicable Law; Arbitration</h3>
    <p>PLEASE READ THE FOLLOWING PARAGRAPH CAREFULLY BECAUSE IT REQUIRES YOU TO ARBITRATE DISPUTES WITH US AND IT LIMITS THE MANNER IN WHICH YOU CAN SEEK RELIEF.</p>

    <p>You and ${domainSmall} agree to arbitrate any dispute arising from these Terms and Conditions of the Services, except for disputes in which either party seeks equitable and other relief for the alleged unlawful use of copyrights, trademarks, trade names, logos, trade secrets or patents.</p>

    <h5>ARBITRATION PREVENTS YOU FROM SUING IN COURT OR FROM HAVING A JURY TRIAL.</h5>

    <p>You and ${domainSmall} agree to notify each other in writing of any dispute within thirty (30) days of when it arises. Notice to ${domainSmall} shall be sent to ${domainSupport}. You and ${domainSmall} further agree: (a) to attempt informal resolution prior to any demand for arbitration; (b) that any arbitration will occur in San Francisco, California; (c) that arbitration will be conducted confidentially by a single arbitrator in accordance with the rules of JAMS; and (d) that the state or federal courts in San Francisco, California have exclusive jurisdiction over any appeals of an arbitration award and over any suit between the parties not subject to arbitration. Other than class procedures and remedies discussed below, the arbitrator has the authority to grant any remedy that would otherwise be available in court. Any dispute between the parties will be governed by these Terms and Conditions and the laws of the State of California and applicable United States law, without giving effect to any conflict of laws principles that may provide for the application of the law of another jurisdiction. Whether the dispute is heard in arbitration or in court, you and ${domainSmall} will not commence against the other a class action, class arbitration or representative action or proceeding.</p>


    <h3>23.\tMiscellaneous</h3>
    <p>23.1\tEntire Agreement; Order of Precedence. These Terms and Conditions contain the entire agreement and supersede all prior and contemporaneous understandings between the parties regarding the Services. These Terms and Conditions do not alter the terms or conditions of any other electronic or written agreement you may have with ${domainSmall} for the Services or for any other ${domainSmall} product or service or otherwise. In the event of any conflict between these Terms and Conditions and any other agreement you may have with ${domainSmall}, the terms of that other agreement will control only if these Terms and Conditions are specifically identified and declared to be overridden by such other agreement.</p>
    <p>23.2\tAmendment. We reserve the right to make changes or modifications to these Terms and Conditions from time to time, in our sole discretion. The amended Terms and Conditions will be deemed effective immediately upon posting for any new users of the Services. In all other cases, the amended Terms and Conditions will become effective for preexisting users upon the earlier of either: (i) the date users click or press a button to accept such changes, or (ii) continued use of our Services 30 days after ${domainSmall} provides notice of such changes.  Any amended Terms and Conditions will apply prospectively to use of the Services after such changes become effective. If you do not agree to any amended Terms and Conditions, you must discontinue using our Services and contact us to terminate your account.</p>
    <p>23.3\tWaiver. Our failure or delay in exercising any right, power or privilege under these Terms and Conditions shall not operate as a waiver thereof.</p>
    <p>23.4\tSeverability. The invalidity or unenforceability of any of these Terms and Conditions shall not affect the validity or enforceability of any other of these Terms and Conditions, all of which shall remain in full force and effect.</p>
    <p>23.5\tForce Majeure Events. ${domainSmall} shall not be liable for (1) any inaccuracy, error, delay in, or omission of (i) any information, or (ii) the transmission or delivery of information; (2) any loss or damage arising from any event beyond ${domainSmall}'s reasonable control, including but not limited to flood, extraordinary weather conditions, earthquake, or other act of God, fire, war, insurrection, riot, labor dispute, accident, action of government, communications, power failure, or equipment or software malfunction or any other cause beyond ${domainSmall}'s reasonable control (each, a "Force Majeure Event").</p>
    <p>23.6\tAssignment. You may not assign or transfer any of your rights or obligations under these Terms and Conditions without prior written consent from ${domainSmall}, including by operation of law or in connection with any change of control. ${domainSmall} may assign or transfer any or all of its rights under these Terms and Conditions, in whole or in part, without obtaining your consent or approval.</p>
    <p>23.7\tHeadings. Headings of sections are for convenience only and shall not be used to limit or construe such sections.</p>`
    return term
}

export const transTableHeader = [
    'Currency', 'Type', 'Date & time', 'Amount'
]
export const transInnerTableHeader = [
    'Currency', 'from-to', 'Date & time', 'Amount'
]