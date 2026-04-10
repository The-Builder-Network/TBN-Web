export type UserRole = "homeowner" | "tradesperson";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  /** Display name / business name */
  name: string;
  /** URL-safe username for tradesperson public profile (/tradesperson/<username>) */
  username?: string;
  /** CloudFront CDN URL of the user's avatar, or null if not set */
  avatarUrl?: string | null;
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
