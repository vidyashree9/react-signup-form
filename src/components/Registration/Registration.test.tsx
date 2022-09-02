import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Registration from './Registration';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Registration component', () => {
 test('it renders', () => {
   render(<Registration />);
   expect(screen.getByText('Registration')).toBeInTheDocument();
   expect(screen.getByText('Mandatory Fields')).toBeInTheDocument();
   expect(screen.getByPlaceholderText('First Name*')).toBeInTheDocument();
   expect(screen.getByPlaceholderText('Last Name*')).toBeInTheDocument();
   expect(screen.getByPlaceholderText('Email*')).toBeInTheDocument();
   expect(screen.getByPlaceholderText('Password*')).toBeInTheDocument();
   expect(screen.getByRole('button')).toHaveTextContent('Sign Up');
   expect(screen.getByTestId('firstname-field')).not.toHaveClass('error');
   expect(screen.getByTestId('lastname-field')).not.toHaveClass('error');
   expect(screen.getByTestId('email-field')).not.toHaveClass('error');
   expect(screen.getByTestId('password-field')).not.toHaveClass('error');
 });

 describe('validations for sign up', () => {

    test('should have first name value', () => {
        const {getByTestId} = render(<Registration />);
        const element = getByTestId('firstname-field');
        userEvent.type(element, "Dane");
        expect(element).toHaveValue("Dane");
    });

    test('should have last name value', () => {
        const {getByTestId} = render(<Registration />);
        const element = getByTestId('lastname-field');
        userEvent.type(element, "Jonas");
        expect(element).toHaveValue("Jonas");
    });

    test('should have email value', () => {
        const {getByTestId} = render(<Registration />);
        const element = getByTestId('email-field');
        userEvent.type(element, "Dane.Jonas@gmail.com");
        expect(element).toHaveValue("Dane.Jonas@gmail.com");
    });

    test("should have password value", () => {
        const {getByTestId} = render(<Registration />);
        const element = getByTestId('password-field');
        userEvent.type(element, "Password@123");
        expect(element).toHaveValue("Password@123");
    });

    test("should validate correct email", () => {
        const {getByTestId} = render(<Registration />);
        const element = getByTestId('email-field');
        userEvent.type(element, "Dane.Jonas@gmail.com");
        userEvent.tab();
        expect(screen.getByTestId('email-field')).not.toHaveClass('error');
    });

    test("should validate incorrect email", () => {
        const {getByTestId, getByText} = render(<Registration />);
        const element = getByTestId('email-field');
        userEvent.type(element, "Dane.Jonas@gmail");
        userEvent.tab();
        const elementError = getByText('Please enter valid email id');
        expect(screen.getByTestId('email-field')).toHaveClass('error');
        expect(elementError).toBeInTheDocument();
    });

    test("should validate incorrect email", () => {
        const {getByTestId, getByText} = render(<Registration />);
        const element = getByTestId('email-field');
        userEvent.type(element, "Dane.Jonas");
        userEvent.tab();
        const elementError = getByText('Please enter valid email id');
        expect(screen.getByTestId('email-field')).toHaveClass('error');
        expect(elementError).toBeInTheDocument();
    });

    test("should validate correct password", () => {
        const {getByTestId} = render(<Registration />);
        const element = getByTestId('password-field');
        userEvent.type(element, "Password@123");
        userEvent.tab();
        expect(screen.getByTestId('password-field')).not.toHaveClass('error');
    });

    test("should validate password without uppercase letter", () => {
        const {getByTestId, getByText} = render(<Registration />);
        const element = getByTestId('password-field');
        userEvent.type(element, "password@123");
        userEvent.tab();
        const passwordError = getByText("one upper, one lower case");
        expect(screen.getByTestId('password-field')).toHaveClass('error');
        expect(passwordError).toBeInTheDocument();
    });
    test("should validate password without lowercase letter", () => {
        const {getByTestId, getByText} = render(<Registration />);
        const element = getByTestId('password-field');
        userEvent.type(element, "PASSWORD");
        userEvent.tab();
        const passwordError = getByText("one upper, one lower case");
        expect(screen.getByTestId('password-field')).toHaveClass('error');
        expect(passwordError).toBeInTheDocument();
    });

    test("should validate password less than 8 characters", () => {
        const {getByTestId, getByText} = render(<Registration />);
        const element = getByTestId('password-field');
        userEvent.type(element, "PASS");
        userEvent.tab();
        const passwordError = getByText("Password should contain minimum 8 characters");
        expect(screen.getByTestId('password-field')).toHaveClass('error');
        expect(passwordError).toBeInTheDocument();
    });

    test("should validate password with first name", () => {
        const {getByTestId, getByText} = render(<Registration />);
        const element = getByTestId('password-field');
        const firstNameElement = getByTestId('firstname-field');
        userEvent.type(firstNameElement, "Dane");
        userEvent.type(element, "PassDane");
        userEvent.tab();
        const passwordError = getByText("should not contain first name or last name");
        expect(screen.getByTestId('password-field')).toHaveClass('error');
        expect(passwordError).toBeInTheDocument();
    });

    test("should validate password with first name with lowercase", () => {
        const {getByTestId, getByText} = render(<Registration />);
        const element = getByTestId('password-field');
        const firstNameElement = getByTestId('firstname-field');
        userEvent.type(firstNameElement, "Dane");
        userEvent.type(element, "Passdane");
        userEvent.tab();
        const passwordError = getByText("should not contain first name or last name");
        expect(screen.getByTestId('password-field')).toHaveClass('error');
        expect(passwordError).toBeInTheDocument();
    });

    test("should validate password with last name", () => {
        const {getByTestId, getByText} = render(<Registration />);
        const element = getByTestId('password-field');
        const firstNameElement = getByTestId('lastname-field');
        userEvent.type(firstNameElement, "Jonas");
        userEvent.type(element, "PassJonas");
        userEvent.tab();
        const passwordError = getByText("should not contain first name or last name");
        expect(screen.getByTestId('password-field')).toHaveClass('error');
        expect(passwordError).toBeInTheDocument();
    });

    test("should validate password with lowercase last name", () => {
        const {getByTestId, getByText} = render(<Registration />);
        const element = getByTestId('password-field');
        const firstNameElement = getByTestId('lastname-field');
        userEvent.type(firstNameElement, "Jonas");
        userEvent.type(element, "Passjonas");
        userEvent.tab();
        const passwordError = getByText("should not contain first name or last name");
        expect(screen.getByTestId('password-field')).toHaveClass('error');
        expect(passwordError).toBeInTheDocument();
    });

    test("should validate all required fields", () => {
        const {getByTestId, getByText} = render(<Registration />);
        const element = getByTestId('submit');
        userEvent.click(element);
        const requiredFieldsError = getByText("Please enter all the mandatory fields");
        expect(screen.getByTestId('firstname-field')).toHaveClass('error');
        expect(screen.getByTestId('lastname-field')).toHaveClass('error');
        expect(screen.getByTestId('email-field')).toHaveClass('error');
        expect(screen.getByTestId('password-field')).toHaveClass('error');
        expect(requiredFieldsError).toBeInTheDocument();
    });
})

