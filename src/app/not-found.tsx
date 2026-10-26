import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">[404] Signal lost</p>
        <h1 className="display mt-6 text-[clamp(2.8rem,12vw,9rem)]">
          Off the
          <br />
          map<span className="text-accent">.</span>
        </h1>
        <Link
          href="/"
          className="mt-12 inline-block border-b border-paper/40 pb-1 font-mono text-xs uppercase tracking-[0.2em] hover:border-accent hover:text-accent"
        >
          ← Return to the core
        </Link>
      </div>
    </main>
  );
}
