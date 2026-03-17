import { buildAuthUrl } from "../shared/constants";

export type { PhonelinkPayload } from "../shared/types";

const NONCE_KEY = "phonelink_nonce";

function generateNonce(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Web client for Phonelink phone number verification.
 *
 * Implements a redirect-based verification flow:
 * 1. Call `verify` to redirect the user to Phonelink
 * 2. On the callback page, call `getResult` to retrieve the token
 * 3. Send the token and nonce to your server for validation
 */
export const phonelink = {
  /**
   * Starts the phone verification flow by redirecting the user to Phonelink.
   *
   * Generates a cryptographic nonce, stores it in `sessionStorage`, and redirects
   * the browser to the Phonelink verification page. After the user completes
   * verification, they are redirected back to `callbackUrl` with a `token` query parameter.
   *
   * @param clientId - Your Phonelink client ID
   * @param callbackUrl - The URL to redirect back to after verification
   */
  verify(clientId: string, callbackUrl: string): void {
    const nonce = generateNonce();
    sessionStorage.setItem(NONCE_KEY, nonce);
    window.location.href = buildAuthUrl(clientId, callbackUrl, nonce);
  },

  /**
   * Reads the verification result on the callback page.
   *
   * Extracts the `token` from the URL query parameters and retrieves the
   * nonce from `sessionStorage`. The nonce is removed from storage after
   * retrieval to prevent reuse.
   *
   * @returns An object with `token` and `nonce` if a verification result is present,
   *          or `null` if no token is found in the URL
   */
  getResult(): { token: string; nonce: string } | null {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) return null;

    const nonce = sessionStorage.getItem(NONCE_KEY);
    sessionStorage.removeItem(NONCE_KEY);
    if (!nonce) return null;

    return { token, nonce };
  },
};
