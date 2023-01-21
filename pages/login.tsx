import logo from "../assets/logo-pictorial.svg";
import Image from "next/image";
import googleIcon from "../assets/icon-google-button.svg";

const Login = () => {
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
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control" />
            </div>
            <button type="submit" className="button">
              Sign in
            </button>
          </form>
          <button className="google-button">
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
