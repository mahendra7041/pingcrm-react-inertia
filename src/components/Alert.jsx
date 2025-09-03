import { Check, CircleX, Info, TriangleAlert } from "lucide-react";
import CloseButton from "@/components/CloseButton";
import classNames from "classnames";

const VARIANTS = {
  success: {
    color: "green",
    bg: "bg-green-500 text-white",
    icon: <Check size={20} />,
  },
  error: {
    color: "red",
    bg: "bg-red-500 text-white",
    icon: <CircleX size={20} />,
  },
  warning: {
    color: "yellow",
    bg: "bg-yellow-500 text-yellow-800",
    icon: <TriangleAlert size={20} />,
  },
  info: {
    color: "blue",
    bg: "bg-gray-200 text-blue-800",
    icon: <Info size={20} />,
  },
};

export default function Alert(props) {
  const variant = props.variant || "success";
  const { color, bg, icon: defaultIcon } = VARIANTS[variant];

  return (
    <div
      className={classNames(
        bg,
        "px-4 mb-8 flex items-center justify-between rounded max-w-3xl"
      )}
    >
      <div className="flex items-center space-x-2">
        {props.icon || defaultIcon}
        <div className="py-4 text-sm font-medium">{props.message}</div>
      </div>
      {props.action}
      {props.onClose && <CloseButton onClick={props.onClose} color={color} />}
    </div>
  );
}
