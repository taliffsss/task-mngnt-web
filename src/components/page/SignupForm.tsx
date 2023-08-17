import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { signupSchema } from '../formValidation/validation';
import { InputErrorMsg } from '../Utils/utils';
import { FormData } from '../interface/DataInterface';
import { signup } from '../request/api';
import { 
  setEmail,
  setPassword
} from '../redux/actions';

const signFormInitial: FormData = {
  email: '',
  password: '',
  cpassword: '',
};

const SignupForm: React.FC = () => {
    const redirect = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);

    const showCloseLoader = () => {
        setLoading((prevState) => !prevState);
    };

    const onSubmit = async (values: any, 
        { resetForm, setSubmitting, setFieldError }: 
        { 
            resetForm: () => void; 
            setSubmitting: (isSubmitting: boolean) => void; 
            setFieldError: (field: string, message: string) => void
        }) => {
        showCloseLoader()
        await signup(values)
        .then((res) => {
            if (res?.result.success) {
                redirect('/');
                dispatch(setEmail(''));
                dispatch(setPassword(''));
                resetForm();
            }

            setFieldError("email", res?.result?.message?.email);
            setFieldError("password", res?.result?.message?.password);
            setFieldError("cpassword", res?.result?.message?.cpassword);
            showCloseLoader()
        })
        .catch((err) => {
            const msg = err?.response?.data.result?.message
            setFieldError("email", msg?.email);
            setFieldError("password", msg?.password);
            setFieldError("cpassword", msg?.cpassword);
            showCloseLoader()
            setSubmitting(false);
        });
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">SignUp</h1>
                <Formik initialValues={signFormInitial} validationSchema={signupSchema} onSubmit={onSubmit}>
                    {({ errors, touched }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                                </label>
                                <Field
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.email && touched.email ? 'border-red-500' : ''
                                    }`}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                />
                                <ErrorMessage name="email" component={InputErrorMsg} />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <Field
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.password && touched.password ? 'border-red-500' : ''
                                    }`}
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />
                                <ErrorMessage name="password" component={InputErrorMsg} />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpassword">
                                    Confirm Password
                                </label>
                                <Field
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.cpassword && touched.cpassword ? 'border-red-500' : ''
                                    }`}
                                    id="cpassword"
                                    type="password"
                                    name="cpassword"
                                    placeholder="Confirm Password"
                                />
                                <ErrorMessage name="cpassword" component={InputErrorMsg} />
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    {isLoading ? (
                                        'loading...'
                                    ) : (
                                        'Sign Up'
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default SignupForm;
