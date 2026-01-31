// src/lib/makeMessage.ts

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function lastName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return parts.length ? parts[parts.length - 1] : fullName;
}

type Tone = "heart" | "operations";

export function makeAdvocacyMessage(opts: {
  councilName: string;
  toneHint?: Tone;
  spicy?: boolean;
}) {
  const ln = lastName(opts.councilName);

  // Tone selection:
  // - If spicy: randomly choose spicy HEART vs spicy OPERATIONS (50/50)
  // - Else: honor toneHint if provided, otherwise 2:1 heart vs operations
  const tone: Tone = opts.spicy
    ? pick(["heart", "operations"])
    : opts.toneHint ?? pick(["heart", "heart", "operations"]);

  const isSpicy = Boolean(opts.spicy);

  const greeting = pick([
    `Hello Mayor ${ln},`,
    `Mayor ${ln},`,
    `Hi Mayor ${ln},`,
    `Greetings Mayor ${ln},`,
    `Good day Mayor ${ln},`,
  ]);

  const identity = pick([
    `I’m a Jersey City resident writing about feral cats and animal welfare.`,
    `I live in Jersey City, and I’m reaching out about feral cats and humane animal welfare solutions.`,
    `I’m a Jersey City constituent concerned about feral cats and animal welfare.`,
    `I’m a Jersey City resident and I care deeply about feral cats, TNR, and animal welfare.`,
    `I’m writing as a Jersey City resident who keeps seeing feral cats in my neighborhood and wants humane solutions.`,
    `I’m a Jersey City resident contacting you about feral cats and the need for stronger animal welfare support.`,
    `I live in Jersey City and I’m writing about the city’s approach to feral cats and animal welfare.`,
    `I’m a Jersey City resident advocating for humane support for feral cats and broader animal welfare programs.`,
    `I’m a Jersey City resident reaching out about feral cats and the need for funding for animal welfare.`,
    `I’m writing as a Jersey City resident concerned about feral cats and how underfunded animal welfare impacts our neighborhoods.`,
    `I’m a Jersey City resident and I’m contacting you about feral cats, TNR, and the city’s animal welfare capacity.`,
    `I’m a Jersey City resident writing to ask for humane, funded solutions for feral cats and animal welfare.`,
    `I’m a Jersey City resident who supports TNR and I’m writing about feral cats and animal welfare needs citywide.`,
    `I’m a Jersey City resident reaching out because feral cats and animal welfare are issues in our community that you need to take seriously.`,
  ]);


  const spicyIdentity = pick([
  `I’m a Jersey City resident reaching out because the city’s response to feral and community cats is not meeting the reality on the ground.`,
  `I live in Jersey City and I’m contacting you because residents are being left to handle feral and community cat situations without adequate city support.`,
  `I’m a Jersey City resident and I’m frustrated that humane solutions for feral and community cats still depend on volunteers and an under-resourced city shelter instead of a funded city plan.`,
  `I’m writing as a Jersey City resident who keeps seeing the same feral and community cat crises repeat because prevention and TNR aren’t funded at the level needed.`,
  `I’m a Jersey City resident contacting you about feral and community cats because this is a city responsibility, not something residents should have to solve alone.`,
  `I’m a Jersey City resident writing because animal welfare and community cat management should not be a patchwork of Facebook posts, emergency rescues and an under-resourced city shelter.`,
  `I live in Jersey City and I’m reaching out to be very direct: we need city-funded animal welfare resources for community cats, including TNR and prevention.`,
  `I’m a Jersey City resident advocating for humane, practical solutions for feral and community cats—and for proper funding to make those solutions real.`,
  `I’m a Jersey City resident writing because the city needs to step up on animal welfare and community cats with funding, capacity, and clear process.`,
]);

  const identityLine = isSpicy ? spicyIdentity : identity;

  // --------------------------------
  // HEART (normal)
  // --------------------------------
  const heartProblem = [
    `Residents are constantly trying to help cats in crisis—injured, dumped, unfixed, or living outdoors—but there aren’t enough city-supported resources for humane cat care and TNR.`,
    `Across Jersey City, people encounter community cats every day, but without consistent TNR and support, cats keep reproducing and residents don’t know where to turn.`,
    `Volunteer rescuers and residents are doing everything they can for cats, but without stable city support for TNR and animal welfare services, too many cats fall through the cracks.`,
    `Jersey City needs stronger animal welfare infrastructure. Community effort helps cats, but it can’t replace a funded citywide TNR program.`,
    `We’re seeing preventable suffering for cats because the safety net is thin: limited TNR capacity, inconsistent cat support services, and too many people trying to solve cat emergencies alone.`,
    `Cats are being abandoned and left outdoors, and without accessible TNR and humane cat services, the same cat situations repeat in every neighborhood.`,
    `Right now, humane help for cats depends on luck—who sees a post and whether a volunteer can step in—because we don’t have adequate city-supported TNR and animal welfare resources.`,
  ];

  const heartProblem2 = [
    `A big part of this is prevention for cats: many residents want to be responsible cat owners but can’t access affordable spay/neuter, so cats end up unsterilized and TNR demand grows.`,
    `Prevention is the missing piece for cats. When families can’t afford spay/neuter and basic vet care, cats are more likely to end up abandoned, and community cats increase without enough TNR.`,
    `We need support for residents trying to do right by their cats: affordable spay/neuter prevents accidental litters and reduces pressure on TNR and cat rescue.`,
    `Too many residents are priced out of basic vet care for cats. Without affordable spay/neuter, the cycle continues—more kittens, more community cats, and more need for TNR.`,
    `Low-cost spay/neuter access for cats is essential. When people can’t afford it, accidental litters happen, and cats end up outdoors where TNR becomes the only humane option.`,
    `Supporting responsible cat ownership—especially affordable spay/neuter—reduces abandonment and makes TNR for community cats more manageable.`,
    `When spay/neuter is out of reach, it creates a predictable cycle: more unsterilized cats, more kittens, and more cats outside needing TNR.`,
  ];

  const heartAsk = [
    `Please prioritize stable, dedicated funding for animal welfare—especially humane community TNR and expanded spay/neuter capacity.`,
    `I’m asking your administration to support meaningful budget funding for animal welfare services residents can actually access, including TNR for community cats.`,
    `Please back expanded and sustained funding with a strong prevention focus: affordable spay/neuter and humane TNR for community cats.`,
    `Please invest in a citywide plan that treats TNR and animal welfare as essential services, not optional.`,
    `I’m asking you to make animal welfare a real budget priority, with stable funding for TNR and services instead of patchwork fixes.`,
  ];

  const heartAsk2 = [
    `In addition to TNR for community cats, please invest in affordable veterinary services for residents’ pets—especially low-cost spay/neuter—so cats stay in homes and we prevent abandonment.`,
    `Please support programs that help residents be responsible pet owners: accessible spay/neuter, affordable basic care, and clear pathways for help before cats are abandoned or end up outdoors.`,
    `And please take steps to reduce pet abandonment through housing policy—discouraging blanket “no pets” rules and incentivizing pet-friendly rentals—so animals aren’t surrendered or dumped and the community cat burden doesn’t surge.`,
    `Alongside TNR, address preventable abandonment by expanding low-cost spay/neuter and strengthening pet-friendly housing practices.`,
    `Please expand low-cost spay/neuter and create resident-friendly support pathways so situations are handled early instead of turning into ongoing crises.`,
  ];

  const heartClose = [
    `What specific actions will you take this year to secure funding for animal welfare—especially TNR and affordable spay/neuter access?`,
    `Can you share a timeline for expanding TNR for community cats and low-cost spay/neuter access citywide?`,
    `If there’s a budget hearing where animal welfare, TNR, and spay/neuter funding decisions are made, please share the dates—many residents are ready to show up.`,
    `I’d appreciate hearing what commitments you’re willing to make in the upcoming budget cycle, including TNR scale and spay/neuter capacity.`,
    `Please let me know what concrete initiatives you’ll support (TNR, spay/neuter access, anti-abandonment measures) and how residents can help move them forward.`,
    `Can your office share what current capacity exists for TNR and spay/neuter, and what you will fund to close the gap?`,
  ];

  // --------------------------------
  // HEART (spicy)
  // --------------------------------
  const heartProblemSpicy = [
    `Residents are trying to handle cat emergencies and community cat situations with almost no city-backed support—and it’s not sustainable.`,
    `People are doing everything they can for community cats, but without real city investment in TNR and animal welfare, the same crises repeat endlessly.`,
    `Right now, the city is effectively outsourcing animal welfare to volunteers and Facebook posts. That’s not a humane plan for cats or for residents.`,
    `We should not be relying on luck and unpaid labor to manage feral and community cats. This needs a funded, city-led approach.`,
    `The lack of consistent support for TNR and basic animal welfare services is creating preventable suffering—and residents are stuck cleaning it up.`,
  ];

  const heartProblem2Spicy = [
    `And prevention is where the city keeps dropping the ball: when spay/neuter isn’t affordable, unsterilized cats multiply and more end up outdoors needing TNR.`,
    `When residents can’t access low-cost spay/neuter and basic vet care, the city ends up with more community cats, more abandonment, and more suffering—every time.`,
    `This cycle is predictable: no affordable spay/neuter, more kittens, more cats outside, and then the community is expected to “figure it out.”`,
    `If the city wants fewer cats abandoned or living outdoors, affordable spay/neuter can’t be treated like a nice-to-have.`,
    `Prevention saves cats and reduces strain on everyone. Without low-cost spay/neuter, the need for TNR and rescue will keep exploding.`,
  ];

  const heartAskSpicy = [
    `Please stop treating this like a side issue and fund animal welfare like it matters—starting with TNR and spay/neuter capacity.`,
    `I’m asking for a real budget commitment: fund TNR and prevention at a level that actually changes outcomes for community cats.`,
    `Jersey City needs to invest in animal welfare in a serious way—more TNR capacity, more spay/neuter access, and a clear path for residents to get help.`,
    `Please put stable funding behind humane community cat solutions instead of leaving residents to patch things together.`,
    `Fund the work that actually reduces suffering: TNR, affordable spay/neuter, and resident-facing support.`,
  ];

  const heartAsk2Spicy = [
    `Along with TNR, invest in low-cost veterinary access—especially spay/neuter—so responsible pet ownership isn’t only for people who can afford private vet prices.`,
    `And be honest about the housing piece: pet bans and “no pets” policies push people toward surrender and abandonment, which makes the community cat problem worse.`,
    `Create real support before cats end up outside: low-cost spay/neuter, basic vet help, and straightforward guidance for residents who need options.`,
    `If you want fewer abandoned cats, fund prevention and remove barriers that push pets out of homes—including unreasonable rental policies.`,
    `Make prevention easy to access so residents can do the right thing before the situation becomes a street-level crisis and TNR emergency.`,
  ];

  const heartCloseSpicy = [
    `Will you commit this year to real funding for animal welfare, including TNR and affordable spay/neuter access?`,
    `What specific budget increase will you support for TNR and spay/neuter access—and when will residents see it?`,
    `What’s the plan and timeline to scale humane community cat management in a way that actually reduces outdoor cat populations?`,
    `Where can residents show up to demand funding for animal welfare in the budget process—and what should we ask for?`,
    `Please share what concrete commitments you’ll make this budget cycle to fund prevention and TNR at scale.`,
  ];

  // --------------------------------
  // OPERATIONS (normal)
  // --------------------------------
  const opsProblem = [
    `Jersey City has JC Animal Care & Control (JCACC) and committed staff. The operational gap is resources: community cat volume outpaces funded capacity, including TNR.`,
    `JCACC exists and does important work. But without enough budget for animal welfare—especially TNR and low-cost spay/neuter—residents still rely on informal networks.`,
    `The city needs to equip JCACC to run solutions at scale: TNR for community cats, spay/neuter access for residents, and clear resident-facing workflows.`,
    `The foundation is there with JCACC, but prevention isn’t resourced at a level that matches reality: we need funded TNR and affordable spay/neuter to reduce volume.`,
    `Without funded TNR for community cats and spay/neuter access for owned cats, populations grow and complaints/conflicts repeat.`,
    `Right now, residents don’t see a consistent, well-resourced pathway, even though JCACC could be the hub for TNR and prevention if funded to scale.`,
    `We can reduce feral cat volume sustainably if JCACC is funded and empowered to coordinate TNR and expand affordable spay/neuter access.`,
  ];

  const opsProblem2 = [
    `Prevention is the lever: affordable spay/neuter for owned cats plus humane TNR for community cats reduces future volume—if funded properly through JCACC.`,
    `A major driver is preventable: when residents can’t access low-cost spay/neuter, more cats end up unsterilized and outdoors, increasing TNR needs over time.`,
    `Without access to affordable spay/neuter and scalable TNR, the city stays in a cycle of more kittens, more community cats, and more residents improvising solutions.`,
    `Housing pressure contributes to abandonment. When rentals exclude pets, families are pushed toward surrender or dumping, which increases community cats and TNR demand.`,
    `TNR works best when paired with affordable spay/neuter for owned cats—both are needed for effective animal-welfare operations and reduce pressure on JCACC.`,
    `If the city wants durable reduction in feral cats, it has to invest upstream: low-cost spay/neuter access plus a well-funded TNR program.`,
  ];

  const opsAsk = [
    `I’m asking you to fully fund and empower JCACC to be the front door for residents: expand spay/neuter capacity, support humane TNR for community cats, and publish a clear resident-facing process.`,
    `Please make a budget commitment that equips JCACC to meet demand: staffing and programs that scale TNR and low-cost spay/neuter access.`,
    `Can your administration commit to resourcing JCACC with stable funding and authority to run a citywide animal welfare strategy (low-cost spay/neuter + TNR) with transparent targets?`,
    `Treat animal welfare like core city operations by investing in JCACC: fund TNR, build spay/neuter capacity, and make the process legible to residents.`,
    `Please prioritize sustained funding that allows JCACC to expand humane TNR and prevention so the city can measurably reduce feral cats over time.`,
    `Please expand JCACC capacity with a dedicated budget line for TNR and prevention and publish resident-facing guidance.`,
  ];

  const opsAsk2 = [
    `In addition to TNR, invest in low-cost spay/neuter and affordable basic veterinary access so responsible pet ownership is realistic—not a luxury.`,
    `Please fund resident-facing spay/neuter vouchers or clinic partnerships so prevention is accessible citywide and fewer cats end up outdoors.`,
    `Please support pet retention efforts—basic care and prevention—so fewer cats are abandoned and the city’s TNR burden shrinks.`,
    `And address abandonment pressure through housing policy: discourage blanket “no pets” practices and incentivize pet-friendly rentals.`,
    `TNR alone can’t carry it. The city should fund both TNR and access to low-cost spay/neuter so fewer cats enter the outdoor cycle.`,
  ];

  const opsClose = [
    `What specific funding increases and capacity targets will you support for animal welfare at JCACC this year—especially TNR scale and low-cost spay/neuter access?`,
    `Can you share what your administration will propose in the next budget cycle to expand JCACC’s animal welfare capacity and how residents can track progress?`,
    `What’s the timeline for increasing low-cost spay/neuter access and expanding TNR, and how will the city communicate the process clearly to residents?`,
    `If there’s a budget hearing where animal welfare, TNR, and spay/neuter funding are decided, please share where residents should show up and what to ask for.`,
    `Please outline the concrete steps you’ll take to empower JCACC to be the solution—funding, prevention capacity, and a resident-facing workflow for TNR and support.`,
    `Who in your administration is accountable for expanding TNR and spay/neuter access, and what commitments will be made publicly this year?`,
    `Can you share current TNR and spay/neuter capacity and what you will fund to close the gap?`,
  ];

  // --------------------------------
  // OPERATIONS (spicy)
  // --------------------------------
  const opsProblemSpicy = [
    `JCACC staff are doing real work, but they’re being asked to solve a city-scale animal welfare problem without city-scale resources. That’s a leadership and budget choice.`,
    `Jersey City already has JCACC. The problem isn’t the existence of a department—it’s that the city has not funded prevention and TNR at a level that matches reality.`,
    `Right now, residents are effectively forced into DIY animal welfare for community and feral cats because the city has not built enough capacity for spay/neuter access and TNR.`,
    `The city’s current level of investment guarantees the same outcomes: more unsterilized cats outdoors, more conflict, more suffering, and more pressure on volunteers.`,
    `This isn’t a mystery problem—it’s a resourcing problem. Without funded spay/neuter and TNR, the outdoor cat population will keep growing.`,
    `JCACC could be the front door for humane solutions, but only if the mayor funds it to function that way. Right now, it’s not resourced to meet demand.`,
    `When a city underfunds prevention, the downstream mess is pushed onto neighborhoods, volunteers, and the cats.`,
  ];

  const opsProblem2Spicy = [
    `If spay/neuter access is scarce and TNR is underfunded, you don’t get stability—you get growth. That’s exactly what we’re seeing.`,
    `Low-cost spay/neuter and TNR are the two core levers. Underfund both, and you lock the city into a permanent, avoidable cycle.`,
    `The city is currently acting like this is a volunteer problem. It’s not. It’s a municipal animal welfare problem that requires municipal funding.`,
    `Every year the city delays serious investment in spay/neuter access and TNR, the problem compounds and becomes harder and more expensive to fix.`,
    `Abandonment pressure and unsterilized cats outdoors aren’t random. They are predictable results of insufficient prevention capacity and weak support pathways.`,
    `A city that wants durable results has to fund upstream prevention. Right now those levers are not funded at the level required.`,
  ];

  const opsAskSpicy = [
    `Fund JCACC like you expect results. That means real budget for prevention: low-cost spay/neuter access and a scalable TNR program for community cats.`,
    `Stop treating TNR and spay/neuter access like optional add-ons. Put them in the budget as core animal welfare services and resource JCACC to deliver them.`,
    `I’m asking you to make a clear budget commitment: expand spay/neuter access, scale TNR through JCACC, and publish a simple resident-facing process that actually works.`,
    `Empower JCACC to be the solution by funding staff, partnerships, and program capacity so residents aren’t forced to rely on informal networks.`,
    `If the city wants fewer outdoor cats, it needs a funded plan: expand TNR and make spay/neuter accessible.`,
    `Please commit to stable, recurring funding for JCACC to run prevention at scale. One-off gestures won’t fix a compounding problem.`,
  ];

  const opsAsk2Spicy = [
    `Make low-cost spay/neuter genuinely accessible—more appointments, more affordability, and an easy pathway residents can use—so prevention is real, not theoretical.`,
    `Fund spay/neuter vouchers or clinic partnerships at a level that moves the needle, and pair that with expanded TNR so the outdoor population actually declines.`,
    `If the city is serious about reducing abandonment, it must also address housing pressure—discourage blanket “no pets” rules and incentivize pet-friendly rentals.`,
    `TNR alone won’t hold the line if owned pets can’t access affordable spay/neuter. Fund both sides of prevention so fewer cats enter the outdoor cycle.`,
    `Residents are willing to do their part. The city needs to do its part: fund prevention, support pet retention, and scale TNR.`,
  ];

  const opsCloseSpicy = [
    `Will you commit—in the next budget—to specific increases for animal welfare at JCACC, including expanded spay/neuter access and a larger TNR program?`,
    `What are your concrete targets for the next 12 months: TNR scale funded, spay/neuter access expanded, and a clear resident process published?`,
    `Who is accountable in your administration for funding and scaling spay/neuter access and TNR, and what commitments will be made public this year?`,
    `If you want residents to stop improvising solutions for community cats, what funding and timeline will you commit to so JCACC can actually meet demand?`,
    `Please share the budget plan: what new dollars are being allocated to prevention, spay/neuter access, and TNR, and when will residents see the impact?`,
    `If these decisions are made in budget hearings, please share where and when—because residents are ready to show up and ask for funding, not platitudes.`,
  ];

  // Select the right pools based on tone + spicy flag.
  const problem =
    tone === "heart"
      ? isSpicy
        ? `${pick(heartProblemSpicy)} ${pick(heartProblem2Spicy)}`
        : `${pick(heartProblem)} ${pick(heartProblem2)}`
      : isSpicy
        ? `${pick(opsProblemSpicy)} ${pick(opsProblem2Spicy)}`
        : `${pick(opsProblem)} ${pick(opsProblem2)}`;

  const ask =
    tone === "heart"
      ? isSpicy
        ? `${pick(heartAskSpicy)} ${pick(heartAsk2Spicy)}`
        : `${pick(heartAsk)} ${pick(heartAsk2)}`
      : isSpicy
        ? `${pick(opsAskSpicy)} ${pick(opsAsk2Spicy)}`
        : `${pick(opsAsk)} ${pick(opsAsk2)}`;

  const close =
    tone === "heart"
      ? isSpicy
        ? pick(heartCloseSpicy)
        : pick(heartClose)
      : isSpicy
        ? pick(opsCloseSpicy)
        : pick(opsClose);

  const signoff = pick([
    "Thank you for your time,",
    "Thank you,",
    "Respectfully,",
    "With appreciation,",
    "Sincerely,",
  ]);

  return [
    greeting,
    "",
    identityLine,
    "",
    problem,
    "",
    ask,
    "",
    close,
    "",
    signoff,
    "[Your name]",
  ].join("\n");
}