import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function TextareaField({
  className,
  label,
  name,
  error,
  required,
  ...props
}: TextareaFieldProps) {
  const textareaId = props.id ?? name;
  const errorId = error ? `${textareaId}-error` : undefined;

  return (
    <div className="space-y-2">
      <label className="field-label" htmlFor={textareaId}>
        {label}
      </label>
      <textarea
        id={textareaId}
        name={name}
        className={cn("field-shell min-h-36 resize-y", className)}
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
