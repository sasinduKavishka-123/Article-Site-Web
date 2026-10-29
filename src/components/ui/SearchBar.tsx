
interface Props{
    value: string;
    onChange: (v: string) => void;
    placeholder?: string
}

export default function SearchBar({value, onChange, placeholder = "Search articles..." }: Props){
    return(
        <div className="relative max-auto w-full max-w-2xl">
            <svg 
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
            </svg>
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                aria-label="Search articles"
                className="w-full rounded-2xl border border-white/10  bg-card py-4 pl-14 pr-5 text-lg text-white placeholder-slate-500 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
        </div>
    )
}