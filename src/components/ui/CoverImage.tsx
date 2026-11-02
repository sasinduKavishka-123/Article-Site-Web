import { useState } from "react"

interface Props{
    src?: string
    alt: string
    className?: string
}

export default function CoverImage({ src, alt, className=""}: Props){
    const [failed,setFailed] = useState(false)
    if(!src || failed){
        return(
            <div
                aria-hidden="true"
                className={`flex items-center justify-center bg-linear-to-br from-accent/25 via-field to-base text-4xl ${className}`}
            >
                🎮
            </div>
        )
    }
    return(
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className={`object-cover ${className}`}
        />
    )
}