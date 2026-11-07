
const StatCard = ({lable, value}: {lable: string, value: number})=>{
    return(
        <div className="rounded-2xl border border-white/10 bg-card p-6">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                <span className="h-0.5 w-5 bg-accent"/>
                {lable}
            </p>
            <p className="mt-3 text-4xl font-extrabold tracking-tighter">{value.toLocaleString()}</p>
        </div>
    )
}

export default StatCard