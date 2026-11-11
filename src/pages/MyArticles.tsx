import { Link } from "react-router-dom"
import Spinner from "../components/ui/Spinner"
import { useEffect, useState } from "react"
import EmptyState from "../components/ui/EmptyState"
import ArticleCard from "../components/articles/ArticleCard"
import { getMyArticles } from "../service/article"

const MyArticles = () => {

    const [articles, setArticles] = useState<any[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        getMyArticles()
            .then(setArticles)
            .catch((err) => setError(err.message ? err.message : "Internal Server Error."))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                        <span className="h-0.5 w-6 bg-accent"/>
                        Your Work
                    </p>
                    <h1 className="mt-2 text-4xl font-extrabold tracking-tighter sm:text-5xl">My Articles</h1>
                </div>
                <Link to="/articles/new" className="rounded-xl bg-accent px-5 py-3 font-bold text-[#04121c] hover:bg-[#3cc6fa]">
                    Write article
                </Link>
            </div>

            <div className="mt-8">
                {loading && !articles ? (
                    <Spinner />
                ) : error ? (
                    <EmptyState title="Couldn't load your articles" text={error} />
                ) : !articles || articles.length === 0 ? (
                    <EmptyState title="You haven't written anything yet" text="Share your first review, news post or guide." />
                ) : (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {articles.map((a) => <ArticleCard key={a._id} article={a}></ArticleCard>)}
                        </div>
                    </>
                )}
            </div>
        </div>
    )

}

export default MyArticles