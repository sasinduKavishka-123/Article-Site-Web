import { Link, NavLink, replace, useNavigate } from "react-router-dom";
import { Logo } from "../AuthLayout";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-card text-white" : "text-slate-300 hover:text-white"
    }`;

export default function Navbar() {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const onLogout = () => {
        localStorage.removeItem("ACCESS_TOKEN")
        localStorage.removeItem("REFRESH_TOKEN")
        navigate("/login")
     }
    
    const { user } = useAuth()
    const hasAdmin = user?.roles.some((r: string) => r === "ADMIN")

    const links = (
        <>
            <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/top-articles" className={linkClass} onClick={() => setOpen(false)}>Top Articles</NavLink>
            <NavLink to="/my-articles" className={linkClass} onClick={() => setOpen(false)}>My Articles</NavLink>
            {hasAdmin && (
                <NavLink to="/admin" className={linkClass} onClick={() => setOpen(false)}>Admin</NavLink>
            )}
        </>
    );

    return (
        <header className="sticky top-0 z-40 border-b border-white/5 bg-base/90 backdrop-blur">
            <div className="mx-auto flex h-20 max-w-6xl items-center gap-4 px-6">
                <Logo />

                <nav className="ml-4 hidden items-center gap-1 min-[850px]:flex " aria-label="Main">{links}</nav>

                <div className="ml-auto hidden items-center gap-3 min-[850px]:flex">
                    <Link to="/articles/new" className="rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-[#04121c] hover:bg-[#3cc6fa]">
                        Write article
                    </Link>
                    
                    <button type="button" onClick={onLogout} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-white/5">
                        Log out
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    aria-expanded={open}
                    aria-label="Toggle menu"
                    className="ml-auto rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold min-[850px]:hidden"
                >
                    {open ? "Close" : "Menu"}
                </button>
            </div>

            {open && (
                <div className="space-y-3 border-t border-white/5 px-6 py-4 min-[850px]:hidden">
                    <nav className="flex flex-col gap-1" aria-label="Mobile">{links}</nav>
                    <Link to="/articles/new" onClick={() => setOpen(false)} className="block rounded-xl bg-accent px-5 py-3 text-center text-sm font-bold text-[#04121c]">
                        Write article
                    </Link>

                    <button type="button" onClick={onLogout} className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold">
                        Log out
                    </button>
                </div>
            )}
        </header>
    )
}