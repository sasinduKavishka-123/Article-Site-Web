import { useCallback, useEffect, useState } from "react";


export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[]) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [tick, setTick] = useState(0)

    useEffect(() => {
        let cancelled = false

        setLoading(true)
        setError("")
        fetcher()
            .then((d) => !cancelled && setData(d))
            .catch((e) => !cancelled && setError(e.message))
            .finally(() => !cancelled && setLoading(false))

        return () => {
            cancelled = true
        }
    }, [...deps, tick])

    const reload = useCallback(() => { setTick((t: number) => t + 1) }, [])
    return { data, loading, error, reload }
}