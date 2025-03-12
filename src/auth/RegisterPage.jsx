import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "../sendPostRequest";
import { useNavigate } from 'react-router';

export function RegisterPage({ onValidRegister }) {
    const navigate = useNavigate();
    const submissionHandler = async (username, password) => {
        console.log("From Within Register Page.")
        console.log("username:", username);
        console.log("password:", password);
        const response = await sendPostRequest("/auth/register", { username: username, password: password });

        console.log(response.status);
        if (response.status == 400 || response.status == 500) {
            return {
                type: "error",
                message: response.body.message,
            };
        }
        console.log(response.body.token);
        onValidRegister(response.body.token);
        navigate("/");
        return;
    };
    return (
        <>
            <h1>Register a New Account</h1>
            <UsernamePasswordForm onSubmit={submissionHandler} />
        </>
    );
}