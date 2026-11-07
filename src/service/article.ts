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

export const createArticle = async (formData: FormData) => {
    const res = await api.post(`/articles`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })

    return res.data
}

export const updateArticle = async (formData: FormData) => {
    const res = await api.put(`/articles`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })

    return res.data
}

export const changeActive = async (id: string) => {
    const res = await api.patch(`/articles/${id}/change-activ`)
    return res.data
}

export const toggleLike = async (id: string) => {
    const res = await api.patch(`/articles/${id}/like`)
    return res.data
}

export const getAllArticleCount = async()=>{
    const res = await api.get('/articles/countAll')
    return res.data
}

export const getMostLikedArticles = async()=>{
    const res = await api.get("/articles/getMostLiked")
    return res.data
}