// src/data/councilContacts.ts
export type CouncilContact = {
  wardKey: "A" | "B" | "C" | "D" | "E" | "F" | "MAYOR";
  displayWard: string; // e.g. "Ward A"
  name: string;
  roleLabel: string; // "Councilwoman" / "Councilman" / "Councilperson"
  cityBioUrl?: string;

  // Contact
  emails?: string[];     // can include aide emails if you want
  phones?: string[];     // keep as plain strings, we’ll format tel: links
  address?: string;

  // Social
  facebookUrl?: string;
  instagramUrl?: string;
  websiteUrl?: string;
};

// “Council office” line shows up on several member pages as (201) 547-5134/5108. :contentReference[oaicite:0]{index=0}
const COUNCIL_OFFICE_PHONES = ["(201) 547-5134", "(201) 547-5108"];

export const COUNCIL_BY_WARD: Record<string, CouncilContact> = {
  A: {
    wardKey: "A",
    displayWard: "Ward A",
    name: "Denise Ridley",
    roleLabel: "Councilwoman",
    cityBioUrl: "https://www.jerseycitynj.gov/cityhall/CityCouncil/deniseridleywarda",
    emails: ["dridley@jcnj.org"],
    phones: ["(201) 547-5098", "(201) 547-5060"],
    address: "280 Grove Street, Room 202, Jersey City, NJ 07302",
    facebookUrl: "https://www.facebook.com/deniseridleyjc/",
    instagramUrl: "https://www.instagram.com/iamdridley/",

  },

  // NOTE: The City pages for some members list only the council office phone/address (no email)
  // so we fall back to COUNCIL_OFFICE_PHONES + their city bio link (you can add socials later).
  B: {
    wardKey: "B",
    displayWard: "Ward B",
    name: "Joel A. Brooks",
    roleLabel: "Councilperson",
    cityBioUrl: "https://www.jerseycitynj.gov/cityhall/CityCouncil/joel_a__brooks__ward_b",
    phones: COUNCIL_OFFICE_PHONES,
    address: "280 Grove Street, Room 207, Jersey City, NJ 07302",
    facebookUrl: "https://www.facebook.com/votejoelbrooks/",
    instagramUrl: "https://www.instagram.com/joelbrooks4jc/",
  },

  C: {
    wardKey: "C",
    displayWard: "Ward C",
    name: "Thomas Zuppa Jr.",
    roleLabel: "Councilperson",
    cityBioUrl: "https://www.jerseycitynj.gov/cityhall/CityCouncil/thomas_zuppa_jr__ward_c",
    phones: COUNCIL_OFFICE_PHONES,
    address: "280 Grove Street, Room 207, Jersey City, NJ 07302",
    facebookUrl: "https://www.facebook.com/ZuppaforWardC",
    instagramUrl: "https://www.instagram.com/tomzuppajc/",
  },

  D: {
    wardKey: "D",
    displayWard: "Ward D",
    name: "Jake Ephros",
    roleLabel: "Councilperson",
    cityBioUrl: "https://www.jerseycitynj.gov/cityhall/CityCouncil/jake_ephros__ward_d",
    phones: COUNCIL_OFFICE_PHONES,
    address: "280 Grove Street, Room 207, Jersey City, NJ 07302",
    facebookUrl: "https://www.facebook.com/p/Jake-for-JC-61565043331751/",
    instagramUrl: "https://www.instagram.com/jake_ephros/",
  },

  E: {
    wardKey: "E",
    displayWard: "Ward E",
    name: "Eleana Little",
    roleLabel: "Councilperson",
    cityBioUrl: "https://www.jerseycitynj.gov/cityhall/CityCouncil/eleana_little__ward_e",
    phones: COUNCIL_OFFICE_PHONES,
    address: "280 Grove Street, Room 207, Jersey City, NJ 07302",
    facebookUrl: "https://www.facebook.com/EleanaLittleNJ/",
    instagramUrl: "https://www.instagram.com/eleanalittle/",
  },

  F: {
    wardKey: "F",
    displayWard: "Ward F",
    name: "Frank E. Gilmore",
    roleLabel: "Councilman",
    cityBioUrl: "https://www.jerseycitynj.gov/cityhall/CityCouncil/frankegilmore",
    emails: ["fegilmore@jcnj.org"],
    phones: ["201-547-5338"],
    address: "280 Grove Street, Room 202, Jersey City, NJ 07302",
    websiteUrl: "https://www.everythingwardf.com",
    facebookUrl: "https://www.facebook.com/WardFCommUNITY",
    instagramUrl: "https://www.instagram.com/everythingwardf/",
  },
  
MAYOR: {
    wardKey: "MAYOR", 
    displayWard: "Citywide",
    name: "James Solomon",
    roleLabel: "Mayor",
    phones: ["(201) 547-5200"],
    emails: ["mayor@jcnj.org"],  
    facebookUrl: "https://www.facebook.com/solomonforjc/",
    instagramUrl: "https://www.instagram.com/solomonforjc/",
    websiteUrl: "https://www.jerseycitynj.gov",
    },

};