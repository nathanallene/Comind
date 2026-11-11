"use client"

import { useEffect } from "react"

const KEY = "comind-chunk-reload"

function isChunkError(reason: unknown) {
  if (!reason) return false
  if (typeof reason === "string") return /Loading chunk [\w/-]+ failed/i.test(reason) || /ChunkLoadError/i.test(reason)
  if (typeof reason === "object") {
    const error = reason as { name?: string; message?: string }
    return error.name === "ChunkLoadError" || /Loading chunk [\w/-]+ failed/i.test(error.message ?? "")
  }
  return false
}

export function ChunkErrorReload() {
  useEffect(() => {
    function recover() {
      try {
        if (sessionStorage.getItem(KEY) === "1") return
        sessionStorage.setItem(KEY, "1")
      } catch {
        // sessionStorage can be blocked; still attempt one reload.
      }
      window.location.reload()
    }

    function onRejection(event: PromiseRejectionEvent) {
      if (isChunkError(event.reason)) {
        event.preventDefault()
        recover()
      }
    }

    function onError(event: ErrorEvent) {
      if (isChunkError(event.error) || isChunkError(event.message)) recover()
    }

    window.addEventListener("unhandledrejection", onRejection)
    window.addEventListener("error", onError)

    try {
      if (sessionStorage.getItem(KEY) === "1") {
        // Clear the guard after a successful hydrated load.
        const clear = window.setTimeout(() => sessionStorage.removeItem(KEY), 2500)
        return () => {
          window.clearTimeout(clear)
          window.removeEventListener("unhandledrejection", onRejection)
          window.removeEventListener("error", onError)
        }
      }
    } catch {
      // ignore
    }

    return () => {
      window.removeEventListener("unhandledrejection", onRejection)
      window.removeEventListener("error", onError)
    }
  }, [])

  return null
}
