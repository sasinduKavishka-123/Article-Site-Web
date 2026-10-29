export default function Spinner() {
    return (
        <div className="flex justify-center py-20" role="status" aria-label="Loding">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-white/10 border-t-accent"></div>
        </div>
    )
}