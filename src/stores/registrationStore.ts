import { create } from "zustand";

// ── Tradesperson registration state ──────────────────────────

export interface TradespersonRegistrationState {
  // Step 0 — entry form (from /tradesnetwork hero)
  entryTrade: string;
  entryPostcode: string;
  entryEmail: string;

  // Stage 1 — Create account
  firstName: string;
  lastName: string;
  phoneCode: string;
  phoneNumber: string;
  password: string;
  marketing: boolean;

  // Stage 2 — Work details
  professions: string[];
  travelRadius: number;
  workUK: boolean;
  businessType: string;
  tradingName: string;
  companyName: string;
  companyRegNumber: string;
  partnerNames: string;
  workAddress: string;
  postcode: string;

  // Stage 3 — Safety & Quality
  strongestSkill: string;

  // Stage 4 — Profile
  companyDescription: string;

  // Actions
  setField: <K extends keyof TradespersonRegistrationState>(
    key: K,
    value: TradespersonRegistrationState[K],
  ) => void;
  setEntryData: (trade: string, postcode: string, email: string) => void;
  reset: () => void;
}

const initialState: Omit<
  TradespersonRegistrationState,
  "setField" | "setEntryData" | "reset"
> = {
  entryTrade: "",
  entryPostcode: "",
  entryEmail: "",
  firstName: "",
  lastName: "",
  phoneCode: "+44",
  phoneNumber: "",
  password: "",
  marketing: false,
  professions: [],
  travelRadius: 30,
  workUK: false,
  businessType: "",
  tradingName: "",
  companyName: "",
  companyRegNumber: "",
  partnerNames: "",
  workAddress: "",
  postcode: "",
  strongestSkill: "",
  companyDescription: "",
};

export const useTradespersonRegistrationStore =
  create<TradespersonRegistrationState>((set) => ({
    ...initialState,
    setField: (key, value) => set((s) => ({ ...s, [key]: value })),
    setEntryData: (trade, postcode, email) =>
      set((s) => ({
        ...s,
        entryTrade: trade,
        entryPostcode: postcode,
        entryEmail: email,
        postcode,
        professions: trade ? [trade] : [],
      })),
    reset: () => set(initialState),
  }));

// ── Legacy store alias (kept for backward compat) ────────────
export interface RegistrationState {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: "HOMEOWNER" | "TRADESPERSON";
  firstName: string;
  lastName: string;
  phoneCode: string;
  phoneNumber: string;
  marketing: boolean;
  setField: <K extends keyof RegistrationState>(
    key: K,
    value: RegistrationState[K],
  ) => void;
  reset: () => void;
}

const legacyInitialState = {
  email: "",
  password: "",
  name: "",
  phone: "",
  role: "TRADESPERSON" as const,
  firstName: "",
  lastName: "",
  phoneCode: "+44",
  phoneNumber: "",
  marketing: false,
};

export const useRegistrationStore = create<RegistrationState>((set) => ({
  ...legacyInitialState,
  setField: (key, value) => set((s) => ({ ...s, [key]: value })),
  reset: () => set(legacyInitialState),
}));
