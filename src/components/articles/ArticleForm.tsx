import { useState, type FormEvent } from "react"
import { ErrorBanner, Field, SubmitButton } from "../AuthLayout"
import TagInput from "./TagInput"
import { useNavigate } from "react-router-dom";
import ImageDropZone from "./ImageDropZone";

interface ArticleData {
    title: string
    content: string
    gameNames: string[]
    tags: string[]
    coverImageUrl: string
}

interface Props {
    data?: ArticleData
    submitText: string
    loadingText: string
    onSubmit: (data: any) => Promise<void>
}

type Errors = Partial<Record<"title" | "content" | "coverImageUrl", string>>;

const ArticleForm = ({ data, submitText, loadingText, onSubmit }: Props) => {

    const navigate = useNavigate()

    const [title, setTitle] = useState<string>(data?.title ?? "")
    const [content, setContent] = useState<string>(data?.content ?? "")
    const [gameNames, setGameNames] = useState<string[]>(data?.gameNames ?? [])
    const [file, setFile] = useState<File | null>(null)
    const [coverImageUrl, setCoverImageUrl] = useState<string>(data?.coverImageUrl ?? "")
    const [tags, setTags] = useState<string[]>(data?.tags ?? [])
    const [error, setError] = useState<Errors>({})
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState<boolean>(false)
    const [uploading, setUploading] = useState<boolean>(false)

    const validate = (): Errors => {
        const err: Errors = {}
        if (!title.trim()) err.title = "Enter a title."
        if (!content.trim()) err.content = "Write some content."
        if (uploading) err.coverImageUrl = "Wait for the image to finish uploading."
        return err;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const found = validate()
        setError(found)
        if (Object.keys(found).length) return
        
        setLoading(true)
        setServerError("")
        try {
            await onSubmit({
                title: title,
                content: content,
                file: file ? file : "",
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
            
            <ImageDropZone
                value={coverImageUrl}
                onChange={(file) => { setFile(file); setError((x) => ({ ...x, coverImageUrl: "" })) }}
                onUploadingChange={setUploading}
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