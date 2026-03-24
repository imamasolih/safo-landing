export function cn(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function isPlaceholder(value: string | null | undefined) {
  return typeof value === "string" && /^\[.*\]$/.test(value.trim());
}

export function firstSearchParam(
  value: string | string[] | undefined,
  fallback = "",
) {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }

  return value ?? fallback;
}
