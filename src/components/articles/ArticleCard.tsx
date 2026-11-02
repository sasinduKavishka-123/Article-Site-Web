import { Link } from "react-router-dom";
import CoverImage from "../ui/CoverImage";
import type React from "react";
import TagPill from "../ui/TagPill";

interface ArticleCardProps {
    item: any
    onFavorite?: (e: React.MouseEvent, id: string) => void
}

const ArticleCard: React.FC<ArticleCardProps> = ({
    item,
    onFavorite
}) => {
    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:-translate-y-1 hover:border-accent/40">
            <Link
                to={`/articles/${item._id}`}
                className="block overflow-hidden"
            >
                <CoverImage
                    src={item.coverImageUrl}
                    alt={`Cover for ${item.coverImageUrl}`}
                    className="aspect-video w-full transition duration-300 group-hover:scale-105"
                />
            </Link>
            <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight">
                    <Link to={`/articles/${item._id}`} className="hover:text-accent">{item.title}</Link>
                </h3>
                {item.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {item.tags.slice(0, 3).map((t: string) => (
                            <TagPill key={t} label={t}></TagPill>
                        ))}
                        {item.tags.length > 3 && (
                            <span className="self-center text-xs text-slate-500">+{item.tags.length - 3}</span>
                        )}
                    </div>
                )}
                <div className="mt-auto flex items-center justify-between pt-5 text-sm text-slate-400">
                    <span className="truncate">
                        {item.author.name}
                    </span>
                    <span aria-label={`${item.likes.length} likes`}>👍 {item.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default ArticleCard