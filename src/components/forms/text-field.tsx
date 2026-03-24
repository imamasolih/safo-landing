import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label: string;
  error?: string;
};

export function TextField({
  className,
  label,
  name,
  error,
  required,
  ...props
}: TextFieldProps) {
  const inputId = props.id ?? name;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="space-y-2">
      <label className="field-label" htmlFor={inputId}>
        {label}
        {!required ? " (optional)" : ""}
      </label>
      <input
        id={inputId}
        name={name}
        className={cn("field-shell", className)}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        required={required}
        {...props}
      />
      {error ? (
        <p id={errorId} className="text-sm text-[color:var(--color-accent-strong)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
