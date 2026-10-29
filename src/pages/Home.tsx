import { useSearchParams } from "react-router-dom"
import SearchBar from "../components/ui/SearchBar"
import Spinner from "../components/ui/Spinner"
import EmptyState from "../components/ui/EmptyState"
import Pagination from "../components/ui/Pagination"

export default function Home() {
    const [params, setParams] = useSearchParams()
    const page = Number(params.get("page")) || 1
    const tag = params.get("tag") ?? ""
    const q = params.get("q") ?? ""

    const update = (next: Record<string, string>) => {
        const p = new URLSearchParams(params);
        Object.entries(next).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
        setParams(p, { replace: true });
    }

    return (
        <div>
            <section className="py-8 text-center sm:py-14">
                <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                    <span className="h-0.5 w-1.5 bg-accent" />
                    Game articles &amp; reviews
                    <span className="h-0.5 w-1.5 bg-accent" />
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

            <section className="mt-10">
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                    <span className="h-0.5 w-6 bg-accent" />
                    {tag ? `Tagged "${tag}"` : "Latest"}
                </p>
                <h2 className="mt-2 mb-6 text-4xl font-extrabold tracking-tighter">Newest articles</h2>

                {loading && !data ? (
                    <Spinner />
                ) : error ? (
                    <EmptyState title="Could not load articles" text={error} />
                ) : !data || data.items.length === 0 ? (
                    <EmptyState title="No articles found" text="Try a different search or tag, or write the first one." />
                ) : (
                    <>
                        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${loading ? "opacity-60" : ""}`}>
                            {data.items.map((a) => <ArticleCard key={a._id} article={a} />)}
                        </div>
                        <Pagination page={data.page} pages={data.pages} onChange={(p) => update({ page: p === 1 ? "" : String(p) })} />
                    </>
                )}
            </section>
        </div>
    )
}