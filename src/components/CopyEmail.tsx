"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      onClick={copy}
      data-cursor={copied ? "Copied" : "Copy"}
      className="group relative overflow-hidden rounded-full border border-paper/30 px-7 py-4 text-base transition-colors hover:border-accent hover:text-ink md:text-xl"
    >
      <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />
      <span className="relative">{copied ? "Copied to clipboard ✓" : email}</span>
    </button>
  );
}
