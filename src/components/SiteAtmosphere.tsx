export function SiteAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute -left-1/4 -top-1/4 h-[1000px] w-[1000px] animate-slow-spin rounded-full bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-emerald-500/30 blur-3xl dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-emerald-500/20" />
      <div className="absolute -bottom-1/4 -right-1/4 h-[1000px] w-[1000px] animate-slow-spin-reverse rounded-full bg-gradient-to-l from-emerald-500/30 via-blue-500/30 to-cyan-500/30 blur-3xl dark:from-emerald-500/20 dark:via-blue-500/20 dark:to-cyan-500/20" />
      <div className="absolute right-1/4 top-1/4 h-[800px] w-[800px] animate-slow-spin-reverse rounded-full bg-gradient-to-tr from-blue-500/20 via-cyan-500/20 to-transparent blur-3xl delay-75 dark:from-blue-500/10 dark:via-cyan-500/10" />
      <div className="absolute bottom-1/4 left-1/4 h-[800px] w-[800px] animate-slow-spin rounded-full bg-gradient-to-bl from-emerald-500/20 via-cyan-500/20 to-transparent blur-3xl delay-75 dark:from-emerald-500/10 dark:via-cyan-500/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/25 to-background/80" />
      <div className="absolute inset-0 opacity-30 mix-blend-overlay" />
    </div>
  )
}
