import { Link } from "react-router-dom";
import { Logo } from "../AuthLayout";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-slate-400">
            A community for game reviews, news, and guides. Read, write, and talk about the games you love.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Explore</p>
          <ul className="mt-4 space-y-3 text-slate-400">
            <li><Link to="/" className="hover:text-white">Browse articles</Link></li>
            <li><Link to="/articles/new" className="hover:text-white">Write an article</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Account</p>
          <ul className="mt-4 space-y-3 text-slate-400">
            <li><Link to="/my-articles" className="hover:text-white">My articles</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-white/5 px-6 py-6 text-sm text-slate-500">
        <span>© {new Date().getFullYear()} GameHub.</span>
        <span>Built with the MERN stack.</span>
      </div>
    </footer>
  );
}