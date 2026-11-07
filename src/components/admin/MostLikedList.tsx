import { Link } from "react-router-dom"
import type { Article } from "../../types/types"
import CoverImage from "../ui/CoverImage"

const MostLikedList = ({ items }: { items: Article[] }) => {
    if (items.length === 0) {
        return <p className="text-slate-400">No Articles Yet.</p>
    }

    return (
        <ol className="space-y-4">
            {items.map((a, i) => (
                <li key={a._id} className="flex items-center gap-4">
                    <span className="w-6 text-lg font-extrabold text-slate-500">{i + 1}</span>
                    <CoverImage
                        src={a.coverImageUrl} alt="" className="h-14 w-24 shrink-0 rounded-lg"
                    />
                    <div className="min-w-0 flex-1">
                        <Link to={`/atricles/${a._id}`} className="line-clamp-1 font-bold hover:text-accent">{a.title}</Link>
                        <p className="truncate text-sm text-slate-400"> by {a.author.name}</p>
                    </div>
                    <span className="font-bold text-accent">♥ {a.likes.length}</span>
                </li>
            ))}
        </ol>
    )
}

export default MostLikedList