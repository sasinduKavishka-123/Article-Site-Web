import { ErrorBanner, Field } from "../AuthLayout"


const ArticleForm = () => {
    return (
        <form>
            <ErrorBanner message="" />
            <Field
                id={"title"}
                label={"Title"}
                placeholder="e.g. Elden Ring: a beginner's survival guide"
                value={""}
                error=""
            />
            <Field
                id="coverImageUrl"
                label="Cover image URL (optional)"
                placeholder="https://example.com/cover.jpg"
                value={""}
                error={""}
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