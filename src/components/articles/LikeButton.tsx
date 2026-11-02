import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"

interface Props {
    articleId: string
    initialLikes: string[]
}

const toggle = () => {
    console.log("Liked")
}

const LikeButton = ({ articleId, initialLikes }: Props) => {
    const { user } = useAuth()
    const [likes, setLikes] = useState<string[]>(initialLikes)

    const liked = !(!user && likes.includes(user._id))

    return (
        <button
            type="button"
            onClick={toggle}
            disabled={false}
            aria-pressed={liked}
            className={`flex w-full items-center justify-center gap-3 rounded-xl border px-5 py-4 text-lg font-bold transition disabled:opacity-60 ${liked
                    ? "border-accent bg-accent text-[#04121c] hover:bg-[#3cc6fa]"
                    : "border-accent/50 bg-accent/10 text-accent hover:bg-accent/20"
                }`}
        >
            <span aria-hidden="true">{liked? "♥" : "♡"}</span>
            {liked ? "Liked" : "Like this article"}
            <span className="rounded-full bg-black/20 px-3 py-0.5 text-sm">{likes.length}</span>
        </button>
    )
}

export default LikeButton