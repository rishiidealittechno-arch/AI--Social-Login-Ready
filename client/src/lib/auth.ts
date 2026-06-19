import { createAuthClient } from "better-auth/react"

const AUTH_BASE_URL =
  import.meta.env.VITE_BETTER_AUTH_URL ?? "http://localhost:3200"

export const authClient = createAuthClient({
  baseURL: AUTH_BASE_URL,
  fetchOptions: {
    credentials: "include",
  },
})

export const { signIn, signUp, signOut, useSession } = authClient
