import "./Header.css";
import { Link } from 'react-router';

export function Header() {
    return (
        <header>
            <h1>My cool site</h1>
            <div>
                <label>
                    Some switch (dark mode?) <input type="checkbox" />
                </label>
                <nav>
                    {/* <a href="/">Home</a> */}
                    <Link to="/">Home</Link>
                    {/* <a href="/images">Image Gallery</a> */}
                    <Link to="/images">Image Gallery</Link>
                    {/* <a href="/account">Account</a> */}
                    <Link to="/account">Account</Link>
                </nav>
            </div>
        </header>
    );
}
