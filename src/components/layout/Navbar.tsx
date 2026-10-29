import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../AuthLayout";
import { useState } from "react";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-4 py-2 text-sm font-semibold transition ${
    isActive ? "bg-card text-white" : "text-slate-300 hover:text-white"
  }`;

export default function Navbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");

    const onSearch = () =>{}

    const onLogout = () =>{}

    const links = (
    <>
      <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
      <NavLink to="/my-articles" className={linkClass} onClick={() => setOpen(false)}>My Articles</NavLink>
      {/* {user?.role === "admin" && (
        <NavLink to="/admin" className={linkClass} onClick={() => setOpen(false)}>Admin</NavLink>
      )} */}
    </>
  );

    return (
        <header className="sticky top-0 z-40 border-b border-white/5 bg-base/90 backdrop-blur">
            <div className="mx-auto flex h-20 max-w-6xl items-center gap-4 px-6">
                <Logo />
                <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Main">{links}</nav>

                <div className="ml-auto hidden items-center gap-3 md:flex">
                    <form onSubmit={onSearch} className="hidden lg:block">
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search articles..."
                            aria-label="Search articles"
                            className="w-56 rounded-xl border border-white/10 bg-card px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-accent"
                        />
                    </form>
                    <Link to="/articles/new" className="rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-[#04121c] hover:bg-[#3cc6fa]">
                        Write article
                    </Link>
                    {/* <span className="max-w-[8rem] truncate text-sm text-slate-400" title={user?.email}>{user?.username}</span> */}
                    <button type="button" onClick={onLogout} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-white/5">
                        Log out
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    aria-expanded={open}
                    aria-label="Toggle menu"
                    className="ml-auto rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold md:hidden"
                >
                    {open ? "Close" : "Menu"}
                </button>
            </div>

            {open && (
                <div className="space-y-3 border-t border-white/5 px-6 py-4 md:hidden">
                    <form onSubmit={onSearch}>
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search articles..."
                            aria-label="Search articles"
                            className="w-full rounded-xl border border-white/10 bg-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-accent"
                        />
                    </form>
                    <nav className="flex flex-col gap-1" aria-label="Mobile">{links}</nav>
                    <Link to="/articles/new" onClick={() => setOpen(false)} className="block rounded-xl bg-accent px-5 py-3 text-center text-sm font-bold text-[#04121c]">
                        Write article
                    </Link>
                    <button type="button" onClick={onLogout} className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold">
                        Log out ({/*user?.username*/})
                    </button>
                </div>
            )}
        </header>
    )
}