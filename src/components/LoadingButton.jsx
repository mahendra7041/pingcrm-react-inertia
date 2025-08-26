import cx from "classnames";

export default function LoadingButton({
  loading = false,
  className,
  children,
  ...rest
}) {
  const className = cx(
    "flex items-center",
    "focus:outline-none",
    {
      "pointer-events-none bg-opacity-75 select-none": loading,
    },
    className
  );

  return (
    <button disabled={loading} className={className} {...rest}>
      {loading && <div className="mr-2 btn-spinner" />}
      {children}
    </button>
  );
}
