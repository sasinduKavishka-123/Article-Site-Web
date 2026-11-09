import { useEffect, useState } from "react"
import ArticleForm from "../components/articles/ArticleForm"
import { useNavigate, useParams } from "react-router-dom"
import { getArticleById, updateArticle } from "../service/article"
import type { Article } from "../types/types"
import Spinner from "../components/ui/Spinner"
import EmptyState from "../components/ui/EmptyState"


const EditArticle = () => {

    const navigate = useNavigate()

    const { id } = useParams<{ id: string }>()
    const [article, setArticle] = useState<Article>()
    const [error, setError] = useState<string>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (id) {
            getArticleById(id)
                .then(setArticle)
                .catch((err) => setError(err.message ? err.message : "Failed to load article"))
                .finally(() => { setLoading(false) })
        }
    }, [id])

    if (loading) { return <Spinner /> }
    if (error || !article) {
        return <EmptyState title="Article not found" text={error || "It may have been removed."} />
    }

    return (
        <div className="mx-auto max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                <span className="h-0.5 w-6 bg-accent" />
                Edit Article
            </p>
            <h1 className="mt-2 mb-8 text-4xl font-extrabold tracking-tighter sm:text-5xl">Update your article.</h1>
            <ArticleForm
                data={{
                    title: article.title,
                    content: article.content,
                    gameNames: article.gameNames,
                    tags: article.tags,
                    coverImageUrl: article.coverImageUrl ?? ""
                }}
                submitText={"Save Changes"}
                loadingText={"Saving..."}
                onSubmit={async (article) => {
                    const formData = new FormData()
                    formData.append("id", id ?? "")
                    formData.append("title", article.title)
                    formData.append("content", article.content)
                    formData.append("gameNames", JSON.stringify(article.gameNames))
                    formData.append("tags", JSON.stringify(article.tags))
                    if (article.file) { formData.append("file", article.file) }

                    const newArticle = await updateArticle(formData)
                    navigate(`/articles/${newArticle._id}`)
                }}
            />
        </div>
    )
}

export default EditArticle