import { useState, type KeyboardEvent } from "react"
import { addUnique } from "../../utils/normalizeTags"

interface Props {
    id: string
    label: string
    values: string[]
    onChange: (value: string[]) => void
    placeholder?: string
    lowercase?: boolean
    hint?: string
}

const TagInput = ({ id, label, values, onChange, placeholder: placeHolder, lowercase = true, hint }: Props) => {
    const [text, setText] = useState<string>("")

    const commit = () => {
        if (!text.trim()) return
        onChange(addUnique(values, text, lowercase))
        setText("")
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            commit()
        }
        else if (e.key === "Backspace" && !text && values.length) {
            onChange(values.slice(0, -1))
        }
    }

    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-200">{label}</label>
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-field px-3 py-2.5 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
                {values.map((v) => (
                    <span key={v} className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 py-1 pl-3 pr-1 text-xs font-semibold text-accent">
                        {v}
                        <button
                            type="button"
                            onClick={() => onChange(values.filter((x) => x !== v))}
                            aria-label={`Remove ${v}`}
                            className="rounded-full px-1.5 text-base leading-none hover:bg-accent/20"
                        >
                            ×
                        </button>
                    </span>
                ))}
                <input
                    id={id}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={onKeyDown}
                    onBlur={commit}
                    placeholder={values.length ? "" : placeHolder}
                    className="min-w-32 flex-1 bg-transparent px-1 py-1 text-base text-white placeholder-slate-500 outline-none"
                />
            </div>
            {hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
        </div>
    )
}

export default TagInput