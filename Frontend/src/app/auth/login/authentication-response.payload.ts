export interface AuthenticationResponsePayload {
  authenticationToken: String;
  refreshToken: String;
  expiresAt: String;
  email: String;
  role: string;
}
