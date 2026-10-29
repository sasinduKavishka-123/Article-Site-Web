import { useSearchParams } from "react-router-dom"
import SearchBar from "../components/ui/SearchBar"

export default function Home() {
    const [params, setParams] = useSearchParams()
    const q = params.get("q") ?? ""

    const update = (next: Record<string, string>) => {
        const p = new URLSearchParams(params);
        Object.entries(next).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
        setParams(p, { replace: true });
    };

    return (
        <div>
            <section className="py-8 text-center sm:py-14">
                <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                    <span className="h-0.5 w-6 bg-accent" />
                    Game articles &amp; reviews
                </p>
                <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tighter sm:text-7xl">
                    Find your next read.
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
                    Reviews, news and guides written by the community. Search by title, game or tag.
                </p>
                <div className="mt-8 flex items-center justify-center">
                    <SearchBar value={q} onChange={(v) => update({ q: v, page: "" })} placeholder="Search by title, game, or tag..." />
                </div>
            </section>

            <div className="flex flex-wrap gap-2 border-y border-white/5 py-6" role="group" aria-label="Filter by tag">
                
            </div>

            <section className="mt-10">
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                    <span className="h-0.5 w-6 bg-accent" />
                </p>
                <h2 className="mt-2 mb-6 text-4xl font-extrabold tracking-tighter">Newest articles</h2>

            </section>
        </div>
    )
}