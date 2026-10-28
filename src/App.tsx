import AuthProvider from "./context/AuthContext";
import Router from "./router"
import Register from "./pages/Register";

function App(){
    return(
        <AuthProvider>
            <Router/>
        </AuthProvider>
    )
}

export default App