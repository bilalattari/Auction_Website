import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";

function UserProfile() {
  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    await signOut(auth);
  };
  return (
    <div className="pl-2">
      <h1 className="font-bold text-3xl">Hello {user.displayName}</h1>

      <Button className="my-3" onClick={handleSignOut}>
        Logout hojao
      </Button>
    </div>
  );
}

export default UserProfile;
