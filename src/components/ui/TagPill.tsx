import { Link } from "react-router-dom"

interface Props {
    label: string
    to?: string
    onClick?: () => void
    active?: boolean
    muted?: boolean
    size?: "sm" | "md"
}

export default function TagPill({ label, to, onClick, active, muted, size = "sm" }: Props) {
    const tone =
        active || !muted
            ? "border-accent/40 bg-accent/10 text-accent"
            : "border-white/10 bg-white/5 text-slate-300"

    const hover = to || onClick ? "hover:border-accent/60 hover:text-white" : ""
    const pad = size === "md" ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs"
    const cls = `inline-flex items-center rounded-full border font-semibold transition ${pad} ${tone} ${hover}`;

    if(to) {return <Link to={to} className={cls}>{label}</Link>}
    if (onClick){
        return (
            <button type="button" onClick={onClick} aria-pressed={active} className={cls}>
                {label}
            </button>
        )
    }
    return <span className={cls}>{label}</span>
}