import { createInertiaApp } from "@inertiajs/react";
import { hydrateRoot } from "react-dom/client";
import "./index.css";

const appName = import.meta.env.VITE_APP_NAME || "React Inertia App";

createInertiaApp({
  id: "root",
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
    const page = pages[`./pages/${name}.jsx`];

    if (!page) {
      throw new Error(`Page not found: ${name}`);
    }

    return page;
  },
  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />);
  },
});
