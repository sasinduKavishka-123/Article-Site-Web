import { Link } from "react-router-dom"

const NotFound = ()=>{
    return(
        <div className="py-24 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Error 404</p>
            <h1 className="mt-3 text-6xl font-extrabold tracking-tighter">Page Not Found.</h1>
            <p className="mt-4 text-slate-400">The page you are looking for doesn't exist or was moved.</p>
            <Link to="/" className="mt-8 inline-block rounded-xl bg-accent px-6 py-3 font-bold text-[#04121c] hover:bg-[#3cc6fa]">
                Back to Home
            </Link>
        </div>
    )
}

export default NotFound