import cx from "classnames";

export default function TextInput({ name, error, className, ...rest }) {
  const inputClass = cx(
    "form-input border-gray-300",
    {
      "border-red-400 focus:border-red-400 focus:ring-red-400": error,
    },
    className
  );

  return <input id={name} name={name} className={inputClass} {...rest} />;
}
