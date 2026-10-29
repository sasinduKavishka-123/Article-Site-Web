interface Props {
    page: number
    pages: number
    onChange: (page: number) => void
}

function pageList(page: number, pages: number): (number | "…")[] {
    const out: (number | "…")[] = [];
    for (let i = 1; i <= pages; i++) {
        if (i === 1 || i === pages || Math.abs(i - page) <= 1) {
            out.push(i)
        } else if (out[out.length - 1] !== "…") {
            out.push("…")
        }
    }
    return out
}

const base = "min-w-[2.5rem] rounded-lg border px-3 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40"

export default function Pagination({ page, pages, onChange }: Props) {
    if (pages <= 1) { return null }
    return (
        <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
                type="button"
                disabled={page <= 1}
                onClick={() => onChange(page - 1)}
                className={`${base} border-white/10 bg-card hover:border-accent/50`}
            >
                Prev
            </button>
            {pageList(page, pages).map((p, i) =>
                p === "…" ? (
                    <span key={`gap-${i}`} className="px-2 text-slate-500">…</span>
                ) : (
                    <button
                        key={p}
                        type="button"
                        onClick={() => onChange(p)}
                        aria-current={p === page ? "page" : undefined}
                        className={`${base} ${p === page
                            ? "border-accent/60 bg-accent/10 text-accent"
                            : "border-white/10 bg-card hover:border-accent/50"
                            }`}
                    >
                        {p}
                    </button>
                )
            )}
            <button
                type="button"
                disabled={page >= pages}
                onClick={() => onChange(page + 1)}
                className={`${base} border-white/10 bg-card hover:border-accent/50`}
            >
                Next
            </button>
        </nav>
    )
}