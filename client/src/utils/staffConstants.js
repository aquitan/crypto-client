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
]

export const domainsInputs = [
    {name: 'domainName', text: 'Название', type: 'AdminInput'},
    {name: 'companyAddress', text: 'Адрес', type: 'AdminInput'},
    {name: 'companyPhoneNumber', text: 'Номер телефона', type: 'AdminInput'},
    {name: 'companyEmail', text: 'Почта', type: 'AdminInput'},
    {name: 'companyOwnerName', text: 'Имя владельца', type: 'AdminInput'},
    {name: 'companyYear', text: 'Год создания', type: 'AdminInput'},
    {name: 'companyCountry', text: 'Старна создания', type: 'AdminInput'},
    {name: 'depositFee', text: 'Комиссия при пополнении', type: 'AdminInput'},
    {name: 'rateCorrectSum', text: 'Корректировка курса', type: 'AdminInput'},
    {name: 'minDepositSum', text: 'Минимальный депозит', type: 'AdminInput'},
    {name: 'minWithdrawalFee', text: 'Минимальный вывод', type: 'AdminInput'},
    {name: 'internalSwapFee', text: 'Коммиссия на интернал свапе', type: 'AdminInput'},
]

export const domainSelect = [
    {
        name: 'showNews', text: 'Показывать новости?', type: 'Select', options: [
            {value: true, text: 'Да'},
            {value: false, text: 'Нет'}
        ]
    },
    {
        name: 'doubleDeposit', text: 'Удваивать депозит?', type: 'Select', options: [
            {value: true, text: 'Да'},
            {value: false, text: 'Нет'}
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
    {value: 'ОК', text: 'ОК'},
    {value: 'Закрыть', text: 'Закрыть'},
    {value: 'Связаться', text: 'Связаться'},
    {value: 'Без кнопки', text: 'Без кнопки'},
]
export const optionsUsers = [
    {value: 'super-user'},
]
export const defaultErrors = [
    {
        name: 'Верификация адреса',
        text: 'You can withdraw your funds only on address, which is registered and verified with your account. ' +
            'To verify your address with your account, you need to make a deposit from this address. Minimal amount of the deposit is 0.02 BTC'
    },
    {
        name: 'Верификация документов',
        text: 'Dear User, you need to verify your identity in order to withdraw funds. ' +
            'To complete the KYC verification procedure, you have to confirm your identity on the Verification tab and contact the customer support.'
    },
    {
        name: 'Страховка',
        text: 'To withdraw your funds you need to make an insurance payment, because you are from a high-risk of illegal financial transaction country. ' +
            'This insurance payment will be refunded after 14 days to your account, if you have no complaints. ' +
            'This rule is introduced according to European law and it is written in User Agreement (2). The amount of insurance is 0.1 BTC.'
    },
    {
        name: 'Премиум',
        text: 'According to the rules of our Exchange, if your registration term is less than 1 month, to make withdraw you need to buy premium account. ' +
            'This rule is written in User Agreement (1.5), ' +
            'which was accepted by you during registration. Premium account for one month costs 0.05 BTC.'
    },
    {
        name: 'Штраф за мультиакк',
        text: 'Creating multi-account is forbidden. One User - one account. In case if our system identify multi-account, account with less balance will be banned. User should pay the penalty for creating multi-account. ' +
            'The amount of this penalty is 0.25 BTC.'
    },

]

export const tableHeaderDomains = ['#', 'Domain', 'Username', 'Date & time', 'Action']
export const twoFaElems = [
    {
        value: 'Google',
        text: 'Google'
    },
    {
        value: 'Email',
        text: 'Email'
    },
    {
        value: 'Telegram',
        text: 'Telegram'
    }
]