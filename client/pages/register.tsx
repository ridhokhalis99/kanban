import logo from "../assets/logo-pictorial.svg";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import useMutation from "../tools/useMutation";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { AxiosResponse } from "axios";
import Link from "next/link";

const Register = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutation: mutationRegister } = useMutation({
    url: `/user/register`,
    method: "post",
    formatter: ({ data }: AxiosResponse) => data,
    afterSuccess: ({ message }: { message: string }) => {
      push("/login");
      toast.success(message);
    },
    errorHandler: ({ data }: any) => {
      const { message } = data;
      toast.error(message);
    },
  });

  const onSubmit = (formValues: FieldValues) => {
    mutationRegister(formValues);
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
          <h1 className="heading-xl title">Sign up to Kanban</h1>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                {...register("name", { required: "Please enter your name." })}
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                {...register("email", { required: "Please enter your email." })}
              />
              <ErrorMessage
                errors={errors}
                name="email"
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
              Sign up
            </button>
          </form>
        </div>
        <div className="navigate">
          <p className="body-l">
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#0079BF" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
