/**
 * UK Postcode validation using postcodes.io API
 */

export interface PostcodeResult {
  postcode: string;
  quality: number;
  eastings: number;
  northings: number;
  country: string;
  nhs_ha: string;
  longitude: number;
  latitude: number;
  european_electoral_region: string;
  primary_care_trust: string;
  region: string;
  lsoa: string;
  msoa: string;
  incode: string;
  outcode: string;
  parliamentary_constituency: string;
  parliamentary_constituency_2024: string;
  admin_district: string;
  parish: string;
  admin_county: string | null;
  date_of_introduction: string;
  admin_ward: string;
  ced: string | null;
  ccg: string;
  nuts: string;
  pfa: string;
  nhs_region: string;
  ttwa: string;
  national_park: string | null;
  bua: string | null;
  icb: string;
  cancer_alliance: string;
  codes: Record<string, string | null>;
}

export interface PostcodeResponse {
  status: number;
  result?: PostcodeResult;
  error?: string;
}

/**
 * Validate a UK postcode using postcodes.io API
 * @param postcode - The postcode to validate (spaces optional)
 * @returns PostcodeResponse with status and result/error
 */
export async function validatePostcode(
  postcode: string,
): Promise<PostcodeResponse> {
  const cleanPostcode = postcode.replace(/\s+/g, "").toUpperCase();

  if (!cleanPostcode) {
    return {
      status: 400,
      error: "Postcode is required",
    };
  }

  try {
    const response = await fetch(
      `https://api.postcodes.io/postcodes/${cleanPostcode}`,
    );

    if (response.status === 404) {
      return {
        status: 404,
        error: "Invalid postcode",
      };
    }

    if (!response.ok) {
      return {
        status: response.status,
        error: "Failed to validate postcode",
      };
    }

    const data: PostcodeResponse = await response.json();
    return data;
  } catch (error) {
    return {
      status: 500,
      error: "Network error while validating postcode",
    };
  }
}

/**
 * Get a display-friendly place name from postcode result
 * Priority: parish > admin_district > admin_ward
 */
export function getPlaceName(result: PostcodeResult): string {
  return result.parish || result.admin_district || result.admin_ward || "";
}

/**
 * Format postcode for display (with space)
 */
export function formatPostcode(postcode: string): string {
  const clean = postcode.replace(/\s+/g, "").toUpperCase();
  if (clean.length < 5) return clean;

  // Insert space before last 3 characters
  const incode = clean.slice(-3);
  const outcode = clean.slice(0, -3);
  return `${outcode} ${incode}`;
}
