import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react"

interface Props {
    value: string
    onChange: (file: File | null) => void
    onUploadingChange?: (uploading: boolean) => void
    error?: string
}

const MAX_MB = 5

const ImageDropZone = ({ value, onChange, onUploadingChange, error }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const [dragging, setDragging] = useState<boolean>(false)
    const [localError, setLocalError] = useState("")
    const [preview, setPreview] = useState("")

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview)
        }
    }, [preview])

    const handleFile = async (file?: File) => {
        if (!file) return
        setLocalError("")

        if (!file.type.startsWith("image/")) {
            setLocalError("Please Select a valid Image file.")
            return
        }

        if (file.size > MAX_MB * 1024 * 1024) {
            setLocalError(`Image must be ${MAX_MB} MB or smaller`)
            return
        }

        setPreview(URL.createObjectURL(file))
        onChange(file)
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragging(false)
        handleFile(e.dataTransfer.files?.[0])
    }

    const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFile(e.target.files?.[0])
        e.target.value = ""
    }

    const shown = preview || value
    const message = localError || error

    return (
        <div>
            <span className="mb-2 block text-sm font-semibold text-slate-200">Cover image (optional)</span>

            <div
                onDragOver={(e) => {
                    e.preventDefault()
                    setDragging(true)
                }}
                onDragLeave={() => { setDragging(false) }}
                onDrop={onDrop}
                className={`rounded-2xl border-2 border-dashed p-4 transition ${dragging
                        ? "border-accent bg-accent/10"
                        : "border-white/15 bg-field"
                    }`}
            >
                {shown ? (
                    <div>
                        <div className="relative overflow-hidden rounded-xl">
                            <img src={shown} alt="Cover preview" className="aspect-video w-full object-cover"></img>
                        </div>
                        <div className="mt-3 flex gap-3">
                            <button
                                type="button"
                                onClick={() => inputRef.current?.click()}
                                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5 disabled:opacity-50"
                            >
                                Change Image
                            </button>
                            <button
                                type="button"
                                onClick={() => { onChange(null); setPreview("") }}
                                className="rounded-lg border border-red-500/30 px-4 py-2 text-sm font-semibold 
                                text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="flex w-full flex-col items-center gap-1 rounded-xl px-4 py-10 text-center focus-visible:outline-2 focus-visible:outline-accent"
                    >
                        <span className="text-3xl" aria-hidden="true">🖼️</span>
                        <span className="font-semibold">Drag &amp; drop an image here</span>
                        <span className="text-sm text-accent">or click to choose a file</span>
                        <span className="mt-1 text-xs text-slate-500">JPG, PNG, WEBP or GIF, up to {MAX_MB} MB</span>
                    </button>
                )}
            </div>

            <input ref={inputRef} type="file" accept="image/*" onChange={onPick} className="hidden" />
            {message && (
                <p role="alert" className="mt-2 text-sm text-red-400">
                    {message}
                </p>
            )}
        </div>
    )

}

export default ImageDropZone