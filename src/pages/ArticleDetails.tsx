import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import type { Article } from "../types/types"
import { getArticleById } from "../service/article"
import Spinner from "../components/ui/Spinner"
import EmptyState from "../components/ui/EmptyState"
import ArticleHero from "../components/articles/ArticleHero"
import LikeButton from "../components/articles/LikeButton"

const ArticlesDetails = () => {

    const { id } = useParams<{ id: string }>()
    const [article, setArticle] = useState<Article>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        if (id) {
            getArticleById(id)
                .then(setArticle)
                .catch((err) => setError(err.message ? err.message : "Failed to load article"))
                .finally(() => { setLoading(false) })
        }
    }, [id])

    if (loading) {
        return <Spinner />
    }

    if (error || !article) {
        return <EmptyState title="Article not found" text={error || "It may have been removed."} />
    }

    return (
        <div className="space-y-8">
            <nav className="text-sm text-slate-400">
                <Link to={"/"} className="hover:text-white">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-slate-300">{article.title}</span>
            </nav>

            <ArticleHero article={article}>
                <LikeButton articleId={article._id} initialLikes={article.likes} />
            </ArticleHero>

            <article className="rounded-3xl border border-white/10 bg-card p-6 sm:p-10">
                <h2 className="text-3xl font-extrabold tracking-normal">Article</h2>
                <div className="mt-5 max-w-3xl whitespace-pre-wrap wrap-break-word text-lg leading-8 text-slate-300">
                    {article.content}
                </div>
            </article>
        </div>
    )
}

export default ArticlesDetails