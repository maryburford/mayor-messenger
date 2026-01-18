import { useMemo, useState } from "react";
import { censusGeocodeJsonp } from "./lib/censusGeocodeJsonp";
import { expandCommonAddressAbbreviations } from "./lib/expandAbbreviations";
import { normalizeJerseyCityAddress } from "./lib/normalizeAddress";
import { findWardFromLatLon } from "./lib/findWard";

import { COUNCIL_BY_WARD } from "./data/councilContacts";
import { makeAdvocacyMessage } from "./lib/makeMessage";

type LookupResult = {
  matchedAddress?: string;
  lat?: number;
  lon?: number;

  ward: string; // "A".."F" or "Unknown"
  contactKey: string; // "A".."F" or "MAYOR"

  usedMayorFallback: boolean; // ward not found OR geocode failed
  normalizedQuery: string; // what we sent to geocoder (or last attempted)
};

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
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<LookupResult | null>(null);

  const council = useMemo(() => {
    if (!result) return undefined;
    return COUNCIL_BY_WARD[result.contactKey];
  }, [result]);

  const message = useMemo(() => {
    if (!council || !result) return "";
    return makeAdvocacyMessage({
      councilName: council.name,
      wardLabel: council.displayWard ?? (result.ward === "Unknown" ? "Jersey City" : `Ward ${result.ward}`),
    });
  }, [council, result]);

  async function onLookup() {
    setError(null);
    setResult(null);

    const trimmed = address.trim();
    if (trimmed.length < 5) {
      setError("Enter a street address (e.g., 30 Randolph).");
      return;
    }

    setLoading(true);

    // Helper to produce a consistent result object
    const finalize = (r: Partial<LookupResult>) => {
      const contactKey = r.contactKey ?? "MAYOR";
      const ward = r.ward ?? "Unknown";
      const usedMayorFallback =
        r.usedMayorFallback ?? (contactKey === "MAYOR" || ward === "Unknown");


      setResult({
        matchedAddress: r.matchedAddress,
        lat: r.lat,
        lon: r.lon,
        ward,
        contactKey,
        usedMayorFallback,
        normalizedQuery: r.normalizedQuery ?? trimmed,
      });
    };

    try {
      // --- Attempt 1: normalize only ---
      const normalized = normalizeJerseyCityAddress(trimmed);

      try {
        const geo = await censusGeocodeJsonp(normalized);

        // Geocode succeeded: now try ward match (but fall back to MAYOR if ward fails)
        let wardLabel = "Unknown";
        let contactKey = "MAYOR";

        try {
          const ward = await findWardFromLatLon(geo.lat, geo.lon);
          wardLabel = ward.wardLabel;
          contactKey = ward.wardLabel; // since yours returns "A".."F"
        } catch {
          // ward match failed -> MAYOR
        }

        finalize({
          matchedAddress: geo.matchedAddress,
          lat: geo.lat,
          lon: geo.lon,
          ward: wardLabel,
          contactKey,
          usedMayorFallback: contactKey === "MAYOR",
          normalizedQuery: normalized,
        });

        return;
      } catch (firstGeocodeErr) {
        // --- Attempt 2: expand abbreviations + normalize ---
        const expanded = expandCommonAddressAbbreviations(trimmed);
        const normalizedExpanded = normalizeJerseyCityAddress(expanded);

        try {
          const geo2 = await censusGeocodeJsonp(normalizedExpanded);

          let wardLabel2 = "Unknown";
          let contactKey2 = "MAYOR";

          try {
            const ward2 = await findWardFromLatLon(geo2.lat, geo2.lon);
            wardLabel2 = ward2.wardLabel;
            contactKey2 = ward2.wardLabel;
          } catch {
            // ward match failed -> MAYOR
          }

          finalize({
            matchedAddress: geo2.matchedAddress,
            lat: geo2.lat,
            lon: geo2.lon,
            ward: wardLabel2,
            contactKey: contactKey2,
            usedMayorFallback: contactKey2 === "MAYOR",
            normalizedQuery: normalizedExpanded,
          });

          return;
        } catch (secondGeocodeErr: any) {
          // --- Both geocodes failed: fall back to MAYOR ---
          finalize({
            ward: "Unknown",
            contactKey: "MAYOR",
            usedMayorFallback: true,
            normalizedQuery: normalizedExpanded,
          });

          // Still show a gentle error note (optional)
          setError(secondGeocodeErr?.message ?? "Couldn’t match that address. Showing Mayor contact as a fallback.");
          return;
        }
      }
    } finally {
      setLoading(false);
    }
  }

