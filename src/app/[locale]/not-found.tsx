import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-navy px-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-gold">404</p>
        <h1 className="mt-4 text-3xl font-bold text-white">Page Not Found</h1>
        <p className="mt-3 text-lg text-white/60">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center rounded-lg bg-gold px-8 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
