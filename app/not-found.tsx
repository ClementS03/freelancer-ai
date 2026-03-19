import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="font-display text-9xl text-text-primary/5 mb-0 leading-none select-none">
        404
      </p>
      <h1 className="font-display text-3xl text-text-primary -mt-4 mb-3">
        Page introuvable
      </h1>
      <p className="text-sm text-text-secondary mb-8 max-w-sm">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link href="/" className="btn-primary">
        Retour à l&apos;accueil →
      </Link>
    </div>
  );
}
