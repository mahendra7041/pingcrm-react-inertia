export default function DeleteButton({ onDelete, children, ...rest }) {
  return (
    <button
      type="button"
      tabIndex={-1}
      onClick={onDelete}
      className={"text-red-600 focus:outline-none hover:underline"}
      {...rest}
    >
      {children}
    </button>
  );
}
