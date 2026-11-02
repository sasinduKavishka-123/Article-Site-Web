import api from "./api"

export const getAllArticles = async (page: number, limit: number) => {
    const res = await api.get(`/articles?page=${page}&limit=${limit}`)
    return res.data
}

export const getArticleById = async (id: string) => {
    const res = await api.get(`/articles/${id}`)
    return res.data
}

export const getMyArticles = async () => {
    const res = await api.get("/articles/my-articles")
    return res.data
}