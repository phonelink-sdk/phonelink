import { useState, useEffect, useCallback } from "react";
import { phonelink } from "./phonelink";

export type { PhonelinkPayload } from "../shared/types";

/** Configuration options for the {@link usePhonelink} hook. */
export interface UsePhonelinkOptions {
  /** Your Phonelink client ID. */
  clientId: string;
  /** The URL to redirect back to after verification. */
  callbackUrl: string;
}

/** Return value of the {@link usePhonelink} hook. */
export interface UsePhonelinkReturn {
  /** Initiates the phone verification flow by redirecting to Phonelink. */
  startAuth: () => void;
  /** The verification result containing `token` and `nonce`, or `null` if not yet available. */
  result: { token: string; nonce: string } | null;
  /** Whether the current page is the callback page (i.e. the URL contains a token). */
  isCallback: boolean;
}

/**
 * React hook for Phonelink phone number verification.
 *
 * Manages the entire redirect-based verification flow. On mount, it checks whether
 * the current page is a callback page by looking for a `token` query parameter.
 * If found, it populates `result` with the token and nonce.
 *
 * @param options - Configuration with your `clientId` and `callbackUrl`
 * @returns An object with `startAuth` to begin the flow, `result` with the verification
 *          outcome, and `isCallback` indicating if this is the callback page
 *
 * @example
 * ```tsx
 * import { usePhonelink } from "phonelink/web";
 *
 * function VerifyButton() {
 *   const { startAuth, result, isCallback } = usePhonelink({
 *     clientId: "your-client-id",
 *     callbackUrl: "https://myapp.com/auth/callback",
 *   });
 *
 *   if (result) return <p>Verified! Confirming...</p>;
 *   if (isCallback) return <p>Processing...</p>;
 *   return <button onClick={startAuth}>Verify Phone</button>;
 * }
 * ```
 */
export function usePhonelink(options: UsePhonelinkOptions): UsePhonelinkReturn {
  const [result, setResult] = useState<{
    token: string;
    nonce: string;
  } | null>(null);
  const [isCallback, setIsCallback] = useState(false);

  useEffect(() => {
    const callbackResult = phonelink.handleCallback();
    if (callbackResult) {
      setResult(callbackResult);
      setIsCallback(true);
    }
  }, []);

  const startAuth = useCallback(() => {
    phonelink.startAuth(options.clientId, options.callbackUrl);
  }, [options.clientId, options.callbackUrl]);

  return { startAuth, result, isCallback };
}
