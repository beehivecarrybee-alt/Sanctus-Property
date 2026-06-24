// Generic error reporting utility (no external dependencies)
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  console.error("[Error Boundary]", error, context);
}
