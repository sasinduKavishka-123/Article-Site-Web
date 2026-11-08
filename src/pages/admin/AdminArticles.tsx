import { useEffect, useState } from "react";
import TagPill from "../../components/ui/TagPill";
import type { Article, StatusFilter } from "../../types/types"
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import ConfirmModal from "../../components/ui/ConfirmModal";
import StatusBadge from "../../components/ui/StatusBadge";
import { changeActive, getAllAdminArticles, getAllArticles } from "../../service/article";
import Pagination from "../../components/ui/Pagination";
import SearchBar from "../../components/ui/SearchBar";


const Filters: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" }
]

const PAGE_LIMIT = 3

const AdminArticles = () => {

    const [status, setStatus] = useState<StatusFilter>("all")
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [target, setTarget] = useState<Article | null>(null)
    const [busy, setBusy] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const [articles, setArticles] = useState<Article[]>([])
    const [text, setText] = useState<string>("")

    useEffect(() => {
        fetchArticles(status, "")
    }, [page])

    const fetchArticles = (s: StatusFilter, val: string) => {
        setLoading(true)

        if (s === "all") {
            getAllAdminArticles(page, PAGE_LIMIT, val)
                .then((res) => {
                    setArticles(res.data)
                    setTotalPages(res.meta.totalPages)
                })
                .catch((err) => {
                    console.error(err)
                    setError(err.message ? err.message : "Internal Server Error")
                })
                .finally(() => setLoading(false))
        }
        else {
            const isActive = s === "active"
            getAllArticles(page, PAGE_LIMIT, isActive, val)
                .then((res) => {
                    setArticles(res.data)
                    setTotalPages(res.meta.totalPages)
                })
                .catch((err) => {
                    console.error(err)
                    setError(err.message ? err.message : "Internal Server Error")
                })
                .finally(() => setLoading(false))
        }
    }

    const changeStatus = (s: StatusFilter) => {
        setStatus(s);
        setPage(1);
        fetchArticles(s, text)
    }

    const confirmDelete = async () => {
        if (!target) return

        setBusy(true)
        try {
            await changeActive(target._id)
            setTarget(null)
            fetchArticles(status, text)
        }
        catch (err: any) {
            setError(err.message ? err.message : "Server Error")
            setTarget(null)
        }
        finally {
            setBusy(false)
        }
    }

    const restore = async (a: Article) => {
        try {
            await changeActive(a._id)
            fetchArticles(status, text)
        }
        catch (err: any) {
            setError(err.message ? err.message : "Server Error")
        }
    }

    const update = (v: string) => {
        setText(v)
        fetchArticles(status, v)
    }

    return (
        <div>
            <SearchBar
                value={text}
                onChange={(v) => update(v)}
            />

            <div className="flex flex-wrap gap-2 mt-4" role="group" aria-label="Filter by status">
                {Filters.map((f) => (
                    <TagPill key={f.value} label={f.label} size="md" active={status === f.value} muted={status !== f.value} onClick={() => changeStatus(f.value)} />
                ))}
            </div>

            {error && <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>}

            {
                loading ? (
                    <Spinner />
                ) : (
                    <div className="mt-6">
                        {loading && !articles ? (
                            <Spinner />
                        ) : error ? (
                            <EmptyState title="Could not load articles" text={error} />
                        ) : !articles || articles.length === 0 ? (
                            <EmptyState title="No articles" />
                        ) : (
                            <>
                                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-card">
                                    <table className="w-full min-w-160 text-left text-sm">
                                        <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-400">
                                            <tr>
                                                <th className="px-5 py-4">Title</th>
                                                <th className="px-5 py-4">Author</th>
                                                <th className="px-5 py-4">Created</th>
                                                <th className="px-5 py-4">Status</th>
                                                <th className="px-5 py-4 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {articles.map((a) => (
                                                <tr key={(a._id)}>
                                                    <td className="max-w-xs px-5 py-4">
                                                        <Link to={`/articles/${a._id}`} className="line-clamp-1 font-semibold hover:text-accent">{a.title}</Link>
                                                    </td>
                                                    <td className="px-5 py-4 text-slate-300">{a.author.name}</td>
                                                    <td className="px-5 py-4 text-slate-400">{formatDate(a.createdAt)}</td>
                                                    <td className="px-5 py-4"><StatusBadge active={a.isActive} /></td>
                                                    <td className="px-5 py-4 text-right">
                                                        {a.isActive ? (
                                                            <button type="button" onClick={() => setTarget(a)} className="font-semibold text-red-400 hover:text-red-300">Delete</button>
                                                        ) : (
                                                            <button type="button" onClick={() => restore(a)} className="font-semibold text-green-400 hover:text-green-300">Restore</button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination page={page} pages={totalPages} onChange={(p) => setPage(p)} />
                            </>
                        )}
                    </div>
                )
            }


            <ConfirmModal
                open={!!target}
                title="Delete article?"
                message={`"${target?.title ?? ""}" will be marked inactive and hidden from users. You can restore it later.`}
                confirmText="Delete"
                busy={busy}
                onConfirm={confirmDelete}
                onCancel={() => setTarget(null)}
            />
        </div>
    )
}

export default AdminArticles