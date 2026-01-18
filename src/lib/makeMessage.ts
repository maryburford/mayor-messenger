// src/lib/makeMessage.ts
function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function lastName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return parts.length ? parts[parts.length - 1] : fullName;
}

export function makeAdvocacyMessage(opts: {
  councilName: string;
  wardLabel: string;
  neighborhoodHint?: string;
}) {
  const ln = lastName(opts.councilName);

  const greeting = pick([`Hi Councilperson ${ln},`, `Hello Councilperson ${ln},`, `Good day Councilperson ${ln},`]);

  const identity = pick([
    `I’m a Jersey City resident (${opts.wardLabel}).`,
    `I live in Jersey City and I’m in ${opts.wardLabel}.`,
    `I’m writing as a constituent in ${opts.wardLabel}.`,
  ]);

  const problem = pick([
    `Residents are struggling to get help for cats—especially community cats and urgent cases—and current resources are stretched thin.`,
    `Jersey City residents regularly need support for cats (lost, dumped, injured, unfixed, or community cats), and the system is overwhelmed.`,
    `There’s a clear gap in animal welfare capacity, and it’s showing up daily in our neighborhoods.`,
  ]);

  const ask = pick([
    `Please prioritize stable, dedicated funding for animal welfare programs—especially spay/neuter access and humane community-cat services.`,
    `I’m asking you to support meaningful funding in the city budget for animal welfare: spay/neuter, community-cat programs, and rescue support.`,
    `I urge you to back increased and sustained animal welfare funding, including spay/neuter and humane community cat initiatives.`,
  ]);

  const close = pick([
    `Can you share what specific steps you’ll support this year and what timeline residents should expect?`,
    `I’d appreciate hearing what actions you’ll take to secure funding and how residents can help.`,
    `Please let me know what budget or legislative actions you will support to move this forward.`,
  ]);

  return [
    greeting,
    "",
    identity + (opts.neighborhoodHint ? ` (${opts.neighborhoodHint})` : ""),
    "",
    problem,
    "",
    ask,
    "",
    close,
    "",
    "Thank you!",
  ].join("\n");
}