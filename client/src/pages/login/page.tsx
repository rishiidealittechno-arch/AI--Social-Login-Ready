import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getPostLoginPath } from "@/components/layouts/auth-guards"
import { authClient } from "@/lib/auth"

export default function AuthPage() {
  const navigate = useNavigate()
  const lastMethod = authClient.getLastUsedLoginMethod()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      })

      if (result.error) {
        setError(result.error.message ?? "Sign in failed")
        return
      }

      navigate(await getPostLoginPath())
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    setIsLoading(true)

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: window.location.origin,
      })

      if (result.error) {
        setError(result.error.message ?? "Google sign in failed")
      }
    } catch {
      setError(
        "Google sign in failed. Ensure redirect URI http://localhost:3200/api/auth/callback/google is added in Google Cloud Console."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="grid h-screen w-full grid-cols-1 overflow-hidden md:grid-cols-5">
        <div className="relative col-span-5 flex items-center justify-center p-8">
          <div className="w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">
                Sign in with your email or continue with Google
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleEmailSignIn}>
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="h-11 border-white/10 bg-[#171717] text-white placeholder:text-zinc-500"
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="h-11 border-white/10 bg-[#171717] text-white placeholder:text-zinc-500"
              />

              {error ? (
                <p className="text-sm text-red-400">{error}</p>
              ) : null}

              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 w-full bg-white text-black hover:bg-zinc-200"
              >
                {isLoading ? "Signing in..." : "Sign in with Email"}
                {lastMethod === "email" ? (
                  <Badge className="ml-2 bg-black/10 text-black hover:bg-black/10">
                    Last used
                  </Badge>
                ) : null}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#080808] px-3 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              variant={lastMethod === "google" ? "default" : "outline"}
              className={
                "h-11 dark:bg-background  hover:bg-zinc-200"
              }
            >
              Google 
              {lastMethod === "google" ? (
                <Badge variant='secondary' className="ml-2 text-xs hover:bg-black/10">
                  Last used
                </Badge>
              ) : null}
            </Button>
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              variant={lastMethod === "google" ? "default" : "outline"}
              className={
                "h-11 dark:bg-background  hover:bg-zinc-200"
              }
            >
              Microsoft
            </Button>

            </div>

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a href="#" className="underline underline-offset-4 hover:text-white">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-4 hover:text-white">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
