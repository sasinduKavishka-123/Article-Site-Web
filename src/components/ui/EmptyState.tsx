export default function EmptyState({ title, text }: { title: string; text?: string }) {
    return(
        <div className="rounded-3xl border border-dashed border-white/10 bg-card/60 px-6 py-16 text-center">
            <p className="text-xl font-bold tracking-tight">{title}</p>
            {text && <p className="mt-2 text-slate-400">{text}</p>}
        </div>
    )
}