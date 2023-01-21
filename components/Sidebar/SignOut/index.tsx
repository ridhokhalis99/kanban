import SignOutIcon from "./SignOutIcon";
import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <div className="sidebar-bottom-control" onClick={() => signOut()}>
      <SignOutIcon />
      <h1 className="heading-m">Sign Out</h1>
    </div>
  );
};

export default SignOut;
