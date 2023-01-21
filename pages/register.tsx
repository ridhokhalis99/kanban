import logo from "../assets/logo-pictorial.svg";
import Image from "next/image";
import googleIcon from "../assets/icon-google-button.svg";

const Register = () => {
  return (
    <div className="auth">
      <div className="auth-wrapper">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Image
            src={logo.src}
            alt="kanban logo"
            width={logo.width}
            height={logo.height}
          />
          <h1 className="heading-xl" style={{ margin: "24px 0" }}>
            Sign up to Kanban
          </h1>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              width: "100%",
              marginBottom: "12px",
            }}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
              />
            </div>
            <button type="submit" className="button">
              Sign up
            </button>
          </form>
          <button className="google-button">
            <Image
              src={googleIcon.src}
              alt="google icon"
              width={20}
              height={20}
            />
            Sign up with Google
          </button>
        </div>
        <div style={{ paddingTop: "16px", textAlign: "center" }}>
          <p className="body-l">
            Already have an account?{" "}
            <a href="/login" style={{ color: "#0079BF" }}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
