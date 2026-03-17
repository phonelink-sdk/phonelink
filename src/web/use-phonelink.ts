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
  startVerify: () => void;
  /** The redirect verification result containing `token` and `nonce`, or `null` if not yet available. */
  redirectResult: { token: string; nonce: string } | null;
}

/**
 * React hook for Phonelink phone number verification.
 *
 * Manages the entire redirect-based verification flow. On mount, it checks whether
 * the current page is a callback page by looking for a `token` query parameter.
 * If found, it populates `redirectResult` with the token and nonce.
 *
 * @param options - Configuration with your `clientId` and `callbackUrl`
 * @returns An object with `startVerify` to begin the flow and `redirectResult` with
 *          the verification outcome
 *
 * @example
 * ```tsx
 * import { usePhonelink } from "phonelink/web";
 *
 * function VerifyButton() {
 *   const { startVerify, redirectResult } = usePhonelink({
 *     clientId: "your-client-id",
 *     callbackUrl: "https://myapp.com/auth/callback",
 *   });
 *
 *   if (redirectResult) return <p>Verified! Confirming...</p>;
 *   return <button onClick={startVerify}>Verify Phone</button>;
 * }
 * ```
 */
export function usePhonelink(options: UsePhonelinkOptions): UsePhonelinkReturn {
  const [redirectResult, setRedirectResult] = useState<{
    token: string;
    nonce: string;
  } | null>(null);

  useEffect(() => {
    const callbackResult = phonelink.getRedirectResult();
    if (callbackResult) {
      setRedirectResult(callbackResult);
    }
  }, []);

  const startVerify = useCallback(() => {
    phonelink.startVerify(options.clientId, options.callbackUrl);
  }, [options.clientId, options.callbackUrl]);

  return { startVerify, redirectResult };
}
