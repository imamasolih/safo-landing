type SelectFieldProps = {
  id?: string;
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  error?: string;
  required?: boolean;
  defaultValue?: string;
};

export function SelectField({
  id,
  name,
  label,
  placeholder,
  options,
  error,
  required,
  defaultValue,
}: SelectFieldProps) {
  const selectId = id ?? name;
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <div className="space-y-2">
      <label className="field-label" htmlFor={selectId}>
        {label}
      </label>
      <select
        id={selectId}
        name={name}
        className="field-shell"
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        defaultValue={defaultValue ?? ""}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} className="text-sm text-[color:var(--color-accent-strong)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
