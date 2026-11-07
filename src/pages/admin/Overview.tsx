import StatCard from "../../components/admin/StatCard"

const Overview = ()=>{
    return(
        <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard lable="User" value={0}/>
                <StatCard lable="Articles" value={0}/>
                <StatCard lable="Comments" value={0}/>
                <StatCard lable="Likes" value={0}/>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <section className="rounded-3xl border border-white/10 bg-card sm:p-8">
                    <h2 className="mb-6 text-2xl font-extrabold tracking-tighter">Most Liked Articles</h2>
                    
                </section>
                <section className="rounded-3xl border border-white/10 bg-card p-6 sm:p-8">
                    <h2 className="mb-6 text-2xl font-extrabold tracking-tighter">Articles per tag</h2>
                    
                </section>
            </div>
        </div>
    )
}

export default Overview