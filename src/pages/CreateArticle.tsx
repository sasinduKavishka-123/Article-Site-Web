import { useNavigate } from "react-router-dom"
import ArticleForm from "../components/articles/ArticleForm"

const CreateArticle = () => {
    const navigate = useNavigate()

    return (
        <div>
            <p>
                <span></span>
                New Article
            </p>
            <h1>Write an article.</h1>
            <ArticleForm></ArticleForm>
        </div>
    )
}

export default CreateArticle