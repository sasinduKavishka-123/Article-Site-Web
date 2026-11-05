import { useEffect, useState } from "react"
import { Link, replace, useNavigate, useParams } from "react-router-dom"
import type { Article } from "../types/types"
import { changeActive, getArticleById } from "../service/article"
import Spinner from "../components/ui/Spinner"
import EmptyState from "../components/ui/EmptyState"
import ArticleHero from "../components/articles/ArticleHero"
import LikeButton from "../components/articles/LikeButton"
import { useAuth } from "../hooks/useAuth"
import ConfirmModal from "../components/ui/ConfirmModal"

const ArticlesDetails = () => {

    const navigate = useNavigate()

    const { id } = useParams<{ id: string }>()
    const { user } = useAuth()
    const [article, setArticle] = useState<Article>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    const [confirm, setConfirm] = useState<boolean>(false)
    const [busy, setBusy] = useState<boolean>(false)
    const [actionError, setActionError] = useState<string>("")

    useEffect(() => {
        if (id) {
            getArticleById(id)
                .then(setArticle)
                .catch((err) => setError(err.message ? err.message : "Failed to load article"))
                .finally(() => { setLoading(false) })
        }
    }, [id])

    const remove = async () => {
        setBusy(true)
        try {
            if (article) {
                await changeActive(article._id)
                navigate("/my-articles", { replace: true })
            }
        }
        catch (err: any) {
            setError(err.message ? err.message : "Could not delete the article.")
            setConfirm(false)
            setBusy(false)
        }
    }

    if (loading) { return <Spinner /> }

    if (error || !article) {
        return <EmptyState title="Article not found" text={error || "It may have been removed."} />
    }

    const isOwner = user?.id === article.author._id

    return (
        <div className="space-y-8">
            <nav className="text-sm text-slate-400">
                <Link to={"/"} className="hover:text-white">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-slate-300">{article.title}</span>
            </nav>

            <ArticleHero article={article}>
                {isOwner
                    ? (
                        <div className="flex gap-3">
                            <Link to={`/articles/${article._id}/edit`} className="flex-1 rounded-xl border border-white/10 px-5 py-3 text-center font-semibold hover:bg-white/5">
                                Edit
                            </Link>
                            <button type="button" onClick={() => { setConfirm(true) }} className="flex-1 rounded-xl border border-red-500/30 px-5 py-3 font-semibold text-red-400 hover:bg-red-500/10">
                                Delete
                            </button>
                        </div>
                    )
                    :
                    (<LikeButton articleId={article._id} initialLikes={article.likes} />)}

                {actionError && <p role="alert" className="text-sm text-red-400">{actionError}</p>}
            </ArticleHero>
            <article className="rounded-3xl border border-white/10 bg-card p-6 sm:p-10">
                <h2 className="text-3xl font-extrabold tracking-normal">Article</h2>
                <div className="mt-5 max-w-3xl whitespace-pre-wrap wrap-break-word text-lg leading-8 text-slate-300">
                    {article.content}
                </div>
            </article>

            <ConfirmModal
                open={confirm}
                title="Delete this article?"
                message="The article will be hidden from everyone. This can be undone only by an admin."
                confirmText="Delete"
                busy={busy}
                onConfirm={remove}
                onCancel={() => setConfirm(false)}
            />

        </div>
    )
}

export default ArticlesDetails