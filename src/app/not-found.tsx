import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <h1 className="font-display font-bold text-[120px] sm:text-[160px] text-primary leading-none mb-2">
        404
      </h1>
      <p className="text-on-surface/60 text-xl font-body mb-8">Page not found</p>
      <Link href="/" className="btn-primary px-8 py-3.5 text-base">
        Go to Homepage
      </Link>
    </div>
  )
}
