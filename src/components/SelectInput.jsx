import cx from "classnames";

export default function SelectInput({
  name,
  error,
  options = [],
  className,
  ...rest
}) {
  const selectClass = cx(
    "form-select w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300 rounded",
    {
      "border-red-400 focus:border-red-400 focus:ring-red-400": error,
    },
    className
  );

  return (
    <select id={name} name={name} className={selectClass} {...rest}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
