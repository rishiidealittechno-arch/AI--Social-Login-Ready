import { useCallback, useState } from "react"
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import {
  Card,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const DEMO_API_KEY =
  ""

export function ChartStatContent() {
  const [copied, setCopied] = useState(false)

  const copyApiKey = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(DEMO_API_KEY)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [])

  return (
    <Card className="flex flex-col border-none w-1/4 shadow-none ring-0 p-0 rounded-none pb-4">
      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-sm font-medium">API key</p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Use this secret to authenticate REST and SDK calls. Treat it like a
            password—do not commit it or expose it in client-side code. Rotate
            it from settings if it leaks.
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            readOnly
            value={DEMO_API_KEY}
            aria-label="Your API key"
            className="h-8 min-w-0 flex-1 font-mono text-xs"
          />
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="shrink-0"
            onClick={copyApiKey}
            aria-label={copied ? "Copied" : "Copy API key"}
          >
            <HugeiconsIcon
              icon={copied ? Tick02Icon : Copy01Icon}
              strokeWidth={2}
              className="size-4"
            />
          </Button>
        </div>
        {copied ? (
          <p className="text-xs text-green-600 dark:text-green-400/90">
            Copied to clipboard.
          </p>
        ) : null}
      </div>
    </Card>
  )
}
