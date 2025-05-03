import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Categories from "../Pages/Home/Categories/Categories";
import MyBag from "../Pages/Shared/MyBag/MyBag";
import MyLibrary from "../Pages/Shared/MyLibrary/MyLibrary";
import PokaemonCardDetails from "../Pages/Shared/Pokaemon/PokaemonCardDetails";
import UnderConstruction from "../Compnent/UnderConstruction";
import SignIn from "../auth/SignIn";
import Signup from "../auth/Signup";
import MyProfile from "../Pages/Shared/MyProfile/MyProfile";
import VendorSignup from "../auth/VendorSignup";
import Pokaemon from "../Pages/Shared/Pokaemon/Pokaemon";
import PokemonCardUpload from "../Pages/Shared/PokemonCardCrud/PokemonCardUpload";
import PokaemonCardUpdate from "../Pages/Shared/PokemonCardCrud/PokaemonCardUpdate";
import Checkout from "../Pages/Shared/Checkout/Checkout";

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
        element: <PokaemonCardUpdate/>,
      },
      {
        path: "/myProfile",
        element: <MyProfile />,
      },
      {
        path: "/vendorSignup",
        element: <VendorSignup />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      { path: "*", element: <UnderConstruction /> },

    ],
  },
]);
