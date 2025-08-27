export default function CheckboxInput({ name, label, ...rest }) {
  return (
    <label className="flex items-center select-none" htmlFor={name}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className="mr-2 form-checkbox rounded text-indigo-600 focus:ring-indigo-600"
        {...rest}
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}
