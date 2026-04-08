// ── API barrel ────────────────────────────────────────────────
// Import from specific modules for tree-shaking.
// This file is a convenience re-export for shared types and the API client.

export {
  api,
  getAccessToken,
  setTokens,
  clearTokens,
  extractError,
} from "./client";
export type { ApiError } from "./client";
export type * from "./types";
