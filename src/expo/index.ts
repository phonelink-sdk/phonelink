import * as Crypto from "expo-crypto";
import * as WebBrowser from "expo-web-browser";
import { buildAuthUrl } from "../shared/constants";

export type { PhonelinkPayload } from "../shared/types";

function generateNonce(length = 32): string {
  const bytes = Crypto.getRandomBytes(length);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Expo/React Native client for Phonelink phone number verification.
 *
 * Uses an in-app browser session for the verification flow,
 * so the user never leaves your app.
 */
export const phonelink = {
  /**
   * Opens a secure in-app browser for phone number verification.
   *
   * Generates a cryptographic nonce, opens the Phonelink verification page in an
   * in-app browser via `expo-web-browser`, and waits for the user to complete
   * verification. The browser closes automatically and returns the result.
   *
   * @param clientId - Your Phonelink client ID
   * @param redirectUrl - Deep link URI for your app (defaults to `"phonelink://verify"`)
   * @returns An object with `token` and `nonce` on success, or `null` if the user cancelled
   */
  async verify(
    clientId: string,
    redirectUrl?: string,
  ): Promise<{ token: string; nonce: string } | null> {
    const redirectUrlParam = redirectUrl || "phonelink://verify";
    const nonce = generateNonce();
    const url = buildAuthUrl(clientId, redirectUrlParam, nonce);

    const result = await WebBrowser.openAuthSessionAsync(
      url,
      redirectUrlParam,
    );

    if (result.type === "success") {
      const token = new URL(result.url).searchParams.get("token");
      if (!token) return null;
      return { token, nonce };
    }

    return null;
  },
};
