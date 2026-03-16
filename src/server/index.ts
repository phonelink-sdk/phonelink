import { createRemoteJWKSet, jwtVerify } from "jose";
import { EXPECTED_ISSUER } from "../shared/constants";
import type { PhonelinkPayload } from "../shared/types";

export type { PhonelinkPayload } from "../shared/types";

const JWKS = createRemoteJWKSet(
  new URL("https://phone.link/.well-known/jwks.json"),
);

/**
 * Verifies a Phonelink JWT token against the JWKS endpoint.
 *
 * Performs the following checks:
 * - Validates the JWT signature using the Phonelink JWKS endpoint
 * - Confirms the token issuer is `https://phone.link`
 * - Verifies the audience matches your client ID
 * - Checks the nonce matches to prevent replay attacks
 * - Ensures the phone number was successfully verified
 *
 * @param token - The JWT returned from the client verification flow
 * @param expectedNonce - The nonce returned alongside the token, used for replay protection
 * @param expectedAud - Your Phonelink client ID (must match the token's `aud` claim)
 * @returns The verified {@link PhonelinkPayload} containing the phone number and metadata
 * @throws {Error} If the token signature is invalid or the token has expired
 * @throws {Error} `"Nonce mismatch"` if the nonce does not match
 * @throws {Error} `"Phone number not verified"` if verification was not completed
 *
 * @example
 * ```ts
 * import { verifyPhonelinkToken } from "phonelink/server";
 *
 * const payload = await verifyPhonelinkToken(token, nonce, "your-client-id");
 * console.log(payload.phone_e164); // "+14155551234"
 * ```
 */
export async function verifyPhonelinkToken(
  token: string,
  expectedNonce: string,
  expectedAud: string,
): Promise<PhonelinkPayload> {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: EXPECTED_ISSUER,
    audience: expectedAud,
  });

  if (payload.nonce !== expectedNonce) {
    throw new Error("Nonce mismatch");
  }

  if (payload.verified !== true) {
    throw new Error("Phone number not verified");
  }

  return payload as unknown as PhonelinkPayload;
}
