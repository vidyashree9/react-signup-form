import { IFormFields } from '../interfaces/RegistrationInterface'

const validateEmail = (user:IFormFields):boolean => {
        const emailRegex = RegExp(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/);
        return !emailRegex.test(user.email) && user.email !== ""
}

const validatePassword = (user:IFormFields):boolean => {
    const passwordRegex = RegExp("(?=.*[a-z])(?=.*[A-Z]).{8,}");
    return (!passwordRegex.test(user.password)
    || (user.firstName !== "" && (user.password.includes(user.firstName) || user.password.includes(user.firstName.toLowerCase()))) 
    || ( user.lastName !== "" && (user.password.includes(user.lastName) || user.password.includes(user.lastName.toLowerCase()))))
    && user.password !== "";
}

export default {
   validateEmail,
   validatePassword
}