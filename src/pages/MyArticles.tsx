import { Link } from "react-router-dom"
import Spinner from "../components/ui/Spinner"
import { useState } from "react"
import EmptyState from "../components/ui/EmptyState"
import ArticleCard from "../components/articles/ArticleCard"
import Pagination from "../components/ui/Pagination"

const MyArticles = ()=>{

    const [articles, setArticles] = useState<any[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    return(
        <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                        <span className="h-0.5 w-6 bg-accent">Your Work</span>
                    </p>
                    <h1 className="mt-2 text-4xl font-extrabold tracking-tighter sm:text-5xl">My Articles</h1>
                </div>
                <Link to="/article/new" className="rounded-xl bg-accent px-5 py-3 font-bold text-[#04121c] hover:bg-[#3cc6fa]">
                    Write article
                </Link>
            </div>

            <div className="mt-8">
                {loading && !articles ? (
                    <Spinner/>
                ) : error? (
                    <EmptyState title="Couldn't load your articles" text={error}/>
                ) : !articles || articles.length===0?(
                    <EmptyState title="You haven't written anything yet" text="Share your first review, news post or guide."/>
                ) : (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {articles.map((a) => <ArticleCard key={a._id} item={a}></ArticleCard>)}
                        </div>
                        <Pagination page={page} pages={totalPages} onChange={setPage}/>
                    </>
                )}
            </div>
        </div>
    )

}

export default MyArticles