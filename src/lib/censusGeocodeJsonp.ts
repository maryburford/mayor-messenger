type CensusJsonpResponse = {
  result?: {
    addressMatches?: Array<{
      coordinates?: { x: number; y: number }; // x=lon, y=lat
      matchedAddress?: string;
    }>;
  };
};

export async function censusGeocodeJsonp(address: string): Promise<{
  lon: number;
  lat: number;
  matchedAddress?: string;
}> {
  return new Promise((resolve, reject) => {
    const cbName = `__census_cb_${Math.random().toString(36).slice(2)}`;

    const cleanup = (script?: HTMLScriptElement) => {
      try {
        delete (window as any)[cbName];
      } catch {}
      if (script?.parentNode) script.parentNode.removeChild(script);
    };

    const params = new URLSearchParams({
      address,
      benchmark: "Public_AR_Current",
      format: "jsonp",
      callback: cbName,
    });

    const script = document.createElement("script");
    script.async = true;

    (window as any)[cbName] = (data: CensusJsonpResponse) => {
      try {
        const match = data?.result?.addressMatches?.[0];
        const coords = match?.coordinates;
        if (!coords) throw new Error("No match found.");
        resolve({ lon: coords.x, lat: coords.y, matchedAddress: match?.matchedAddress });
      } catch (e) {
        reject(e);
      } finally {
        cleanup(script);
      }
    };

    script.src = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?${params.toString()}`;
    script.onerror = () => {
      cleanup(script);
      reject(new Error("Network error reaching Census geocoder."));
    };

    document.body.appendChild(script);

    window.setTimeout(() => {
      if ((window as any)[cbName]) {
        cleanup(script);
        reject(new Error("Geocoder timed out."));
      }
    }, 10000);
  });
}