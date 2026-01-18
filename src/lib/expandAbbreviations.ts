// Conservative street-type expansion.
// Only expands when the token appears at the end or followed by punctuation.
// Keeps it Jersey-City-friendly and avoids being too clever.

const REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bst\.?(?=$|[,\s])/gi, "Street"],
  [/\bave\.?(?=$|[,\s])/gi, "Avenue"],
  [/\bav\.?(?=$|[,\s])/gi, "Avenue"],
  [/\brd\.?(?=$|[,\s])/gi, "Road"],
  [/\bdr\.?(?=$|[,\s])/gi, "Drive"],
  [/\bblvd\.?(?=$|[,\s])/gi, "Boulevard"],
  [/\bln\.?(?=$|[,\s])/gi, "Lane"],
  [/\bct\.?(?=$|[,\s])/gi, "Court"],
  [/\bpl\.?(?=$|[,\s])/gi, "Place"],
  [/\bter\.?(?=$|[,\s])/gi, "Terrace"],
  [/\bpkwy\.?(?=$|[,\s])/gi, "Parkway"],
  [/\bhwy\.?(?=$|[,\s])/gi, "Highway"],
  [/\bway\.?(?=$|[,\s])/gi, "Way"],
];

export function expandCommonAddressAbbreviations(input: string): string {
  let s = input.trim().replace(/\s+/g, " ");
  for (const [re, full] of REPLACEMENTS) s = s.replace(re, full);
  return s;
}