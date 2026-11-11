import { useEffect, useState } from "react"
import type { Article } from "../types/types"
import { getMostLikedArticles } from "../service/article"
import Spinner from "../components/ui/Spinner"
import EmptyState from "../components/ui/EmptyState"
import ArticleCard from "../components/articles/ArticleCard"
import Pagination from "../components/ui/Pagination"

const TopArticles = () => {
    const [articles, setArticles] = useState<Article[]>()
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        fetchArticles()
    }, [page])

    const fetchArticles = ()=>{
        setLoading(true)
        getMostLikedArticles(page, 6)
            .then((res)=>{
                setArticles(res.data)
                setTotalPages(res.meta.totalPages)

            })
            .catch((err) => setError(err.message ? err.message : "Internal Server Error."))
            .finally(() => setLoading(false))
    }

    return (
        <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                        <span className="h-0.5 w-6 bg-accent" />
                        Most Liked
                    </p>
                    <h1 className="mt-2 text-4xl font-extrabold tracking-tighter sm:text-5xl">Top Articles</h1>
                    <p className="flex flex-col mx-auto mt-5 max-w-xl text-lg text-slate-400">
                        The articles drawing the most interest from the GameHub community.
                    </p>
                </div>
            </div>

            <div className="mt-8">
                {loading && !articles ? (
                    <Spinner />
                ) : error ? (
                    <EmptyState title="Couldn't load your articles" text={error} />
                ) : !articles || articles.length === 0 ? (
                    <EmptyState title="Something went Wrong!" text="Try refreshing the page." />
                ) : (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {articles.map((a) => <ArticleCard key={a._id} article={a}></ArticleCard>)}
                        </div>
                        <Pagination page={page} pages={totalPages} onChange={(p) => setPage(p)} />
                    </>
                )}
            </div>
        </div>
    )

}

export default TopArticles