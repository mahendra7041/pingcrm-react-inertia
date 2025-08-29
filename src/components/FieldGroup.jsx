export default function FieldGroup({ label, name, error, children }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      {children}
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}
