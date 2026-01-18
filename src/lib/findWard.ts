import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";

type WardFeature = GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon, any>;

let cachedWards: GeoJSON.FeatureCollection | null = null;

async function loadWards(): Promise<GeoJSON.FeatureCollection> {
  if (cachedWards) return cachedWards;
  const res = await fetch("/data/jc-wards.geojson");
  if (!res.ok) throw new Error("Failed to load ward map data.");
  cachedWards = await res.json();
  return cachedWards!;
}

export async function findWardFromLatLon(
  lat: number,
  lon: number
): Promise<{ feature: WardFeature; wardLabel: string }> {
  const wards = await loadWards();
  const p = point([lon, lat]);

  for (const f of wards.features as WardFeature[]) {
    if (booleanPointInPolygon(p, f)) {
      const wardLabel =
        f.properties?.ward ??
        f.properties?.Ward ??
        f.properties?.WARD ??
        f.properties?.name ??
        "Unknown";

      return { feature: f, wardLabel: String(wardLabel) };
    }
  }

  throw new Error("We found the address, but couldn't match it to a ward boundary.");
}