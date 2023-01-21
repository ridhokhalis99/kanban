import logo from "../assets/logo-pictorial.svg";
import Image from "next/image";
import googleIcon from "../assets/icon-google-button.svg";
import { signIn } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const googleSignIn = async () => {
    await signIn("google");
  };

  const onSubmit = (formValues: FieldValues) => {
    const { email, password } = formValues;
    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className="auth">
      <div className="auth-wrapper">
        <div className="form-section">
          <Image
            src={logo.src}
            alt="kanban logo"
            width={logo.width}
            height={logo.height}
          />
          <h1 className="heading-xl title">Sign in to Kanban</h1>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                {...register("email", { required: "Please enter your email." })}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <p className="error-message">{message}</p>
                )}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Please enter your password.",
                })}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className="error-message">{message}</p>
                )}
              />
            </div>
            <button type="submit" className="button">
              Sign in
            </button>
          </form>
          <button className="google-button" onClick={googleSignIn}>
            <Image
              src={googleIcon.src}
              alt="google icon"
              width={20}
              height={20}
            />
            Sign in with Google
          </button>
        </div>
        <div className="navigate">
          <p className="body-l">
            Don't have an account?{" "}
            <a href="/register" style={{ color: "#0079BF" }}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
