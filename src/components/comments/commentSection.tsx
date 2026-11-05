import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../ui/Spinner";
import { formatDate } from "../../utils/formatDate";

const CommentSection = ({ articleId }: { articleId: string }) => {

    const { user } = useAuth();

    const [text, setText] = useState<string>("")
    const [posting, setPosting] = useState<boolean>(false)
    const [formError, setFormError] = useState<string>("")
    const [target, setTarget] = useState<Comment | null>(null)
    const [deleting, setDeleting] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [comments, setComments] = useState<any[]>([])

    return (
        <section className="rounded-3xl border border-white/10 bg-card p-6 sm:p-10">
            <h2 id="comments-title" className="text-3xl font-extrabold tracking-tighter">
                Comments <span className="text-slate-500"></span>
            </h2>

            <form className="mt-6">
                <label htmlFor="comment" className="sr-only">Add a comment</label>
                <textarea
                    id="comment"
                    rows={3}
                    value={""}
                    onChange={() => { }}
                    placeholder="Share your thoughts..."
                    className="w-full rounded-xl border border-white/10 bg-field px-4 py-3.5 text-base text-white placeholder-slate-500 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                {formError && <p role="alert" className="mt-2 text-sm text-red-400">{formError}</p>}
                <button
                    type="submit"
                    disabled={posting}
                    className="mt-3 rounded-xl bg-accent px-6 py-3 font-bold text-[#04121c] hover:bg-[#3cc6fa] disabled:opacity-60"
                >
                    {posting ? "Posting..." : "Post comment"}
                </button>
            </form>

            <div className="mt-8">
                {loading && !comments ? (
                    <Spinner />
                ) : error ? (
                    <p className="text-red-400">{error}</p>
                ) : comments.length === 0 ? (
                    <p className="text-slate-400">No comments yet. Be the first to share your thoughts.</p>
                ) : (
                    <ul className="divide-y divide-white/5">
                        {comments.map((c) => {
                            const canDelete = user && (user.id === c.author._id || user.role === "admin");
                            return (
                                <li key={c._id} className="py-5">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm">
                                            <span className="font-bold">{c.author.username}</span>
                                            <span className="ml-2 text-slate-500">{formatDate(c.createdAt)}</span>
                                        </p>
                                        {canDelete && (
                                            <button type="button" onClick={() => setTarget(c)} className="text-sm font-semibold text-red-400 hover:text-red-300">
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                    <p className="mt-2 whitespace-pre-wrap break-words text-slate-300">{c.commentText}</p>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    )
}

export default CommentSection