import SearchBar from "../components/ui/SearchBar"
import Spinner from "../components/ui/Spinner"
import EmptyState from "../components/ui/EmptyState"
import Pagination from "../components/ui/Pagination"
import ArticleCard from "../components/articles/ArticleCard"
import { useAuth } from "../hooks/useAuth"
import { useEffect, useState } from "react"
import { getAllArticles } from "../service/article"
import type { Article } from "../types/types"

export default function Home() {

    const {user} = useAuth()
    const [articles, setArticles] = useState<Article[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)

    const [error, setError] = useState<string>("")

    const [text, setText] = useState<string>("")

    useEffect(() => {
        fetchArticles(text)
    }, [page])

    const fetchArticles = (s: string) => {
        setLoading(true)
        getAllArticles(page, 6, true, s)
            .then((res) => {
                setArticles(res.data)
                setTotalPages(res.meta.totalPages)
            })
            .catch((err) => {
                console.error(err)
                setError(err.message? err.message : "Internal Server Error")
            })
            .finally(() => setLoading(false))
    }

    const update = (s: string) => {
        setText(s)
        fetchArticles(s)
    }
    
    return (
        <div>
            <section className="py-8 text-center sm:py-14">
                <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                    <span className="h-0.5 w-1.5 bg-accent" />
                    Games &amp; game development
                    <span className="h-0.5 w-1.5 bg-accent" />
                </p>
                <h1 className="flex flex-col mx-auto mt-4 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
                    <span>Play it , Build it </span>
                    <span>Talk about it</span>
                </h1>
                <p className="flex flex-col mx-auto mt-5 max-w-xl text-lg text-slate-400">
                    <span>Read about the games you love and</span>
                    <span> learn how to make your own from the community’s guides.</span>
                </p>
                <div className="mt-8 flex items-center justify-center">
                    <SearchBar 
                        value={text} 
                        onChange={
                            (v) => update(v)
                        } 
                        placeholder="Search by title, game or tag ..." 
                    />
                </div>
            </section>

            <section className="mt-10">
                
                <h2 className="mt-2 mb-6 text-4xl font-extrabold tracking-tighter">Newest Articles</h2>

                {loading && !articles ? (
                    <Spinner />
                ) : error ? (
                    <EmptyState title="Could not load articles" text={error} />
                ) : !articles || articles.length === 0 ? (
                    <EmptyState title="No articles found" text="Try a different search or tag, or write the first one." />
                ) : (
                    <>
                        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${loading ? "opacity-60" : ""}`}>
                            {articles.map((a) => <ArticleCard key={a._id} article={a}/>)}
                        </div>
                        
                        <Pagination 
                            page={page} 
                            pages={totalPages} 
                            onChange={(p) => {
                                setPage(p)
                            }} 
                        />
                    </>
                )}
            </section>
        </div>
    )
}