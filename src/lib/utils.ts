export function cn(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function isPlaceholder(value: string | null | undefined) {
  return typeof value === "string" && /^\[.*\]$/.test(value.trim());
}
