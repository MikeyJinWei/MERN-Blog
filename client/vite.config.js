import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/server": {
        target: "https://mern-blog-hdz7.onrender.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
