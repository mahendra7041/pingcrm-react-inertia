import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import "./index.css";

const appName = import.meta.env.VITE_APP_NAME || "React Inertia App";

export default function render(page) {
  return createInertiaApp({
    id: "root",
    title: (title) => `${title} - ${appName}`,
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
      const page = pages[`./pages/${name}.jsx`];

      if (!page) {
        throw new Error(`Page not found: ${name}`);
      }

      return page;
    },
    setup: ({ App, props }) => <App {...props} />,
  });
}
