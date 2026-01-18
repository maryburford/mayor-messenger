export function normalizeJerseyCityAddress(raw: string): string {
  const s = raw.trim().replace(/\s+/g, " ");
  if (!s) return s;

  const lower = s.toLowerCase();

  const hasJerseyCity =
    lower.includes("jersey city") ||
    lower.includes("j c") || // optional, a little loose
    lower.includes("jc,");   // optional

  const hasNJ =
    /\bnj\b/.test(lower) ||
    lower.includes("new jersey") ||
    /\b0?73\d{3}\b/.test(lower); // any JC-ish zip (073xx) counts as NJ context

  // If they already included city+state-ish, leave it alone
  if (hasJerseyCity && hasNJ) return s;

  // If they included NJ but not city, add city
  if (!hasJerseyCity && hasNJ) return `${s}, Jersey City`;

  // If they included city but not NJ, add NJ
  if (hasJerseyCity && !hasNJ) return `${s}, NJ`;

  // Otherwise add both
  return `${s}, Jersey City, NJ`;
}