import { useActionState } from "react";
import "./UsernamePasswordForm.css"


export function UsernamePasswordForm(props) {
    
    const [result, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            
            const password = formData.get("password");
            const username = formData.get("username");

            if (!username || !password) {
                return {
                    type: "error",
                    message: `Please fill in your username and password.`,
                };
            }

            const submitResult = await props.onSubmit( username, password );
            return submitResult;
            // console.log(submitResult.status);
            // if (submitResult.status == 400 || submitResult.status == 401 || submitResult.status == 500 ){
            //     return {
            //         type: "error",
            //         message: submitResult.body.message,
            //     };
            // }

            // return {
            //     type: "success",
            //     message: `You have succesfully subscribed!`,
            // };
        },
        null
    );

    return (
        <>
            {result && <p className={`message ${result.type}`}>{result.message}</p>}
            {isPending && <p className="message loading">Loading ...</p>}
            <form action={submitAction}>
                <h3>Join the newsletter</h3>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        placeholder="password"
                    />
                </div>
                <div>
                    <button disabled={isPending} type="submit">Submit</button>
                </div>
            </form>
        </>

    );
}