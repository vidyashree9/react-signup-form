import { IFormFields } from '../interfaces/RegistrationInterface'

const validateEmail = (user:IFormFields):boolean => {
        const emailRegex = RegExp(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/);
        return !emailRegex.test(user.email) && user.email !== ""
}

const validatePassword = (user:IFormFields):boolean => {
    const passwordRegex = RegExp("(?=.*[a-z])(?=.*[A-Z]).{8,}");
    const firstName = user.firstName.toLowerCase();
    const lastName = user.lastName.toLowerCase();
    const password = user.password.toLowerCase();
    return (!passwordRegex.test(user.password)
    || (user.firstName !== "" && (password.includes(firstName))) 
    || ( user.lastName !== "" && (password.includes(lastName))))
    && user.password !== "";
}
const validation = {
    validateEmail,
    validatePassword
}
export default validation;