import { useState, type FormEvent } from "react"
import { ErrorBanner, Field, SubmitButton } from "../AuthLayout"
import TagInput from "./TagInput"
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../service/article";

interface Props {
    submitText: string
    loadingText: string
    onSubmit: (data: any) => Promise<void>
}

type Errors = Partial<Record<"title" | "content" | "coverImageUrl", string>>;

const ArticleForm = ({ submitText, loadingText, onSubmit }: Props) => {

    const navigate = useNavigate()

    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [gameNames, setGameNames] = useState<string[]>([])
    const [coverImageUrl, setCoverImageUrl] = useState<string>("")
    const [tags, setTags] = useState<string[]>([])
    const [error, setError] = useState<Errors>({})
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState<boolean>(false)

    const validate = (): Errors => {
        const err: Errors = {};
        if (!title.trim()) err.title = "Enter a title.";
        if (!content.trim()) err.content = "Write some content.";
        if (coverImageUrl.trim() && !/^https?:\/\/\S+$/i.test(coverImageUrl.trim()))
            err.coverImageUrl = "Enter a valid image URL starting with http:// or https://";
        return err;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const found = validate()
        setError(found)
        if (Object.keys(found).length) return
        setLoading(true)
        setServerError("")
        // try {
        //     const formData = new FormData()
        //     formData.append("title", title)
        //     formData.append("content", content)
        //     formData.append("gameNames", JSON.stringify(gameNames))
        //     formData.append("tags", JSON.stringify(tags))
        //     if (coverImageUrl) {formData.append("file", coverImageUrl)}

        //     const newArticle = await createArticle(formData)
        //     navigate(`/articles/${newArticle._id}`)
        // }
        try {
            await onSubmit({
                title: title,
                content: content,
                coverImageUrl: coverImageUrl ? coverImageUrl : "",
                gameNames: gameNames,
                tags: tags
            })
        }
        catch (err: any) {
            setServerError(err.message ? err.message : "Could not save the article.")
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-6 rounded-3xl border border-white/10 bg-card p-6 sm:p-8">
            <ErrorBanner message={serverError} />
            <Field
                id={"title"}
                label={"Title"}
                placeholder="e.g. Elden Ring: a beginner's survival guide"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                    setError((x) => ({ ...x, title: "" }))
                }}
                error={error.title}
            />
            <Field
                id="coverImageUrl"
                label="Cover image URL (optional)"
                placeholder="https://example.com/cover.jpg"
                value={coverImageUrl}
                onChange={(e) => {
                    setCoverImageUrl
                        (e.target.value)
                    setError((x) => ({ ...x, coverImageUrl: "" }))
                }}
                error={error.coverImageUrl}
            />
            <TagInput
                id="gameNames"
                label="Game names (optional)"
                values={gameNames}
                onChange={setGameNames}
                lowercase={false}
                placeholder="Type a game and press Enter"
                hint="Press Enter or comma to add. You can add more than one game."
            />
            <TagInput
                id="tags"
                label="Tags"
                values={tags}
                onChange={setTags}
                placeholder="e.g. review, rpg, guide"
                hint="Press Enter or comma to add. Tags are saved in lowercase."
            />
            <div>
                <label htmlFor="content" className="mb-2 block text-sm font-semibold text-slate-200">Content</label>
                <textarea
                    id="content"
                    rows={15}
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value)
                        setError((x) => ({ ...x, content: "" }))
                    }}
                    placeholder="Write your article here"
                    className={`w-full rounded-xl border bg-field px-4 py-3.5 text-base text-white placeholder-slate-500 outline-none focus:ring-2 ${error.content
                        ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
                        : "border-white/10 focus:border-accent focus:ring-accent/20"
                        }`}
                />
                {error.content && <p className="mt-2 text-sm text-red-400">{error.content}</p>}
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => navigate(-1)} className="rounded-xl border border-white/10 px-6 py-3.5 font-semibold hover:bg-white/5">
                    Cancel
                </button>
                <div className="sm:w-56">
                    <SubmitButton loading={loading} loadingText={loadingText}>{submitText}</SubmitButton>
                </div>
            </div>
        </form>
    )
}

export default ArticleForm