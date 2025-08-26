import classNames from "classnames";
import { X } from "lucide-react";

export default function CloseButton({ color = "red", onClick, ...rest }) {
  const iconClass = classNames("fill-current", {
    "text-red-700 group-hover:text-red-800": color === "red",
    "text-green-700 group-hover:text-green-800": color === "green",
  });

  return (
    <button
      type="button"
      onClick={onClick}
      className="focus:outline-none group p-2"
      {...rest}
    >
      <X size={16} className={iconClass} />
    </button>
  );
}
