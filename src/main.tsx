import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import RouterConfig from "./config/router.config";



createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <RouterConfig/>
   </StrictMode>
);
