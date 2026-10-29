import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../service/auth";
import AuthLayout, { ErrorBanner, Field, SubmitButton } from "../components/AuthLayout";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface RegisterForm {
    userName: string;
    email: string;
    password: string;
    conPassword: string;
}

type RegisterErrors = Partial<Record<keyof RegisterForm, string>>

function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conPassword, setConPassword] = useState("")
    const [errors, setErrors] = useState<RegisterErrors>({})
    const [serverError, setServerError] = useState("") 
    const [loading, setLoading] = useState(false)

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const next: RegisterErrors = {}
        const userName = name.trim()
        if (!userName) next.userName = "Enter a User Name."
        else if (userName.length < 2) { next.userName = "User Name must be at least 2 characters." }
        else if (userName.length > 30) { next.userName = "User Name must be 30 characters or fewer." }

        if (!email.trim()) { next.email = "Enter your email address." }
        else if (!EMAIL_RE.test(email.trim())) { next.email = "Enter a valid email address." }

        if (!password) { next.password = "Enter a password." }
        else if (password.length < 6) { next.password = "Password must be at least 6 characters." }

        if (password !== conPassword) { next.conPassword = "Passwords do not match" }

        setErrors(next)
        if (Object.keys(next).length) { return }

        setLoading(true)
        try {
            await register(name.trim(), email.trim(), password)
            alert("Registration success")
            navigate("/login")
        }
        catch (err) {
            const txt = err instanceof Error ? err.message : "Someting went wrong"
            setServerError( txt + ". Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout
            eyebrow="Join the community" 
            title={"Create your account."} 
            subtitle={"Publish reviews, guides and news"} 
            footer={
                <>
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-[#14b8f6] hover:underline">
                        Log in    
                    </Link>
                </>
            }        
        >
            <ErrorBanner message={serverError}/>
            <form onSubmit={handleRegister} noValidate className="space-y-5">
                <Field
                    id="userName"
                    name="userName"
                    type="text"
                    label="UserName"
                    placeholder="Your display name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.userName}
                />
                <Field
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                />
                <Field
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                />
                <Field
                    id="password"
                    name="password"
                    type="password"
                    label="Confirm Password"
                    placeholder="Re-enter password"
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                    error={errors.conPassword}
                />
                <SubmitButton loading={loading} loadingText="Creating Account...">
                    Create Account
                </SubmitButton>
            </form>
        </AuthLayout>
    )
}

export default Register