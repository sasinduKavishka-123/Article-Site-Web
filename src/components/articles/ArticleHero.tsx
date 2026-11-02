import type { ReactNode } from "react"
import type { Article } from "../../types/types"
import CoverImage from "../ui/CoverImage"
import TagPill from "../ui/TagPill"
import { formatDate } from "../../utils/formatDate"

const ArticleHero = ({ article, children }: { article: Article, children?: ReactNode }) => {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-card">
            {article.coverImageUrl && (
                <img
                    src={article.coverImageUrl}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-2xl"
                />
            )}
            <div className="absolute inset-0 bg-linear-to-r from-card/95 to-card/50" />
            <div className="relative grid gap-8 p-6 md:grid-cols-[2fr_3fr] md:p-10">
                <CoverImage
                    src={article.coverImageUrl}
                    alt={`Cover for ${article.title}`}
                    className="aspect-video w-full rounded-2xl border border-white/10"
                />
                <div className="flex flex-col justify-center">
                    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                        <span className="h-0.5 w-6 bg-accent" />
                        Article
                    </p>
                    <h1 className="mt-3 wrap-break-word text-3xl font-extrabold leading-tight tracking-tighter sm:text-5xl">
                        {article.title}
                    </h1>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {article.tags.map((t) => (
                            <TagPill key={t} label={t} />
                        ))}
                        {article.gameNames.map((g) => (
                            <TagPill key={g} label={g} muted />
                        ))}
                        <TagPill label={`By ${article.author.name}`} muted/>
                        <TagPill label={formatDate(article.createdAt)} muted/>
                    </div>
                    {children && <div className="mt-6 space-y-3">{children}</div>}
                </div>
            </div>
        </section>
    )
}

export default ArticleHero