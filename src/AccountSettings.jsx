import { MainLayout } from "./MainLayout.jsx";

export function AccountSettings({ handleUserNameChange }) {
    return (
        <>
            <h2>Account settings</h2>
            <label>
                Username <input onChange={(event) => handleUserNameChange(event.target.value)}/>
            </label>
            <p><i>Changes are auto-saved.</i></p>
        </>
    );
}
