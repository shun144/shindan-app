import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/main.scss";
import App from "@/app/App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
