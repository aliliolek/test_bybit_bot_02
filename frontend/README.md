# Bybit Bot Auth App

Minimal authentication demo using Vite, React, MUI and Supabase.

## Setup

- Node.js 20
- Install deps: `npm install`
- Run dev server: `npm run dev`

## Environment variables

Create a `.env` file (see `.env.example`):

```
VITE_SUPABASE_URL="https://your-project.supabase.co"   # Supabase project URL
VITE_SUPABASE_ANON_KEY="public-anon-key"               # Supabase anon key
VITE_SITE_URL="http://localhost:5173"                  # Base site URL used for redirects
```

### Supabase configuration

- Auth -> URL Configuration: set **Site URL** to `VITE_SITE_URL`.
- Auth -> Providers: enable **Google** and set redirect URL to `VITE_SITE_URL/auth/reset-password`.

## Auth flows

- Email/password sign up with validation and confirm password.
- Email/password sign in, redirecting to the previous page or `/profile`.
- Google OAuth on both Sign In and Sign Up.
- Forgot/Reset password handled via `/auth/reset-password`.
- Sign out returns to `/auth/sign-in`.
- Supabase links Google and password accounts by email; if a provider conflict error appears, sign in with the original method first and then try Google.

## Manual test checklist

- [ ] Unauthed user visiting `/profile` is redirected to `/auth/sign-in` and after sign-in lands on `/profile`.
- [ ] Sign Up: mismatched passwords show inline error; valid sign-up follows email confirmation setting.
- [ ] Sign In (password): invalid credentials show error; valid credentials navigate to `/profile`.
- [ ] Sign In (Google): works from Sign In and Sign Up and returns to previous page or `/profile`.
- [ ] Forgot/Reset: reset email is sent and new password allows login.
- [ ] Sign Out: redirects to `/auth/sign-in`.
- [ ] Bottom nav visible only when authed and reflects current tab.
- [ ] Missing env keys produce a clear error.

## Production build

```
npm run build
```
