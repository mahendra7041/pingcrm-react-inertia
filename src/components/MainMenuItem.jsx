import { Link } from "@inertiajs/react";
import classNames from "classnames";

export default function MainMenuItem({ text, link, icon }) {
  const isActive = link;

  const iconClasses = classNames({
    "text-white": isActive,
    "text-indigo-400 group-hover:text-white": !isActive,
  });

  const textClasses = classNames({
    "text-white": isActive,
    "text-indigo-200 group-hover:text-white": !isActive,
  });

  return (
    <div className="mb-4">
      <Link href={link} className="flex items-center group py-3 space-x-3">
        <div className={iconClasses}>{icon}</div>
        <div className={textClasses}>{text}</div>
      </Link>
    </div>
  );
}
