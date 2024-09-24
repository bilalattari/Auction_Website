import { Avatar, Button } from "antd";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  console.log("user=>", user);

  const addProduct = () => {
    if (user.isLogin) {
      navigate("/addProduct");
    } else {
      navigate("/signin");
    }
  };
  return (
    <div className="flex mx-auto justify-between items-center py-3 container">
      <h1 className="font-mono text-2xl">Logo</h1>
      {auth.currentUser ? (
        <div className="flex gap-2">
          <Button onClick={addProduct}>Add Product</Button>
          <Avatar src={user?.photoUrl} />
        </div>
      ) : (
        <div className="flex gap-2">
          <Button>Add Product</Button>
          <Link to={"/signin"}>
            <Button>Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
