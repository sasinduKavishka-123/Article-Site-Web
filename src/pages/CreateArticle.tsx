import { useNavigate } from "react-router-dom"
import ArticleForm from "../components/articles/ArticleForm"
import { createArticle } from "../service/article"

const CreateArticle = () => {
    const navigate = useNavigate()

    return (
        <div className="mx-auto max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                <span className="h-0.5 w-6 bg-accent" />
                New article
            </p>
            <h1 className="mt-2 mb-8 text-4xl font-extrabold tracking-tighter sm:text-5xl">Write an article.</h1>
            <ArticleForm
                submitText={"Publish"}
                loadingText={"Publishing..."}
                onSubmit={async (data) => {
                    const formData = new FormData()
                    formData.append("title", data.title)
                    formData.append("content", data.content)
                    formData.append("gameNames", JSON.stringify(data.gameNames))
                    formData.append("tags", JSON.stringify(data.tags))
                    if (data.coverImageUrl) { formData.append("file", data.coverImageUrl) }

                    const newArticle = await createArticle(formData)
                    navigate(`/articles/${newArticle._id}`)
                }}
            />
        </div>
    )
}

export default CreateArticle