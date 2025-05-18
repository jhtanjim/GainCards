import { createBrowserRouter } from "react-router-dom";
import SignIn from "../auth/SignIn";
import Signup from "../auth/Signup";
import UnderConstruction from "../Compnent/UnderConstruction";
import VendorRegistration from "../Compnent/Vendor/VendorRegistration";
import AdminLayout from "../Layout/AdminLayout";
import Main from "../Layout/Main";
import AdminDashBoard from "../Pages/DashBoard/AdminDashBoard/AdminDashBoard";
import OrderList from "../Pages/DashBoard/AdminDashBoard/OrderList";
import PaymentList from "../Pages/DashBoard/AdminDashBoard/paymentList";
import Categories from "../Pages/Home/Categories/Categories";
import Home from "../Pages/Home/Home/Home";
import CheckoutPage from "../Pages/Shared/Checkout/Checkout";
import CartPage from "../Pages/Shared/MyBag/MyBag";
import MyCards from "../Pages/Shared/MyCards/MyCards";
import MyLibrary from "../Pages/Shared/MyLibrary/MyLibrary";
import MyOrders from "../Pages/Shared/MyOrders/MyOrders";
import MyProfile from "../Pages/Shared/MyProfile/MyProfile";
import Pokaemon from "../Pages/Shared/Pokaemon/Pokaemon";
import PokaemonCardDetails from "../Pages/Shared/Pokaemon/PokaemonCardDetails";
import PokaemonCardUpdate from "../Pages/Shared/PokemonCardCrud/PokaemonCardUpdate";
import PokemonCardUpload from "../Pages/Shared/PokemonCardCrud/PokemonCardUpload";
import NormalUsers from "../Pages/DashBoard/AdminDashBoard/UserList/NormalUsers";
import VendorUsers from "../Pages/DashBoard/AdminDashBoard/UserList/VendorUsers";
import AllUsers from "../Pages/DashBoard/AdminDashBoard/UserList/AllUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/myBag",
        element: <CartPage />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signUp",
        element: <Signup />,
      },
      {
        path: "/myLibrary",
        element: <MyLibrary />,
      },
      {
        path: "/pokemon",
        element: <Pokaemon />,
      },
      {
        path: "/pokemon/:id",
        element: <PokaemonCardDetails />,
      },

      {
        path: "/pokemonCardUpload",
        element: <PokemonCardUpload />,
      },
      {
        path: "/pokemonCardUpdate/:id",
        element: <PokaemonCardUpdate />,
      },
      {
        path: "/myProfile",
        element: <MyProfile />,
      },
      {
        path: "/vendorSignup",
        element: <VendorRegistration />,
      },
      // {
      //   path: "/pricing",
      //   element: <Pricing />,
      // },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      // {
      //   path: "/payment",
      //   element: <Payment />,
      // },
      {
        path: "/myOrders",
        element: <MyOrders />,
      },
      {
        path: "/myCards",
        element: <MyCards />,
      },
      { path: "*", element: <UnderConstruction /> },
    ],
  },
  // Admin Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminDashBoard />,
      },
      {
        path: "/admin/orders",
        element: <OrderList />,
      },
      {
        path: "/admin/payments",
        element: <PaymentList />,
      },
      {
        path: "/admin/users",
        element: <AllUsers  />,
      },
      {
        path: "/admin/users/vendors",
        element: <VendorUsers />,
      },
      {
        path: "/admin/users/normal",
        element: <NormalUsers  />,
      },
    ],
  },
]);
