import { useEffect, useState } from "react"
import MostLikedList from "../../components/admin/MostLikedList"
import StatCard from "../../components/admin/StatCard"
import TagBars from "../../components/admin/TagBars"
import { getAllUserCount } from "../../service/auth"
import { getAllArticleCount } from "../../service/article"
import { getAllCommentsCount } from "../../service/comment"

const Overview = () => {

    const[userCount, setUserCount] = useState<number>(0)
    const[articleCount, setArticleCount] = useState<number>(0)
    const[commentCount, setCommentCount] = useState<number>(0)
    const[error, setError] = useState<string>("")

    useEffect(()=>{
        getAllUserCount().then(
            setUserCount
        ).catch((err)=> setError(err))

        getAllArticleCount().then(
            setArticleCount
        ).catch((err)=> setError(err))
        
        getAllCommentsCount().then(
            setCommentCount
        ).catch((err)=> setError(err))
    }, [])

    return (
        <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-3">
                <StatCard lable="User" value={userCount} />
                <StatCard lable="Articles" value={articleCount} />
                <StatCard lable="Comments" value={commentCount} />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <section className="rounded-3xl border border-white/10 bg-card sm:p-8">
                    <h2 className="mb-6 text-2xl font-extrabold tracking-tighter">Most Liked Articles</h2>
                    <MostLikedList items={[ ]}/>
                </section>
                <section className="rounded-3xl border border-white/10 bg-card p-6 sm:p-8">
                    <h2 className="mb-6 text-2xl font-extrabold tracking-tighter">Articles per tag</h2>
                    <TagBars items={[]}/>
                </section>
            </div>
        </div>
    )
}

export default Overview