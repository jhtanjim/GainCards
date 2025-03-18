import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { ShopProvider } from "./Compnent/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
        <ShopProvider>
    <RouterProvider router={router} />
    </ShopProvider>
  </StrictMode>
);
