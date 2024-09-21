import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./footer";

function Layout() {
  return (
    <div>
      <Header />

      <div className="min-h-[400px]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
export default Layout;
