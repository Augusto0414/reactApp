import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const replacePlugin = (mode: any) => {
  return {
    name: "html-inject-env",
    transformIndexHtml: (html: any) => {
      if (mode === "production") {
        return html.replace("<!--REACT_ENV-->", `<script src="./config/front.env.js"></script>`);
      }
      return null;
    },
  };
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), replacePlugin(mode)],
}));
