import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/home/home";
import AllProducts from "./pages/home/AllProducts";
import ProductDetail from "./pages/home/productDetail";
import UserLayout from "./components/userLayout";
import UserProfile from "./pages/users/profile";
import UserProducts from "./pages/users/products";
import Bid from "./pages/users/bids";
import Layout from "./components/layout";
import Signin from "./pages/auth/signin";
import AddProduct from "./pages/home/addProduct";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="products/:id" element={<ProductDetail />} />
        </Route>
        <Route
          path="/user"
          element={user.isLogin ? <UserLayout /> : <Navigate to={"/"} />}
        >
          <Route path="profile" element={<UserProfile />} />
          <Route path="products" element={<UserProducts />} />
          <Route path="bids" element={<Bid />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
