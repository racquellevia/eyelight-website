import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center md:px-6">
      <p className="section-label">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold">Signal lost</h1>
      <p className="mt-4 font-mono text-sm text-ink/70">This page is not in the dataset.</p>
      <Link href="/" className="btn-primary mt-8 inline-flex">
        Return home
      </Link>
    </div>
  );
}
