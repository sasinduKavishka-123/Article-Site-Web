import type { TagCount } from "../../types/types"

const TagBars = ({ items }: { items: TagCount[] }) => {
    if (items.length === 0) return <p className="text-slate-400">No tags yet.</p>
    const max = Math.max(...items.map((i) => i.count), 1)

    return (
        <ul className="space-y-4">
            {items.map((i) => (
                <li key={i.tag}>
                    <div className="mb-1.5 flex justify-between text-sm">
                        <span className="font-semibold">{i.tag}</span>
                        <span className="text-slate-400">{i.count}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${(i.count / max) * 100}%` }} />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default TagBars