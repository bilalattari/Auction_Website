import { Outlet } from "react-router";
import Header from "./Header";
import { Link } from "react-router-dom";

function UserLayout() {
  return (
    <div className="h-screen overflow-hidden w-screen">
      <Header />

      <div className="flex h-full flex-grow">
        <div className="w-1/4 flex flex-col flex-grow  border-r-2">
          <Link to={'/user/profile'}><h1 className="cursor-pointer p-2 w-full h-9 hover:bg-fuchsia-200">Profile</h1></Link> 
          <Link to={'/user/products'}><h1 className="cursor-pointer p-2 w-full h-9 hover:bg-fuchsia-200">Products</h1></Link> 
          <Link to={'/user/bids'}><h1 className="cursor-pointer p-2 w-full h-9 hover:bg-fuchsia-200">Bids</h1></Link> 
        </div>
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default UserLayout;
