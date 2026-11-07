
const StatusBadge = ({ active }: { active: boolean }) => {
    return (
        <span
            className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-bold ${active
                    ? "border-green-500/30 bg-green-500/10 text-green-400"
                    : "border-red-500/30 bg-red-500/10 text-red-400"
                }`}
        >
            {active ? "Active" : "Inactive"}
        </span>
    )
}

export default StatusBadge