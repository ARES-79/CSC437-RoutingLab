import { ImageEditForm } from "./images/ImageEditForm.jsx";


export function Homepage(props) {
    return (
        <>
            <h2>Welcome, {props.userName}</h2>
            <p>This is the content of the home page.</p>

            <ImageEditForm authToken={props.authToken}/>
        </>
    );
}
