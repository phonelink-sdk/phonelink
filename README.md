# phonelink

Phone number verification for web and mobile apps.

[![npm](https://img.shields.io/npm/v/phonelink)](https://www.npmjs.com/package/phonelink)
[![license](https://img.shields.io/npm/l/phonelink)](https://github.com/your-username/phonelink/blob/main/LICENSE)

## Install

```bash
npm install phonelink
```

## Quick start

```ts
import { phonelink } from "phonelink/web";

// Start the verification flow
phonelink.startAuth("your-client-id", "https://myapp.com/callback");

// On the callback page, get the result
const result = phonelink.handleCallback();

// Send to your server for verification
await fetch("/api/verify", {
  method: "POST",
  body: JSON.stringify({ token: result.token, nonce: result.nonce }),
});
```

```ts
import { verifyPhonelinkToken } from "phonelink/server";

const payload = await verifyPhonelinkToken(token, nonce, "your-client-id");
console.log(payload.phone_e164); // "+14155551234"
```

## Documentation

**[Read the full documentation at docs.phone.link](https://docs.phone.link)**

- [Getting Started](https://docs.phone.link) — overview and installation
- [Web (Vanilla JS)](https://docs.phone.link/web/vanilla) — redirect-based flow for any web app
- [React](https://docs.phone.link/web/react) — `usePhonelink` hook
- [Next.js](https://docs.phone.link/web/nextjs) — full-stack App Router recipe
- [Expo / React Native](https://docs.phone.link/expo) — in-app browser flow
- [Server Verification](https://docs.phone.link/server) — JWT token validation
- [API Reference](https://docs.phone.link/api-reference/web) — full API docs
- [Security](https://docs.phone.link/security) — security model and best practices

## License

MIT
