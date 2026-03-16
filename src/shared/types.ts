/**
 * The decoded JWT payload returned after successful phone number verification.
 * Contains the verified phone number, verification metadata, and standard JWT claims.
 */
export interface PhonelinkPayload {
  /** The verified phone number in E.164 format (e.g. `"+14155551234"`). */
  phone_e164: string;
  /** Whether the phone number was successfully verified. */
  verified: boolean;
  /** The verification method used (e.g. SMS, voice call). */
  method: string;
  /** The verification provider that handled the verification. */
  provider: string;
  /** Cryptographic nonce for replay protection. Must be validated server-side. */
  nonce: string;
  /** Subject identifier for the verification session. */
  sub: string;
  /** Token issuer. Always `"https://phone.link"`. */
  iss: string;
  /** Audience claim. Matches your Phonelink client ID. */
  aud: string;
  /** Unix timestamp (seconds) when the token was issued. */
  iat: number;
  /** Unix timestamp (seconds) when the token expires. */
  exp: number;
  /** Unique identifier for this specific token. */
  jti: string;
}
