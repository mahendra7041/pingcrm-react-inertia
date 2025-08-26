import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "./index.css";

createInertiaApp({
  id: "root",
  resolve: (name) => {
    const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
    const page = pages[`./pages/${name}.jsx`];

    if (!page) {
      throw new Error(`Page not found: ${name}`);
    }

    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
