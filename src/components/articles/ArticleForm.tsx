import { useState, type FormEvent } from "react"
import { ErrorBanner, Field } from "../AuthLayout"
import TagInput from "./TagInput"

type Errors = Partial<Record<"title" | "content" | "coverImageUrl", string>>;

const ArticleForm = () => {

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
        try {
            console.log("submited")
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
                error={error.title}
            />
            <Field
                id="coverImageUrl"
                label="Cover image URL (optional)"
                placeholder="https://example.com/cover.jpg"
                value={coverImageUrl}
                error={error.coverImageUrl}
            />
            <TagInput
                id="gameNames"
                label="Game names (optional)"
                values={gameNames}
                onChange={setGameNames}
                lowercase={false}
                placeholder="Type a game and press Enter"
                hint="You can add more than one game."
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
                    value={""}

                    placeholder="Write your article here"
                    className={`w-full rounded-xl border bg-field px-4 py-3.5 text-base text-white placeholder-slate-500 outline-none focus:ring-2`}
                >
                </textarea>
            </div>
        </form>
    )
}

export default ArticleForm