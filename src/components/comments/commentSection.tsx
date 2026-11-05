import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../ui/Spinner";
import { formatDate } from "../../utils/formatDate";
import ConfirmModal from "../ui/ConfirmModal";
import { createComment, getCommentsByArticleId } from "../../service/comment";

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

    useEffect(()=>{
        if(articleId){
            getCommentsByArticleId(articleId)
                .then(setComments)
                .catch((err) => setError(err.message ? err.message : "Failed to load article"))
                .finally(() => { setLoading(false) })
        }
    }, [articleId])

    const submit = async (e: FormEvent) => {
        e.preventDefault()
        if (!text.trim()) {
            return setFormError("Write a comment first.")
        }
        setPosting(true)
        setFormError("")

        try {
            await createComment(text, articleId)
            setText("")
        }
        catch (err: any) {
            setFormError(err.message ? err.message : "Could not delete the comment.")
        }
        finally {
            setPosting(false)
        }
    }

    const confirmDelete = async () => {
        if (!target) return;
        setDeleting(true);
        try {
            setTarget(null);
        }
        catch (err) {
            //   setFormError(errMsg(err, "Could not delete the comment."));
            setTarget(null);
        }
        finally {
            setDeleting(false);
        }
    };

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
                                            <span className="font-bold">{c.author.name}</span>
                                            <span className="ml-2 text-slate-500">{formatDate(c.createdAt)}</span>
                                        </p>
                                        {canDelete && (
                                            <button type="button" onClick={() => setTarget(c)} className="text-sm font-semibold text-red-400 hover:text-red-300">
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                    <p className="mt-2 whitespace-pre-wrap break-words text-slate-300">{c.text}</p>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <ConfirmModal
                open={!!target}
                title="Delete comment?"
                message="This comment will be removed from the article."
                confirmText="Delete"
                busy={deleting}
                onConfirm={confirmDelete}
                onCancel={() => setTarget(null)}
            />
        </section>
    )
}

export default CommentSection