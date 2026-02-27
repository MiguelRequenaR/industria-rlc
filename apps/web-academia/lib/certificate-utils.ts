const MODULO_PREFIX = /^M[oó]dulo \d+:\s*/i
// Excluye módulos de tipo evaluación/examen
const EXCLUDED_TITLES = /examen|evaluaci[oó]n|final|quiz/i
const MAX_MODULES = 4

export function formatModulesDescription(modules: unknown): string {
  const list = Array.isArray(modules) ? modules : modules ? [modules] : []
  const withOrder = list
    .filter((m): m is { title?: string; order_index?: number } => m != null && typeof m === "object")
    .map((m) => ({ title: m.title ?? "", order_index: m.order_index ?? 0 }))
    .sort((a, b) => a.order_index - b.order_index)
  if (withOrder.length === 0) return ""
  const titles = withOrder
    .map((m) => m.title.replace(MODULO_PREFIX, "").trim())
    .filter((t) => t && !EXCLUDED_TITLES.test(t))
    .slice(0, MAX_MODULES)
  if (titles.length === 0) return ""
  return `El programa comprendió: ${titles.join(", ")}.`
}
