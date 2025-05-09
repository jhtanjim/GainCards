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
import UserList from "../Pages/DashBoard/AdminDashBoard/UserList";
import Categories from "../Pages/Home/Categories/Categories";
import Home from "../Pages/Home/Home/Home";
import Checkout from "../Pages/Shared/Checkout/Checkout";
import MyBag from "../Pages/Shared/MyBag/MyBag";
import MyCards from "../Pages/Shared/MyCards/MyCards";
import MyLibrary from "../Pages/Shared/MyLibrary/MyLibrary";
import MyOrders from "../Pages/Shared/MyOrders/MyOrders";
import MyProfile from "../Pages/Shared/MyProfile/MyProfile";
import Payment from "../Pages/Shared/Payment/Payment";
import Pokaemon from "../Pages/Shared/Pokaemon/Pokaemon";
import PokaemonCardDetails from "../Pages/Shared/Pokaemon/PokaemonCardDetails";
import PokaemonCardUpdate from "../Pages/Shared/PokemonCardCrud/PokaemonCardUpdate";
import PokemonCardUpload from "../Pages/Shared/PokemonCardCrud/PokemonCardUpload";

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
        element: <MyBag />,
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
        element: <Checkout />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
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
        element: <UserList />,
      },
      {
        path: "/admin/users/vendors",
        element: <UserList />,
      },
      {
        path: "/admin/users/normal",
        element: <UserList />,
      },
    ],
  },
]);
