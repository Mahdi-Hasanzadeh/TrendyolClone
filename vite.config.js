import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/TrendyolClone/",
  // base: import.meta.env.MODE === "production" ? "/TrendyolClone/" : "/",
  base: "/",
});
