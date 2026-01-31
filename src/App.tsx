import { useMemo, useState } from "react";
import { COUNCIL_BY_WARD } from "./data/councilContacts";
import { makeAdvocacyMessage } from "./lib/makeMessage";

function toTelHref(phone: string) {
  const cleaned = phone.replace(/[^\d+]/g, "");
  return `tel:${cleaned}`;
}

function toMailtoHref(email: string, subject: string, body: string) {
  const params = new URLSearchParams();
  params.set("subject", subject);
  params.set("body", body);
  return `mailto:${email}?${params.toString()}`;
}

async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

export default function App() {
  const mayor = COUNCIL_BY_WARD["MAYOR"];

  // UI toggles / regen trigger
  const [spicy, setSpicy] = useState(false);
  const [messageSeed, setMessageSeed] = useState(0);

  // Pick a mascot ONCE per page load
  const mascots = ["/fat-tortie.png", "/fat-tortie-face.png"];
  const mascotSrc = useMemo(() => {
    return mascots[Math.floor(Math.random() * mascots.length)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generate the message
  const message = useMemo(() => {
    // First render bias: 80% heart, 20% operations (only used when NOT spicy)
    const firstTone = Math.random() < 0.8 ? "heart" : "operations";

    return makeAdvocacyMessage({
      councilName: mayor?.name ?? "Jersey City Mayor",
      spicy, // when true: spicy heart vs spicy ops chosen inside makeMessage.ts
      toneHint: !spicy && messageSeed === 0 ? firstTone : undefined,
    });
  }, [mayor?.name, spicy, messageSeed]);

  if (!mayor) {
    return (
      <div className="min-h-screen p-5 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold">Message the Mayor</h1>
        <div className="mt-4 p-4 rounded-xl border">
          Missing <span className="font-mono">COUNCIL_BY_WARD["MAYOR"]</span> in{" "}
          <span className="font-mono">src/data/councilContacts.ts</span>.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5 max-w-xl mx-auto">
      <div className="mt-2 flex flex-col items-center text-center gap-3">
        <img src={mascotSrc} alt="Cat mascot" className="w-40 h-auto" />
        <h1 className="text-2xl font-bold">Message the Jersey City Mayor</h1>
      </div>

      <p className="mt-4 text-sm opacity-80">
        Copy the message below and contact the Mayor about funding animal welfare.
        If you don’t use email, posting on or sending a message to the Mayor’s
        Facebook or Instagram works too.
      </p>

      <p className="mt-2 text-xs opacity-70">
        Privacy: nothing is stored. This page just gives you contact links and a
        copy/paste message.
      </p>

      <div className="mt-5 p-4 rounded-xl border">
        {/* Contact buttons */}
        <div className="mt-1 flex flex-wrap gap-2">
          {/* Phones */}
          {mayor.phones?.map((p) => (
            <a
              key={p}
              href={toTelHref(p)}
              className="px-3 py-2 rounded-lg border text-sm"
            >
              Call {p}
            </a>
          ))}

          {/* Email */}
          {mayor.emails?.map((e) => (
            <a
              key={e}
              href={toMailtoHref(e, "Please fund animal welfare in Jersey City", message)}
              className="px-3 py-2 rounded-lg border text-sm"
            >
              Email
            </a>
          ))}

          {/* Facebook */}
          {mayor.facebookUrl ? (
            <a
              href={mayor.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-lg border text-sm"
            >
              Post on Facebook
            </a>
          ) : null}

          {/* Instagram */}
          {mayor.instagramUrl ? (
            <a
              href={mayor.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-lg border text-sm"
            >
              Open Instagram
            </a>
          ) : null}

          {/* Website */}
          {mayor.websiteUrl ? (
            <a
              href={mayor.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-lg border text-sm"
            >
              Website
            </a>
          ) : null}
        </div>

        {/* Message header + actions */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-medium">
              Copy & paste message (email, Facebook, or Instagram)
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setMessageSeed((n) => n + 1)}
                className="px-3 py-2 rounded-lg border text-sm"
              >
                New message
              </button>

              <button
                onClick={() => copyToClipboard(message)}
                className="px-3 py-2 rounded-lg border text-sm font-semibold"
              >
                Copy message
              </button>
            </div>
          </div>

          {/* Spicy toggle: auto-regenerate immediately */}
          <label className="mt-4 flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={spicy}
              onChange={(e) => {
                setSpicy(e.target.checked);
                setMessageSeed((n) => n + 1); // auto-regenerate when toggled
              }}
              className="h-4 w-4"
            />
            <span className="font-medium">Spicy version</span>
            <span className="opacity-70">(more direct)</span>
          </label>

          <pre className="mt-3 whitespace-pre-wrap text-sm p-3 rounded-lg bg-gray-50 border">
            {message}
          </pre>
        </div>
      </div>
    </div>
  );
}