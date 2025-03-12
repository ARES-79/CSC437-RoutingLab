import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { Link, useNavigate } from 'react-router';
import { sendPostRequest } from "../sendPostRequest";

export function LoginPage({onValidLogin}) {
    const navigate = useNavigate();
    const submissionHandler = async (username, password) => {
            console.log("From Within Login Page.")
            console.log("username:", username);
            console.log("password:", password);
            const response = await sendPostRequest("/auth/login",{username: username, password: password});
            
            console.log(response.status);
            if (response.status == 401 || response.status == 500 ){
                return {
                    type: "error",
                    message: response.body.message,
                };
            }
            console.log(response.body.token);
            onValidLogin(response.body.token);
            navigate("/");
            return;
        };
    return (
        <>
        <h1>Login</h1>
        <UsernamePasswordForm onSubmit={submissionHandler}/>
        <p> Don't have an account? <Link to="/register">Register here</Link></p>
        </>
    );
}