import { useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

/* Two-tone placeholder logo. Swap the name later. */
export function Logo() {
  return (
    <Link to="/" className="text-3xl font-extrabold tracking-tighter text-white">
      <span className="text-[#14b8f6]">Game</span>Hub
    </Link>
  );
}

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

/* Centered card on a dark page with a faint cyan glow at the top. */
export default function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070a12] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(20,184,246,0.14),transparent_70%)]"
      />

      <header className="relative border-b border-white/5">
        <div className="mx-auto flex h-20 max-w-6xl items-center px-6">
          <Logo />
        </div>
      </header>

      <main className="relative mx-auto flex max-w-6xl justify-center px-6 py-14 sm:py-20">
        <div className="w-full max-w-md">
          <p className="mb-4 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#14b8f6]">
            <span className="h-0.5 w-1.5 bg-[#14b8f6]" />
            {eyebrow}
            <span className="h-0.5 w-1.5 bg-[#14b8f6]" />
          </p>
          <h1 className="text-center text-4xl font-extrabold tracking-tighter sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-center text-base text-slate-400">
            {subtitle}
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-[#0e1424] p-6 shadow-2xl shadow-black/40 sm:p-8">
            {children}
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">{footer}</p>
        </div>
      </main>
    </div>
  );
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

/* Labeled input styled like the reference search bar. */
export function Field({ label, id, error, type = "text", ...props }: FieldProps) {
  const [show, setShow] = useState<boolean>(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-200">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-xl border bg-[#0a0f1c] px-4 py-3.5 text-base text-white placeholder-slate-500 outline-none transition focus:ring-2 ${
            error
              ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
              : "border-white/10 focus:border-[#14b8f6] focus:ring-[#14b8f6]/20"
          } ${isPassword ? "pr-16" : ""}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-slate-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#14b8f6]"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

/* Server or form-level error banner. */
export function ErrorBanner({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
    >
      {message}
    </div>
  );
}

interface SubmitButtonProps {
  loading: boolean;
  loadingText: string;
  children: ReactNode;
}

/* Full-width primary button with a loading state. */
export function SubmitButton({ loading, loadingText, children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-xl bg-[#14b8f6] px-4 py-3.5 text-base font-bold text-[#04121c] transition hover:bg-[#3cc6fa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14b8f6] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? loadingText : children}
    </button>
  );
}