return (
<div className="mt-2 flex flex-col items-center text-center gap-3">
  <img
    src="/fat-tortie.png"
    alt="Fat tortie"
    className="w-50 h-auto"
  />
    <h1 className="text-2xl font-bold">Message your Jersey City Councilperson</h1>

    <p className="mt-2 text-base opacity-80">
      Type your address to get the right contact info — plus a ready-to-copy message asking Jersey City to better fund animal welfare.
    </p>
    <p className="mt-2 text-base opacity-80">
      Don’t want to email? No problem. Copy the message and post it on their Facebook or Instagram.
    </p>
    <p className="mt-2 text-xs opacity-70">
      Privacy: we don’t store your address. It’s only used to find the right person to contact.
    </p>

    <div className="mt-5">
      <label className="block text-sm font-medium mb-2">Your Jersey City address</label>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        autoComplete="street-address"
        placeholder="30 Randolph"
        className="w-full p-4 text-lg rounded-xl border"
      />
      <p className="mt-2 text-xs opacity-70">
        You can type just the street address — we’ll fill in “Jersey City, NJ.”
      </p>

      <button
        onClick={onLookup}
        disabled={loading}
        className="w-full mt-3 p-4 rounded-xl text-lg font-semibold border"
      >
        {loading ? "Finding your councilperson..." : "Get contact + message"}
      </button>

      {error && (
        <div className="mt-4 p-3 rounded-xl border">
          <div className="font-semibold">Note</div>
          <div className="text-sm mt-1">{error}</div>
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 rounded-xl border">
          {result.usedMayorFallback && (
            <div className="text-sm opacity-80">
              We couldn’t match your address to a ward, so we’re showing the Mayor’s contact as a fallback.
            </div>
          )}

          <div className={result.usedMayorFallback ? "mt-4 p-4 rounded-xl border" : "p-4 rounded-xl border"}>
            {council ? (
              <>
                <div className="text-sm opacity-70">{council.displayWard}</div>
                <div className="text-xl font-bold">
                  {council.roleLabel} {council.name}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {council.phones?.length
                    ? council.phones.map((p) => (
                        <a
                          key={p}
                          href={toTelHref(p)}
                          className="px-3 py-2 rounded-lg border text-sm"
                        >
                          Call {p}
                        </a>
                      ))
                    : null}

                  {council.emails?.length
                    ? council.emails.map((e) => (
                        <a
                          key={e}
                          href={toMailtoHref(e, "Please fund animal welfare in Jersey City", message)}
                          className="px-3 py-2 rounded-lg border text-sm"
                        >
                          Email
                        </a>
                      ))
                    : null}

                  {council.facebookUrl ? (
                    <a
                      href={council.facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-lg border text-sm"
                    >
                      Post on Facebook
                    </a>
                  ) : null}

                  {council.instagramUrl ? (
                    <a
                      href={council.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-lg border text-sm"
                    >
                      Open Instagram
                    </a>
                  ) : null}

                  <button
                    onClick={() => copyToClipboard(message)}
                    className="px-3 py-2 rounded-lg border text-sm font-semibold"
                  >
                    Click Here to Copy Message
                  </button>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-medium mb-2">
                    Copy & paste message (email, Facebook, or Instagram)
                  </div>
                  <pre className="whitespace-pre-wrap text-sm p-3 rounded-lg bg-gray-50 border">
                    {message}
                  </pre>
                </div>
              </>
            ) : (
              <div>
                <div className="font-semibold">Missing contact data</div>
                <div className="text-sm mt-1">
                  No entry found in <span className="font-mono">COUNCIL_BY_WARD</span> for{" "}
                  <span className="font-mono">{result.contactKey}</span>.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
)};