export function PageHero({
  kicker,
  title,
  children,
}: {
  kicker?: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <header className="relative overflow-hidden px-4 pb-16 pt-32">
      <div className="relative mx-auto max-w-4xl">
        {kicker ? (
          <p className="mb-3 text-sm font-medium tracking-wide text-cyan-700 dark:text-cyan-400">
            {kicker}
          </p>
        ) : null}
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">{title}</h1>
        {children ? (
          <div className="mt-6 max-w-3xl space-y-4 text-lg text-foreground/70">{children}</div>
        ) : null}
      </div>
    </header>
  )
}
