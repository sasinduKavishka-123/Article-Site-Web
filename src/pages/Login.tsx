import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../service/auth"
import AuthLayout, { ErrorBanner, Field, SubmitButton } from "../components/AuthLayout";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LoginForm {
    email: string;
    password: string;
}

type LoginErrors = Partial<Record<keyof LoginForm, string>>



function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<LoginErrors>({});
    const [serverError, setServerError] = useState<string>("");
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const err: LoginErrors = {};
        if (!email.trim()) { err.email = "Enter your email address." }
        else if (!EMAIL_RE.test(email.trim())) { err.email = "Enter a valid email address."}

        if (!password) { err.password = "Enter your password." }
        else if (password.length < 6) { err.password = "Password must be at least 6 characters." }


        setErrors(err)
        if (Object.keys(err).length) { return }

        setLoading(true)

        try {
            const res = await login(email.trim(), password)
            
            const { access_token, refresh_token } = res.data
            
            if (!access_token || !refresh_token) { throw new Error("Tokens Missing") }

            localStorage.setItem("ACCESS_TOKEN", access_token)
            localStorage.setItem("REFRESH_TOKEN", refresh_token)

            window.location.href = "/"
        }
        catch (err: any) {
            const msg = err.response?.data?.message || (err instanceof Error ? err.message : "Could not log in");
            setServerError(msg);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout
            eyebrow="Welcome back"
            title="Log in to your account."
            subtitle="Read, write and discuss the latest game articles."
            footer={
                <>
                    New here?{" "}
                    <Link to="/register" className="font-bold text-[#14b8f6] hover:underline">
                        Create an Account
                    </Link>
                </>
            }
        >
            <ErrorBanner message={serverError} />
            <form onSubmit={handleLogin} noValidate className="space-y-5">
                <Field id="email"
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                />
                <SubmitButton loading={loading} loadingText="Logging in...">
                    Log in
                </SubmitButton>
            </form>
        </AuthLayout>
    )
}

export default Login