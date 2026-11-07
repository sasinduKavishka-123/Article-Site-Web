import { NavLink, Outlet } from "react-router-dom"

const tab = ({ isActive }: { isActive: boolean }) => 
    `rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
        isActive ? "bg-accent/10 text-accent" : "text-slate-300 hover:text-white"
    }`


const AdminLayout = () => {
    return (
        <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                <span className="h-0.5 w-6 bg-accent" />
                Moderation
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tighter sm:text-5xl">Admin Dashboard</h1>

            <nav className="mt-6 inline-flex gap-1 rounded-xl border border-white/10 bg-card p-1.5">
                <NavLink to="/admin" end className={tab}>Overview</NavLink>
                <NavLink to="/admin/articles" className={tab}>Articles</NavLink>
            </nav>

            <div className="mt-8">
                <Outlet/>
            </div>
        </div>


    )
}

export default AdminLayout