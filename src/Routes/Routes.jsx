import { createBrowserRouter } from "react-router-dom";
import Signup from "../auth/Signup";
import UnderConstruction from "../Compnent/UnderConstruction";
import VendorRegistration from "../Compnent/Vendor/VendorRegistration";
import AdminLayout from "../Layout/AdminLayout";
import Main from "../Layout/Main";
import VendorLayout from "../Layout/VendorLayout";
import AdminDashBoard from "../Pages/DashBoard/AdminDashBoard/AdminDashBoard";
import OrderList from "../Pages/DashBoard/AdminDashBoard/OrderList/OrderList";
import PaymentList from "../Pages/DashBoard/AdminDashBoard/paymentList";
import AllUsers from "../Pages/DashBoard/AdminDashBoard/UserList/AllUsers";
import NormalUsers from "../Pages/DashBoard/AdminDashBoard/UserList/NormalUsers";
import VendorUsers from "../Pages/DashBoard/AdminDashBoard/UserList/VendorUsers";
import VendorDashBoard from "../Pages/DashBoard/VendorDashBoard/VendorDashBoard";
import VendorOrders from "../Pages/DashBoard/VendorDashBoard/VendorOrders";
import VendorProducts from "../Pages/DashBoard/VendorDashBoard/VendorProducts";
import Categories from "../Pages/Home/Categories/Categories";
import Home from "../Pages/Home/Home/Home";
import CheckoutPage from "../Pages/Shared/Checkout/Checkout";
import CartPage from "../Pages/Shared/MyBag/MyBag";
import MyLibrary from "../Pages/Shared/MyLibrary/MyLibrary";
import MyOrders from "../Pages/Shared/MyOrders/MyOrders";
import MyProfile from "../Pages/Shared/MyProfile/MyProfile";
import PokemonCardUpload from "../Pages/Shared/PokemonCardCrud/PokemonCardUpload";
import AdminRoutes from "./AdminRoutes";
import VendorRoutes from "./VendorRoutes";
// import VendorAnalytics from "../Pages/DashBoard/VendorDashBoard/VendorAnalytics";
import ManageSubscription from "../Pages/DashBoard/AdminDashBoard/ManageSubscription.jsx/ManageSubscription";
import VendorEarnings from "../Pages/DashBoard/VendorDashBoard/VendorEarnings";
import VendorSettings from "../Pages/DashBoard/VendorDashBoard/VendorSettings";
import VendorSubscription from "../Pages/DashBoard/VendorDashBoard/VendorSubscription";
import Donate from "../Pages/Shared/Donate/Donate";
import DonateCardReceiver from "../Pages/Shared/Donate/DonateCardReciever/DonateCardReciever";
import Pokemon from "../Pages/Shared/Pokemon/Pokemon";
import PokemonCardDetails from "../Pages/Shared/Pokemon/PokemonCardDetails";
import PokemonCardUpdate from "../Pages/Shared/PokemonCardCrud/PokemonCardUpdate";
import SignInwithForgetPass from "../auth/SignInwithForgetPass";
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
        element: <SignInwithForgetPass />,
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
        element: <Pokemon />,
      },
      {
        path: "/donate",
        element: <Donate />,
      },
      {
        path: "/donateCardReceiver",
        element: <DonateCardReceiver />,
      },
      {
        path: "/pokemon/:id",
        element: <PokemonCardDetails />,
      },

      {
        path: "/pokemonCardUpdate/:id",
        element: <PokemonCardUpdate />,
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

      { path: "*", element: <UnderConstruction /> },
    ],
  },
  // Admin Routes
  {
    path: "/admin",
    element: (
      <AdminRoutes>
        <AdminLayout />,
      </AdminRoutes>
    ),
    children: [
      {
        path: "/admin",
        element: <AdminDashBoard />,
      },

       {
        path: "/admin/profile",
        element: <MyProfile />,
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
        path: "/admin/manageSubscription",
        element: <ManageSubscription />,
      },
      {
        path: "/admin/users",
        element: <AllUsers />,
      },
      {
        path: "/admin/upload",
        element: <PokemonCardUpload />,
      },
      {
        path: "/admin/users/vendors",
        element: <VendorUsers />,
      },
      {
        path: "/admin/users/normal",
        element: <NormalUsers />,
      },
    ],
  },

  // Vendor Routes
  {
    path: "/vendor",
    element: (
      <VendorRoutes>
        <VendorLayout />
      </VendorRoutes>
    ),
    children: [

      {
        path: "/vendor/profile",
        element: <MyProfile />,
      },
      {
        path: "/vendor",
        element: <VendorDashBoard />,
      },
      {
        path: "/vendor/products",
        element: <VendorProducts />,
      },
      {
        path: "/vendor/upload",
        element: <PokemonCardUpload />,
      },
      {
        path: "/vendor/orders",
        element: <VendorOrders />,
      },
      // {
      //   path: "/vendor/analytics",
      //   element: <VendorAnalytics />,
      // },
      {
        path: "/vendor/earnings",
        element: <VendorEarnings />,
      },
      {
        path: "/vendor/settings",
        element: <VendorSettings />,
      },
      {
        path: "/vendor/vendorSubsCription",
        element: <VendorSubscription />,
      },
    ],
  },
]);
