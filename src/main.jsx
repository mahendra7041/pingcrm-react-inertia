import { createInertiaApp } from "@inertiajs/react";
import { hydrateRoot } from "react-dom/client";
import BaseLayout from "@/layouts/BaseLayout";
import "./index.css";

const appName = import.meta.env.VITE_APP_NAME || "PingCRM";

createInertiaApp({
  id: "root",
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
    const page = pages[`./pages/${name}.jsx`];

    if (!page) {
      throw new Error(`Page not found: ${name}`);
    }

    page.default.layout =
      page.default.layout || ((page) => <BaseLayout children={page} />);

    return page;
  },
  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />);
  },
});
