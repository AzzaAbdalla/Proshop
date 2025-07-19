import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // for styling
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import HomePage from "./pages/HomePage.js";
import ProductDetailsPage from "./pages/ProductDetailsPage.js";
import CartPage from "./pages/CartPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import ShippingPage from "./pages/ShippingPage.js";
import PrivateRoute from "./components/PrivateRoute.js";
import AdminRoute from "./components/AdminRoute.js";
import PaymentPage from "./pages/PaymentPage.js";
import PlaceOrderPage from "./pages/PlaceOrderPage.js";
import OrderPage from "./pages/OrderPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import OrderListPage from "./pages/admin/OrderListPage.js";
import ProductListPage from "./pages/admin/ProductListPage.js";
import ProductEditPage from "./pages/admin/ProductEditPage.js";
import UserListPage from "./pages/admin/UserListPage.js";
import UserEditPage from "./pages/admin/UserEditPage.js";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/search/:keyword" element={<HomePage />} />
            <Route exact path="/page/:pageNumber" element={<HomePage />} />
            <Route
              exact
              path="/search/:keyword/page/:pageNumber"
              element={<HomePage />}
            />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="" element={<PrivateRoute />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="" element={<AdminRoute />}>
              <Route path="/admin/orderlist" element={<OrderListPage />} />
              <Route path="/admin/productList" element={<ProductListPage />} />
              <Route
                path="/admin/productList/:pageNumber"
                element={<ProductListPage />}
              />
              <Route
                path="/admin/product/:id/edit"
                element={<ProductEditPage />}
              />
              <Route path="/admin/userlist" element={<UserListPage />} />
              <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
