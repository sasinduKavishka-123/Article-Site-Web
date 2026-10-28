import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../service/auth";

function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conPassword, setConPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleRegister = async () => {
        if (!name || !email || !password || !conPassword) {
            return alert("Please fill all fields")
        }
        if (password !== conPassword) return alert("Passwords do not match")

        setLoading(true)
        try {
            await register(name, email, password)
            alert("Registration success")
            navigate("/login")
        }
        catch (err) {
            alert("Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="User Name"
            />
            <br />
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
            />
            <br />
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <br />
            <input 
                type="password" 
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
                placeholder="Confirm Password"
            />
            <br />
            <button 
                onClick={handleRegister}
            />
        </div>
    )
}

export default Register