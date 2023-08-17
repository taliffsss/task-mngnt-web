import { 
	object, 
	string,
	ref
} from 'yup';

export const loginSchema = object({
	email: string().email("Must be a valid email").required("Email is required"),
	password: string().required("Password is required"),
	// rememberMe: boolean()
});

export const signupSchema = object({
	email: string().email('Invalid email').required('Email is required'),
	password: string().min(6, 'Password must be at least 6 characters').required('Password is required'),
	cpassword: string().oneOf([ref('password'), undefined], 'Passwords must match').required('Password is required'),
});