import React, {useState} from 'react';
import './Registration.scss';
import {RequestStatus} from '../../constants/RequestStatus';
import { IFormFields } from '../../interfaces/RegistrationInterface';
import axios from 'axios';
import Modal from '../../shared/components/Modal';
import  Validator from '../../shared/utils';
import { API_ENDPOINT } from '../../services/BaseService';

const Registration = ():JSX.Element => {
    const userInitialState: IFormFields = {
        firstName: "", 
        lastName:"", 
        email:"",
        password:""
    }
    const [user, setUser] = useState<IFormFields>(userInitialState);
    const [formErrors, setFormErrors] = useState<any>({});
    const [responseStatus, setResponseStatus]= useState<string>(RequestStatus.INITIAL);

    const handleChange = (event:any)=> {
        event.preventDefault();
        const {name, value} = event.target;
        setUser({...user, [name]:value})
    }

    const validateMandatoryError = (event:any) => {
        event.preventDefault();
        const {name, value} = event.target;
        if(value !== ""){
            setFormErrors({...formErrors, [name]:{isError:false}})
        }
    }

    const validateEmail = () => {
        if(Validator.validateEmail(user)){
            setFormErrors({...formErrors, email:{isError: true, errorMessage: "Please enter valid email id"}})
        } else {
            const {email, ...rest} = formErrors;
            setFormErrors(rest);
        }
    }

    const validatePassword= () => {
        if(Validator.validatePassword(user)){
            setFormErrors({...formErrors, password:{...formErrors.password, isError: true, errorMessage: "Password should contain minimum 8 characters \n one upper, one lower case \n should not contain first name or last name" }})
        } else {
            const {password, ...rest} = formErrors;
            setFormErrors(rest);
        }
    }

    const validateFields = ():boolean => {
        let isSubmit: boolean = true;
        let requiredFieldError = false;
        let submitErrors = {...formErrors};
        validateEmail();
        validatePassword();
        Object.entries(user).forEach(([key,value])=>{
            if(submitErrors[key]?.isError){
                isSubmit = false;
            }
            if(value === "") {
                isSubmit = false;
                requiredFieldError = !requiredFieldError ? true:requiredFieldError;
                submitErrors={...submitErrors, [key]:{isError:true}}
            }
        })
        setFormErrors({...submitErrors, isRequiredFieldsError:requiredFieldError })
        return isSubmit;
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setResponseStatus(RequestStatus.INITIAL);
        if(validateFields()){
            axios.post(API_ENDPOINT+'/users', user)
        .then(response =>{setUser(userInitialState);
        setResponseStatus(RequestStatus.OK);
        setFormErrors({});
        })
        .catch(error => {
             setResponseStatus(RequestStatus.ERROR)
        });

        }
    }

    return(
        <>
        <div className="signup">
            <form className='signup-form-container' onSubmit={(event)=>handleSubmit(event)}>
                <h3>Registration</h3>
                {formErrors.isRequiredFieldsError && (<p className="signup-form-container-requiredError">Please enter all the mandatory fields</p>)}
                <p className="signup-form-container-message error-message"><span>*</span> Mandatory Fields</p>
                <div className='signup-field '>
                    <input type="text" data-testid="firstname-field" value={user.firstName} className={formErrors.firstName?.isError ? 'error': ''} name="firstName" onChange={(event)=>handleChange(event)} placeholder="First Name*" onBlur={(event) => validateMandatoryError(event)}/>
                </div>
                <div className='signup-field'>
                    <input type="text" data-testid="lastname-field" value={user.lastName} className={formErrors.lastName?.isError? 'error': ''} name="lastName" onChange={(event)=>handleChange(event)} placeholder="Last Name*" onBlur={(event) => validateMandatoryError(event)}/>
                </div>
                <div className='signup-field'>
                    <input type="text" data-testid="email-field" value={user.email} className={formErrors.email?.isError ? 'error': ''} name="email" placeholder="Email*" onChange={(event)=>handleChange(event)} onBlur={()=>validateEmail()}/>
                    {formErrors.email?.errorMessage && (<p data-testid="email-error">{formErrors.email?.errorMessage}</p>)}
                </div>
                <div className='signup-field'>
                    <input type="password" data-testid="password-field" value={user.password} className={formErrors.password?.isError ? 'error': ''} name="password" placeholder="Password*" onChange={(event)=>handleChange(event)} onBlur={()=>validatePassword()}/>
                    {formErrors.password?.errorMessage && 
                        formErrors.password?.errorMessage.split('\n').map((errorMessage: string, index: number)=>{
                        return <p key={index}>{errorMessage}</p>
                    })
                    }
                </div>
                <button type="submit" data-testid="submit" name="submit" className="button-primary">Sign Up</button>
            </form>
        </div>
        {responseStatus === RequestStatus.OK && (
            <Modal open={responseStatus === RequestStatus.OK} message="success"></Modal>)}
        {responseStatus === RequestStatus.ERROR && (
            <Modal open={responseStatus === RequestStatus.ERROR} message="error"></Modal>)}
        </>
    );
}

export default Registration;