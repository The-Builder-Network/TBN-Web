export type UserRole = "homeowner" | "tradesperson";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  /** Display name / business name */
  name: string;
  /** URL-safe username for tradesperson public profile (/tradesperson/<username>) */
  username?: string;
}

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isHomeowner: boolean;
  isTradesperson: boolean;
}
