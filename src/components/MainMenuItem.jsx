import { Link, usePage } from "@inertiajs/react";
import classNames from "classnames";

const normalize = (str) => str.replace(/^\/+/, "");

export default function MainMenuItem({ text, link, icon }) {
  const url = usePage().url;
  const isActive =
    link === "/" ? url === "/" : normalize(url).startsWith(normalize(link));

  return (
    <div className="mb-4">
      <Link
        href={link}
        className={classNames(
          "group flex items-center py-3 fill-white text-white",
          { "!fill-indigo-400 !text-indigo-300": isActive }
        )}
      >
        <div className="mr-2 w-4 h-4 group-hover:fill-indigo-400">{icon}</div>
        <div className="group-hover:text-indigo-300">{text}</div>
      </Link>
    </div>
  );
}
