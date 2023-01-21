import logo from "../assets/logo-pictorial.svg";
import Image from "next/image";
import googleIcon from "../assets/icon-google-button.svg";
import githubIcon from "../assets/icon-github-button.svg";
import { signIn } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const { query } = useRouter();
  const { error } = query;

  useEffect(() => {
    if (error) {
      toast.error(error as string);
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const googleSignIn = async () => {
    await signIn("google");
  };

  const githubSignIn = async () => {
    await signIn("github");
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
          <div className="social-login">
            <button className="social-button" onClick={googleSignIn}>
              <Image
                src={googleIcon.src}
                alt="google icon"
                width={20}
                height={20}
              />
              Google
            </button>
            <button className="social-button" onClick={githubSignIn}>
              <Image
                src={githubIcon.src}
                alt="github login"
                width={20}
                height={20}
              />
              Github
            </button>
          </div>
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
