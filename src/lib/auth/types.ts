export type ParsedAuthUser = {
  username: string | null;
  displayName: string;
  avatar: string | null;
};

export interface AuthUser extends ParsedAuthUser {
  id: string;
  email?: string;
  countryCode?: string;
}
