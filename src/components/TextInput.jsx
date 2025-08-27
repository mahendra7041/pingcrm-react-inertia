import cx from "classnames";

export default function TextInput({ name, error, className, ...rest }) {
  const inputClass = cx(
    "form-input w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300 rounded",
    {
      "border-red-400 focus:border-red-400 focus:ring-red-400": error,
    },
    className
  );

  return <input id={name} name={name} className={inputClass} {...rest} />;
}
