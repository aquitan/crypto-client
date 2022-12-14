const isValidEmail = email =>
    // eslint-disable-next-line no-useless-escape
    /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/.test(email);


const isValidText = text => {
    // eslint-disable-next-line no-useless-escape
    /^((([0-9A-Za-z])))$/.test(
        text
    );
}

export const emailValidate = (email) => {
    isValidEmail(email)
    return isValidEmail(email);
}

export const validateInput = (text) => {
    isValidText(text)
   return isValidText(text)
}