import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { ShopProvider } from "./Context/ShopContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <AuthProvider>
    <ShopProvider>
      <RouterProvider router={router} />
    </ShopProvider>
  </AuthProvider>
</StrictMode>

);
