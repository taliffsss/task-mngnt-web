import React, { ChangeEvent, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { loginSchema } from "../formValidation/validation";
import { login } from "../request/api";
import { InputErrorMsg } from "../Utils/utils";
import { setAuthToken, showHidePassword } from "../redux/actions";

const Login: React.FC = () => {
  // Retrieve data from the Redux state using useSelector
  const data = useSelector((state: any) => state);

  const redirect = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [wrongCredential, setWrongCredential] = useState("");

  const showCloseLoader = () => {
    setLoading((prevState) => !prevState);
  };

  // Check if auth token is not empty and redirect to dashboard
  useEffect(() => {
    if (data.auth.authToken !== "") {
      redirect("/dashboard");
    }
  }, [data.auth.authToken, redirect]);

  const onSubmit = async (
    values: any,
    {
      resetForm,
      setSubmitting,
      setFieldError,
    }: {
      resetForm: () => void;
      setSubmitting: (isSubmitting: boolean) => void;
      setFieldError: (field: string, message: string) => void;
    }
  ) => {
    showCloseLoader();
    setWrongCredential("");
    await login(values)
      .then((res) => {
        if (res?.result.success) {
          dispatch(setAuthToken(res.result?.data?.access_token));
          redirect("/dashboard");
          resetForm();
        }

        setFieldError("email", res?.result?.message?.email);
        setFieldError("password", res?.result?.message?.password);
        setLoading(false);
      })
      .catch((err) => {
        const msg = err?.response?.data?.result?.message;
        if (typeof msg === "object" && !Array.isArray(msg) && msg !== null) {
          setFieldError("email", err?.response?.data?.result?.message?.email);
          setFieldError(
            "password",
            err?.response?.data?.result?.message?.password
          );
        } else {
          setWrongCredential(err?.response?.data?.result?.message);
        }
        setLoading(false);
        setSubmitting(false);
      });
  };

  const handlePasswordVisibility = () => {
    // Toggle the local state for password visibility
    setShowPassword((prevState) => !prevState);

    // Dispatch the action to update the global state for password visibility
    dispatch(showHidePassword(!showPassword));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {wrongCredential ? (
          <div className="mb-2 text-center">
            <span className="text-rose-600">{wrongCredential}</span>
          </div>
        ) : (
          ""
        )}
        <Formik
          initialValues={data.loginPayload}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            setFieldTouched,
          }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("email", e?.target?.value);
                    handleChange(e);
                    setWrongCredential("");
                    setFieldTouched("email", true, false);
                  }}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage name="email" component={InputErrorMsg} />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("password", e?.target?.value);
                    handleChange(e);
                    setWrongCredential("");
                    setFieldTouched("password", true, false);
                  }}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                />
                <span
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer pt-6"
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <ErrorMessage name="password" component={InputErrorMsg} />
              </div>
              <div className="mb-4 flex justify-between items-center">
                <label htmlFor="rememberMe" className="text-sm cursor-pointer">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    className="mr-1"
                    checked={values.rememberMe}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const checked = e.target.checked;
                      setFieldValue("rememberMe", checked);
                    }}
                  />
                  Remember me
                </label>
                <a href="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </a>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-700"
              >
                {isLoading ? "loading..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
