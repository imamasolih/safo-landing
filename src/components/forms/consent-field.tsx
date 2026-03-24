type ConsentFieldProps = {
  label: string;
  error?: string;
  defaultChecked?: boolean;
};

export function ConsentField({
  label,
  error,
  defaultChecked,
}: ConsentFieldProps) {
  const errorId = error ? "consent-error" : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor="consent"
        className="flex items-start gap-3 rounded-[1.2rem] border border-[color:var(--color-border)] bg-white/72 px-4 py-4 text-sm leading-6 text-[color:var(--color-ink-soft)] transition-[border-color,box-shadow] duration-200 focus-within:border-[color:rgba(20,127,146,0.3)] focus-within:shadow-[0_0_0_2px_rgba(20,127,146,0.18)]"
      >
        <input
          id="consent"
          name="consent"
          type="checkbox"
          defaultChecked={defaultChecked}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className="mt-1 h-4 w-4 rounded border-[color:var(--color-border-strong)] text-[color:var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:rgba(20,127,146,0.28)] focus:ring-[color:var(--color-accent)]"
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p id={errorId} className="text-sm text-[color:var(--color-accent-strong)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
