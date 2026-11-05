import api from "./api"

export const createComment = async (text: string, articleId: string) => {
    const res = await api.post("/comments/", { text, articleId })
    return res.data
}

export const getCommentsByArticleId = async (articleId: string) => {
    const res = await api.get(`/comments/${articleId}`)
    return res.data
}