describe('on submit', () => {

    test('should post data on submit', async() => {
        mockedAxios.post.mockResolvedValue({
        data: {
            firstName:"Dane",
            lastName: "Jonas",
            email:"Dane.jonas@email.com",
            id:"qwerty"
        }
        });
        const {getByTestId, getByText} = render(<Registration />);
        const submitElement = getByTestId('submit');
        const firstNameElement = getByTestId('firstname-field');
        const lastNameElement = getByTestId('lastname-field');
        const emailElement = getByTestId('email-field');
        const passwordElement = getByTestId('password-field');
        userEvent.type(firstNameElement, "Dane");
        userEvent.type(lastNameElement, "Jonas");
        userEvent.type(emailElement, "Dane.Jonas@gmail.com");
        userEvent.type(passwordElement, "Password@123");
        userEvent.click(submitElement);

    await waitFor(() => {
      const submitSuccess = getByText('Congratulations! You are registered Successfully.');
      expect(submitSuccess).toBeInTheDocument(); 
    });
    });

    test('should display error on submit', async() => {

    mockedAxios.post.mockRejectedValue(new Error('some error'))
        const {getByTestId, getByText} = render(<Registration />);
        const submitElement = getByTestId('submit');
        const firstNameElement = getByTestId('firstname-field');
        const lastNameElement = getByTestId('lastname-field');
        const emailElement = getByTestId('email-field');
        const passwordElement = getByTestId('password-field');
        userEvent.type(firstNameElement, "Dane");
        userEvent.type(lastNameElement, "Jonas");
        userEvent.type(emailElement, "Dane.Jonas@gmail.com");
        userEvent.type(passwordElement, "Password@123");
        userEvent.click(submitElement);

    await waitFor(() => {
      const submitError = getByText("Oops! Something wasn't right. Please try again");
      expect(submitError).toBeInTheDocument(); 
    });
    });
})
})