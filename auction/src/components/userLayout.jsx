import { Outlet } from "react-router";
import Header from "./Header";

function UserLayout() {
  return (
    <div className="h-screen overflow-hidden w-screen">
      <Header />

      <div className="flex h-full flex-grow">
        <div className="w-1/4 flex flex-grow bg-red-200 border-r-2">
          <h1>Side Menu</h1>
        </div>
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default UserLayout;
