import { title } from "process"

interface Props {
    title: string
    value: string
    onChange: (value: string) => void
    onGenerate: () => void
    generating: boolean
    error?: string
}

const AiTextGenerator = ({ title, value, onChange, onGenerate, generating, error }: Props) => {

    const hasTitle = title.trim().length > 5

    return (
        <div className="rounded-2xl border border-white/10 bg-field/60 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <label htmlFor="aiText" className="block text-sm font-semibold text-slate-200">
                        AI-generated text
                    </label>
                    <p id="aiText-hint" className="mt-1 text-xs text-slate-500">
                        Generated from your article title. Review it before using it in your article.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onGenerate}
                    disabled={!hasTitle || generating}
                    className="inline-flex items-center gap-2 rounded-xl border border-accent/50 
                    bg-accent/10 px-5 py-2.5 text-sm font-bold text-accent transition 
                    hover:bg-accent/20 focus-visible:outline-2 focus-visible:outline-offset-2 
                    focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <span aria-hidden="true">{generating ? "⏳" : "✨"}</span>
                    {generating ? "Generating..." : "Generate text"}
                </button>
            </div>

            <textarea
                id="aiText"
                rows={10}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-describedby="aiText-hint"
                aria-busy={generating}
                placeholder="Generated text will appear here..."
                className="mt-4 w-full rounded-xl border border-white/10 bg-field px-4 py-3.5 text-base text-white
                    placeholder-slate-500 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
            </textarea>

            {error && (
                <p role="alert" className="mt-2 text-sm text-red-400">
                    {error}
                </p>
            )}
            {!hasTitle && !error && (
                <p className="mt-2 text-xs text-slate-500">Enter a proper title above to enable text generation.</p>
            )}

        </div>
    )
}

export default AiTextGenerator