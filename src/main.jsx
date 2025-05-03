import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ShopProvider } from "./Context/ShopContext.jsx";
// Create a queryClient instance
export const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <ShopProvider>
        <RouterProvider router={router} />
        </ShopProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>

);
