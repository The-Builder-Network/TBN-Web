// UK mobile/landline: 10 digits starting with 1-9 (no leading 0 in international format)
const UK_LOCAL_REGEX = /^[1-9]\d{9}$/;

export function isValidUKLocal(digits: string): boolean {
  return UK_LOCAL_REGEX.test(digits.replace(/\s/g, ""));
}
