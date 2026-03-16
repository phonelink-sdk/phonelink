export const PHONELINK_URL =
  "https://phone.link/auth";
export const EXPECTED_ISSUER = "https://phone.link";

export function buildAuthUrl(
  clientId: string,
  redirectUrl: string,
  nonce: string,
): string {
  return `${PHONELINK_URL}?client_id=${encodeURIComponent(clientId)}&redirect_url=${encodeURIComponent(redirectUrl)}&nonce=${nonce}`;
}
