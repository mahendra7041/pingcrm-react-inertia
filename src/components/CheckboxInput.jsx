export default function CheckboxInput({ name, label, ...rest }) {
  return (
    <label className="flex items-center mt-6 select-none" htmlFor={name}>
      <input id={name} name={name} type="checkbox" className="mr-1" {...rest} />
      <span className="text-sm">{label}</span>
    </label>
  );
}
