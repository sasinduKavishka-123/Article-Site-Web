import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function MainLayout() {
    return (
        <div className="">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(20,184,246,0.12),transparent_70%)]"
            />
            <div className="relative">
                <Navbar />
                <main className="mx-auto max-w-6xl px-6 pt-10">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}