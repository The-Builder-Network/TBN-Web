/**
 * Helper functions for UK postcode validation
 */

export interface PostcodeValidationResult {
  isValid: boolean;
  placeName: string;
  error: string;
}

/**
 * Validate a UK postcode using the postcodes.io API
 * @param postcode - The postcode to validate
 * @returns Validation result with place name if valid
 */
export async function validateUKPostcode(
  postcode: string,
): Promise<PostcodeValidationResult> {
  const trimmed = postcode.trim();

  if (!trimmed) {
    return {
      isValid: false,
      placeName: "",
      error: "",
    };
  }

  try {
    const response = await fetch(
      `https://api.postcodes.io/postcodes/${trimmed.replace(/\s+/g, "")}`,
    );

    if (response.status === 404) {
      return {
        isValid: false,
        placeName: "",
        error: "Invalid postcode",
      };
    }

    if (!response.ok) {
      return {
        isValid: false,
        placeName: "",
        error: "Could not validate postcode",
      };
    }

    const data = await response.json();
    const result = data.result;
    const place =
      result.parish || result.admin_district || result.admin_ward || "";

    return {
      isValid: true,
      placeName: place,
      error: "",
    };
  } catch (err) {
    return {
      isValid: false,
      placeName: "",
      error: "Network error",
    };
  }
}
