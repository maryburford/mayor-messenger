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
      setError("Enter a street address (e.g., 158 Wayne St).");
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
    <div className="min-h-screen p-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Find your Jersey City Ward</h1>
      <p className="mt-2 text-sm opacity-80">
        We don’t store your address. It’s only used to find your ward (or we’ll show the Mayor as a fallback).
      </p>

      <div className="mt-5">
        <label className="block text-sm font-medium mb-2">Address</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          autoComplete="street-address"
          placeholder="158 Wayne St"
          className="w-full p-4 text-lg rounded-xl border"
        />

        <button
          onClick={onLookup}
          disabled={loading}
          className="w-full mt-3 p-4 rounded-xl text-lg font-semibold border"
        >
          {loading ? "Looking up..." : "Find my ward"}
        </button>

        {error && (
          <div className="mt-4 p-3 rounded-xl border">
            <div className="font-semibold">Note</div>
            <div className="text-sm mt-1">{error}</div>
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 rounded-xl border">
            <div className="text-sm opacity-80">Lookup</div>
            <div className="font-medium break-words">{result.normalizedQuery}</div>

            {result.matchedAddress && (
              <>
                <div className="mt-3 text-sm opacity-80">Matched address</div>
                <div className="font-medium">{result.matchedAddress}</div>
              </>
            )}

            <div className="mt-3 text-sm opacity-80">Ward</div>
            <div className="text-xl font-bold">{result.ward}</div>

            {result.usedMayorFallback && (
              <div className="mt-2 text-sm opacity-80">
                We couldn’t confidently match a ward, so we’re showing the Mayor’s contact info as a fallback.
              </div>
            )}

            {typeof result.lat === "number" && typeof result.lon === "number" && (
              <div className="mt-3 text-xs opacity-70">
                lat {result.lat.toFixed(6)} · lon {result.lon.toFixed(6)}
              </div>
            )}

            {/* Contact card */}
            <div className="mt-5 p-4 rounded-xl border">
              {council ? (
                <>
                  <div className="text-sm opacity-70">{council.displayWard}</div>
                  <div className="text-xl font-bold">
                    {council.roleLabel} {council.name}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {/* Phones */}
                    {council.phones?.length
                      ? council.phones.map((p) => (
                          <a key={p} href={toTelHref(p)} className="px-3 py-2 rounded-lg border text-sm">
                            Call {p}
                          </a>
                        ))
                      : null}

                    {/* Email only if present */}
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

                    {/* Facebook */}
                    {council.facebookUrl ? (
                      <a
                        href={council.facebookUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-lg border text-sm"
                      >
                        Facebook
                      </a>
                    ) : null}

                    {/* Instagram */}
                    {council.instagramUrl ? (
                      <a
                        href={council.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-lg border text-sm"
                      >
                        Instagram
                      </a>
                    ) : null}

                    <button
                      onClick={() => copyToClipboard(message)}
                      className="px-3 py-2 rounded-lg border text-sm font-semibold"
                    >
                      Copy message
                    </button>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-medium mb-2">Message to send</div>
                    <pre className="whitespace-pre-wrap text-sm p-3 rounded-lg bg-gray-50 border">{message}</pre>
                  </div>
                </>
              ) : (
                <div>
                  <div className="font-semibold">Missing contact data</div>
                  <div className="text-sm mt-1">
                    No entry found in <span className="font-mono">COUNCIL_BY_WARD</span> for{" "}
                    <span className="font-mono">{result.contactKey}</span>. Add it (especially the "MAYOR" entry).
                  </div>
                </div>              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
