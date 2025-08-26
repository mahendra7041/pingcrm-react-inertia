import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import "./index.css";

export default function render(page) {
  return createInertiaApp({
    id: "root",
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
